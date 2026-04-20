import os
os.environ["TRANSFORMERS_OFFLINE"] = "1"
os.environ["HF_DATASETS_OFFLINE"] = "1"
os.environ["HF_HUB_OFFLINE"] = "1" 

import spacy
from fastcoref import FCoref
from collections import defaultdict
from transformers import pipeline
import json
# from Bias import BiasData, ArticleData

class BiasPipeline:
    def __init__(self) -> None:
        # spaCy Entity Linking
        self.NER_nlp = spacy.load("en_core_web_trf")
        self.NER_nlp.add_pipe("entityLinker", last=True)
        
        # Coreference fastcoref
        self.Coref_model = FCoref(device='cuda:0')
        
        self.stance_classifier = pipeline(
             "zero-shot-classification", 
            model="MoritzLaurer/DeBERTa-v3-large-zeroshot-v2.0",
            device=0 
        )
    
    @staticmethod
    def from_json_basil(filename:str) -> str:
        text: list[str] = []
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        #Export from nested list to a single list of sentences
        for paragraph in data["body-paragraphs"]:
            if len(paragraph) == 1:
                text.extend(paragraph[0] + " ")
            else:
                for sentence in paragraph:
                    text.extend(sentence + " ") 

        return "".join(text)
    
    def get_Stance(self , rawtext:str):
        
        #Named Enitity Recognition and Enity linked
        doc = self.NER_nlp(rawtext)
        
        #Create Subject Dictionary
        data = self.create_LE_dict(doc)
        
        #Connects CoReference to existing Subjects
        self.connect_CoRef( rawtext, data)
        
        #Create Updated Coreferenced Sentences with subjects and wiki_id
        sentence_subject_wikiID = self.replace_Coref_Text(data, doc)
        
        self.determine_Stance(data, sentence_subject_wikiID)
        
        json_string = json.dumps(data)
        
        return json_string

    
    def create_init_dict(self, doc, init_dict, secondary_data):

        #Filter for People ONLY
        people = [(ent.start_char, ent.end_char, ent.text) for ent in doc.ents if ent.label_ == "PERSON"]
        
        for linked_ent in doc._.linkedEntities:
            #Bool if PERSON
            span = linked_ent.get_span()
            is_person = any(start <= span.start_char and span.end_char <= end for start, end, _ in people)
            if is_person:
                id = linked_ent.get_id()
                name = linked_ent.get_label()
                person_span = (span.start_char, span.end_char)
                
                #filter last name to seconday data
                if len(name.split()) == 1:
                    if id not in secondary_data:
                        secondary_data[linked_ent.get_id()] = {
                            "name": name,
                            "span": [person_span],
                            "description": linked_ent.description,
                        }
                    else:
                        secondary_data[linked_ent.get_id()]["span"].append(person_span)
                    
                
                elif id not in init_dict:
                    init_dict[linked_ent.get_id()] ={
                            "name": name,
                            "span": [person_span],
                            "description": linked_ent.description,
                            "stance" : [] 
                            }
                else:
                    init_dict[linked_ent.get_id()]["span"].append(person_span)
    
    #reallocate lastname to match subjects
    def reallocate_lastnames( self, init_dict: dict , secondary_data: dict):
        lastnames = [ (subjects["name"].split()[-1], key)   for key , subjects in init_dict.items()]
        for subject in secondary_data.values():
            for lastname, key in lastnames:
                if subject["name"] == lastname:
                    init_dict[key]["span"].extend( subject["span"])
                    break
    
    #resort dictionary to be most mentions
    def resort_data_most_mentinos(self, init_dict: dict) -> dict:
        new_data = {}
        key_mentions = [ (key, len(subject["span"]))for key, subject in init_dict.items()]
        key_mentions.sort(key=lambda x: x[1], reverse=True)
        for key, _ in key_mentions:
            new_data[key] = init_dict[key]
        return new_data
    
    def create_LE_dict(self, doc) -> dict:
        init_dict = {}
        secondary_data = {}
        
        self.create_init_dict(doc, init_dict, secondary_data)
        self.reallocate_lastnames(init_dict, secondary_data)
        data = self. resort_data_most_mentinos(init_dict)
        return data
    
    def connect_CoRef(self, rawtext:str, data: dict):
        #Run coref model
        preds = pipeline.Coref_model.predict(rawtext)
        spans = preds.get_clusters(as_strings=False)
        
        #update dictionary
        #using span list then popping
        for key , person in data.items():
            for span in person["span"]:
                person_start, person_end = span
                for i , span_list in enumerate(spans):
                    in_list = any(start <= person_start and person_end <= end for start, end in span_list)
                    if in_list:
                        data[key]['span'] = span_list
                        spans.pop(i)
                        break
                break
            
    
    def replace_Coref_Text(self, data, doc)-> list:
        #create new sentence with replaced subject and subject name and wiki key
        #agian we dont need the name if we have the wiki key
        #also to avoid issue we are only replacing the first mention of the subject
        #since all most all sentence are Subject , verb ,object
        #We only replace the first subject in the sentence and set that as the subject
        
        span_name = []
        for key ,person in data.items():
            span_name.extend([ (start, end, person["name"], key) for start, end in person['span']])
        span_name.sort( key=lambda x:x[0])
        
        sentence_subject_wikiID = []
        for sentence in doc.sents:
            matches = [r for r in span_name if sentence.start_char <= r[0] and r[1] <= sentence.end_char]
            if matches:
                matches.sort(key=lambda x:x[0], reverse=True)
                new = sentence.text
                probable_subject = []
                wiki_id = []
                for start, end, replace_txt, wikiid in matches:
                    start_ = start - sentence.start_char
                    end_ = end - sentence.start_char
                    new = new[:start_] + replace_txt + new[end_:]
                    if replace_txt not in probable_subject:
                        probable_subject.append(replace_txt)
                        wiki_id.append(wikiid)

                # _,_,probable_subject, wikiid = matches[-1]
                sentence_subject_wikiID.append([new, probable_subject, wiki_id])
                
            else:
                continue
        
        return sentence_subject_wikiID
    
    
    
    def get_stance(self, sentence, target_name)-> dict:
        
        labels = ["in favor of", "against", "neutral toward"]
        
        template = f"The author of this text is {{}} {target_name}."
        
        # Run the inference
        stance = pipeline.stance_classifier(
            sentence, 
            candidate_labels=labels, 
            hypothesis_template=template
        )
        
        # Returns a dictionary with the labels and their confidence scores
        return stance
    
    
    def determine_Stance(self, data,sentence_subject_wikiID)-> None:
        #Updates Subjecte Dictionary
        for sentence, subject, wiki_id in sentence_subject_wikiID:
            for name, id in zip(subject, wiki_id):
                stance_result = self.get_stance(sentence, name)
                data[id]['stance'].append(stance_result)
        
        return
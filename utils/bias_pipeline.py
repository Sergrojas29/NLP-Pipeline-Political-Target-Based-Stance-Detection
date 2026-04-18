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
    
    
    def get_NER_subjects(self, text):
        doc = self.NER_nlp(text)
        
        
    
    @staticmethod
    def set_Coref_model(text):
        #fastcoref
        model = FCoref(device='cuda:0')
        preds = model.predict(texts=text)     
        return preds
    
    @staticmethod
    def set_subject(NER_model):
        people = {(ent.text, 'PERSON') for ent in NER_model.ents if ent.label_ == "PERSON"}
        Name_TAG = {(ent.text, ent.label_) for ent in NER_model.ents if ent.label_ == "PERSON" or ent.label_ == "NORP" or ent.label_ =="GPE" }


    
    
    @staticmethod
    def set_biasdata(text):
        pass
        
    
    
    def get_stance_dict(self, texturl:str):
        #loading text from 
        
        #get doc from NER/Entity linker
        #doc  = self.NER_npl(text)
        
        #get only people
        # people = [(ent.start_char, ent.end_char, ent.text) for ent in doc.ents if ent.label_ == "PERSON"]
        
        """
        Create dictionary of subject using wikidata
        
        only use full names with at least two strings
        Combine back lastname if possible
               
        """
        
        #run coreference model prediction model to     
        # preds = self.Coref_model.predict(text)
        
        #get span from coference model 
        # spans = preds.get_clusters(as_strings=False)

        
        #filter only people spans and update dictionary["span"]
        """
        for key , person in data.items():
            person_start, person_end = person['span'][0]
            print(person_start, person_end)
            for span_list in spans: 
                in_list = any(start <= person_start and person_end <= end for start, end in span_list)
                if in_list:
                    data[key]['span'] = span_list
                    break
        """
        
        #get sorted span for subject replacement  in order of occurrence
        # [(start, end, "subject", wikiid)]
        
        """
        span_name = []
        for key ,person in data.items():
            span_name.extend([ (start, end, person["name"], key) for start, end in person['span']])
        span_name.sort( key=lambda x:x[0])
        span_name
        """ 
        
        #get Stance using DeBERTA
        
        # self.stance_classifier
        
        """
        Run for every sentence with a subject
        
        def get_stance(sentence, target_name):
            # 2. Define the exact stances you want it to classify
            labels = ["in favor of", "against", "neutral toward"]
            
            # 3. The Magic: Frame the hypothesis explicitly around your target
            template = f"The author of this text is {{}} {target_name}."
            
            # 4. Run the inference
            result = stance_classifier(
                sentence, 
                candidate_labels=labels, 
                hypothesis_template=template
            )
            
            # Returns a dictionary with the labels and their confidence scores
            return result
                
        """
        
import spacy
from fastcoref import FCoref
from collections import defaultdict
import json

# from Bias import BiasData, ArticleData

class BiasPipeline:
    def __init__(self) -> None:
        # spaCy Entity Linking
        self.NER_nlp = spacy.load("en_core_web_trf")
        self.NER_nlp.add_pipe("entityLinker", last=True)
        
        # Coreference fastcoref
        self.Coref_model = FCoref(device='cuda:0')
    
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
        
        

        
# text = BiasPipeline.from_json_basil("DATA/BASIL-main/articles/2016/7a97de89-1433-46f7-bcc2-f80b041cb9a0_2.json")

# nlp = spacy.load("en_core_web_trf")
# nlp.add_pipe("entityLinker", last=True)
# doc = nlp(text)

# person_spans = [(ent.start_char, ent.end_char) for ent in doc.ents if ent.label_ == "PERSON"]

# for linked_ent in doc._.linkedEntities:
    
#     # Grab the generic spaCy span for this linked entity
#     span = linked_ent.get_span()
    
#     # 3. The Filter: Check if the linker's span falls inside any of our PERSON entities
#     is_person = any(start <= span.start_char and span.end_char <= end for start, end in person_spans)
    
#     if is_person:
#         print(f"Text in Document: {span.text}")
#         print(f"Wikidata Label: {linked_ent.get_label()}")
#         print(f"Wikidata ID: {linked_ent.get_id()}")
#         print(f"Wikidata Description: {linked_ent.get_description()}")
#         print("-" * 30)
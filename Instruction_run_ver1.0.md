Sergio Rojas-Aguilar

**Github Repo:** https://github.com/Sergrojas29/NLP-Pipeline-Political-Target-Based-Stance-Detection  
**Demo:** [DEMO_Version1.0.zip](https://github.com/Sergrojas29/NLP-Pipeline-Political-Target-Based-Stance-Detection/blob/python/DEMO_Version1.0.zip)  (Inside root of repo)   
**Presentation:** https://youtu.be/vAezXmZSj3s   

# Test run version 1.0

**NOTE** documention is still need and clear comments are need for the full version. That is what the pdf's notebook are for.

## Backend Requirements & Setup

### 1. Install PyTorch (GPU Version)

Run the appropriate command for your system (Mine was for CUDA 11.8):
```
pip install torch torchvision torchaudio --index-url [https://download.pytorch.org/whl/cu118](https://download.pytorch.org/whl/cu118)
```

### 2. Install Python Dependencies
```
pip install fastcoref spacy spacy-transformers spacy-entity-linker transformers flask Flask-Cors gunicorn psycopg2-binary pandas
```

### 3. Download Models & Knowledge Bases
Download the RoBERTa spaCy NER model
```
python -m spacy download en_core_web_trf

```

Download the localized Wikidata Knowledge Base for Entity Linking
```
python -m spacy_entity_linker "download_knowledge_base"
```
---

## Test Version (v1.0)

test version of the pipeline is in the **Version 1.0 Zip File**. contains:
* ****Version1.0.ipynb****: run and test the pipeline. print the final JSON data.
* ****bias_pipeline.py****: Python class file containing the NLP logic.
* ****DATA/****: BASIL dataset used for testing. 

---

## Frontend Visualization

### 1. Running the UI

```
cd Frontend
npm install
npm run dev
```

### 2. Loading Pre-Generated Data
The frontend has preloaded JSON data files in the `src/assets/` directory. 

To load and view any dataset in the dashboard:
1. Open `src/app.tsx`.
2. Navigate to **line 13**.
3. Update the import statement with the desired filename:
   ```javascript
   import data from "./assets/{add_file_name_here.json}";
   ```
4. Save the file and reload the page.

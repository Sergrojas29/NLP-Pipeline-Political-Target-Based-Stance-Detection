Sergio Rojas-Aguilar

Structure:

- Header: Title 

- Description

- Citation & Abstract:

  - bibliography

  - Abstract (Summary for future me)


# **NER Coreference Problem**

While doing some testing during the HW using the BERT model that is focused on NER. There came a problem as to how to deal with common nouns and pronouns when referring to a subject.

This issue was that Trump can be referred to as the president, he/him, they, Donald, potus or even Commander & Chief. Washington DC can also be called "the city" or "DC." I either need to find a way to group them, ignore them, or find a trained model that can determine and replace the uncommon nouns or pronouns with the similar proper nouns.

These two articles review the issue that appears to be common in NLP and how pretrained models can solve coreference resolution.

Coreference Resolution for Ambiguous Pronoun with BERT and MLP gave another possible solution. Their accuracy was the highest using BERT and a assitiant train Custom MLP.


## Citation & Abstract - Coreference Resolution in Ambiguous Pronouns Using BERT and SVM
M. Mohan and J. J. Nair, "Coreference Resolution in Ambiguous Pronouns Using BERT and SVM," 2019 9th International Symposium on Embedded Computing and System Design (ISED), Kollam, India, 2019, pp. 1-5, doi: 10.1109/ISED48680.2019.9096245.

**Abstract:** Coreference resolution is the method of matching the expressions in a text to the corresponding entity which it is referring. This is a major task in many Natural Language Processing problems and a prolonged challenge in the field of NLP. One of the major challenges in the existing coreference resolution systems is the absence of a better solution in the task of ambiguous pronoun resolution. So in this work, a coreference resolution system for ambiguous pronoun resolution using BERT based approach is proposed. First, the dataset is trained on a BERT model for obtaining the contextual embeddings in the text and then applying it to the SVM classifier for classification and thus obtain the coreference resolution for the target pronoun. The dataset used in this work is Gendered Ambiguous Pronouns (GAP) dataset, released by Google AI Language. keywords: {Bit error rate;Task analysis;Lifting equipment;Training;Context modeling;Natural language processing;Support vector machines;Coreference resolution;ambiguous pronoun;contextual embeddings;BERT},URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9096245&isnumber=9096215

## Citation & Abstract - Coreference Resolution for Ambiguous Pronoun with BERT and MLP

R. Nair, V. N. V. Prasad, A. Sreenadh and J. J. Nair, "Coreference Resolution for Ambiguous Pronoun with BERT and MLP," 2021 International Conference on Advances in Computing and Communications (ICACC), Kochi, Kakkanad, India, 2021, pp. 1-5, doi: 10.1109/ICACC-202152719.2021.9708203.

**Abstract:** The process of identifying all the expressions in a text which refer to the same real-world entity is known as coreference resolution. It is one of the main challenges that are faced in Natural Language Processing. We are focusing on creating a better approach for the task of ambiguous pronoun resolution. We are proposing to make use of a BERT-based approach which makes use of PyTorch pre-trained BERT and PyTorch helper bot along with a custom-made MultiLayerPerceptron model as a classifier to solve this problem. We are using the dataset released by Google AI called Gendered Ambiguous Pronouns. The contextual embedding is received by training the preprocessed data with Pretrained BERT and then the contextual embeddings are passed to the MLP Classifier which is used for classification purposes to get results for coreference resolution for target pronoun. keywords: {Training;Computational modeling;Bit error rate;Memory management;Data preprocessing;Focusing;Natural language processing;Pytorch Pretrained BERT;MLP Classifier;Coreference Resolution;Gendered Ambiguous Pronoun dataset;Ambiguous Pronouns;DeepSpeed},URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9708203&isnumber=9708074



# **Entity Disambiguation in Entity Linking**

Another part of the same problem was linking the subject, like in the first problem.

Once I have linked the common and pronoun back to the subject, now I need to be able to determine what entities are linked. For example, if:

- "DJT is the first award winner of the sham FIFA annual Peace Prize."

Then later in the article another sentence says. 

- "Trump is making sure our country is safe."




To create an overall score of sentiment or stance, I need to link DJT to Trump.

The issue with synonymys and Polysemy.

## Citation & Abstract - A Survey of Named Entity Disambiguation in Entity Linking
S. Duan, Y. Guang, W. Bu and J. Yang, "A Survey of Named Entity Disambiguation in Entity Linking," 2023 3rd International Conference on Intelligent Communications and Computing (ICC), Nanchang, China, 2023, pp. 296-303, doi: 10.1109/ICC59986.2023.10421092.

**Abstract:** Named Entity Disambiguation (NED) holds significant importance and application value in the field of Natural Language Processing (NLP). With the development and application of Large Language Model (LLM) and multimodality, scholars have conducted extensive their research on NED. This paper provides a summary of the current state of NED research, discusses challenges, and explores future development trends. It aims to offer insights for NED research by integrating various methods, thus promoting further advancements in this field. keywords: {Surveys;Market research;Natural language processing;Named Entity Disambiguation;Entity Linking;Deep Linking;Multi-model},URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10421092&isnumber=10420854




# **Aspect baised Sentiment or Stance**

This is where I need to make a logical determination on how I want to grade the analysis part of the pipeline. Or maybe use both and have this be a way to evaluate the overall pipeline. Either using a sentiment analysis or a stance analysis.


The first article brought up issues of sentiment analysis, and the second on how stance analysis is more about "either in favor of or against it."




## Citation & Abstract - Issues and Challenges of Aspect-based Sentiment Analysis: A Comprehensive Survey
A. Nazir, Y. Rao, L. Wu and L. Sun, "Issues and Challenges of Aspect-based Sentiment Analysis: A Comprehensive Survey," in IEEE Transactions on Affective Computing, vol. 13, no. 2, pp. 845-863, 1 April-June 2022, doi: 10.1109/TAFFC.2020.2970399. 



**Abstract:**  The domain of Aspect-based Sentiment Analysis, in which aspects are extracted, their sentiments are analysed and sentiments are evolved over time, is getting much attention with increasing feedback of public and customers on social media. The immense advancements in this field urged the researchers to devise new techniques and approaches, each sermonizing a different research analysis/question, that cope with upcoming issues and complex scenarios of Aspect-based Sentiment Analysis. Therefore, this survey emphasized on the issues and challenges that are related to extraction of different aspects and their relevant sentiments, relational mapping between aspects, interactions, dependencies, and contextual-semantic relationships between different data objects for improved sentiment accuracy, and prediction of sentiment evolution dynamicity. A rigorous overview of the recent progress is summarized based on whether they contributed towards highlighting and mitigating the issue of Aspect Extraction, Aspect Sentiment Analysis or Sentiment Evolution. The reported performance for each scrutinized study of Aspect Extraction and Aspect Sentiment Analysis is also given, showing the quantitative evaluation of the proposed approach. Future research directions are proposed and discussed, by critically analysing the presented recent solutions, that will be helpful for researchers and beneficial for improving sentiment classification at aspect-level.
keywords: {Sentiment analysis;Social networking (online);Data mining;Machine learning;Task analysis;Tools;Sun;Aspect;computational linguistic;deep learning;sentiment analysis;sentiment evolution;social media},
URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8976252&isnumber=9786538


## Citation & Abstract - A Research Pathway for Stance Detection in Speech

V. Nguyen, X. Zhang and A. M. Colarik, "A Research Pathway for Stance Detection in Speech," 2023 Global Conference on Information Technologies and Communications (GCITC), Bangalore, India, 2023, pp. 1-8, doi: 10.1109/GCITC60406.2023.10659745.

**Abstract:** Stance detection is a Natural Language Processing (NLP) task that involves identifying an individual’s standpoint on a specific topic and determining their stance as either in favor of or against it. It has various potential applications for governments and organizations, helping them understand how public opinion evolves across multiple social media platforms. Although humans use both written and spoken language for communication, most research in the field primarily focuses on text-based data for building models. This paper aims to put forth a novel research pathway for developing a stance detection model that is specifically trained on audio-based data. To establish a direction for our approach, we analyze several foundational factors, including the utterance of the stance and the emotional elements present in human speech and conversations. We subsequently construct a flow to process the data by extracting text- and audio-based features, as well as supplementary attributes such as the author’s profile. A two-phase modeling approach is proposed to integrate text and speech into a single ensemble model, aiming to enhance the accuracy of the predictions. Finally, several improvement opportunities are also identified, providing a baseline for future endeavors in audio-based stance detection. keywords: {Training;Pipelines;Predictive models;Feature extraction;Data models;Natural language processing;Loss measurement;stance;stance detection;speech analysis;opinion mining;text mining},URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10659745&isnumber=10425791










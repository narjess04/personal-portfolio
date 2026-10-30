import type { Language } from "@/contexts/language-context";

const english: Record<string, { description: string; content: string }> = {
  doxaria: {
    description:
      "Turning handwritten prescriptions into usable data: a vision and OCR pipeline tailored to Tunisian medical documents, with medication verification and a RAG assistant.",
    content:
      "## Making handwritten documents usable\nPrescriptions and care forms hold useful information that is difficult to extract automatically: handwriting varies, medical terms are specialized and layouts differ. Doxaria · MediTrust connects document recognition to a web application where users can review the results.\n\n## From images to structured data\nI worked on data preparation, handwritten region annotation and image preprocessing. The pipeline combines a CNN to identify the document type, YOLOv8 to locate text regions and TrOCR, adapted to Tunisian prescriptions, to transcribe them.\n\nExtracted information is then matched against DPM and CNAM reference data to identify medications and correct some recognition errors. Stamp and letterhead analysis also helps flag inconsistencies.\n\n## Building around the model\n- Document upload from a computer or phone.\n- Review and manual correction of extracted text.\n- Medication verification and reference information.\n- A RAG assistant for querying the medication sheets relevant to the document.\n- Document history in a personal workspace.\n\n## The technical challenge\nRecognizing characters is only part of the problem: the document’s meaning must survive OCR errors. Combining vision models, domain reference data and manual review addresses that challenge.\n\nAcademic project completed at ESPRIT in collaboration with the startup Doxaria in 2025.",
  },
  "newsbot-ia": {
    description:
      "An assistant for exploring the news more efficiently: article collection, automatic summaries, content analysis and questions answered from the collected articles using RAG.",
    content:
      "## From monitoring the news to exploring it\nBrowsing sources, reading articles and finding the main points takes time. NewsBot IA brings these steps into one interface where users can browse news, request a summary and ask questions about the collected texts.\n\n## A natural language processing pipeline\nThe application retrieves articles through GNews, extracts their content and cleans the text for reading. A language model generates summaries; an n8n workflow can also handle this step.\n\nTwo classification models provide additional signals: one looks for patterns associated with fake news, while the other looks for signs of AI-generated text. Their scores support review rather than prove an article’s reliability.\n\n## A chatbot grounded in the articles\nTexts are split into passages, embedded and indexed in ChromaDB. Using LangChain, the chatbot retrieves relevant excerpts to generate answers from the corpus while retaining conversational context.\n\n## Connecting backend and interface\n- FastAPI endpoints for collection, summaries and analysis.\n- React interface with search, categories and article pages.\n- A Chainlit chatbot connected to the RAG pipeline.\n- An extractive summary fallback when generation is unavailable.\n\n## Skills put into practice\nCombining several NLP components in one application: data collection, classification, text generation and semantic retrieval.",
  },
  matchpilot: {
    description:
      "Tailoring applications without distorting a candidate’s background: skill analysis, profile-to-job matching and LLM-assisted generation of ATS-friendly resumes and cover letters.",
    content:
      "## Tailored applications grounded in a real profile\nThe same background can be presented differently for different roles. MatchPilot helps candidates, particularly recent graduates, identify relevant experience and prepare a targeted application.\n\n## From documents to a structured profile\nThe platform imports a resume or LinkedIn profile, extracts text and uses OCR when needed. It organizes the information into an editable profile covering experience, education, projects, skills and languages.\n\nJob descriptions can be supplied as text or screenshots. Analysis separates expected skills, prerequisites and keywords relevant to the application.\n\n## Match first, then write\nProfile-to-job matching identifies skills that are present, related or missing, with supporting evidence from the candidate’s background. LLMs then adapt the resume and cover letter in French or English.\n\nChecks aim to preserve employers, dates and qualifications, and remove or flag skills and figures that are absent from the profile.\n\n## An application ready for review\n- Resume templates compatible with applicant tracking systems (ATS).\n- Customizable presentation and PDF export.\n- Cover letters grounded in the profile and job description.\n- A reusable profile for multiple applications.\n\n## The technical challenge\nConnecting document extraction, semantic analysis and generation while keeping the candidate’s information as the source of truth. React and TypeScript provide the interface; FastAPI and SQLAlchemy structure the backend.",
  },
  "churn-prediction-mlops": {
    description:
      "Identifying telecom customers at risk of leaving: a classification project connecting data preparation, MLflow experiment tracking and predictions through a Flask application.",
    content:
      "## Anticipating customer churn\nIdentifying telecom customers who may leave can help inform retention efforts. This project treats churn as a supervised classification problem, then makes the model accessible through a web application.\n\n## From experimentation to prediction\nThe work includes data preparation and training several classification models. The version presented in the repository uses a Random Forest to estimate churn risk from customer characteristics.\n\nMLflow stores experiments and model artifacts. Tracking these runs makes it possible to retrieve tested configurations and organize the model versions produced during experimentation.\n\n## Making the model usable\nThe saved model is integrated into a Flask application. Users enter customer data and obtain a prediction without opening a notebook or retraining the model.\n\n## Skills put into practice\n- Preparing data for a classification problem.\n- Training and comparing models.\n- Tracking experiments and retaining models with MLflow.\n- Integrating inference into a Flask application.\n\n## The technical challenge\nKeeping the model used in the application consistent with the one evaluated during experimentation. The project connects Data Science work to the early stages of an MLOps workflow, with a concrete business goal: understanding customer churn risk.",
  },
};

export function localizeProject<T extends { slug: string }>(
  project: T,
  language: Language,
): T {
  return language === "en" && english[project.slug]
    ? { ...project, ...english[project.slug] }
    : project;
}

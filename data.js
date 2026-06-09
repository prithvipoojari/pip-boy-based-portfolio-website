/* ========================================================================
   USER_DATA 
   ========================================================================*/

const USER_DATA = {

  // == TOP OF STATUS PANE ==========================================
  name: "PRITHVI MANJUNATH POOJARI",
  role: "GRAD STUDENT · AI/ML",
  level: 3,                            // years of experience
  bio: "An electronics and computer science engineer, currently pursuing a Master’s degree in computer science at Northeastern University with an interest to create software systems that create a positive social impact and solve complex engineering problems at a larger scale.",


  // == S.P.E.C.I.A.L. STATS (each 1–10) ============================
  special: [
    { letter: "S", label: "STRENGTH",     alt: "ML / Deep Learning",         value: 8 },
    { letter: "P", label: "PERCEPTION",   alt: "Data Analysis / EDA",        value: 8 },
    { letter: "E", label: "ENDURANCE",    alt: "Late-night training runs",   value: 8 },
    { letter: "C", label: "CHARISMA",     alt: "Public Speaking",            value: 7 },
    { letter: "I", label: "INTELLIGENCE", alt: "Research / Problem solving", value: 9 },
    { letter: "A", label: "AGILITY",      alt: "Quick prototyping",          value: 8 },
    { letter: "L", label: "LUCK",         alt: "It compiled first try",      value: 5 },
  ],


  // == INVENTORY (Skills) ==========================================
  inventory: [
    {
      category: "WEAPONS — Languages",
      items: [
        { name: "Python",     weight: "0.8", desc: "Primary sidearm. AI/ML loadout." },
        { name: "Java",       weight: "1.5", desc: "Reliable. Coursework-grade." },
        { name: "R",          weight: "2.0", desc: "Statistical precision tool." },
        { name: "SQL",        weight: "1.4", desc: "Ranged precision against data hordes." },
        { name: "HTML / CSS", weight: "1.6", desc: "Web-side ammunition." },
      ],
    },
    {
      category: "APPAREL — Frameworks & Libraries",
      items: [
        { name: "FastAPI",        weight: "1.4", desc: "Lightweight backend exoskeleton." },
        { name: "React",          weight: "1.5", desc: "Daily-wear UI armor." },
        { name: "Tailwind CSS",   weight: "0.8", desc: "Utility-class kevlar." },
        { name: "Chainlit",       weight: "1.7", desc: "LLM chatbot gear of choice." },
        { name: "NumPy / Pandas", weight: "0.9", desc: "Standard data-wrangling kit." },
        { name: "scikit-learn",   weight: "1.3", desc: "Classical ML field manual." },
        { name: "OpenCV",         weight: "2.0", desc: "Computer vision targeting system." },
      ],
    },
    {
      category: "AID — Tools & Databases",
      items: [
        { name: "Git",              weight: "0.5", desc: "Restores 30 productivity points. Stackable." },
        { name: "PostgreSQL",       weight: "1.8", desc: "Relational data fortress." },
        { name: "AstraDB",          weight: "2.4", desc: "Vector store for RAG operations." },
        { name: "Jupyter Notebook", weight: "0.6", desc: "Scratchpad. Carry at all times." },
        { name: "Google Colab",     weight: "0.7", desc: "Cloud GPU on tap." },
        { name: "VS Code",          weight: "0.5", desc: "Standard issue editor." },
        { name: "IntelliJ IDEA",    weight: "1.2", desc: "Heavy editor. Java loadout." },
      ],
    },
    {
      category: "MISC — Other",
      items: [
        { name: "Research / Writing", weight: "1.5", desc: "Published in IJEEI. +1 to credibility checks." },
        { name: "Public Speaking",    weight: "1.8", desc: "Delivered invited talk on LLM project implementation." },
        { name: "Mentoring",          weight: "1.5", desc: "IEEE student council veteran. Buffs nearby allies." },
        { name: "Rhythm Guitar",      weight: "1.2", desc: "Off-duty class skill. Aaroha Music Club." },
      ],
    },
  ],


  // == PROJECTS (Quest Log) ==========================================
  projects: [
    {
      title: "PROJECT: DERMA-AI",
      status: "done",
      desc: "AI-driven dermatology chatbot. ResNet-50 for skin disease classification, " +
            "RAG over AstraDB + OpenAI embeddings for personalized responses. " +
            "Mean sensitivity 92.6%, specificity 99.8%, AUC 99.9%, hallucination 7%. " +
            "Published in the Indonesian Journal of Electrical Engineering and Informatics.",
      tags: ["Python", "ResNet-50", "RAG", "AstraDB", "OpenAI", "Chainlit"],
      links: [
        { label: "paper (DOI)", url: "https://doi.org/10.52549/ijeei.v12i4.5806" },
      ],
    },
    {
      title: "OPERATION: TRIAL COMPANION",
      status: "active",
      desc: "Gemini-powered clinical trial assistant. Parses dense protocol documents " +
            "into plain-language summaries, wellness plans, and grounded Q&A. " +
            "Gemini 2.5 Pro for parsing and summarization, Gemini Flash for quiz generation.",
      tags: ["Python", "FastAPI", "React", "Tailwind", "Gemini 2.5 Pro", "Gemini Flash"],
      links: [
        { label: "github", url: "https://github.com/yourhandle/trial-companion" },
      ],
    },
    {
      title: "QUEST: NEURAL SCAN",
      status: "done",
      desc: "CNN-based brain tumor detector. Trained on augmented brain scan dataset. " +
            "96.45% validation accuracy, 96.13% test accuracy.",
      tags: ["Python", "CNN", "OpenCV", "Deep Learning"],
      links: [
        { label: "github", url: "https://github.com/yourhandle/brain-tumor-detection" },
      ],
    },
  ],


  // == TIMELINE (Map / career history) ==========================================
  timeline: [
    { when: "Jan 2026 — PRESENT", what: "Master of Science in Computer Science",               where: "Northeastern University · Khoury College of Computer Sciences · Boston, MA", 
      details: [
        "GPA: 3.834 / 4.0",
        "Relevant Coursework: Programming Design Paradigm, Database Management Systems",
      ], },
    {
      when: "August 2024 — July 2025",
      what: "Technical Operations and Client Support Associate",
      where: "Shree Marikamba Solutions Pvt. Ltd. (SMSPL) · Navi Mumbai, India (Hybrid)",
      details: [
        "Assisting with site visits and field support activities for CCTV surveillance projects.",
        "Configuring surveillance devices for site installation by technicians.",
        "Marking camera placement locations, quantities, and device types on AutoCAD-generated floor layouts based on manual survey details to support CCTV installation activities.",
        "Supporting customer interactions and attending to client inquiries at the business location.",
        "Visiting a client site to explain implemented GPS tracking software solutions and gather customer feedback, queries and enhancement requirements.",
        "Documenting client concerns and communicating requirements for follow-up actions and software modifications.",
        "Assisting with inventory monitoring and stock checking to support operations.",
        "Supporting coordination activities across operational, technical, and client-facing functions as required.",
      ],
    },
    { when: "June 2023 — February 2024",    what: "Data Science and Scrum Manager Intern",       where: "Hackveda Limited · Delhi, India (Remote)", 
      details: [
        "Developed a Future Location Prediction System using Dataiku deployed on an AWS EC2 instance, building predictive models from the provided dataset.",
        "Implemented Exploratory Data Analysis (EDA) for Credit Card Fraud Detection using correlation analysis and outlier detection to identify significant variables and anomalies; applied PCA for feature importance and t-SNE to visualize transaction clusters for improved anomaly detection.",
        "Analyzed student performance data to identify patterns and correlations, building a predictive model to support data-driven decision making.",
        "Facilitated agile ceremonies as part of the scrum team, ensuring smooth sprint planning and delivery.",
        "Led remote orientation webinars introducing incoming intern cohorts to the company and helping new members get oriented.",
        "Reviewed and gave feedback on interns’ project presentations during scrum meetings to support their progress.",
      ] },
    { when: "June 2020 — June 2024",    what: "Bachelor of Engineering in Electronics and Computer Science", where: "University of Mumbai · India",
      details: [
        "GPA: 7.75 / 10.0",
      ]
     },
  ],


  // == RADIO (Contact links) ==========================================
  radio: [
    { freq: "98.6 FM",  name: "ENCLAVE RADIO — Email",     url: "mailto:poojari.pri@northeastern.edu" },
    { freq: "101.1 FM", name: "GALAXY NEWS — GitHub",      url: "https://github.com/yourhandle" },
    { freq: "104.3 FM", name: "DIAMOND CITY — LinkedIn",   url: "https://www.linkedin.com/in/prithvipoojari/" },
    { freq: "107.5 FM", name: "MINUTEMEN BAND — Phone",    url: "tel:+16173730195" },
  ],


  // == MISC ==========================================
  caps: 2287,    
};
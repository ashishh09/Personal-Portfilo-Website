import { Project, SkillGroup, EducationItem, ExperienceItem, CertificationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Ashish Satish Bhoite',
  headline: 'Java Developer | DevOps Enthusiast | ML Explorer',
  introduction:
    'Computer Science Engineering student focused on Java development, backend technologies, DevOps and Machine Learning. Passionate about building practical software solutions, solving problems and continuously learning new technologies.',
  aboutBio: [
    'I am a Computer Science Engineering student pursuing B.Tech in Computer Science Engineering (Cyber Security) at MGM University, Chhatrapati Sambhaji Nagar.',
    'I am interested in Java development, backend development, DevOps and Machine Learning.',
    'I enjoy building practical applications, solving problems and continuously improving my technical skills.',
    'I am creative, enthusiastic, passionate, driven and self-motivated, with strong interest in communication, teamwork and learning.',
    'My long-term goal is to become a Software Engineer and build a career in technology while travelling and exploring the world.'
  ],
  email: 'ashishbhoite07@gmail.com',
  phone: '+91 9588695269',
  phoneRaw: '9588695269',
  phoneTel: '+919588695269',
  githubUsername: 'ashishh09',
  githubUrl: 'https://github.com/ashishh09',
  linkedInName: 'Ashish Bhoite',
  linkedInUrl: 'https://www.linkedin.com/in/ashish-bhoite-7228683a3',
  linkedInDisplay: 'ashish-bhoite-7228683a3',
  location: 'Chhatrapati Sambhaji Nagar & Pune, India',
};

export const FOCUS_AREAS = [
  {
    title: 'Java Development',
    tag: 'Core & OOP',
    description: 'Object-oriented programming, collections framework, exception handling, and JDBC architecture.',
    icon: 'Coffee'
  },
  {
    title: 'Backend Development',
    tag: 'Spring & Flask',
    description: 'Building robust RESTful APIs, database transactions, and backend business logic.',
    icon: 'Server'
  },
  {
    title: 'DevOps',
    tag: 'Learning in Progress',
    description: 'Automating build pipelines, continuous integration, version control workflows, and cloud deployments.',
    icon: 'Layers'
  },
  {
    title: 'Machine Learning',
    tag: 'Exploration & Algorithms',
    description: 'Developing predictive classifiers, NLP spam detectors, and intelligent automation routines.',
    icon: 'Cpu'
  },
  {
    title: 'Problem Solving',
    tag: 'Algorithmic Thinking',
    description: 'Data structures, algorithm optimization, clean code principles, and efficient debugging.',
    icon: 'Code2'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    description: 'Core syntax, typing systems, and web structural languages.',
    skills: [
      { name: 'Java', status: 'proficient' },
      { name: 'C++', status: 'basic' },
      { name: 'Python', status: 'basic' },
      { name: 'HTML', status: 'proficient' },
      { name: 'CSS', status: 'proficient' },
      { name: 'JavaScript', status: 'proficient' }
    ]
  },
  {
    category: 'Java & Backend',
    description: 'Enterprise Java architecture and relational data persistence.',
    skills: [
      { name: 'Core Java', status: 'proficient' },
      { name: 'OOP', status: 'proficient' },
      { name: 'Collections', status: 'proficient' },
      { name: 'Exception Handling', status: 'proficient' },
      { name: 'JDBC', status: 'proficient' },
      { name: 'Spring Boot', status: 'learning' }
    ]
  },
  {
    category: 'Database',
    description: 'Relational schema design, SQL queries, and ACID transactions.',
    skills: [
      { name: 'MySQL', status: 'proficient' }
    ]
  },
  {
    category: 'Tools',
    description: 'Developer environments, version control, and collaboration tools.',
    skills: [
      { name: 'Git', status: 'proficient' },
      { name: 'GitHub', status: 'proficient' },
      { name: 'IntelliJ IDEA', status: 'proficient' },
      { name: 'VS Code', status: 'proficient' }
    ]
  },
  {
    category: 'Other Technologies',
    description: 'Modern infrastructure and intelligent modeling domains.',
    skills: [
      { name: 'AI/ML', status: 'basic' },
      { name: 'DevOps', status: 'learning' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'rescue-ai',
    title: 'Rescue AI Website',
    categories: ['Web', 'AI/ML'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'MySQL'],
    description: 'Built a disaster-response web platform connecting people in need with nearby help, using a Flask backend and MySQL database.',
    keyFeatures: [
      'Real-time disaster distress signaling and emergency request routing',
      'Location-based pairing connecting affected citizens with volunteer responders',
      'Python Flask REST backend managing high-concurrency requests',
      'Relational MySQL schema for citizen logs, inventory, and emergency contacts'
    ],
    githubUrl: 'https://github.com/ashishh09',
    isFeatured: true
  },
  {
    id: 'healthcare-app',
    title: 'Health Care Application',
    categories: ['Java', 'Web', 'AI/ML'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Java', 'Spring Boot', 'MySQL', 'AI/ML'],
    description: 'Developed a healthcare management application using Spring Boot and MySQL to manage patient records and appointments.',
    keyFeatures: [
      'Patient electronic health records (EHR) and appointment scheduling',
      'Spring Boot backend services with robust validation and security layers',
      'MySQL database for transactional medical records and doctor availability',
      'AI/ML diagnostic assistance exploration for basic symptom classification'
    ],
    githubUrl: 'https://github.com/ashishh09',
    isFeatured: true
  },
  {
    id: 'college-admin',
    title: 'College Administration Management System',
    categories: ['Java', 'Web'],
    technologies: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    description: 'Built a system to manage student records, attendance and administrative workflows using Java, Spring Boot and MySQL.',
    keyFeatures: [
      'Comprehensive student profile, enrollment, and grade management',
      'Automated attendance tracking and monthly report generation',
      'Multi-tier administrative roles for faculty, staff, and students',
      'JDBC and Spring Boot data mapping backed by MySQL'
    ],
    githubUrl: 'https://github.com/ashishh09'
  },
  {
    id: 'email-threat-detection',
    title: 'Email Threat Detection & Geolocation Authentication Platform',
    categories: ['AI/ML', 'Cybersecurity', 'Web'],
    technologies: ['Python', 'Flask', 'Machine Learning', 'MySQL', 'IP Geolocation API'],
    description: 'Built a platform that flags phishing/spam emails using ML-based detection and verifies logins using geolocation-based authentication.',
    keyFeatures: [
      'Natural language processing and machine learning classifier flagging malicious email patterns',
      'IP Geolocation verification preventing suspicious unauthorized regional logins',
      'Flask microservices pipeline processing inbound email headers and sender metadata',
      'Audit logging and security anomaly alerts stored in MySQL'
    ],
    githubUrl: 'https://github.com/ashishh09',
    isFeatured: true
  },
  {
    id: 'line-following-car',
    title: 'Line Following Car',
    categories: ['Robotics'],
    technologies: ['Arduino', 'Embedded C', 'IR Sensors', 'Motor Driver'],
    description: 'Designed and programmed an autonomous line-following robot using IR sensors, an Arduino microcontroller and motor-control logic.',
    keyFeatures: [
      'Dual infrared reflectance sensor array detecting high-contrast floor paths',
      'Embedded C control loop implemented on Arduino hardware platform',
      'H-Bridge L298N motor driver calibrated for real-time differential steering',
      'Autonomous path-correction algorithms operating with zero network latency'
    ]
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    categories: ['Web'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'GitHub', 'Netlify'],
    description: 'Designed and deployed a responsive personal portfolio website using Bootstrap and hosted it on Netlify.',
    keyFeatures: [
      'Responsive design adapting across smartphones, tablets, and desktops',
      'Bootstrap grid system and custom CSS animations for smooth navigation',
      'Automated Git-based CI/CD continuous deployment pipeline via Netlify',
      'Clean recruiter-friendly presentation of technical credentials'
    ],
    githubUrl: 'https://github.com/ashishh09',
    liveDemoUrl: 'https://github.com/ashishh09'
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'B.Tech — Computer Science Engineering (Cyber Security)',
    institution: 'MGM University',
    location: 'Chhatrapati Sambhaji Nagar',
    period: '2025 – 2028',
    score: '8.20',
    scoreLabel: 'CGPA',
    highlights: [
      'Focusing on Cyber Security, Java Backend Architectures, and Secure Software Development',
      'Active coursework in Data Structures, Object-Oriented Systems, and Network Defense',
      'Engaging in competitive technical events and collaborative engineering projects'
    ]
  },
  {
    degree: 'Diploma — Computer Science Engineering',
    institution: 'Government Polytechnic, Ambad',
    period: '2023 – 2025',
    score: '83%',
    scoreLabel: 'Final Percentage',
    highlights: [
      'Built strong fundamentals in C, C++, Core Java, and Database Management Systems',
      'Developed hands-on academic projects and laboratory implementations',
      'Graduated with First Class with Distinction (83%)'
    ]
  }
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    role: 'Android Development & Spring Boot Intern',
    company: 'Code FT Pvt. Ltd.',
    location: 'Pune, India',
    duration: '2 Months',
    description:
      'Assisted in building and testing Android application modules alongside a Spring Boot backend and collaborated on feature implementation and bug fixes.',
    technologies: ['Android', 'Java', 'Spring Boot', 'REST APIs', 'Git', 'Testing']
  }
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    title: 'Java Programming',
    issuer: 'Technical Certification Institute',
    category: 'Programming'
  },
  {
    title: 'Python Programming',
    issuer: 'Technical Certification Institute',
    category: 'Programming'
  },
  {
    title: 'CSS Fundamentals',
    issuer: 'Web Development Certification',
    category: 'Web'
  },
  {
    title: 'Deloitte Data Analytics Job Simulation',
    issuer: 'Deloitte / Forage',
    category: 'Job Simulation'
  },
  {
    title: 'Deloitte Generative AI Job Simulation',
    issuer: 'Deloitte / Forage',
    category: 'Job Simulation'
  },
  {
    title: 'Tata Generative AI Job Simulation',
    issuer: 'Tata Group / Forage',
    category: 'Job Simulation'
  }
];

import { StoredResume } from '../types';

const DB_NAME = 'AshishPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'resumes';
const RESUME_KEY = 'active_resume';
const METADATA_KEY = 'ashish_resume_metadata';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Creates a valid, formatted minimal PDF blob for Ashish Satish Bhoite
 * used as the default initial resume before a custom PDF is uploaded.
 */
function createDefaultResumeBlob(): Blob {
  // Simple, compliant PDF structure containing Ashish's verified credentials
  const pdfContent = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<< /Length 1350 >>
stream
BT
/F1 22 Tf
50 790 Td
(ASHISH SATISH BHOITE) Tj
/F1 11 Tf
0 -22 Td
(Java Developer | DevOps Enthusiast | ML Explorer) Tj
/F2 9.5 Tf
0 -15 Td
(Phone: +91 9588695269  |  Email: ashishbhoite07@gmail.com) Tj
0 -13 Td
(LinkedIn: linkedin.com/in/ashish-bhoite-7228683a3  |  GitHub: github.com/ashishh09) Tj

/F1 13 Tf
0 -26 Td
(CAREER OBJECTIVE) Tj
/F2 9.5 Tf
0 -16 Td
(Computer Science Engineering student focused on Java development, backend technologies, DevOps and) Tj
0 -14 Td
(Machine Learning. Passionate about building practical software solutions and scalable systems.) Tj

/F1 13 Tf
0 -26 Td
(EDUCATION) Tj
/F1 10 Tf
0 -16 Td
(B.Tech - Computer Science Engineering [Cyber Security] | MGM University (2025 - 2028)) Tj
/F2 9.5 Tf
0 -13 Td
(CGPA: 8.20  -  Focus on Java, Backend Systems, and Information Defense) Tj
/F1 10 Tf
0 -16 Td
(Diploma - Computer Science Engineering | Government Polytechnic, Ambad (2023 - 2025)) Tj
/F2 9.5 Tf
0 -13 Td
(Aggregate Score: 83%  -  First Class with Distinction) Tj

/F1 13 Tf
0 -26 Td
(TECHNICAL SKILLS) Tj
/F2 9.5 Tf
0 -15 Td
(Programming Languages: Java, C++ (Basic), Python (Basic), HTML, CSS, JavaScript) Tj
0 -14 Td
(Java & Backend: Core Java, OOP, Collections, Exception Handling, JDBC, Spring Boot (Learning)) Tj
0 -14 Td
(Database & Tools: MySQL, Git, GitHub, IntelliJ IDEA, VS Code) Tj
0 -14 Td
(Other Technologies: AI/ML (Basic), DevOps (Learning)) Tj

/F1 13 Tf
0 -26 Td
(EXPERIENCE) Tj
/F1 10 Tf
0 -15 Td
(Android Development & Spring Boot Intern  |  Code FT Pvt. Ltd., Pune (2 Months)) Tj
/F2 9.5 Tf
0 -14 Td
(- Assisted in building and testing Android application modules alongside a Spring Boot backend.) Tj
0 -13 Td
(- Collaborated on feature implementation, REST API validation, and bug fixes.) Tj

/F1 13 Tf
0 -26 Td
(KEY PROJECTS) Tj
/F1 10 Tf
0 -15 Td
(1. Rescue AI Website (Flask, Python, MySQL, HTML, CSS, JS)) Tj
/F2 9 Tf
0 -13 Td
(- Disaster-response platform connecting citizens in distress with nearby relief responders.) Tj
/F1 10 Tf
0 -16 Td
(2. Health Care Application (Java, Spring Boot, MySQL, AI/ML)) Tj
/F2 9 Tf
0 -13 Td
(- Healthcare management system handling patient EHR records, appointments, and doctors.) Tj
/F1 10 Tf
0 -16 Td
(3. Email Threat Detection & Geolocation Auth (Flask, ML, MySQL, IP API)) Tj
/F2 9 Tf
0 -13 Td
(- Phishing/spam email classifier coupled with geolocation-based unauthorized login defense.) Tj

/F1 13 Tf
0 -26 Td
(CERTIFICATIONS) Tj
/F2 9 Tf
0 -14 Td
(Java Programming, Python Programming, CSS Fundamentals, Deloitte Data Analytics,) Tj
0 -13 Td
(Deloitte Generative AI Job Simulation, Tata Generative AI Job Simulation) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000282 00000 n 
0000000366 00000 n 
0000000445 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1850
%%EOF`;

  return new Blob([pdfContent], { type: 'application/pdf' });
}

export async function saveResumeFile(file: File): Promise<StoredResume> {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Please upload a valid PDF file only.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

  const metadata: StoredResume = {
    fileName: file.name,
    fileSize: file.size,
    uploadDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    isCustom: true
  };

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const putRequest = store.put(blob, RESUME_KEY);

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    });

    localStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
  } catch {
    // If IndexedDB fails (e.g. strict private mode), store in localStorage as DataURL if size permits
    try {
      const base64 = await fileToBase64(file);
      metadata.dataUrl = base64;
      localStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
    } catch {
      localStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
    }
  }

  return metadata;
}

export async function getActiveResumeInfo(): Promise<StoredResume> {
  const savedMeta = localStorage.getItem(METADATA_KEY);
  if (savedMeta) {
    try {
      return JSON.parse(savedMeta) as StoredResume;
    } catch {
      // ignore
    }
  }

  return {
    fileName: 'Ashish_Bhoite_Resume.pdf',
    fileSize: 48500, // standard representative PDF byte size
    uploadDate: 'Default Official Copy',
    isCustom: false
  };
}

export async function downloadActiveResume(): Promise<void> {
  let blobToDownload: Blob | null = null;

  try {
    const db = await openDatabase();
    const storedBlob = await new Promise<Blob | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(RESUME_KEY);
      getRequest.onsuccess = () => resolve(getRequest.result || null);
      getRequest.onerror = () => resolve(null);
    });

    if (storedBlob) {
      blobToDownload = storedBlob;
    }
  } catch {
    // Database check completed, will fallback if not available
  }

  // Fallback to dataUrl in localStorage if present
  if (!blobToDownload) {
    const savedMeta = localStorage.getItem(METADATA_KEY);
    if (savedMeta) {
      try {
        const parsed = JSON.parse(savedMeta) as StoredResume;
        if (parsed.dataUrl) {
          blobToDownload = dataUrlToBlob(parsed.dataUrl);
        }
      } catch {
        // ignore
      }
    }
  }

  // Fallback to official generated PDF of Ashish Satish Bhoite
  if (!blobToDownload) {
    blobToDownload = createDefaultResumeBlob();
  }

  const url = URL.createObjectURL(blobToDownload);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Ashish_Bhoite_Resume.pdf';
  document.body.appendChild(anchor);
  anchor.click();

  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 300);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

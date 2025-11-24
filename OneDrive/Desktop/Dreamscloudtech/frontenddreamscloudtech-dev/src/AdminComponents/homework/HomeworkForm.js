import React, { useState, useRef, useEffect } from 'react';
import axios from '../../store/axios';
import { Book, CheckCircle, AlertCircle, Image as ImageIcon, Video, FileText } from 'lucide-react';

// --- HELPER HOOK for RESPONSIVENESS ---
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// --- HELPER COMPONENT for FILE INPUTS ---
const FileInput = ({ icon, label, file, setFile }) => {
  const inputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isUploaded = file !== null;

  const fileInputStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1.5rem 1rem',
    border: '2px dashed #cbd5e1',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#64748b',
    transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
    textAlign: 'center',
    ...(isHovered && !isUploaded && { borderColor: '#4fb1f6', color: '#4fb1f6' }),
    ...(isUploaded && { borderColor: '#22c55e', backgroundColor: '#f0fdf4', color: '#22c55e' }),
  };

  const fileNameStyle = {
    fontSize: '0.75rem',
    color: '#475569',
    wordBreak: 'break-all',
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept={label === 'Image' ? 'image/*' : (label === 'Video' ? 'video/*' : '.pdf')}
      />
      <div style={fileInputStyle}>
        {isUploaded ? <CheckCircle size={32} /> : icon}
        <span style={{ fontWeight: 500 }}>{isUploaded ? 'Uploaded!' : `Upload ${label}`}</span>
        {file && <span style={fileNameStyle}>{file.name}</span>}
      </div>
    </div>
  );
};

// --- MAIN FORM COMPONENT ---
const CreateHomeworkForm = () => {
  const { width } = useWindowSize();
  const isMobile = width < 600;

  const [classID, setClassID] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [focus, setFocus] = useState({});
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const resetForm = () => {
    setClassID('');
    setSubject('');
    setTitle('');
    setDescription('');
    setVideo('');
    setImageFile(null);
    setPdfFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classID) {
      setError('Class ID is required.');
      return;
    }
    setError('');
    setSubmitting(true);

    const formData = new FormData();
    formData.append('classID', classID);
    formData.append('subject', subject);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);
    if (imageFile) formData.append('image', imageFile);
    if (pdfFile) formData.append('pdf', pdfFile);

    try {
      await axios.post('homeworks/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Homework created successfully!');
      resetForm();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setError('Failed to create homework. Please check the fields and try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    page: {
      backgroundColor: '#f4f7fe',
      minHeight: '100vh',
      fontFamily: '"Inter", sans-serif',
      padding: isMobile ? '1rem' : '2rem',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    formContainer: {
      backgroundColor: 'white',
      maxWidth: '700px',
      width: '100%',
      borderRadius: '16px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      marginTop: isMobile ? '0' : '2rem',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: isMobile ? '1rem 1.5rem' : '1.5rem 2rem',
      backgroundColor: '#4fb1f6',
      color: 'white',
    },
    headerTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: '600',
    },
    form: {
      padding: isMobile ? '1.5rem' : '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontWeight: '600',
      color: '#334155',
    },
    input: {
      padding: '0.75rem 1rem',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    textarea: {
      padding: '0.75rem 1rem',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    fileInputGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
    },
    submitButton: {
      padding: '1rem',
      marginTop: '1rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#4fb1f6',
      color: 'white',
      fontSize: isMobile ? '1rem' : '1.125rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    successMessage: {
      display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'center', color: '#059669', fontWeight: '500', padding: '1rem', backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0', borderRadius: '8px', marginBottom: '1rem',
    },
    errorMessage: {
      display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#DC2626', backgroundColor: '#FEE2E2', border: '1px solid #FECACA', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center',
    },
  };

  const focusStyle = {
    borderColor: '#4fb1f6',
    boxShadow: '0 0 0 3px rgba(79, 177, 246, 0.3)',
    outline: 'none',
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <header style={styles.header}>
          <Book size={isMobile ? 28 : 32} />
          <h1 style={styles.headerTitle}>Create Homework</h1>
        </header>

        <form onSubmit={handleSubmit} style={styles.form}>
          {successMessage && (
            <div style={styles.successMessage}><CheckCircle size={20} />{successMessage}</div>
          )}
          {error && (
            <div style={styles.errorMessage}><AlertCircle size={20} />{error}</div>
          )}

          <div style={styles.inputGroup}>
            <label htmlFor="classID" style={styles.label}>Class ID</label>
            <input type="text" id="classID" value={classID} onChange={(e) => setClassID(e.target.value)} placeholder="e.g., 10A or 12B" style={{ ...styles.input, ...(focus.classID && focusStyle) }} onFocus={() => setFocus({ classID: true })} onBlur={() => setFocus({})} required />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="subject" style={styles.label}>Subject</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Mathematics" style={{ ...styles.input, ...(focus.subject && focusStyle) }} onFocus={() => setFocus({ subject: true })} onBlur={() => setFocus({})} required />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Chapter 5: Algebra" style={{ ...styles.input, ...(focus.title && focusStyle) }} onFocus={() => setFocus({ title: true })} onBlur={() => setFocus({})} required />
          </div>
          
          <div style={styles.inputGroup}>
            <label htmlFor="video" style={styles.label}>Video URL (Optional)</label>
            <input type="text" id="video" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="e.g., https://youtube.com/watch?v=..." style={{ ...styles.input, ...(focus.video && focusStyle) }} onFocus={() => setFocus({ video: true })} onBlur={() => setFocus({})} />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide instructions, questions, and details..." style={{ ...styles.textarea, ...(focus.description && focusStyle) }} onFocus={() => setFocus({ description: true })} onBlur={() => setFocus({})} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Attach Files (Optional)</label>
            <div style={styles.fileInputGrid}>
              <FileInput icon={<ImageIcon size={32} />} label="Image" file={imageFile} setFile={setImageFile} />
              <FileInput icon={<FileText size={32} />} label="PDF" file={pdfFile} setFile={setPdfFile} />
            </div>
          </div>

          <button type="submit" disabled={submitting} style={{ ...styles.submitButton, ...(isSubmitHovered && { backgroundColor: '#2563eb' }) }} onMouseEnter={() => setIsSubmitHovered(true)} onMouseLeave={() => setIsSubmitHovered(false)} >
            {submitting ? 'Submitting...' : 'Create Homework'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHomeworkForm;
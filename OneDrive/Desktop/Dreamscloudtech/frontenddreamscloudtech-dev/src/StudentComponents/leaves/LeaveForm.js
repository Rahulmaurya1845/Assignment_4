import React, { useState, useEffect } from 'react';
import axios from "../../store/axios";
import { useSelector } from 'react-redux';
import { selectUser } from 'src/store/slices/userSlice';
// import { selectUser } from "src/store/slices/userSlice";
// --- ICONS (as simple SVG components) ---
// Only keeping the UploadIcon as it's used for the custom button
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
  </svg>
);


// --- STYLES OBJECT (Updated with more blue and no icons) ---
const styles = {
  pageWrapper: {
    background: 'linear-gradient(170deg, #F3F4F6 0%, #E5E7EB 100%)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: '"Inter", Arial, sans-serif',
    transition: 'padding 0.3s ease',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '16px',
    maxWidth: '700px',
    margin: '0 auto',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)',
    border: '1px solid #E5E7EB',
    borderTop: '4px solid #4fb1f6', 
    transition: 'padding 0.3s ease',
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#4fb1f6', 
    marginBottom: '2.5rem',
    textAlign: 'center',
    transition: 'font-size 0.3s ease',
  },
  formGroup: {
    marginBottom: '1.5rem',
    position: 'relative',
  },
  formLabel: {
    display: 'block',
    color: '#4B5563',
    fontWeight: '600',
    marginBottom: '0.6rem',
    fontSize: '0.875rem',
  },
  formInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.875rem 1rem', // Reverted padding as icons are removed
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1F2937',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#F9FAFB',
  },
  inputFocus: {
    borderColor: '#2563EB',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)',
    backgroundColor: 'white',
  },
  formTextarea: {
    minHeight: '120px',
    resize: 'vertical',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2.5rem',
    transition: 'flex-direction 0.3s ease',
  },
  formButton: {
    color: 'white',
    fontWeight: '600',
    padding: '0.8rem 1.75rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  formButtonSubmit: {
    background: '#4fb1f6',
    boxShadow: '0 4px 15px -1px rgba(37, 99, 235, 0.3)',
  },
  formButtonCancel: {
    backgroundColor: '#6B7280',
  },
  submitHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 7px 20px -1px rgba(37, 99, 235, 0.4)',
  },
  cancelHover: {
    backgroundColor: '#4B5563',
    transform: 'translateY(-2px)',
  },
  // Custom File Input Styles
  fileInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow wrapping on small screens
    gap: '1rem',
  },
  fileInputHidden: {
    display: 'none',
  },
  fileInputLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.25rem',
    backgroundColor: '#F9FAFB',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#374151',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  fileInputLabelHover: {
    borderColor: '#2563EB',
    color: '#2563EB',
    backgroundColor: 'white',
  },
  fileNameText: {
    color: '#6B7280',
    fontSize: '0.875rem',
    flexShrink: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  successMessage: {
    textAlign: 'center',
    color: '#059669',
    fontWeight: '500',
    padding: '1rem',
    backgroundColor: '#D1FAE5',
    border: '1px solid #A7F3D0',
    borderRadius: '8px',
  },
  errorMessage: {
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
    border: '1px solid #FECACA',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  // --- MOBILE-SPECIFIC STYLES ---
  mobilePageWrapper: {
    padding: '1rem',
  },
  mobileFormContainer: {
    padding: '1.5rem',
  },
  mobileFormTitle: {
    fontSize: '1.5rem',
  },
  mobileFormActions: {
    flexDirection: 'column',
    gap: '0.75rem',
  },
  mobileFormButton: {
    width: '100%',
  }
};


function LeaveForm() {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    userID:user.userID,
    type:'student',
    date: '',
    duration: '',
    reason: '',
  });
  // console.log("the user is ",user)
  const [documentFile, setDocumentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hoverState, setHoverState] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // State to track if the view is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to handle window resizing for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const submissionData = new FormData();
    submissionData.append('userID', formData.userID)
    submissionData.append('date', formData.date);
    submissionData.append('duration', formData.duration);
    submissionData.append('reason', formData.reason);
    if (documentFile) {
      submissionData.append('document', documentFile);
    }
    try {
      const response = await axios.post(
        '/leave-applications/',
        submissionData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {

        setIsSubmitted(true);
        setFormData({ date: '', duration: '', reason: '' });
        setDocumentFile(null);
        setTimeout(() => setIsSubmitted(false), 2000);
      }else{
        setError("error in submiting the form ")
        setIsSubmitted(false)
        setFormData({ date: '', duration: '', reason: '' });
        setDocumentFile(null);
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ ...styles.pageWrapper, ...(isMobile && styles.mobilePageWrapper) }}>
      <div style={{ ...styles.formContainer, ...(isMobile && styles.mobileFormContainer) }}>
        <h2 style={{ ...styles.formTitle, ...(isMobile && styles.mobileFormTitle) }}>Apply for Leave</h2>
        {isSubmitted ? (
          <div style={styles.successMessage}>
            Your leave request has been submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div style={styles.errorMessage}>{error}</div>}

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="date">Leave Date</label>
              <input
                style={{ ...styles.formInput, ...(focusedField === 'date' && styles.inputFocus) }}
                type="date" id="date" name="date" value={formData.date} onChange={handleChange}
                onFocus={() => setFocusedField('date')} onBlur={() => setFocusedField(null)} required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="duration">Duration (days)</label>
              <input
                style={{ ...styles.formInput, ...(focusedField === 'duration' && styles.inputFocus) }}
                type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange}
                onFocus={() => setFocusedField('duration')} onBlur={() => setFocusedField(null)} required min="1" placeholder="e.g., 5"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="reason">Reason for Leave</label>
              <textarea
                style={{ ...styles.formInput, ...styles.formTextarea, ...(focusedField === 'reason' && styles.inputFocus) }}
                id="reason" name="reason" value={formData.reason} onChange={handleChange}
                onFocus={() => setFocusedField('reason')} onBlur={() => setFocusedField(null)} required placeholder="Please provide a brief reason..."
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="document">Supporting Document</label>
              <div style={styles.fileInputWrapper}>
                <input
                  style={styles.fileInputHidden}
                  type="file" id="document" name="document" onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="document"
                  style={{ ...styles.fileInputLabel, ...(hoverState.file && styles.fileInputLabelHover) }}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, file: true }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, file: false }))}
                >
                  <UploadIcon />
                  Choose File
                </label>
                <span style={styles.fileNameText}>
                  {documentFile ? documentFile.name : 'No file selected'}
                </span>
              </div>
            </div>

            <div style={{ ...styles.formActions, ...(isMobile && styles.mobileFormActions) }}>
              {/* <button
                type="button"
                style={{ ...styles.formButton, ...styles.formButtonCancel, ...(hoverState.cancel && styles.cancelHover), ...(isMobile && styles.mobileFormButton) }}
                onMouseEnter={() => setHoverState(prev => ({ ...prev, cancel: true }))}
                onMouseLeave={() => setHoverState(prev => ({ ...prev, cancel: false }))}
              >
                Cancel
              </button> */}
              <button
                type="submit"
                style={{ ...styles.formButton, ...styles.formButtonSubmit, ...(hoverState.submit && styles.submitHover), ...(isMobile && styles.mobileFormButton) }}
                onMouseEnter={() => setHoverState(prev => ({ ...prev, submit: true }))}
                onMouseLeave={() => setHoverState(prev => ({ ...prev, submit: false }))}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LeaveForm;

import React, { useState, useEffect } from 'react';
import axios from '../../store/axios';
import styles from './TeacherRequestForm.module.css'; // Ensure it's a module

const TeacherRequestForm = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/requests');
                setRequests(response.data);
            } catch (error) {
                console.log('Error fetching requests', error);
            }
        };
        fetchRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/requests', {
                startDate,
                endDate,
                reason,
                status: 'Pending',
            });
            setMessage('Request sent successfully!');
            const response = await axios.get('/requests');
            setRequests(response.data);
        } catch (error) {
            setMessage('Error sending request.');
        }
    };

    return (
        <div className={styles.teacherRequestFormContainer}>
            <h2 className={styles.formHeader}>Submit a Leave Request</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Reason:</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className={styles.textarea}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Send Request</button>
            </form>

            {message && <p className={styles.message}>{message}</p>}

            <h3 className={styles.subHeader}>Your Leave Requests</h3>
            <ul className={styles.requestList}>
                {requests.slice().reverse().map((req) => (
                    <li key={req.id} className={styles.requestItem}>
                        <div className={styles.requestDetails}>
                            <p><strong>From:</strong> {req.startDate} <strong>To:</strong> {req.endDate}</p>
                            <p><strong>Status:</strong> <span className={styles[req.status.toLowerCase()]}>{req.status}</span></p>
                            {req.status === 'Rejected' && (
                                <p><strong>Rejection Reason:</strong> {req.rejectReason}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherRequestForm;

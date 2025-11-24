import React, { useEffect, useState } from 'react';
import axios from '../../store/axios';
import styles from './AdminApprovalPanel.module.css'; // Ensure it's a module

const AdminApprovalPanel = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get('/requests');
            setRequests(response.data);
        };
        fetchRequests();
    }, []);

    const handleApprove = async (id) => {
        await axios.patch(`/requests/${id}`, { status: 'Approved' });
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
    };

    const handleReject = async (id, rejectReason) => {
        await axios.patch(`/requests/${id}`, { status: 'Rejected', rejectReason });
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected', rejectReason } : req));
    };

    return (
        <div className={styles.adminApprovalPanelContainer}>
            <h2 className={styles.panelHeader}>Manage Leave Requests</h2>
            <ul className={styles.requestList}>
                {requests.slice().reverse().map((req) => (
                    <li key={req.id} className={`${styles.requestItem} ${styles[req.status.toLowerCase()]}`}>
                        <div className={styles.requestDetails}>
                            <p><strong>Teacher:</strong> {req.teacherName}</p>
                            <p><strong>Date:</strong> {req.startDate} to {req.endDate}</p>
                            <p><strong>Reason:</strong> {req.reason}</p>
                            <p><strong>Status:</strong> <span className={styles.statusLabel}>{req.status}</span></p>
                        </div>
                        {req.status === 'Pending' ? (
                            <div className={styles.requestActions}>
                                <button onClick={() => handleApprove(req.id)} className={styles.approveButton}>Approve</button>
                                <button onClick={() => handleReject(req.id, prompt('Enter rejection reason'))} className={styles.rejectButton}>Reject</button>
                            </div>
                        ) : (
                            req.status === 'Rejected' && <p><strong>Rejection Reason:</strong> {req.rejectReason}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminApprovalPanel;

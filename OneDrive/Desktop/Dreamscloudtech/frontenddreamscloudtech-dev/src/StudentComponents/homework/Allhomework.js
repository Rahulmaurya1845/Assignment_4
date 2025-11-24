import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../store/axios'; // Make sure this path is correct
import { BookOpen, PlusCircle, Edit, Trash2, Loader, AlertCircle, ChevronLeft, ChevronRight, X, AlertTriangle } from 'lucide-react';

// A reusable confirmation modal component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const styles = {
        backdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
        modal: { backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
        header: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#be123c' },
        title: { fontSize: '1.25rem', fontWeight: '700' },
        body: { margin: '1.5rem 0', color: '#475569', lineHeight: '1.6' },
        footer: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' },
        button: { padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'transform 0.1s' },
        cancelButton: { backgroundColor: '#e2e8f0', color: '#334155' },
        deleteButton: { backgroundColor: '#be123c', color: 'white' },
    };

    return (
        <div style={styles.backdrop} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <AlertTriangle size={24} />
                    <h2 style={styles.title}>Confirm Deletion</h2>
                </div>
                <p style={styles.body}>Are you sure you want to delete this homework? This action cannot be undone.</p>
                <div style={styles.footer}>
                    <button style={{...styles.button, ...styles.cancelButton}} onClick={onClose}>Cancel</button>
                    <button style={{ ...styles.button, ...styles.deleteButton }} onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
function AllHomework() {
    const [homeworks, setHomeworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [homeworkToDelete, setHomeworkToDelete] = useState(null);

    useEffect(() => {
        const fetchHomeworks = async () => {
            try {
                setLoading(true);
                const response = await axios.get('homeworks/');
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setHomeworks(sortedData);
                setError(null);
            } catch (err) {
                setError('Failed to load homework. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeworks();
    }, []);

    const confirmDelete = async () => {
        if (homeworkToDelete) {
            try {
                await axios.delete(`homeworks/delete/${homeworkToDelete}`);
                setHomeworks(prevHomeworks => prevHomeworks.filter(hw => hw._id !== homeworkToDelete));
            } catch (err) {
                alert('Failed to delete homework.');
                console.error(err);
            } finally {
                setIsModalOpen(false);
                setHomeworkToDelete(null);
            }
        }
    };

    const handleDeleteClick = (id) => {
        setHomeworkToDelete(id);
        setIsModalOpen(true);
    };

    const { paginatedData, totalPages, startItem, endItem } = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const data = homeworks.slice(startIndex, endIndex);
        return {
            paginatedData: data,
            totalPages: Math.ceil(homeworks.length / rowsPerPage),
            startItem: homeworks.length > 0 ? startIndex + 1 : 0,
            endItem: Math.min(endIndex, homeworks.length)
        };
    }, [homeworks, currentPage, rowsPerPage]);

    const styles = {
        page: { backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: '"Inter", sans-serif', padding: '2rem' },
        container: { maxWidth: '1200px', margin: '0 auto' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
        headerTitleGroup: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#1f2937' },
        headerTitle: { fontSize: '2.25rem', fontWeight: 'bold' },
        createButton: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#4fb1f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', transition: 'background-color 0.2s' },
        tableContainer: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' },
        tableWrapper: { overflowX: 'auto' },
        table: { width: '100%', borderCollapse: 'collapse' },
        tableHead: { backgroundColor: '#4fb1f6' },
        tableTh: { padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid #6ac2f8' },
        tableRowOdd: { backgroundColor: 'white' },
        tableRowEven: { backgroundColor: '#eef2f9' }, 
        tableTd: {
            padding: '1rem 1.5rem', fontSize: '0.95rem', color: '#334155', borderTop: '1px solid #e2e8f0',
            borderRight: '1px solid #e2e8f0',
        },
        actionsCell: { display: 'flex', gap: '1.25rem' },
        iconButton: { cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s' },
        message: { textAlign: 'center', padding: '4rem', color: '#64748b', fontSize: '1.125rem' },
        paginationContainer: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 1.5rem', color: '#475569', fontSize: '0.875rem', gap: '1.5rem', borderTop: '1px solid #e2e8f0' },
        paginationSelect: { padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white' },
        paginationControls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <div style={styles.headerTitleGroup}>
                        <BookOpen size={40} color="#4fb1f6" />
                        <h1 style={styles.headerTitle}>All Homework</h1>
                    </div>
                </header>

                <main>
                    {loading ? (
                        <div style={styles.message}><Loader style={{ animation: 'spin 1s linear infinite' }} /></div>
                    ) : error ? (
                        <div style={styles.message}><AlertCircle color="#ef4444" /> {error}</div>
                    ) : (
                        <div style={styles.tableContainer}>
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead style={styles.tableHead}>
                                        <tr>
                                            <th style={styles.tableTh}>Subject</th>
                                            <th style={styles.tableTh}>Title</th>
                                            <th style={styles.tableTh}>Class</th>
                                            <th style={styles.tableTh}>Assigned Date</th>
                                            <th style={{...styles.tableTh, borderRight: 'none'}}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((hw, index) => (
                                                <tr key={hw._id} style={index % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven}>
                                                    <td style={{ ...styles.tableTd, fontWeight: '600' }}>{hw.subject}</td>
                                                    <td style={styles.tableTd}>{hw.title}</td>
                                                    <td style={styles.tableTd}>{hw.classID}</td>
                                                    <td style={styles.tableTd}>{new Date(hw.createdAt).toLocaleDateString('en-GB')}</td>
                                                    <td style={{...styles.tableTd, borderRight: 'none'}}>
                                                        <div style={styles.actionsCell}>
                                                            <Trash2 size={20} style={styles.iconButton} onClick={() => handleDeleteClick(hw._id)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" style={{...styles.tableTd, textAlign: 'center', padding: '3rem', borderRight: 'none'}}>
                                                    No homework found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* ADDED: Pagination controls JSX */}
                            {homeworks.length > 0 && (
                                <div style={styles.paginationContainer}>
                                    <div style={styles.paginationControls}>
                                        <span>Rows per page:</span>
                                        <select
                                            value={rowsPerPage}
                                            onChange={(e) => {
                                                setRowsPerPage(Number(e.target.value));
                                                setCurrentPage(1);
                                            }}
                                            style={styles.paginationSelect}
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                        </select>
                                    </div>
                                    <span>{startItem}–{endItem} of {homeworks.length}</span>
                                    <div style={styles.paginationControls}>
                                        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} style={{...styles.iconButton, cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}>
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} style={{...styles.iconButton, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'}}>
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
            
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default AllHomework;
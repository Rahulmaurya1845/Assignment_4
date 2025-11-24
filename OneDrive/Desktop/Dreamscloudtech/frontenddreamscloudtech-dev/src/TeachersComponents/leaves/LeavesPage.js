import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CalendarCheck, Clock, ListChecks, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Eye, FileText, Loader2 } from 'lucide-react';
import axios from "../../store/axios"; // Assuming this is your configured axios instance
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- STYLES OBJECT ---
const styles = {
  page: { backgroundColor: '#EEF7FF', minHeight: '100vh', fontFamily: 'sans-serif', padding: '2rem' },
  container: { maxWidth: '1280px', margin: '0 auto' },
  header: { marginBottom: '2rem' },
  headerTitle: { fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' },
  statsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
  statCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', display: 'flex', alignItems: 'center' },
  statCardIconContainer: { backgroundColor: '#dbeafe', padding: '1.25rem', borderRadius: '0.75rem', marginRight: '1.5rem' },
  statCardIcon: { color: '#2563eb' },
  statCardInfo: {},
  statCardTitle: { color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' },
  statCardValue: { fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', lineHeight: '1' },
  tableContainer: { backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', border: '1px solid #e5e7eb', overflowX: 'auto' },
  table: { width: '100%', fontSize: '0.875rem', textAlign: 'left', borderCollapse: 'collapse' },
  tableHead: { fontSize: '0.875rem', color: 'white', backgroundColor: '#4fb1f6' },
  tableTh: { padding: '0.75rem 1.5rem', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid #d1d5db' },
  tableRowOdd: { backgroundColor: 'white' },
  tableRowEven: { backgroundColor: '#EEF7FF' },
  tableTd: { padding: '0.75rem 1.5rem', color: '#4b5563', border: '1px solid #d1d5db' },
  statusBadge: { display: 'inline-flex', alignItems: 'center', fontWeight: '500', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem' },
  paginationContainer: { padding: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#4b5563', borderTop: '1px solid #e5e7eb' },
  paginationControls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  paginationSelect: { backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.25rem 0.5rem' },
  paginationButton: { padding: '0.25rem', borderRadius: '0.375rem', border: 'none', background: 'transparent', cursor: 'pointer' },
  actionsContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  actionIcon: { cursor: 'pointer', color: '#6b7280', transition: 'color 0.2s' },
  actionIconHover: { color: '#2563eb' },
  centeredMessage: { textAlign: 'center', padding: '3rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  loadingIcon: { animation: 'spin 1s linear infinite' },
  modalBackdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 24, 39, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, animation: 'fadeIn 0.3s ease-out forwards', padding: '1rem' },
  modalContent: { backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '550px', boxShadow: '0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)', overflow: 'hidden', animation: 'slideIn 0.3s ease-out forwards', display: 'flex', flexDirection: 'column', maxHeight: '90vh' },
  modalHeader: { backgroundColor: '#dbeafe', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
  modalTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#1e3a8a' },
  modalCloseButton: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#60a5fa', transition: 'color 0.2s' },
  modalCloseButtonHover: { color: '#2563eb' },
  modalBody: { padding: '2rem', overflowY: 'auto' },
  modalDetailRow: { display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' },
  modalLabel: { fontWeight: '600', color: '#374151' },
  modalValue: { color: '#4b5563', wordBreak: 'break-word' },
  modalDocumentLink: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', textDecoration: 'none', fontWeight: '600', transition: 'text-decoration 0.2s' },
  modalDocumentLinkHover: { textDecoration: 'underline' },
  '@keyframes fadeIn': { 'from': { opacity: 0 }, 'to': { opacity: 1 } },
  '@keyframes slideIn': { 'from': { transform: 'translateY(-20px)', opacity: 0 }, 'to': { transform: 'translateY(0)', opacity: 1 } },
  '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
};

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, icon, iconBgColor, iconColor }) => (
    <div style={styles.statCard}>
        <div style={{...styles.statCardIconContainer, backgroundColor: iconBgColor || styles.statCardIconContainer.backgroundColor}}>
            {React.cloneElement(icon, { style: {...styles.statCardIcon, color: iconColor || styles.statCardIcon.color}, size: 32 })}
        </div>
        <div>
            <p style={styles.statCardTitle}>{title}</p>
            <p style={styles.statCardValue}>{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
  const statusStyles = {
    approved: { color: '#166534', backgroundColor: '#dcfce7' },
    pending: { color: '#9a3412', backgroundColor: '#ffedd5' },
    rejected: { color: '#991b1b', backgroundColor: '#fee2e2' },
  };
  return <span style={{ ...styles.statusBadge, ...(statusStyles[status?.toLowerCase()] || {}), textTransform: 'capitalize' }}>{status}</span>;
};

const LeaveDetailModal = ({ leave, onClose }) => {
  const [hoverState, setHoverState] = useState({});
  if (!leave) return null;

  const DetailRow = ({ label, children }) => (
    <div style={styles.modalDetailRow}>
      <span style={styles.modalLabel}>{label}:</span>
      <span style={styles.modalValue}>{children}</span>
    </div>
  );

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Leave Application Details</h2>
          <button onClick={onClose} style={{...styles.modalCloseButton, ...(hoverState.close && styles.modalCloseButtonHover)}} onMouseEnter={() => setHoverState(p => ({...p, close: true}))} onMouseLeave={() => setHoverState(p => ({...p, close: false}))}><XCircle size={28} /></button>
        </div>
        <div style={styles.modalBody}>
          <DetailRow label="Applicant">{leave.userID?.name ? `${leave.userID.name} ${leave.userID.surname || ''}` : leave.userID}</DetailRow>
          <DetailRow label="User ID">{typeof leave.userID === 'object' ? leave.userID._id : leave.userID}</DetailRow>
          <DetailRow label="Leave Date">{new Date(leave.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</DetailRow>
          <DetailRow label="Duration">{leave.duration} days</DetailRow>
          <DetailRow label="Applied On">{new Date(leave.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</DetailRow>
          <DetailRow label="Status"><StatusBadge status={leave.status} /></DetailRow>
          <DetailRow label="Reason">{leave.reason}</DetailRow>
          {leave.documentUrl && (<DetailRow label="Document"><a href={leave.documentUrl} target="_blank" rel="noopener noreferrer" style={{...styles.modalDocumentLink, ...(hoverState.docLink && styles.modalDocumentLinkHover)}} onMouseEnter={() => setHoverState(p => ({...p, docLink: true}))} onMouseLeave={() => setHoverState(p => ({...p, docLink: false}))}><FileText size={16} /> View Document</a></DetailRow>)}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

function AllLeaves() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/leave-applications/');
        let data = Array.isArray(response.data) 
          ? response.data 
          : (Array.isArray(response.data.doc) ? response.data.doc : []);
        
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setApps(data);
      } catch (err) {
        console.error("Failed to fetch leave applications:", err);
        setError("Could not load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const { approvedCount, pendingCount, rejectedCount, totalCount, paginatedData, totalPages } = useMemo(() => {
    const approved = apps.filter(app => app.status?.toLowerCase() === 'approved').length;
    const pending = apps.filter(app => app.status?.toLowerCase() === 'pending').length;
    const rejected = apps.filter(app => app.status?.toLowerCase() === 'rejected').length;
    const total = apps.length;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const data = apps.slice(startIndex, startIndex + rowsPerPage);
    return { approvedCount: approved, pendingCount: pending, rejectedCount: rejected, totalCount: total, paginatedData: data, totalPages: Math.ceil(total / rowsPerPage) };
  }, [apps, currentPage, rowsPerPage]);

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  return (
    <div style={styles.page}>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      <div style={styles.container}>
        <div style={styles.header}><h1 style={styles.headerTitle}>All Leave Applications</h1></div>
        <div style={styles.statsContainer}>
          <StatCard title="Total Applications" value={totalCount} icon={<ListChecks />} />
          <StatCard title="Approved Leaves" value={approvedCount} icon={<CheckCircle2 />} iconBgColor="#dcfce7" iconColor="#22c55e" />
          <StatCard title="Pending Requests" value={pendingCount} icon={<Clock />} iconBgColor="#ffedd5" iconColor="#f97316" />
          <StatCard title="Rejected Leaves" value={rejectedCount} icon={<XCircle />} iconBgColor="#fee2e2" iconColor="#ef4444" />
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableTh}>Applicant</th>
                <th style={styles.tableTh}>Leave Date</th>
                <th style={styles.tableTh}>Duration</th>
                <th style={styles.tableTh}>Status</th>
                <th style={styles.tableTh}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={styles.centeredMessage}><Loader2 size={24} style={styles.loadingIcon} /> Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan="5" style={styles.centeredMessage}>{error}</td></tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((app, index) => (
                  <tr key={app._id} style={index % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven}>
                    <td style={styles.tableTd}>{app.userID?.name ? `${app.userID.name} ${app.userID.surname || ''}` : app.userID}</td>
                    <td style={styles.tableTd}>{new Date(app.date).toLocaleDateString('en-GB')}</td>
                    <td style={styles.tableTd}>{app.duration} days</td>
                    <td style={styles.tableTd}><StatusBadge status={app.status} /></td>
                    <td style={styles.tableTd}>
                      <div style={styles.actionsContainer}>
                        <Eye size={20} style={{ ...styles.actionIcon, ...(hoveredIcon === `view-${app._id}` && styles.actionIconHover) }} onMouseEnter={() => setHoveredIcon(`view-${app._id}`)} onMouseLeave={() => setHoveredIcon(null)} onClick={() => handleViewDetails(app)} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={styles.centeredMessage}>No applications found.</td></tr>
              )}
            </tbody>
          </table>
          {totalCount > 0 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationControls}><span>Rows per page:</span><select value={rowsPerPage} onChange={(e) => {setRowsPerPage(Number(e.target.value)); setCurrentPage(1);}} style={styles.paginationSelect}><option value={5}>5</option><option value={10}>10</option></select></div>
            <div style={styles.paginationControls}><span>{(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount}</span><div><button onClick={() => setCurrentPage(p => p > 1 ? p - 1 : p)} disabled={currentPage === 1} style={{ ...styles.paginationButton, opacity: currentPage === 1 ? 0.5 : 1 }}><ChevronLeft size={20} /></button><button onClick={() => setCurrentPage(p => p < totalPages ? p + 1 : p)} disabled={currentPage === totalPages} style={{ ...styles.paginationButton, opacity: currentPage === totalPages ? 0.5 : 1 }}><ChevronRight size={20} /></button></div></div>
          </div>
          )}
        </div>
      </div>
      {isModalOpen && <LeaveDetailModal leave={selectedLeave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default AllLeaves;

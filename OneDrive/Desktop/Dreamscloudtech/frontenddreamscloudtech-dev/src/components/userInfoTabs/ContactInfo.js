import React from 'react';

function ContactInfo({ user }) {
    const containerStyle = {
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "900px",
        margin: "10px auto",
        fontFamily: "Arial, sans-serif",
    };

    const rowStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
    };

    const labelStyle = {
        fontWeight: "bold",
        color: "#333",
        flex: "1",
        textAlign: "left",
    };

    const valueStyle = {
        color: "#555",
        flex: "1",
        textAlign: "left",
        fontSize: "14px",
        marginLeft: "20px",
    };

    return (
        <div style={containerStyle}>
            <div className="row justify-content-center align-items-center">
                <div className="col-6" style={{ marginLeft: "100px" }}>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Telephone Number:</span>
                        <span style={valueStyle}>{user?.telephone || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Mobile Number:</span>
                        <span style={valueStyle}>{user?.mobilenumber || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Area of Residence:</span>
                        <span style={valueStyle}>{user?.physicalAddress || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Postal Address:</span>
                        <span style={valueStyle}>{user?.postalAddress || "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;

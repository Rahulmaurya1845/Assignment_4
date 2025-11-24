import React from 'react';
import Card from '@material-ui/core/Card';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';

function GuadianCard({ guadian, handleDeleteGuadian, noEdit }) {
    const cardStyle = {
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "30px 0",
        marginTop: "30px",
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
    };

    return (
        <Card style={cardStyle}>
            {!noEdit && (
                <div className="float-end">
                    <IconButton onClick={() => handleDeleteGuadian(guadian.id)}>
                        <HighlightOffIcon />
                    </IconButton>
                </div>
            )}
            <div className="d-flex justify-content-between">
                <div className="flex-fill pr-3">
                    <div style={rowStyle}>
                        <span style={labelStyle}>Name:</span>
                        <span style={valueStyle}>
                            {guadian?.name} {guadian?.lastname}
                        </span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Relationship:</span>
                        <span style={valueStyle}>{guadian?.relationship || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Occupation:</span>
                        <span style={valueStyle}>{guadian?.occupation || "N/A"}</span>
                    </div>
                </div>
                <div className="flex-fill pl-3">
                    <div style={rowStyle}>
                        <span style={labelStyle}>Contact:</span>
                        <span style={valueStyle}>{guadian?.mobile || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Email:</span>
                        <span style={valueStyle}>{guadian?.email || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Address:</span>
                        <span style={valueStyle}>{guadian?.address || "N/A"}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default GuadianCard;

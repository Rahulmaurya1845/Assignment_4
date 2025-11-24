import React from "react";
import Card from "@material-ui/core/Card";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";

function GuadianCard({ guadian, handleDeleteGuadian, noEdit }) {
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
        marginLeft: "50px",
    };

    const deleteButtonStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
    };

    return (
        <Card style={containerStyle}>
            {!noEdit && (
                <IconButton
                    onClick={() => handleDeleteGuadian(guadian.id)}
                    style={deleteButtonStyle}
                >
                    <HighlightOffIcon />
                </IconButton>
            )}
            <div className="row justify-content-center align-items-center">
                <div className="col-6">
                    <div style={rowStyle}>
                        <span style={labelStyle}>Name:</span>
                        <span style={valueStyle}>{guadian?.name || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Surname:</span>
                        <span style={valueStyle}>{guadian?.lastname || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Occupation:</span>
                        <span style={valueStyle}>{guadian?.occupation || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Contact:</span>
                        <span style={valueStyle}>{guadian?.mobile || "N/A"}</span>
                    </div>
                </div>
                <div className="col-6">
                    <div style={rowStyle}>
                        <span style={labelStyle}>Email:</span>
                        <span style={valueStyle}>{guadian?.email || "N/A"}</span>
                    </div>
                    <div style={rowStyle}>
                        <span style={labelStyle}>Relationship:</span>
                        <span style={valueStyle}>{guadian?.relationship || "N/A"}</span>
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

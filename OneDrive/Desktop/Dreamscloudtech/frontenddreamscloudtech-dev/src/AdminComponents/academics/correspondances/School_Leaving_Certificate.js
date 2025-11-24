import React from "react";
import moment from "moment";
import { getImgSrc } from "../../../utils";
import {

    Paper,
    Typography,
    Divider,
    Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    certificateContainer: {
        padding: theme.spacing(6),
        marginBottom: theme.spacing(4),
        border: "3px solid #3f9bfc",
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)"
    },
    header: {
        textAlign: "center",
        marginBottom: theme.spacing(4),
        position: "relative",
        zIndex: 2
    },
    schoolName: {
        color: "#1976d2",
        fontWeight: 600,
        marginTop: theme.spacing(1)
    },
    motto: {
        color: "#5c5c5c",
        fontStyle: "italic",
        marginBottom: theme.spacing(1)
    },
    certificateTitle: {
        textAlign: "center",
        color: "#1976d2",
        fontWeight: "bold",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        textTransform: "uppercase",
        borderBottom: "2px solid #1976d2",
        paddingBottom: theme.spacing(1),
        display: "inline-block"
    },
    decoration: {
        position: "absolute",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        backgroundColor: "rgba(63, 155, 252, 0.1)",
        zIndex: 1
    },
    cornerDecoration: {
        position: "absolute",
        width: "100px",
        height: "100px",
        zIndex: 1
    },
    topLeftDecoration: {
        top: "10px",
        left: "10px",
        borderTop: "3px solid #3f9bfc",
        borderLeft: "3px solid #3f9bfc",
        borderTopLeftRadius: "15px"
    },
    topRightDecoration: {
        top: "10px",
        right: "10px",
        borderTop: "3px solid #3f9bfc",
        borderRight: "3px solid #3f9bfc",
        borderTopRightRadius: "15px"
    },
    bottomLeftDecoration: {
        bottom: "10px",
        left: "10px",
        borderBottom: "3px solid #3f9bfc",
        borderLeft: "3px solid #3f9bfc",
        borderBottomLeftRadius: "15px"
    },
    bottomRightDecoration: {
        bottom: "10px",
        right: "10px",
        borderBottom: "3px solid #3f9bfc",
        borderRight: "3px solid #3f9bfc",
        borderBottomRightRadius: "15px"
    },
    certificateNumber: {
        textAlign: "right",
        marginBottom: theme.spacing(3),
        color: "#555"
    },
    divider: {
        backgroundColor: "#3f9bfc",
        marginBottom: theme.spacing(3),
        height: "2px"
    },
    body: {
        marginBottom: theme.spacing(4),
        lineHeight: "1.8",
        color: "#333",
        position: "relative",
        zIndex: 2,
        textAlign: "justify"
    },
    signatureSection: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(6),
        position: "relative",
        zIndex: 2
    },
    signatureBox: {
        textAlign: "center"
    },
    signatureLine: {
        width: "150px",
        height: "1px",
        backgroundColor: "#1976d2",
        margin: "50px auto 10px"
    },
    printButton: {
        backgroundColor: "#3f9bfc",
        color: "white",
        marginBottom: theme.spacing(3),
        "&:hover": {
            backgroundColor: "#2d8ae0"
        }
    },
    watermark: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-45deg)",
        fontSize: "6rem",
        color: "rgba(63, 155, 252, 0.05)",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        zIndex: 1
    },
    seal: {
        position: "absolute",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        border: "1px dashed #1976d2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#1976d2",
        fontSize: "12px",
        textAlign: "center",
        zIndex: 1,
        opacity: 0.7
    },
    studentInfoTable: {
        width: "100%",
        marginBottom: theme.spacing(4),
        borderCollapse: "separate",
        borderSpacing: "0 8px",
        alignItems: "center"
    },
    studentInfoLabel: {
        fontWeight: "bold",
        width: "200px",
        verticalAlign: "top",

    }
}));

function School_Leaving_Certificate({school, student, certificate}) {
    const classes = useStyles();
    return (
        <div>

            <Paper id="section-to-print" className={classes.certificateContainer}>
                {/* Decorative elements */}
                <div className={`${classes.cornerDecoration} ${classes.topLeftDecoration}`}></div>
                <div className={`${classes.cornerDecoration} ${classes.topRightDecoration}`}></div>
                <div className={`${classes.cornerDecoration} ${classes.bottomLeftDecoration}`}></div>
                <div className={`${classes.cornerDecoration} ${classes.bottomRightDecoration}`}></div>
                <div className={classes.watermark}>CERTIFIED</div>

                {/* Header */}
                <div className={classes.header}>
                    {school?.profileUrl && (
                        <img
                            width="100px"
                            src={getImgSrc(school?.profileUrl)}
                            alt="School Logo"
                        />
                    )}
                    <Typography variant="h4" className={classes.schoolName}>
                        {school?.fullName}
                    </Typography>
                    {/* <Typography variant="subtitle1" className={classes.motto}>
                        {school?.motto}
                    </Typography> */}
                    <Typography variant="body2" className="mt-2" gutterBottom>
                        {school?.address}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Phone: {school?.telephone} | Email: {school?.email}
                    </Typography>
                    {/* <Typography variant="body2" gutterBottom>
                        Website: {school?.website}
                    </Typography> */}
                </div>

                {/* Certificate title */}
                <Box textAlign="center" mb={3}>
                    <Typography variant="h5" className={classes.certificateTitle}>
                        {certificate.doc.subject}
                    </Typography>
                </Box>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "100%", marginTop: "30px" }}>
                    {/* Date on the left */}
                    <div style={{ maxWidth: "150px", marginBottom: "20px" }}>
                        <Typography variant="body2">
                            <strong>Date:</strong> {moment(certificate.doc.date).format("DD MMMM YYYY")}
                        </Typography>
                    </div>

                    {/* Certificate Number on the right */}
                    <div className={classes.certificateNumber} style={{ marginRight: "10px" }}>
                        <Typography variant="body2">
                            <strong>Certificate No:</strong> {certificate.certNumber}
                        </Typography>
                    </div>
                </div>


                <Divider className={classes.divider} />

                {/* Certificate body */}
                <Typography variant="body1" className={classes.body}>
                    This is to certify that {certificate.doc.salutation} <strong>{certificate.doc.name.name}</strong>, son/daughter of <strong>{certificate.doc.name.father_name}</strong> and <strong>{certificate.doc.name.mother_name}</strong>,
                    was a student of this school from <strong>June 2020</strong> to <strong>April 2025</strong>. He/She studied in <strong>Grade X</strong> during the academic session <strong>2024–2025</strong>.
                </Typography>
                <Typography variant="body1" className={classes.body}>
                    The student’s character and conduct have been <strong>EXCELLENT</strong>. He/She was regular, punctual, and active in academics and extracurriculars.
                </Typography>
                <Typography variant="body1" className={classes.body}>
                    This certificate is being issued upon formal withdrawal from the school.
                </Typography>



                {/* Seal */}
                <div className={classes.seal}>
                    <div>
                        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>OFFICIAL SEAL</div>
                        <div>{school?.fullName}</div>
                    </div>
                </div>

                {/* Signatures */}
                <div className={classes.signatureSection}>
                    <div className={classes.signatureBox}>
                        <div className={classes.signatureLine}></div>
                        <Typography variant="body2"><strong>Class Teacher</strong></Typography>
                        <Typography variant="body2">{certificate.classTeacherName}</Typography>
                        <Typography variant="body2">{certificate.classTeacherQualification}</Typography>
                    </div>

                    <div className={classes.signatureBox}>
                        <div className={classes.signatureLine}></div>
                        <Typography variant="body2"><strong>Principal</strong></Typography>
                        <Typography variant="body2">{certificate.principalName}</Typography>
                        <Typography variant="body2">{certificate.principalQualification}</Typography>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default School_Leaving_Certificate
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import {
  Button,
  Box
} from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import { makeStyles } from "@material-ui/core/styles";
import Transfer_Certificate from "./Transfer_Certificate";
import School_Leaving_Certificate from "./School_Leaving_Certificate";
import Bonafied_Certificate from "./Bonafied_Certificate";
import Character_Certificate from "./Character_Certificate";

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

const CERTIFICATE_COMPONENTS = {
  "Character Certificate": Character_Certificate,
  "Transfer Certificate": Transfer_Certificate,
  "Bonafide Certificate": Bonafied_Certificate,
  "School Leaving Certificate": School_Leaving_Certificate
};

function CharacterCertificate() {
  const classes = useStyles();
  const { id } = useParams();
  // const [student, setStudent] = useState({
  //   // name: "Mohan",
  //   // surname: "Kumar",
  //   // father_name: "Ramesh Kumar",
  //   // mother_name: "Sita Kumari",
  //   // years: "5"
  // });

  const [school, setSchool] = useState({});
  const [certificate, setCertificate] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`/correspondance/${id}`).then((res) => {
        if (res.data) {
          setCertificate(res.data);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    axios.get(`/school`).then((res) => {
      if (res?.data) {
        setSchool(res.data);
      }
    });
  }, []);
  // console.log("school Data: ", school);
  const handlePrint = () => {
    window.print();
  };

  if (!certificate?.doc) {
    return <div>Loading certificate data...</div>;
  }

  const CertificateComponent = CERTIFICATE_COMPONENTS[certificate?.doc?.subject];
  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          size="large"
          className={classes.printButton}
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print Certificate
        </Button>
      </Box>

      {CertificateComponent ? (
        <CertificateComponent
          school={school}
          // student={student}
          certificate={certificate}
        />
      ) : (
        <div>Invalid certificate type.</div>
      )}

    </div>
  );
}

export default CharacterCertificate;
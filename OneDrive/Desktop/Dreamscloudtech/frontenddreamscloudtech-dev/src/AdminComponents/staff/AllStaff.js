import React, { useState, useEffect } from "react";
import Search from "../shared/Search6";
import StaffTable from "../shared/TableListUsers1";
import axios from "../../store/axios";
import { errorAlert } from "../../utils";
import Loading from "../../Loading";
import { pdf } from "../../components/tables/pdf";
import { Link } from "react-router-dom";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// if (pdfFonts && pdfFonts.pdfMake) {
//   pdfMake.vfs = pdfFonts.pdfMake.vfs;
// }

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "Teacher ID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  // { id: "surname", disablePadding: true, label: "Last Name" },
  { id: "position", disablePadding: false, label: "Position" },
  { id: "gender", disablePadding: false, label: "Gender" },
];

function AllStaff() {
  const [name, setname] = useState("");
  const [userID, setuserID] = useState("");
  const [staff, setstaff] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get("/teachers")
      .then((res) => {
        setloading(false);
        const capitalizedData = res.data.map(student => ({
          ...student,
          gender: capitalizeFirstLetter(student.gender),
          position: capitalizeFirstLetter(student.position)// Capitalize first letter of gender
        }));
        setstaff(capitalizedData);
        setstoreData(capitalizedData);
      })
      .catch((err) => {
        setloading(false);
      });
  }, []);

  // const capitalizeFirstLetter = (str) => {
  //   if (!str) return '';
  //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';

    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const generatePDF = () => {
    const headers = [
      { key: "userID", label: "UserID" },
      { key: "name", label: "Name" },
      // { key: "middleName", label: "Middle Name" },
      { key: "surname", label: "SurName" },
      { key: "gender", label: "Gender" },
      { key: "classID", label: "Class" },
    ];

    pdf({ data: staff, headers, filename: "AllStaff" });
  };
//   const generatePDF = () => {
//   const docDefinition = {
//     pageOrientation: "landscape",
//     content: [
//       {
//         text: "Staff List",
//         style: "header",
//         alignment: "center",
//         margin: [0, 0, 0, 20],
//       },
//       {
//         table: {
//           headerRows: 1,
//           widths: ["*", "*", "*", "*", "*"], // Adjust to your needs
//           body: [
//             // Header row
//             [
//               { text: "Teacher ID", style: "tableHeader" },
//               { text: "Name", style: "tableHeader" },
//               { text: "Surname", style: "tableHeader" },
//               { text: "Gender", style: "tableHeader" },
//               { text: "Position", style: "tableHeader" },
//             ],
//             // Data rows
//             ...staff.map((s, i) => [
//               {
//                 text: s.userID || "N/A",
//                 fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
//               },
//               {
//                 text: s.name || "N/A",
//                 fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
//               },
//               {
//                 text: s.surname || "N/A",
//                 fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
//               },
//               {
//                 text: s.gender || "N/A",
//                 fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
//               },
//               {
//                 text: s.position || "N/A",
//                 fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
//               },
//             ]),
//           ],
//         },
//         layout: {
//           hLineWidth: () => 0.5,
//           vLineWidth: () => 0.5,
//           hLineColor: () => "#555555",
//           vLineColor: () => "#555555",
//         },
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//       },
//       tableHeader: {
//         bold: true,
//         fontSize: 12,
//         color: "white",
//         fillColor: "#4fb1f6", // blue header like Student PDF
//         alignment: "center",
//       },
//     },
//   };

//   pdfMake.createPdf(docDefinition).download("AllStaff.pdf");
// };

  const handleDelete = (i) => {
    let ans = window.confirm(`Are sure you want to delete user ${i}`);
    if (ans) {
      axios.delete(`/teachers/delete/${i}`).then((res) => {
        if (res.data.error) {

          errorAlert(res.data.error);
        }

        setstaff(staff.filter((e) => e.userID !== i));
      });
    }
  };

  const handleWithdraw = (i) => {
    let ans = window.confirm(
      `Are you sure you want to withdraw this staff member ${i}`
    );

    if (ans) {
      axios.put(`/teachers/update/${i}`, { withdraw: true }).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setstaff(staff.filter((e) => e.userID !== i));
      });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setstaff(storeData);
    setname("");
    setuserID("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newStaff = [];
    if (name) {
      newStaff = storeData.filter(
        (i) =>
          i.name.toLowerCase().includes(name.toLowerCase()) ||
          i.surname.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (userID) {
      newStaff = storeData.filter((i) =>
        i.userID.toLowerCase().includes(userID.toLowerCase())
      );
    }
    setstaff(newStaff);
  };

  const inputFields = [
    {
      type: "text",
      label: "Search by Name",
      name: "Name",
      value: name,
      onChange: setname,
    },
    {
      type: "text",
      label: "Search by UserID",
      name: "userID",
      value: userID,
      onChange: setuserID,
    },
  ];

  return (
    <>
      {/* {loading && <Loading />} */}
      <Search
        inputFields={inputFields}
        handleSearch={handleSearch}
        handleReset={handleReset}
        generatePDF = {generatePDF}
      />
      <StaffTable
        route="staff"
        loading={loading}
        noData="No staff members yet"
        students={staff}
        handleWithdraw={handleWithdraw}
        handleDelete={handleDelete}
        headCells={headCells}
      />
    </>
  );
}

export default AllStaff;

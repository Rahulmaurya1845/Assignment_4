import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { pdf } from "../../components/tables/pdf";
import { Link } from "react-router-dom";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

if (pdfFonts && pdfFonts.pdfMake) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
}

function Search(props) {
  const {
    inputFields,
    title,
    handleSearch,
    isReset,
    handleReset,
    noActions,
  } = props;

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/teachers")
      .then((res) => {
        setLoading(false);
        setStaff(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // const generatePDF = () => {
  //   const headers = [
  //     { key: "userID", label: "UserID" },
  //     { key: "name", label: "Name" },
  //     { key: "surname", label: "SurName" },
  //     { key: "gender", label: "Gender" },
  //     { key: "position", label: "Position" },
  //   ];

  //   pdf({ data: staff, headers, filename: "AllStaff" });
  // };
  const generatePDF = () => {
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        {
          text: "Staff List",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*"], // Adjust to your needs
            body: [
              // Header row
              [
                { text: "Teacher ID", style: "tableHeader" , minHeight: 40 },
                { text: "Name", style: "tableHeader", minHeight: 40 },
                { text: "Surname", style: "tableHeader", minHeight: 40 },
                { text: "Gender", style: "tableHeader", minHeight: 40 },
                { text: "Position", style: "tableHeader", minHeight: 40 },
              ],
              // Data rows
              ...staff.map((s, i) => [
                {
                  text: s.userID || "N/A",
                  fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
                },
                {
                  text: s.name || "N/A",
                  fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
                },
                {
                  text: s.surname || "N/A",
                  fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
                },
                {
                  text: s.gender || "N/A",
                  fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
                },
                {
                  text: s.position || "N/A",
                  fillColor: i % 2 === 0 ? "#FFFFFF" : "#EEF7FF",
                },
              ]),
            ],
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => "#555555",
            vLineColor: () => "#555555",
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [8, 8, 8, 8],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "white",
          fillColor: "#4fb1f6", // blue header like Student PDF
          alignment: "center",
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).download("AllStaff.pdf");
  };

  return (
    <form className="mb-0 content__container" style={{ backgroundColor: "#EEF7FF" }}>
      <h3 className="mb-">{title || ""}</h3>
      <div className="d-flex align-items-center mb-4">
        <div className="d-flex align-items-center gap-2 me-3 mt-4">
          <Link
            className="btn text-white"
            to="/staff/new"
            style={{ backgroundColor: '#fe4949', border: 'none' }}
          >
            +Add Staff
          </Link>
          <Link
            className="btn text-white"
            to="/staff/new"
            style={{ backgroundColor: '#42d29d', border: 'none' }}
          >
            Import
          </Link>
        </div>
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          {inputFields &&
            inputFields.map((input) => (
              <div key={input?.name} className="flex-grow-1 me-2 mb-1">
                <label htmlFor={input?.name} className="form-label">
                  {input.label}
                </label>
                {input.type === "select" ? (
                  <select
                    style={{ backgroundColor: "#ffffff" }}
                    value={input?.value}
                    name={input?.name}
                    onChange={(e) => input?.onChange(e.target.value)}
                    className="form-select form-select-sm py-2"
                  >
                    <option hidden defaultValue>
                      Select
                    </option>
                    {input?.options.length > 0 ? (
                      input?.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No data</option>
                    )}
                  </select>
                ) : (
                  <input
                    style={{ backgroundColor: "#ffffff" }}
                    type={input.type}
                    value={input.value}
                    name={input?.name}
                    className="form-control py-3"
                    placeholder={`Search by ${input.name}`}
                    onChange={(e) => input?.onChange(e.target.value)}
                  />
                )}
              </div>
            ))}
        </div>
        {!noActions && (
          <div className="d-flex align-items-center gap-2 mt-4">
            <button
              className="btn orange__btn"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
            {!isReset && (
              <button
                className="btn lred__btn"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
            <button
              onClick={generatePDF}
              className="btn"
              style={{ backgroundColor: '#42d29d', color: '#fff' }}
            >
              ↓ Download PDF
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Search;

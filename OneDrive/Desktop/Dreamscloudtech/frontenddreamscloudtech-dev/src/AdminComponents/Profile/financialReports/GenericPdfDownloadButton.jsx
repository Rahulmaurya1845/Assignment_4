import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';

pdfMake.vfs = pdfFonts.vfs;

const GenericPdfDownloadButton = ({ title, tableHeader, rowData, totalLabel, totalValue }) => {
    const handleDownload = () => {
        const columnCount = tableHeader.length;

        const getFontSize = () => {
            if (columnCount <= 6) return 12;
            if (columnCount <= 10) return 10;
            if (columnCount <= 15) return 9;
            if (columnCount <= 20) return 8;
            return 7;
        };

        const getCellPadding = () => {
            if (columnCount <= 6) return [5, 5, 5, 5];
            if (columnCount <= 10) return [3, 3, 3, 3];
            if (columnCount <= 15) return [2, 2, 2, 2];
            return [1, 1, 1, 1];
        };

        const fontSize = getFontSize();
        const padding = getCellPadding();
        const columnWidths = Array(columnCount).fill(`${(100 / columnCount).toFixed(2)}%`);

        const headerRow = tableHeader.map((h) => ({
            text: h.name || h.id,
            style: 'tableHeader',
            minHeight: 20,
        }));

        const bodyRows = rowData.map((row, idx) =>
            tableHeader.map((col) => {
                let value = row[col.id];

                if (col.id.toLowerCase().includes('date') && value) {
                    const parsedDate = moment(value);
                    value = parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : value;
                }

                return {
                    text: value ?? 'N/A',
                    style: idx % 2 === 0 ? 'box1' : 'box2',
                };
            })
        );

        // Full-width total row
        const totalRow = totalLabel && totalValue !== undefined
            ? [[{
                text: `${totalLabel}: ₹${totalValue.toLocaleString()}`,
                style: 'totalRow',
                colSpan: columnCount,
                alignment: 'right',
                margin: padding,
            }, ...Array(columnCount - 1).fill({})]]
            : [];

        const docDefinition = {
            pageOrientation: 'landscape',
            pageMargins: [20, 20, 20, 30],
            content: [
                {
                    text: title || 'Report',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },
                {
                    table: {
                        headerRows: 1,
                        widths: columnWidths,
                        body: [headerRow, ...bodyRows, ...totalRow],
                    },
                    layout: {
                        hLineColor: () => '#555555',
                        vLineColor: () => '#555555',
                        hLineWidth: () => 0.2,
                        vLineWidth: () => 0.2,
                    },
                },
            ],
            styles: {
                header: { fontSize: fontSize + 2, bold: true },
                tableHeader: {
                    fillColor: '#4fb1f6',
                    color: '#ffffff',
                    bold: true,
                    alignment: 'center',
                    margin: padding,
                    fontSize,
                },
                box1: {
                    fillColor: '#ffffff',
                    color: '#000000',
                    alignment: 'center',
                    margin: padding,
                    fontSize,
                },
                box2: {
                    fillColor: '#EEF7FF',
                    color: '#000000',
                    alignment: 'center',
                    margin: padding,
                    fontSize,
                },
                totalRow: {
                    fillColor: '#ffffff',
                    color: '#000000',
                    bold: true,
                    fontSize,
                },
            },
            defaultStyle: {
                fontSize,
                alignment: 'center',
                margin: padding,
            },
        };

        pdfMake.createPdf(docDefinition).download(`${title || 'report'}.pdf`);
    };

    return (
        <button className="btn green__btn" onClick={handleDownload}>
            Download PDF
        </button>
    );
};

export default GenericPdfDownloadButton;

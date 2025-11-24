

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function ExcelExporter({
    heading,
    content,
    fileName
}){

  const data = [
    heading,
  ];

  content.forEach((item) => {
    data.push(Object.values(item));
  });

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(fileData, fileName + '.xlsx');

}
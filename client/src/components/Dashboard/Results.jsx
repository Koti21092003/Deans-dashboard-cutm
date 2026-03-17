import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Results = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [searchBacklog, setSearchBacklog] = useState("");
  const [searchExactBacklog, setSearchExactBacklog] = useState("");
  const [searchCgpa, setSearchCgpa] = useState("");
  const [searchSgpa, setSearchSgpa] = useState("");
  const [searchStudent, setSearchStudent] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const parsedData = json.slice(9).map((row) => ({
          rollno: row[2],
          student: row[3],
          sgpa: row[10],
          cgpa: row[11],
          allBacklog: row[13],
        }));

        setStudentsData(parsedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const filteredStudents = studentsData.filter((student) => {
    const backlogMatch =
      searchBacklog === ""
        ? true
        : searchBacklog.toLowerCase() === "yes"
        ? parseFloat(student.allBacklog) > 0
        : searchBacklog.toLowerCase() === "no"
        ? parseFloat(student.allBacklog) === 0
        : true;

    const exactBacklogMatch =
      searchExactBacklog === "" ||
      parseInt(searchExactBacklog) === parseInt(student.allBacklog);

    const cgpaMatch = student.cgpa?.toString().includes(searchCgpa);
    const sgpaMatch = student.sgpa?.toString().includes(searchSgpa);

    const studentMatch =
      (typeof student.student === "string" &&
        student.student.toLowerCase().includes(searchStudent.toLowerCase())) ||
      (typeof student.rollno === "string" &&
        student.rollno.toLowerCase().includes(searchStudent.toLowerCase()));

    return (
      backlogMatch &&
      exactBacklogMatch &&
      cgpaMatch &&
      sgpaMatch &&
      studentMatch
    );
  });

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Results", 14, 22);

    doc.setFontSize(12);
    doc.text("Filters Applied:", 14, 32);
    doc.setFontSize(10);

    let filterText = "";
    if (searchStudent) filterText += `Name/Roll: ${searchStudent}  `;
    if (searchBacklog) filterText += `Backlog (Yes/No): ${searchBacklog}  `;
    if (searchExactBacklog) filterText += `Exact Backlog: ${searchExactBacklog}  `;
    if (searchCgpa) filterText += `CGPA: ${searchCgpa}  `;
    if (searchSgpa) filterText += `SGPA: ${searchSgpa}`;

    const lines = doc.splitTextToSize(filterText, 180);
    doc.text(lines, 14, 38);

    const tableColumn = ["Roll No", "Student", "SGPA", "CGPA", "All Backlog"];
    const tableRows = [];

    filteredStudents.forEach((student) => {
      const row = [
        student.rollno,
        student.student,
        student.sgpa,
        student.cgpa,
        student.allBacklog,
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      startY: 45 + lines.length * 5,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // ✅ Use Blob for compatibility with Android WebView
    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "student_results.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Box padding="20px">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx, .xls"
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />

        {studentsData.length > 0 && (
          <>
            <Input
              placeholder="Search by All Backlog (Yes/No)"
              value={searchBacklog}
              onChange={(e) => setSearchBacklog(e.target.value)}
              marginTop="20px"
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by Exact Backlog Number (e.g., 0, 1, 2)"
              value={searchExactBacklog}
              onChange={(e) => setSearchExactBacklog(e.target.value)}
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by CGPA (e.g., 8.5)"
              value={searchCgpa}
              onChange={(e) => setSearchCgpa(e.target.value)}
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by SGPA (e.g., 9.0)"
              value={searchSgpa}
              onChange={(e) => setSearchSgpa(e.target.value)}
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by Student Name or Roll Number"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              marginBottom="20px"
              size="md"
            />
          </>
        )}

        {filteredStudents.length > 0 ? (
          <Box id="print-section" marginTop="20px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Rollno</Th>
                  <Th>Student</Th>
                  <Th>SGPA</Th>
                  <Th>CGPA</Th>
                  <Th>All Backlog</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={index}>
                    <Td>{student.rollno}</Td>
                    <Td>{student.student}</Td>
                    <Td>{student.sgpa}</Td>
                    <Td>{student.cgpa}</Td>
                    <Td>{student.allBacklog}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box marginTop="20px">No results found</Box>
        )}
      </Box>

      <div
        className="no-print"
        style={{
          backgroundColor: "#f0f4f8",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={handleBack}
        >
          Back
        </button>

        <button
          style={{
            backgroundColor: "#DC3545",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>

      <Footer />
    </ChakraProvider>
  );
};

export default Results;

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Row, Col, Label } from "reactstrap";
import "../css/parseExcel.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

function ParseExcel(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();
  const [sheetName, setSheetName] = useState([]);
  const [sheetData, setSheetData] = useState({});

  const acceptableFiles = ["xlsx", "xls", "csv"];
  //File.file.extension
  const checkFileName = (name) => {
    return acceptableFiles.includes(name.split(".").pop().toLowerCase());
  };

  const readDataFromXl = (data) => {
    const workbook = XLSX.read(data);

    setSheetName(workbook.SheetNames);

    var mySheetData = {};
    //loop through the sheet
    for (var i = 0; i < workbook.SheetNames.length; i++) {
      let sheetName = workbook.SheetNames[i];

      const wsname = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(workSheet, {
        blankrows: "",
        header: 1,
      });

      mySheetData[sheetName] = jsonData;
      console.log("-----", sheetName);
    }
    setSheetData(mySheetData);
    console.log(mySheetData, "mySheetData");

    return mySheetData;
  };

  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert("Invalid file type");
      return;
    }

    //read meta data
    const data = await myFile.arrayBuffer();
    const mySheetData = readDataFromXl(data);

    setFile(myFile);
    setFileName(myFile.name);

    props.onFileUploaded(mySheetData);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    setSheetName([]);
    setSheetData(null);

    props.onFileUploaded(null);

    fileRef.current.value = "";
  };

  const enableButton = () => {
    if (file) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div
        style={{ height: 100, backgroundColor: "#905E96", borderRadius: 10 }}
      ></div>
      <div classname="main-container" style={{ margin: 30 }}>
        <Row>
          <Col>
            <div className="mb-2">
              {!fileName && <h3>Please upload a file</h3>}
              {fileName && <h3>File name: {fileName}</h3>}
            </div>
            <div classname="">
              <label class="label">
                <input
                  type="file"
                  accept="xlsx, xls, csv"
                  multiple={false}
                  onChange={(e) => handleFile(e)}
                  ref={fileRef}
                />
                <span>Select a file</span>
              </label>
              <div className="download-button">
                <Button
                  style={{
                    opacity: enableButton() ? 1 : 0.5,
                    backgroundColor: "#624F82",
                    width: 200,
                  }}
                  variant="contained"
                >
                  Download
                </Button>
              </div>
              {fileName && (
                <div
                  style={{ display: "inline", marginLeft: 10 }}
                  onClick={handleRemove}
                >
                  <CloseIcon />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ParseExcel;

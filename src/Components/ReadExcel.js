import React, { useState } from "react";
import ParseExcel from "./parseExcel";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Filter,
  Sort,
} from "@syncfusion/ej2-react-grids";
import InputLabel from "@mui/material/InputLabel";
// import {MenuItem,createMuiTheme} from "@mui/material/MenuItem";
import {
  createTheme,
  FormControl,
  MenuItem,
  MuiThemeProvider,
  Select,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Label, Table, Row, Col } from "reactstrap";
import OutlinedInput from "@mui/material/OutlinedInput";
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

function ReadExcel() {
  const [sheetData, setSheetData] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);
  const [Format, setFormat] = useState(null);

  const theme = createTheme({
    overrides: {
      MuiSelect: {
        select: {
          padding: "13px 14px",
          "&:focus": {
            backgroundColor: "#ffffff",
            padding: "13px 14px",
          },
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: "OpenSans-Regular",
          fontSize: 14,
        },
      },
    },
  });
  // const names = ["Report 1", "Report 2", "Report 3"];
  const data = [
    {
      SetName: "Report 1",
      FieldCodes:
        "{OrderDate},{OrderNumber},{OrderName},{ModulePosn},{ModuleName}_{ModuleSize},{PanelCode},{PanelName},{FinishedLength},{FinishedWidth},{FinishedThickness},{CutLength},{CutWidth},{CutThickness},{FinishedMatlNameFull},{CoreMaterial},{TopLaminate},{BottomLaminate},{FinishedGrainDir},{TLGrainDir},{BLGrainDir},{W1EBThickness} X {W1EBWidth}_{W1EBColour}_EB,{W2EBThickness} X {W2EBWidth}_{W2EBColour}_EB,{L1EBThickness} X {L1EBWidth}_{L1EBColour}_EB,{L2EBThickness} X {L2EBWidth}_{L2EBColour}_EB,{TopBarCode},{BottomBarCode},{ModuleComment}",
      FieldNames:
        "orderDate,orderNumber,orderName,moduleNumber,cabinetDescription,panelCode,panelDescription,finishedLength,finishedWidth,finishedThickness,cutLength,cutWidth,cutThickness,finalBoardMaterial,material,surfaceTop,surfaceBottom,grainDirection,TLGrainDir,BLGrainDir,EdgeBottomW1,EdgeRightL1,EdgeTopW2,EdgeLeftL2,topBarCode,bottomBarCode,Instructions",
    },
    {
      SetName: "Report 2",
      FieldCodes:
        "{OrderNumber},{OrderName},{OrderDate},{ModulePosn},{PanelName},{PanelCode},{ModuleName}_{ModuleSize},{FinishedMatlNameFull},{CoreMaterial},{W1EBThickness} X {W1EBWidth}_{W1EBColour}_EB,{W2EBThickness} X {W2EBWidth}_{W2EBColour}_EB,{L1EBThickness} X {L1EBWidth}_{L1EBColour}_EB,{L2EBThickness} X {L2EBWidth}_{L2EBColour}_EB,{TopLaminate},{TopBarCode},{BottomLaminate},{BottomBarCode},{CutLength},{CutWidth},{CutThickness},{FinishedLength},{FinishedWidth},{FinishedThickness},{Quantity},{FinishedGrainDir},{TLGrainDir},{BLGrainDir},{ModuleComment},{ModuleRemarks}",
      FieldNames:
        "Order number,Order name,Order date,POSNo,Description,Panel barcode,Article name,Final boardoutput,Material,EdgeBottom W1,EdgeRight W2,EdgeTop L1,EdgeLeft L2,Surface top,Top barcode,Surface bottom,Bottom barcode,Cut length,Cut width,Cut thickness,Finished length,Finished width,Finished thickness,Qty,GrainFlag,TL Grain direction,BL Grain direction,Module comment,Cabinet Remarks",
    },
    {
      SetName: "Report 3",
      FieldCodes:
        "{OrderNumber},{OrderName},{OrderDate},{ModulePosn},{PanelName},{PanelCode},{ModuleName}_{ModuleSize},{FinishedMatlNameFull},{CoreMaterial},{W1EBThickness} X {W1EBWidth}_{W1EBColour}_EB,{L1EBThickness} X {L1EBWidth}_{L1EBColour}_EB,{W2EBThickness} X {W2EBWidth}_{W2EBColour}_EB,{L2EBThickness} X {L2EBWidth}_{L2EBColour}_EB,{TopLaminate},{TopBarCode},{BottomLaminate},{BottomBarCode},{CutLength},{CutWidth},{CutThickness},{FinishedLength},{FinishedWidth},{FinishedThickness},{Quantity},{FinishedGrainDir},{TLGrainDir},{BLGrainDir}",
      FieldNames:
        "Order number,Order name,Order date,POSNo,Description,Panel barcode,Article name,Final boardoutput,Material,EdgeBottom W1,EdgeTop L1,EdgeRight W2,EdgeLeft L2,SurfaceTop,Top barcode,SurfaceBottom,Bottom barcode,Cut length,Cut width,Cut thickness,Finished length,Finished width,Finished thickness,Qty,GrainFlag,TL Grain direction,BL Grain direction",
    },
  ];
  const handleFileUpload = (e) => {
    if (e) {
      let sheetName = Object.keys(e);
      setSheetNames(sheetName);
      setSheet(Object.keys(e)[0]);
    } else {
      setSheetNames(null);
    }
    setSheetData(e);
  };

  const handleSheetChange = (e) => {
    setSheet(e.target.value);
  };

  const handleChange = (event) => {
    setFormat(event.target.value);

    debugger

    let finalvalues = [];

    console.log("Gopi1",sheetData);
    console.log("Gopi2",data);

    sheetData.forEach((x) => {
      debugger
      let finValue = {};

      data.forEach(fields =>{
        finValue[fields] = x[fields];
      
      });
     
      finalvalues.push(finValue);
    });

    console.log("Gopi",finalvalues)

    const cc = data
      .filter((task) => task.SetName === "Report1")
      .map((task) => <div key={task.FieldCodes}>{task.FieldNames}</div>);

    console.log(cc, "cc");

    //  const cc=data.filter(da=>da===data[0].FieldCodes)
    //  console.log(cc, "cc")
  };

  return (
    <div style={{ margin: 10 }}>
      <ParseExcel onFileUploaded={(e) => handleFileUpload(e)} />
      <div className="d-flex flex-column dropdown-container">
        <FormControl>
          <Select
            disableUnderline={true}
            className="item-dropdown"
            MenuProps={{
              disableScrollLock: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
              placeholder: "Format",
            }}
            value={Format}
            // IconComponent={KeyboardArrowDownIcon}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {data.map((item) => (
              <MenuItem key={item} value={item.SetName}>
                {item.SetName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {sheetData && (
        <>
          <Table className="table">
            <thead>
              <tr>
                {sheetData[sheet][0].map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheetData[sheet].slice(1).map((row) => (
                <tr>
                  {row.map((col) => (
                    <td>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ReadExcel;

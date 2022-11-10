import React, { useState, useRef } from "react";

import { Button } from "reactstrap";
import { CSVReader } from "papaparse";
import * as XLSX from "xlsx";
import { Label, Table, Row, Col } from "reactstrap";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Sort,
  Toolbar,
  Filter,
  ExcelExport,
  RowSelectEventArgs,
  DialogEditEventArgs,
  FilterSettingsModel,
  Edit,
  RowDropSettingsModel,
  RowDD,
  SelectionSettingsModel,
  Selection,
  PdfExport,
} from "@syncfusion/ej2-react-grids"; 
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations'
import {
  createTheme,
  FormControl,
  MenuItem,
  MuiThemeProvider,
  Select,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
} from "@material-ui/core"; 
import CloseIcon from "@material-ui/icons/Close"
const JsonTable = require("ts-react-json-table");
const Chetan = () => {
  const [items, setItems] = useState([]);
  const [itemsFiltered, setFilteredItems] = useState([]);
  const [Format, setFormat] = useState();
  
  const toolbarOptions = ["ExcelExport"];
  let excelData 
  const data = [
    {
      SetName: "Report 1",
      FieldCodes:
        "{OrderDate},{OrderNumber},{OrderName},{ModulePosn},{ModuleName}_{ModuleSize},{PanelCode},{PanelName},{FinishedLength},{FinishedWidth},{FinishedThickness},{CutLength},{CutWidth},{CutThickness},{FinishedMatlNameFull},{CoreMaterial},{TopLaminate},{BottomLaminate},{FinishedGrainDir},{TLGrainDir},{BLGrainDir},{W1EBThickness} X {W1EBWidth}_{W1EBColour}_EB,{W2EBThickness} X {W2EBWidth}_{W2EBColour}_EB,{L1EBThickness} X {L1EBWidth}_{L1EBColour}_EB,{L2EBThickness} X {L2EBWidth}_{L2EBColour}_EB,{TopBarCode},{BottomBarCode},{ModuleComment}",
      FieldNames:
        "OrderDate,OrderNumber,OrderName,ModuleNumber,Description,Panel barcode,Description,FinishedLength,FinishedWidth,FinishedThickness,CutLength,CutWidth,CutThickness,FinalBoardMaterial,Material,SurfaceTop,SurfaceBottom,GrainDirection,TLGrainDir,BLGrainDir,EdgeBottom W1,EdgeRight L1,EdgeTop W2,EdgeLeft L2,TopBarCode,BottomBarCode,Instructions",
    },
    {
      SetName: "Report 2",
      FieldCodes:
        "{OrderNumber},{OrderName},{OrderDate},{ModulePosn},{PanelName},{PanelCode},{ModuleName}_{ModuleSize},{FinishedMatlNameFull},{CoreMaterial},{W1EBThickness} X {W1EBWidth}_{W1EBColour}_EB,{W2EBThickness} X {W2EBWidth}_{W2EBColour}_EB,{L1EBThickness} X {L1EBWidth}_{L1EBColour}_EB,{L2EBThickness} X {L2EBWidth}_{L2EBColour}_EB,{TopLaminate},{TopBarCode},{BottomLaminate},{BottomBarCode},{CutLength},{CutWidth},{CutThickness},{FinishedLength},{FinishedWidth},{FinishedThickness},{Quantity},{FinishedGrainDir},{TLGrainDir},{BLGrainDir},{ModuleComment},{ModuleRemarks}",
      FieldNames:
        "Description,OrderNumber,OrderName,OrderDate,POSNo,Panel barcode,Article name,Final boardoutput,Material,EdgeBottom W1,EdgeRight W2,EdgeTop L1,EdgeLeft L2,Surface top,Top barcode,Surface bottom,Bottom barcode,CutLength,CutWidth,CutThickness,FinishedLength,FinishedWidth,FinishedThickness,Qty,GrainFlag,TL Grain direction,BL Grain direction,Module Comment,Cabinet Remarks",
    },
    {
      SetName: "Report 3",
      FieldCodes:
        "{OrderNumber},{OrderName},{OrderDate},{ModulePosn},{PanelName},{PanelCode},{ModuleName}_{ModuleSize},{FinishedMatlNameFull},{CoreMaterial},{W1EBThickness} X {W1EBWidth}_{W1EBColour}_EB,{L1EBThickness} X {L1EBWidth}_{L1EBColour}_EB,{W2EBThickness} X {W2EBWidth}_{W2EBColour}_EB,{L2EBThickness} X {L2EBWidth}_{L2EBColour}_EB,{TopLaminate},{TopBarCode},{BottomLaminate},{BottomBarCode},{CutLength},{CutWidth},{CutThickness},{FinishedLength},{FinishedWidth},{FinishedThickness},{Quantity},{FinishedGrainDir},{TLGrainDir},{BLGrainDir}",
      FieldNames:
        "OrderNumber,OrderName,OrderDate,POSNo,Description,Panel barcode,ArticleName,FinalBoardOutput,Material,EdgeBottom W1,EdgeTop L1,EdgeRight W2,EdgeLeft L2,SurfaceTop,Top barcode,SurfaceBottom,Bottom barcode,CutLength,CutWidth,CutThickness,FinishedLength,FinishedWidth,FinishedThickness,Qty,GrainFlag,TL Grain direction,BL Grain direction",
    },
  ];
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    // console.log(setItems(d).map( (item) => item.key), "ccc");

    promise.then((c) => {
      console.log(c, "ccc");
      setItems(c);
      setFilteredItems(c);
      
    });
  };
  const handleChange = (event) => {
    setFormat(event.target.value);

    console.log("data", data);
    console.log("value", event.target.value);

    const reportData = data.filter(
      (item) => item.SetName === event.target.value
    ); //assuming event.traget.value would be either Report1,report2 or 3

    const fieldNamesArray = reportData[0].FieldNames.split(",");

    //  console.log(items.map( (item) => item.key), "ccc")
    // debugger

    let finalvalues = [];
    console.log("Gopi2", fieldNamesArray);
    console.log("items", items);
    items.forEach((x) => {
      
      let finValue = {};

      fieldNamesArray.forEach((fields) => {
        finValue[fields] = x[fields];
      });    
      //  this is the filter which will remove all the key values pairs which are not defined 
      let finalFilterData= Object.fromEntries(Object.entries(finValue).filter(([_, v]) => v != undefined)) 
      console.log("finalFilterData", finalFilterData)
      // console.log("finValue", finValue);

      // finalvalues.push(finValue); 
      finalvalues.push(finalFilterData)
    });   
    
    console.log("Gopi", finalvalues);    
    console.log(itemsFiltered, "chetan")  
    
  
    setFilteredItems(finalvalues);  
    
    excelData.refresh()
    
  }; 
  
  const convertExcelExport = (e) => {
    if (excelData && e.item.id === "excelData_excelexport") {
      excelData.excelExport();
    }
  }; 

  const MenuList = () => {
    return (
      <>
        {data.map(item => {
          if(item.SetName == Format){
            return  <>  
            <Tab label={item.SetName} className="Nav-Tab"></Tab> <CloseIcon/> 
            </>

          }
        })} 
      </>
    )
  }

  return (
    <div className="height-100 back">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
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
          <Tabs
          className="Nav-Tab-List"
          value={Format}
          indicatorColor="primary"
          textColor="primary" >
          <MenuList /> 
          {/* <CloseIcon/> */}
        </Tabs>
        </FormControl>
      </div>  
      


      <div className="col mx-0 px-0 mr-2 back" style={{width:"4000px"}}>
        <GridComponent
          width={"100%"} 
          dataSource={itemsFiltered}
          id="excelData"
          ref={g => excelData = g}
          allowRowDragAndDrop={true}
          allowExcelExport={true}
          toolbar={["ExcelExport"]}
          toolbarClick={convertExcelExport}
        >
          <Inject services={[Toolbar, ExcelExport]}/>
          
        </GridComponent>   


        
       
        
       
        <TabComponent heightAdjustMode='Auto'>
        <TabItemsDirective>  
      {/* <TabItemDirective header={data[0]}></TabItemDirective>  
      <TabItemDirective header={data[1]}></TabItemDirective> 
      <TabItemDirective header={data[2]}></TabItemDirective>  */} 
      {/* {headerText.map((item)=>( 
        <TabItemDirective header={headerText}/>
      ))} */}
      {/* <TabItemDirective header={headerText[0]} />
      <TabItemDirective header={headerText[1]} />
      <TabItemDirective header={headerText[2]} />  */}
       {/* {data.map((item)=>( 
         <TabItemDirective header={item.SetName}> </TabItemDirective>
      ))} */}
      
    </TabItemsDirective>
  </TabComponent>

      </div>
    </div>
  );
};

export default Chetan;

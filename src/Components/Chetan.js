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
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
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
import CloseIcon from "@material-ui/icons/Close";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const JsonTable = require("ts-react-json-table");
const Chetan = () => {
  const [items, setItems] = useState([]);
  const [itemsFiltered, setFilteredItems] = useState([]); 
  const [itemsFiltered2,setFilteredItems2]=useState([]) 
  const [itemsFiltered3, setFilteredItems3]=useState([])
  const [Format, setFormat] = useState();
  const [tabs, setTabs] = useState(["Orignal"]);
  const [fileName, setFileName] = useState(null);

  const toolbarOptions = ["ExcelExport"];
  let excelData; 
  let excelData1;
  let excelData2; 
  let excelData3;
  const data = [ 
    {
      SetName: "Orignal",
      FieldCodes: "OrderNumber,OrderName,OrderDate,POSNo,Description,Panel barcode,Article name,Final boardoutput,FinishedMatlNameFull,Material,EdgeBottom W1,EdgeRight W2,EdgeTop L1,EdgeLeft L2,Surface top,Top barcode,Surface bottom,Bottom barcode,CutLength,CutWidth,CutThickness,FinishedLength,FinishedWidth,FinishedThickness,Qty,GrainFlag,PicturePath,Grain direction,Grain direction,Module Comment,Cabinet Remarks,HasDrill,Groove,withGroove,withDrill",
      FieldNames:
      "OrderNumber,OrderName,OrderDate,POSNo,Description,Panel barcode,Article name,Final boardoutput,FinishedMatlNameFull,Material,EdgeBottom W1,EdgeRight W2,EdgeTop L1,EdgeLeft L2,Surface top,Top barcode,Surface bottom,Bottom barcode,CutLength,CutWidth,CutThickness,FinishedLength,FinishedWidth,FinishedThickness,Qty,GrainFlag,PicturePath,Grain direction,Grain direction,Module Comment,Cabinet Remarks,HasDrill,Groove,withGroove,withDrill",
    },
    {
      SetName: "Report 1",
      FieldCodes:
      "OrderNumber,OrderName,OrderDate,Panel barcode,Description,POSNo,Material,FinalBoardOutput,FinishedMatlNameFull,EdgeBottom W1,EdgeRight W2,EdgeTop L1,SurfaceTop",
      FieldNames:
        "OrderDate,OrderNumber,OrderName,ModuleNumber,Description,barcode,Description,FinishedLength,FinishedWidth,FinishedThickness,CutLength,CutWidth,CutThickness,FinalBoardMaterial,Material,SurfaceTop,SurfaceBottom,GrainDirection,TLGrainDir,BLGrainDir,EdgeBottom W1,EdgeRight L1,EdgeTop W2,EdgeLeft L2,TopBarCode,BottomBarCode,Instructions",
    },
    {
      SetName: "Report 2",
      FieldCodes:
      "Description,POSNo,Material,FinalBoardOutput,FinishedMatlNameFull,FinishedThickness,Qty,GrainFlag,Grain direction,withDrill",
      FieldNames:
        "Description,OrderNumber,OrderName,OrderDate,POSNo,Panel barcode,Article name,Final boardoutput,Material,EdgeBottom W1,EdgeRight W2,EdgeTop L1,EdgeLeft L2,Surface top,Top barcode,Surface bottom,Bottom barcode,CutLength,CutWidth,CutThickness,FinishedLength,FinishedWidth,FinishedThickness,Qty,GrainFlag,TL Grain direction,BL Grain direction,Module Comment,Cabinet Remarks",
    },
    {
      SetName: "Report 3",
      FieldCodes:
        "Panel barcode,Material,FinalBoardOutput,FinishedMatlNameFull,FinishedThickness,Qty,GrainFlag,Grain direction,withDrill",
      FieldNames:
        "OrderNumber,OrderName,OrderDate,POSNo,Description,Panel barcode,ArticleName,FinalBoardOutput,Material,EdgeBottom W1,EdgeTop L1,EdgeRight W2,EdgeLeft L2,SurfaceTop,Top barcode,SurfaceBottom,Bottom barcode,CutLength,CutWidth,CutThickness,FinishedLength,FinishedWidth,FinishedThickness,Qty,GrainFlag,TL Grain direction,BL Grain direction",
    },
  ];
  const readExcel = (file) => {
    const myFile = file.name;
   

    setFileName(myFile);
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
        console.log(data,"------json==========")
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((c) => {
      console.log(c, "ccc");
      setItems(c);
      setFilteredItems(c); 
      setFilteredItems2(c); 
      setFilteredItems3(c); 
      
    });
  };  
  var exportFilename1 = { 
    fileName: 'Report1.xlsx',          
 };  
 var exportFilename2={ 
  fileName:"'Report2.xlsx" 
 } 
 var exportFilename3={ 
  fileName:"Report3.xlsx"
 }
 

  const handleChange = (event) => { 
    // debugger
    setFormat(event.target.value);
    
    console.log("data", data);
    console.log("value", event.target.value);
    const index = tabs.indexOf(event.target.value);
    console.log(index, "-----index------");
    if (index === -1) {
      setTabs((arr) => [...arr, event.target.value]);
    }

    const reportData = data.filter(
      (item) => item.SetName === event.target.value
    ); 

    const fieldNamesArray = reportData[0].FieldCodes.split(",");

    

    let finalvalues = [];
    console.log("Gopi2", fieldNamesArray);
    console.log("items", items);
    items.forEach((x) => {
      let finValue = {};

      fieldNamesArray.forEach((fields) => {
        finValue[fields] = x[fields];
      });
      // //  this is the filter which will remove all the key values pairs which are not defined
      // let finalFilterData= Object.fromEntries(Object.entries(finValue).filter(([_, v]) => v != undefined))
      // console.log("finalFilterData", finalFilterData)
      // // console.log("finValue", finValue);

      // finalvalues.push(finValue);
      finalvalues.push(finValue);
    });

    console.log("Gopi", finalvalues);
    console.log(itemsFiltered, "chetan"); 
    

    excelData1.dataSource = [];
    excelData1.columns = [];  
    

    // excelData2.dataSource = [];
    // excelData2.columns = [];  

    // excelData3.dataSource = [];
    // excelData3.columns = [];  

    console.log(excelData1.dataSource, "chetan1")
    
    

    setFilteredItems(finalvalues);
    setFilteredItems2(finalvalues);
    setFilteredItems3(finalvalues); 
   
      
    

    // excelData.refresh()
    // excelData.refreshColumns();
    // excelData.refreshHeaders();
  };

  const handleClick = (item) => { 
    // debugger 
    console.log("event-----",item);
    setFormat(item);

    const reportData = data.filter((i) => i.SetName === item);

    const fieldNamesArray = reportData[0].FieldCodes.split(",");
    let finalvalues = [];
    
    items.forEach((x) => {
      let finValue = {};

      fieldNamesArray.forEach((fields) => {
        finValue[fields] = x[fields];
      });

      finalvalues.push(finValue);
    });

    console.log("Gopi", finalvalues);

    excelData1.dataSource = [];
    excelData1.columns = [];   

    // excelData2.dataSource = [];
    // excelData2.columns = [];  

    // excelData3.dataSource = [];
    // excelData3.columns = [];  
    
    
    


    setFilteredItems(finalvalues);
    setFilteredItems2(finalvalues); 
    setFilteredItems3(finalvalues);  
   
  }; 


  const convertExcelExport = (e) => { 
    
    // alert("chetan")
    if (excelData && e.item.id === "excelData1_excelexport") { 
      var exportProperties = {  
        fileName: 'Report1.xlsx',          
     };
      excelData.excelExport(exportProperties);
    } 
  }; 

  const convertExcelExport1 = (e) => { 
    
    // alert("chetan")
    if (excelData1 && e.item.id === "excelData1_excelexport") { 
      var exportProperties = {  
        fileName: 'Report1.xlsx',          
     };
      excelData1.excelExport(exportProperties);
    } 
  };  

  const convertExcelExport2 = (e) => { 
    
    // alert("chetan")
    if (excelData2 && e.item.id === "excelData2_excelexport") { 
       var excelFile2={
        fileName:"Report2.xlsx"
       }
      excelData2.excelExport(excelFile2);
    } 
  };

  const convertExcelExport3 = (e) => { 
    
    // alert("chetan")
    if (excelData3 && e.item.id === "excelData3_excelexport") { 
      var excelFile3={
        fileName:"Report3.xlsx"
      }
      excelData3.excelExport(excelFile3);
    } 
  };
  

  

  const removeItem = (item) => {
    var array = tabs;
    var index = array.indexOf(item);
    tabs.splice(index, 1);
    setTabs(tabs);
    console.log(tabs, "tabs");
  }; 


 
  return (
    // <div classname="main-container" style={{ margin: 30 }}>
    <div className="height-100 back main-container">
      <div className="mb-2">
        {!fileName && <h3>Please upload a file</h3>}
        {fileName && <h3>File name: {fileName}</h3>}
      </div>
      <label class="label dropdown-container">
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        <span>Select a file</span>
      </label>

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
            defaultValue={data[0].SetName}
          >
            {data.map((item) => (
              <MenuItem key={item} value={item.SetName}>
                {item.SetName}
              </MenuItem>
            ))}
          </Select>

          {/* <Tabs
            className="Nav-Tab-List"
            value={Format}
            indicatorColor="primary"
            textColor="primary"
          >
          </Tabs> */} 
           <div style={{color:"#0E2F41", fontSize:"20px", fontFamily:"Comfortaa_Bold"}} className="Factory-save-button" 
          onClick={()=>{   
            // debugger  
            // alert("chetan")
              excelData1.excelExport(exportFilename1);
              excelData2.excelExport(exportFilename2);
              excelData3.excelExport(exportFilename3);     

           

          //   debugger
          //   // alert("chetan")
               
          //   if(excelData){   
              
          //     excelData.excelExport(exportFilename3) 
          //   }
          
          // excelData2.excelExport()
          // excelData3.excelExport()
          
          }}> 
          Download 

          </div>
        </FormControl>
      </div> 
      <TabComponent className="format-container"> 
      
        {fileName && tabs.map((item) => {
          return (
            <div
              className="report-format "
              onClick={(e) => { 
                handleClick(item);
              }}
            >
              {item}  {" "}
              <div
                style={{
                  display: "inline",
                }}
                onClick={() => removeItem(item)}
              >
                <CloseIcon fontSize='small' />
              </div>
            </div>
          );
        })} 
      </TabComponent>

      <div
        className="col mx-0 px-0 mr-2 back"
        style={{ width: "4000px", marginTop: 10 }}
      >  
          {
                (() => {  
                  if(Format==="Orignal") {
                    return ( 
                      <>  
                      <div style={{ visibility: Format==="Orignal" ? 'visible':'hidden'}}>
                      <GridComponent  
                     
                      // id="test-table-xls-button"
                      width={"75%"} 
                      
                      dataSource={itemsFiltered}
                      id="excelData"
                      ref={(g) => (excelData = g)} 
                      allowRowDragAndDrop={true}
                      allowExcelExport={true}
                      toolbar={["ExcelExport"]}
                      toolbarClick={convertExcelExport}
                    >
                      <Inject services={[Toolbar, ExcelExport]} />
                    </GridComponent>   
                    </div>
                    </>
                    )
                }
              
                    if(Format==='Report 1') {
                            return ( 
                              <>  
                              <div style={{ visibility: Format==="Report 1" ? 'visible' : 'hidden'}} > 
                              <GridComponent 
                              
                              // id="test-table-xls-button"
                              width={"75%"}
                              dataSource={itemsFiltered}
                              id="excelData1"
                              ref={(g) => (excelData1 = g)}
                              allowRowDragAndDrop={true}
                              allowExcelExport={true}
                              toolbar={["ExcelExport"]}
                              toolbarClick={convertExcelExport1}
                            >
                              <Inject services={[Toolbar, ExcelExport]} />
                            </GridComponent>  
                            </div> 
                            </>
                            )
                        }  
                         if (Format==='Report 2') {
                            return ( 
                              <>  
                              <div style={{ visibility: Format==="Report 2" ? 'visible': 'hidden'}}> 
                              <GridComponent 
                              // id="test-table-xls-button"
                              width={"75%"}
                              dataSource={itemsFiltered2}
                              id="excelData2"
                              ref={(g) => (excelData2 = g)}
                              allowRowDragAndDrop={true}
                              allowExcelExport={true}
                              toolbar={["ExcelExport"]}
                              toolbarClick={convertExcelExport2}
                            >
                              <Inject services={[Toolbar, ExcelExport]} />
                            </GridComponent>   
                            </div>
                            </>
                            )
                        }  
                        if(Format==="Report 3") {
                            return (   
                              <> 
                              <div style={{ visibility: Format==="Report 3" ? 'visible': 'hidden'}} >
                              <GridComponent
                              // id="test-table-xls-button"
                              width={"75%"}
                              dataSource={itemsFiltered3}
                              id="excelData3"
                              ref={(g) => (excelData3 = g)}
                              allowRowDragAndDrop={true}
                              allowExcelExport={true}
                              toolbar={["ExcelExport"]}
                              toolbarClick={convertExcelExport3}
                            >
                              <Inject services={[Toolbar, ExcelExport]} />
                            </GridComponent>  
                            </div> 
                            </>
                            )
                        }
                })()  
            }  

        {/* <GridComponent
          // id="test-table-xls-button"
          width={"75%"}
          dataSource={itemsFiltered}
          id="excelData"
          ref={(g) => (excelData = g)}
          allowRowDragAndDrop={true}
          allowExcelExport={true}
          toolbar={["ExcelExport"]}
          toolbarClick={convertExcelExport}
        >
          <Inject services={[Toolbar, ExcelExport]} />
        </GridComponent> */}

        {/* <GridComponent
          // id="test-table-xls-button"
          width={"100%"}
          dataSource={itemsFiltered2}
          id="excelData2"
          ref={(g) => (excelData2 = g)}
          allowRowDragAndDrop={true}
          allowExcelExport={true}
          toolbar={["ExcelExport"]}
          toolbarClick={convertExcelExport}
        >
          <Inject services={[Toolbar, ExcelExport]} />
        </GridComponent> 
        <GridComponent
          // id="test-table-xls-button"
          width={"100%"}
          dataSource={itemsFiltered3}
          id="excelData3"
          ref={(g) => (excelData3 = g)}
          allowRowDragAndDrop={true}
          allowExcelExport={true}
          toolbar={["ExcelExport"]}
          toolbarClick={convertExcelExport}
        >
          <Inject services={[Toolbar, ExcelExport]} />
        </GridComponent>   */}

      
        
       
        
        
         
         
       
      </div>
    </div>
  );
};

export default Chetan;

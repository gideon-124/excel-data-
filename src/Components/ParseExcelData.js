// import React,{useState} from "react";
// import * as XLSX from 'xlsx';
// import "../ReportFormats (1).json";

// class FactoryCutlists extends React.Component { 
//   constructor(props) {
//     super(props);
//     this.state = {
//       columnInCutlist: [],
//       cutListDropdownItems: [],
//       cutListItemsArray: [],
//       addOrEditCutlistArray: [],
//       cutlistDropdownValue: "",
//       setName: "",
//       openDialog: "",
//       selectedItem: "",
//       partner: "",
//       shouldOpenAddOrEditDialog: false,
//       selectedColumnGridItem: ""
//     }
//   }
// }
//   // console.log(data);
//   // const [columnInCutlist, setColumnInCutlist] = useState([]);

//    ExcelDataToGrid = (data) => {
//     let newcutListArray = [];
//     for (var i = 1; i < data.length; i++) {
//       if (data[i]?.length > 0) {
//         newcutListArray.push({
//           cutList: data[i][0],
//           index: i,
//           Description: data[i][1],
//         });
//       }
//     }

//     setColumnInCutlist(newcutListArray);
//     console.log("----",columnInCutlist);
//   };

//    formatData = (cutLists)=>{
//     let cutListDropdownItems = [];
//     let cutListItemsArray = [];

//     cutLists.forEach((entry) => {
//       const fieldNames = entry.fieldNames.split(',');
//       const fieldCodes = entry.fieldCodes.split(',');

//       let addOrEditCutlistArray = [];

//       for (var i = 0; i < fieldNames.length; i++) {
//         addOrEditCutlistArray.push({ cutList: fieldCodes[i], index: i + fieldCodes[i], Description: fieldNames[i] })
//       }
//       let cutListDropdownItemsItem = { setName: entry.setName, addOrEditCutlistArray: addOrEditCutlistArray };
//       cutListDropdownItems.push(entry);
//       cutListItemsArray.push(cutListDropdownItemsItem);
//     });

//     this.setState({
//       cutListDropdownItems,
//       cutListItemsArray,
//     }, () => { this.props.setCutlistFormatState("cutlists", null) })
//   };

//    handleFileRead = (e) => {
//     var data = e.target.result;
//     let readData = XLSX.read(data, { type: "binary" });
//     const wsname = readData.SheetNames[0];
//     const ws = readData.Sheets[wsname];

//     /* Convert array to json*/
//     const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
//     //bind to grid
//     ExcelDataToGrid(dataParse);
//   };

//    handleImportExcel = (event) => {
//     let file = event.target.files[0];
//     if (file && file.name.endsWith(".csv")) {
//       var reader = new FileReader();
//       reader.onloadend = { handleFileRead };
//       reader.readAsBinaryString(file);
//     }else{
//         console.log("---else---");
//     }
//   };


//   render (){
//     <div className="d-flex mt-2" style={{ width: 200 }}>
//     <div>
//       <input
//         style={{ display: "none" }}
//         id={"upload-excel"}
//         type="file"
//         accept="xlsx, csv"
//         onChange={(e) => handleImportExcel(e)}
//       />
//       <label htmlFor={"upload-excel"}>
//         <div className="save-button-text factory-save-button mr-2">
//           import
//         </div>
//       </label>

//       <div className="col mx-0 px-0 mr-2">
//                   <div className="d-flex justify-content-center factory-header-text mb-2">{strings.text_column_in_cutlist}</div>

//                   <GridComponent dataSource={this.state.columnInCutlist} allowPaging={false} height={this.state.gridHeight}
//                     id="columnInCutlistGrid"
//                     ref={g => this.columnInCutlistGrid = g}
//                     allowFiltering={false}
//                     editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true }}
//                     allowRowDragAndDrop={true}
//                     allowExcelExport={true}
//                     selectionSettings={this.selectionSettings}
//                     allowSelection={true}
//                     toolbar={['Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport']}
//                     rowDropSettings={this.rowDropSettingsList}
//                     rowDrop={this.onDrop}
//                     actionComplete={this.actionComplete}
//                     toolbarClick={this.onToolBarClick}
//                     enablePersistence={true}
//                     rowDragStartHelper={this.rowDragStartHelper}
//                   >

//                     <Inject services={[Edit, Selection, Edit, Toolbar, RowDD, ExcelExport]} />

//                     <ColumnsDirective>
//                       <ColumnDirective customAttributes={this.customAttributes} field='index' visible={false} isPrimaryKey={true} headerText="Cut List" width='120' clipMode="EllipsisWithTooltip" textAlign="Left" />
//                       <ColumnDirective customAttributes={this.customAttributes} field='cutList' headerText="Name" width='120' clipMode="EllipsisWithTooltip" textAlign="Left" allowEditing={false} />
//                       <ColumnDirective customAttributes={this.customAttributes} field='Description' headerText="Description" width='120' clipMode="EllipsisWithTooltip" textAlign="Left" />
//                     </ColumnsDirective>
//                   </GridComponent>
//                 </div>

//               </div>


//     </div>
 
//   }
   


// export default ParseExcelData;

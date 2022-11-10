import React,{useState} from 'react' 
import * as  XLSX from 'xlsx'; 

const Grid = () => {  
    const [format, setFormat]=useState()

    const ExcelDataToGrid =(data)=> {
        let newcutListArray = [] 
        for (var i = 1; i < data.length; i++) {
          if (data[i]?.length > 0) {
            newcutListArray.push({ cutList: data[i][0], index: i, Description: data[i][1] })
          }
        } 
        
        
        // setFormat:newcutListArray
    
    //    this.setState({
    //       columnInCutlist: newcutListArray
    //     }); 
    
      } 

      const  handleImportExcel = (event) => {

        let file = event.target.files[0];
        if (file && file.name.endsWith(".xlsx")) {
          var reader = new FileReader();
          reader.onloadend = {handleFileRead};
          reader.readAsBinaryString(file)
        } 
      };
    
       const handleFileRead = (e) => {
    
        var data = e.target.result;
        let readData = XLSX.read(data, { type: 'binary' });
        const wsname = readData.SheetNames[0];
        const ws = readData.Sheets[wsname];
    
        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 }); 
        console.log(dataParse)
        //bind to grid
        {ExcelDataToGrid(dataParse)}; 
      };
    
    
  return (
    <div> 
    <form>
    <label htmlFor="upload">Upload File</label>
    <input
        type="file"
        name="upload"
        id="upload"
        // onChange={readUploadFile} 
        onChange={handleImportExcel}
    />
</form>  

    </div>
  )
}

export default Grid
import { AppBar, Grid, MenuItem, Paper, Select, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from "@material-ui/core";
import _ from 'lodash';
import $ from 'jquery';
import {
  mdiListBoxOutline,
  mdiFile,
  mdiFileChartCheckOutline,
  mdiFileDocumentEditOutline,
  mdiSync,
  mdiTable,
  mdiFileExcelBox,
  mdiFilePowerpointBox,
  mdiFileWordBox,
  mdiImageAlbum,
  mdiAttachment,
  mdiDeleteForever,
  mdiZipBox,
  mdiCloudUpload,
  mdiCloudUploadOutline,
  mdiFilePdfBox,
  mdiWechat,
  mdiFaceAgent,
  mdiAccount,
  mdiRobotExcited,
  mdiSendOutline,
  mdiContentSaveCheckOutline,
  mdiFileUndoOutline,
  mdiTableRowPlusAfter,
  mdiTableRowRemove,
} from "@mdi/js";
import 'react-vertical-timeline-component/style.min.css';
import Icon from "@mdi/react";
import React, { useEffect, useRef, useState } from "react";
import emptyFilesGif from '../upload.gif';
import nodata from '../nodata-removebg-preview.png';
import "../App.css";
import mahLogo from "../mahindra-logo-new.webp";
import { DataGrid, renderEditInputCell, renderEditSingleSelectCell } from "@material-ui/data-grid";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerCircularSplit, SpinnerDiamond, SpinnerInfinity, SpinnerRomb } from "spinners-react";




var initialRowsCopy;
var initialItems = [];
var initialRows = [];
var generalInfoInitialData ={};
var commentsInitial ='';
const PrObjectPage = ()=>{
//    const initialUpdated = true;
const[attachmentsLoader,setAttachmentsLoader]=useState(true);
const [updated,setUpdated]=useState(true);   
// const updated = false;

const [generalInfoData,setgeneralInfoData] = useState(generalInfoInitialData);
const [comments,setComments] = useState(commentsInitial);



    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.zoom = "75%"; 
    
        // Optional: Cleanup function to reset zoom on component unmount if needed
        return () => {
          document.body.style.zoom = "100%";
        };
      }, []);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const PageId = useParams().id;
    const pageStatus = 'Draft Requests';
    const getIconForMediaType = (mediaType) => {
        switch (mediaType) {
          case "application/pdf":
            return <Icon path={mdiFilePdfBox} size={2} color="red" />;
          case "text/csv":
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return <Icon path={mdiFileExcelBox} size={2} color="green" />;
          case "image/png":
          case "image/jpeg":
            return <Icon path={mdiImageAlbum} size={2} color="purple" />;
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return <Icon path={mdiFileWordBox} size={2} color="blue" />;
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return <Icon path={mdiFilePowerpointBox} size={2} color="orange" />;
          case "application/zip":
            return <Icon path={mdiZipBox} size={2} color="orange" />;
          default:
            return <Icon path={mdiFile} size={2} color="gray" />;
        }
      };
    const docTypeOptions = [
        { label: "Inquiry", value: "Inquiry" },
        { label: "Order", value: "Order" },
        { label: "Return", value: "Return" }
      ];
    const EditDropdownCell = ({ id, value, field, api }) => {
        const handleChange = (event) => {
          const newValue = event.target.value;
          api.setEditCellValue({ id, field, value: newValue });
        };
      
        return (
          <Select
            value={value}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            style={{ height: '100%' }}
          >
            {docTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      };
      
      //  = [
        // {
        //   id: 1,
        //   mediaType: "image/png",
        //   fileName: "image1.png",
        // },
        // {
        //   id: 2,
        //   mediaType: "application/pdf",
        //   fileName: "document.pdf",
        // },
        // {
        //   id: 3,
        //   mediaType: "text/plain",
        //   fileName: "notes.txt",
        // },
        // {
        //   id: 4,
        //   mediaType: "video/mp4",
        //   fileName: "video.mp4",
        // },
        // {
        //   id: 5,
        //   mediaType: "audio/mpeg",
        //   fileName: "audio.mp3",
        // },
        // {
        //   id: 6,
        //   mediaType: "image/png",
        //   fileName: "image1.png",
        // },
        // {
        //   id: 7,
        //   mediaType: "application/pdf",
        //   fileName: "document.pdf",
        // },
        // {
        //   id: 8,
        //   mediaType: "text/plain",
        //   fileName: "notes.txt",
        // },
        // {
        //   id: 9,
        //   mediaType: "video/mp4",
        //   fileName: "video.mp4",
        // },
        // {
        //   id: 10,
        //   mediaType: "audio/mpeg",
        //   fileName: "audio.mp3",
        // },
      // ];
      useEffect(()=>{
        $.ajax({
          url: "https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files",
          type: 'GET',
          success: function(res) {
              console.log("setting initialitems");

              let initialItemsCopy = [];
              for(let i=0;i<res.value.length;i++){
                let obj = {};
                obj.id = i + 1; 
                obj.fileName = res.value[i].fileName;
                obj.mediaType = res.value[i].mediaType;
                obj.url = res.value[i].url;
                obj.oId = res.value[i].ID;
                initialItemsCopy.push(obj);
              }
              initialItems = initialItemsCopy;
              setItems(initialItems);
              setAttachmentsLoader(false);
                      },
          error : (res) => {
            console.log(res);
          }
      });
       initialRows = [
        { id: 1, ID: 'QTN-001', DocType: 'Quotation', OrderType: 'Standard' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
        { id: 2, ID: 'QTN-002', DocType: 'Inquiry', OrderType: 'Express' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
        { id: 3, ID: 'QTN-003', DocType: 'Quotation', OrderType: 'Bulk Order' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
        { id: 4, ID: 'QTN-004', DocType: 'Inquiry', OrderType: 'Standard' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
        { id: 5, ID: 'QTN-005', DocType: 'Quotation', OrderType: 'Custom' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
      ];
      setRows(initialRows);
       generalInfoInitialData = {
        "companyName": "ABC Corp",
        "contactPerson": "John Doe",
        "phoneNumber": "+1234567890",
        "emailAddress": "john.doe@abccorp.com",
        "van": "VAN1234",
        "address": "1234 Elm Street, Suite 567, Springfield, IL, USA",
        "documentType": "Quotation",
        "salesOrg": "Sales Organization 1",
        "distributionChannel": "Channel 1",
        "division": "Division A"
      };
      setgeneralInfoData(generalInfoInitialData);
      commentsInitial = 'Draft Comments';
      setComments(commentsInitial);
      },[])
      const [items,setItems] = useState([]);
    
      const testt = () => {
        document.getElementById("inputfile").click();
      };
      const deleteFile = (file) =>{
        
        let filteredFiles = items.filter(item => item.id != file.id);
        setItems(filteredFiles);
      }
      const openFile = (file) => {
        // If the file is stored as a Blob (in memory), create a URL for it
        if (file.blob) {
          const fileURL = URL.createObjectURL(file.blob);
          window.open(fileURL);  // Open the file in a new tab
        } 
        // If you have a direct URL for the file, use it
        else if (file.url) {
          window.open(file.url);  // Open the file using its URL
        } else {
          console.error("File cannot be opened. Missing Blob or URL.");
        }
      };
      const uploadFile = (files) => {
        let newFiles=[];
        let newItemsIds=[];
        for(let i=0;i<items.length;i++){
          let newItem = items[i];
          newItem.id = i + 1;
          newItemsIds.push(newItem);
        }
        for(let i=0;i<files.length;i++){
          const newFile = {
            id: items.length+ i + 1,
            fileName: files[i].name,
            mediaType: files[i].type,
            url: URL.createObjectURL(files[i]), // Create a URL for the file
            fileObj : files[i]
          };
          newFiles.push(newFile);
        }
   
        setItems([...newItemsIds, ...newFiles]);
      };
      const handleDrop = (event) => {
        
        
        let files;
        if(event.dataTransfer && event.dataTransfer.files){
          files = event.dataTransfer.files;
          event.preventDefault();
        }
        else if(event.target && event.target.files)
          files = event.target.files;
        else alert('Oops! You haven’t selected any files. Please choose at least one file to upload.');

        let uploadedFiles =[];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          uploadedFiles.push(file);
        }
        uploadFile(uploadedFiles); 
      };
      const handleCellEditCommit = (newRow) =>{
        
        
        let updatedRow = rows.filter((row)=>row.id == newRow.id)[0];
        updatedRow[newRow.field] = newRow.value;
        initialRowsCopy = rows.map((row)=>{    if (row.id === updatedRow.id) {
            return updatedRow; // Return the updated row
        }
        return row; // Return the original row if it's not the updated one
        })
          }
    const columns = [
        { field: "ID", headerName: "ID",editable: true, minWidth: 250 },
        { field: "DocType", headerName: "DocType", flex: 1 ,editable: true ,renderEditCell :(params) =>  <EditDropdownCell {...params} /> ,minWidth: 250 },
        { field: "OrderType", headerName: "OrderType", flex: 1 ,editable: true ,minWidth: 250 },
        { field: "OrderType1", headerName: "OrderType1", flex: 1 ,editable: true ,minWidth: 250 },
        { field: "OrderType2", headerName: "OrderType2", flex: 1 ,editable: true ,minWidth: 250 },
        { field: "OrderType3", headerName: "OrderType3", flex: 1 ,editable: true ,minWidth: 250 },
      ];
     
      const handeSave = async () =>{
        setAttachmentsLoader(true);
        let newFiles = items.filter((item)=>!item.oId);
        
     for (let index = 0; index < newFiles.length; index++) {
      const file ={
        "mediaType": newFiles[index].mediaType,
        "fileName": newFiles[index].fileName,
        "size": newFiles[index].fileObj.size,
        // "url": "https://6ad3155ftrial-dev-collage-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(id=b740ff11-a084-4624-9bd2-feb7edac0891,IsActiveEntity=true)/content",
        "IsActiveEntity": true,
      };
    await $.ajax({
      url:'https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files',
      method : "POST",
      timeout:0,
      data:JSON.stringify(file),
      contentType:"application/json",
      success:async function (params) {
        console.log(params);
        const reader = new FileReader();
        reader.onload = async function (e) {
            const arrayBuffer = e.target.result; // File data in ArrayBuffer format

           await $.ajax({
                url: `https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(ID=${params.ID},IsActiveEntity=true)/content`,
                method: 'PUT',
                data: arrayBuffer,
                processData: false, // Do not process the data
                contentType: newFiles[index].fileObj.type, // Set content type to file's MIME type
                success: function () {
                    // alert('File uploaded successfully!');
                },
                error: function (err) {
                    console.error('Error uploading file:', err);
                    // alert('File upload failed.');
                }
            });
        };
        reader.readAsArrayBuffer(newFiles[index].fileObj);
      },
      error:function (params) {
        console.log(params);
      }
    });  
     };
      
        let deletedFiles = initialItems.filter((iItem)=>!items.some(item => item.oId === iItem.oId));
        for (let index = 0; index < deletedFiles.length; index++) {
          const deleteUrl=`https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(ID=${deletedFiles[index].oId},IsActiveEntity=true)`;
          await $.ajax({
            url:deleteUrl,
            method:'DELETE',
            success:function (params) {
                console.log(params)            
            },
            error:function (params) {
              console.log(params)            
          }
          });
          
        }

        $.ajax({
          url: "https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files",
          type: 'GET',
          success: function(res) {
              console.log("setting initialitems");

              let initialItemsCopy = [];
              for(let i=0;i<res.value.length;i++){
                let obj = {};
                obj.id = i + 1; 
                obj.fileName = res.value[i].fileName;
                obj.mediaType = res.value[i].mediaType;
                obj.url = res.value[i].url;
                obj.oId = res.value[i].ID;
                initialItemsCopy.push(obj);
              }
              initialItems = initialItemsCopy;
              setItems(initialItems);
              
                      },
          error : (res) => {
            console.log(res);
          }
      });


        setAttachmentsLoader(false);
      }
      
      const [refreshKey, setRefreshKey] = useState(0);

      const refreshElementById = () => {
        setRefreshKey(prevKey => prevKey + 1); // Increment the key to force re-render
      };
      var rowInitialInput;
      if (initialRowsCopy) 
        rowInitialInput = initialRowsCopy;
    else
        rowInitialInput = initialRows;
    const [rows,setRows] = useState(rowInitialInput);
    const [selectedRows,setSelectedRows] = useState([]);
    const addNewRow = () =>{
        const newRow = {id: rows.length + 1 , ID: '', DocType: '', OrderType: '' ,OrderType1: '', OrderType2: '', OrderType3: ''};
        setRows((prevRow) => [...prevRow,newRow]);
    }
   
    const removeRow = () =>{
        if(selectedRows.length > 0){
            
            const filteredRows = rows.filter((row) => !selectedRows.includes(row.id) ).map((row, index) => ({
                    ...row,
                    id: index + 1, // Reassign IDs starting from 1
                }));
                
            setRows(filteredRows);
            setSelectedRows([]);
            refreshElementById();
        }else{
            alert("No rows selected to remove.");
        }
    }
    useEffect(() => {
        // Example logic to update `updated` based on some conditions
        if (_.isEqual(comments, commentsInitial) && _.isEqual(generalInfoData, generalInfoInitialData) &&  _.isEqual(rows, initialRows) &&  _.isEqual(items, initialItems) ) {
          setUpdated(true);
        }else{
            setUpdated(false);
        }
      }, [generalInfoData , rows ,items,comments]);
    const openDialog = () => {
        setIsDialogOpen(true);
      }; 
    
      const closeDialog = () => {
        setIsDialogOpen(false);
      };
    return (
        <div
    id="firstTab"
    
    style={{ display: "flex", flexDirection: "column"}}
  >
   <div
        style={{
          background: "rgb(211 197 255)",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          position: "fixed",
        }}
      ></div>
      <AppBar
      className="objPageAppbar"
        position="static"
        style={{
            
          backgroundColor: "#5b4891",
          boxShadow: "0 1px 10px rgb(5 4 0)",
        }}
      >
        <span
          style={{
            marginRight: "auto",
            color: "#ffffff",
            fontSize: "xx-large",
            fontFamily: "none",
            marginLeft: 'auto',
            marginBottom: '20px',
            marginTop: "10px",
          }}
        >
          {PageId}
        </span>
        <div style={{       height: '20px',     display: 'flex',
    justifyContent: 'center',marginBottom:'20px'}}>
            
            <section className="objPageStatus" style={{      borderRadius: '10px',
    backgroundColor: 'rgb(255 219 23 / 56%)',backdropFilter: 'blur(2px)',
    boxShadow: 'rgb(229 159 0) 0px 2px 15px',   position: 'absolute',padding:'30px',  
    width: '50%',
    textAlign: 'center'}}>
        <div style={{alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'}}> <Icon
                  path={mdiFileDocumentEditOutline}
                  size={1}
                  color="white"
                  style={{ marginRight: "8px" }}
                />
            <span style={{    fontSize: 'x-large',
    fontFamily: 'auto'}}>
            {pageStatus}
        </span></div>
         
            </section>
        
        </div>
        
        {/* <Tabs centered indicatorColor="black" style={{}}>
          <Tab
            className="prtab"
            onClick={() => tabChange("0")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiFileDocumentEditOutline}
                  size={1}
                  color="#FF9800"
                  style={{ marginRight: "8px" }}
                />
                Drafts Requests
              </div>
            }
          />
          <Tab
            className="prtab"
            onClick={() => tabChange("1")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiSync}
                  size={1}
                  color="#2196F3"
                  style={{ marginRight: "8px" }}
                />
                In Process
              </div>
            }
          />
          // Tab for Quotations/Negotiations
          <Tab
            className="prtab"
            onClick={() => tabChange("2")}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "smaller",
                }}
              >
                <Icon
                  path={mdiFileChartCheckOutline}
                  size={1}
                  color="#4CAF50"
                  style={{ marginRight: "8px" }}
                />
                Quotations
              </div>
            }
          />
        </Tabs> */}
      </AppBar>


    <section 
      style={{ marginTop: "12vh", marginLeft: "15vh", marginRight: "15vh" }}
    >
      <div className="prSection"
        style={{
          // boxShadow: 'rgb(31, 31, 31) 0px 0px 15px',
          borderRadius: '20px',
          backgroundColor: 'aliceblue',
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{display:'flex',flexDirection:'row'}}>
          <section
            style={{
              boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
              borderRadius: '10px',
              backgroundColor: "#e5c100",
              width: "90px",
              height: "90px",
              textAlign: 'center',
              alignContent: "center",
              marginLeft: "80p",
              marginTop: "-30px",
              marginLeft: "50px",
            }}
          >
            <Icon path={mdiListBoxOutline} size={1.5}></Icon>

          </section>
          <span style={{    marginTop: 'auto',    marginLeft: '50px',
marginBottom: '5px',
fontSize: 'x-large',
fontFamily: 'auto',
color: '#6d6d6d'}}>General Information.</span>
        </div>
        <div style={{ display: 'flex',
        gap: '20px 40px',
        justifyContent: 'center',
flexDirection: 'row',
flexWrap: 'wrap',     padding: '30px',  minHeight: '100px'}}>
        
        <TextField 
        value={generalInfoData.companyName} 
        className="prfields" 
        required 
        style={{ width: '60ch', backgroundColor: 'white' }} 
        label='Company Name' 
        variant="outlined"
        onChange={(e) => {
            
            setgeneralInfoData({ ...generalInfoData, companyName: e.target.value });
            
    }}
      />

      <TextField 
        value={generalInfoData.contactPerson} 
        className="prfields" 
        required 
        style={{ width: '35ch', backgroundColor: 'white' }} 
        label='Contact Person' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, contactPerson: e.target.value })}
      />

      <TextField 
        value={generalInfoData.phoneNumber} 
        className="prfields" 
        required 
        style={{ width: '25ch', backgroundColor: 'white' }} 
        label='Phone Number' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, phoneNumber: e.target.value })}
      />

      <TextField 
        value={generalInfoData.emailAddress} 
        className="prfields" 
        required 
        style={{ width: '35ch', backgroundColor: 'white' }} 
        label='Email Address' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, emailAddress: e.target.value })}
      />

      <TextField 
        value={generalInfoData.van} 
        className="prfields" 
        required 
        style={{ width: '30ch', backgroundColor: 'white' }} 
        label='VAN' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, van: e.target.value })}
      />

      <TextField 
        value={generalInfoData.address} 
        className="prfields" 
        required 
        style={{ width: '110ch', backgroundColor: 'white' }} 
        label='Address' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, address: e.target.value })}
      />

      <TextField 
        value={generalInfoData.documentType} 
        className="prfields" 
        required 
        style={{ width: '25ch', backgroundColor: 'white' }} 
        label='Document Type' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, documentType: e.target.value })}
      />

      <TextField 
        value={generalInfoData.salesOrg} 
        className="prfields" 
        required 
        style={{ width: '25ch', backgroundColor: 'white' }} 
        label='Sales Org.' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, salesOrg: e.target.value })}
      />

      <TextField 
        value={generalInfoData.distributionChannel} 
        className="prfields" 
        required 
        style={{ width: '25ch', backgroundColor: 'white' }} 
        label='Distribution Channel' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, distributionChannel: e.target.value })}
      />

      <TextField 
        value={generalInfoData.division} 
        className="prfields" 
        required 
        style={{ width: '25ch', backgroundColor: 'white' }} 
        label='Division' 
        variant="outlined"
        onChange={(e) => setgeneralInfoData({ ...generalInfoData, division: e.target.value })}
      />

        </div>
      </div>
    </section>
    <section  style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}>
    <div className="prSection"
        style={{
          // boxShadow: 'rgb(31, 31, 31) 0px 0px 15px',
          borderRadius: '20px',
          backgroundColor: 'aliceblue',
          display: "flex",
          flexDirection: "column",
        }}
      >
         <div style={{display:'flex',flexDirection:'row'}}>
          <section
            style={{
              boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
              borderRadius: '10px',
              backgroundColor: "#e5c100",
              width: "90px",
              height: "90px",
              textAlign: 'center',
              alignContent: "center",
              marginLeft: "80p",
              marginTop: "-30px",
              marginLeft: "50px",
            }}
          >
            <Icon path={mdiTable} size={1.5}></Icon>
          </section>
          <span style={{    marginTop: 'auto',    marginLeft: '50px',
marginBottom: '5px',
fontSize: 'x-large',
fontFamily: 'auto',
color: '#6d6d6d'}}>List of Items.</span>

    <button id="prObjPageSectionButton" className="footerbarbutton" style={{    marginLeft: 'auto',
    marginRight: '6vh',
    paddingLeft: '15px',
    height: 'min-content',
    marginTop: '7vh',
    paddingRight: '15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#6d6d6d',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'}} title="Remove Row." 
    onClick={removeRow}><Icon path={mdiTableRowRemove} size={1.3} color='white'></Icon></button>
    <button id="prObjPageSectionButton" className="footerbarbutton" style={{ 
    marginRight: '20vh',
    paddingLeft: '15px',
    height: 'min-content',
    marginTop: '7vh',
    paddingRight: '15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#6d6d6d',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'}} title="Add Row."  onClick={addNewRow}><Icon path={mdiTableRowPlusAfter} size={1.3} color='white'></Icon></button>
        </div>
            <div style={{ padding: '30px',  minHeight: '100px'}}>
            {/* <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" value='false' ></input></td>
                  <td></td>
                  <td><input type="number" min={1} ></input></td>
                </tr>
              </tbody>
            </table> */}
            
<Paper sx={{ height: '400px', width: '100%' }} id="myDataGrid">
<DataGrid
        key={refreshKey}
        onSelectionModelChange={(params) => setSelectedRows(params)}
       rows={rows}
       columns={columns}
       style={{ maxHeight: '550px', width: '100%',overflowY:'scroll',scrollbarWidth: 'thin',
        scrollbarColor: '#e5c100 #d6d6d6' }}
              autoHeight
       checkboxSelection
       disableSelectionOnClick
      onCellEditCommit={handleCellEditCommit}
 >
  
</DataGrid>
{/* <DataGrid></DataGrid> */}
  {/* <DataGrid
    rows={rows}
    columns={columns}
    initialState={{ pagination: { paginationModel } }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    sx={{ border: 0 }}
  /> */}
</Paper>


            </div>
      </div>
      
    </section>
    <section 
      style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}
    >
      <div className="prSection"
        style={{
          // boxShadow: 'rgb(31, 31, 31) 0px 0px 15px',
          borderRadius: '20px',
          backgroundColor: 'aliceblue',
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{display:'flex',flexDirection:'row'}}>
          <section
            style={{
              boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
              borderRadius: '10px',
              backgroundColor: "#e5c100",
              width: "90px",
              height: "90px",
              textAlign: 'center',
              alignContent: "center",
              marginLeft: "80p",
              marginTop: "-30px",
              marginLeft: "50px",
            }}
          >
            <Icon path={mdiAttachment} size={1.5}></Icon>
          </section>
          <span style={{    marginTop: 'auto',    marginLeft: '50px',
marginBottom: '5px',
fontSize: 'x-large',
fontFamily: 'auto',
color: '#6d6d6d'}}>Attachments.</span>
        </div>
        <div style={{ display: 'flex',
        gap: '20px 40px',
        justifyContent: 'center',
flexDirection: 'row',   padding: '30px',  minHeight: '100px'}}>
        
        
        <div id="files" className="files">
      <div id="dragbox"  style={{
    backgroundImage: `url(${emptyFilesGif})`,    backgroundSize: 'contain', // Adjust size to fit
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   }} className="dragbox" onClick={() => testt()}  onDragOver={(event) => event.preventDefault()} onDrop={(event)=>handleDrop(event)} >

        <input multiple id="inputfile" type="file" hidden onChange={(event) => handleDrop(event)}/>
        {/* <Icon  path={mdiCloudUploadOutline} color='mediumslateblue' size={1.5}></Icon> */}
      
        <h3 style={{    marginBottom: '100%',
    fontFamily: 'system-ui',
    fontWeight: 'lighter'}}>Click / Browse Files to Upload!</h3>
      </div>
{attachmentsLoader?(
  <SpinnerRomb size="6%" thickness={120} style={{margin:'auto'}} ></SpinnerRomb>
):(    items.length > 0 ? (
  <ul className="file-list" style={{ padding: "2%", width: "60%" }}>
    {items.map((file) => (
      <li key={file.id} className="file-item">
        {getIconForMediaType(file.mediaType)}
        <h2 onClick={() => openFile(file)} className="filename">{file.fileName}</h2>
        <Icon className="deletebutton" path={mdiDeleteForever} size={2} color="red" onClick={() => deleteFile(file)} />
      </li>
    ))}
  </ul>
) : (
 
    <img style={{    width: 'auto',
      height: '100%',
      margin: 'auto'}} src={nodata} alt="No files available" />
 
))}


    </div>


       
        </div>
      </div>
    </section>
    <section 
style={{ marginTop: "10vh", marginLeft: "15vh", marginRight: "15vh" }}
>
<div className="prSection"
style={{
  borderRadius: '20px',
  backgroundColor: 'aliceblue',
  display: "flex",
  flexDirection: "column",
}}
>
{/* Header Section */}
<div style={{ display: 'flex', flexDirection: 'row',    alignItems: 'center' }}>
  <section
    style={{
      boxShadow: '0 0px 15px rgb(0 0 0 / 76%)',
      borderRadius: '10px',
      backgroundColor: "#e5c100",
      width: "90px",
      height: "90px",
      textAlign: 'center',
      alignContent: "center",
      marginTop: "-30px",
      marginLeft: "50px",
    }}
  >
    <Icon path={mdiWechat} size={1.5}></Icon>
  </section>
  <span style={{ marginTop: 'auto', marginLeft: '50px', marginBottom: '5px', fontSize: 'x-large', fontFamily: 'auto', color: '#6d6d6d' }}>
    Comments.
  </span>
  <button
    className="normalButton"
    style={{
      marginLeft: 'auto',
      marginRight: '5%',
      marginBottom: '-10px',
      padding: '10px 20px',
      backgroundColor: '#6d6d6d',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease'
    }}
    onClick={openDialog}
  >
    Comment History
  </button>
</div>

{/* Comment Box Section */}
<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '30px', minHeight: '100px' }}>

  <textarea
    placeholder="Write your comment here..."
    value={comments}
    onChange={(e) => setComments(e.target.value )}
    style={{
      fontFamily: 'sans-serif',
      width: '100%',
      minHeight: '80px',
      padding: '10px',
      borderRadius: '10px',
      border: '1px solid #ccc',
      resize: 'none',
      fontSize: '16px',
      scrollbarWidth: 'thin',
scrollbarColor: '#e5c100 #d6d6d6'
    }}
  ></textarea>
  
</div>
</div>
</section>


{isDialogOpen && (      <div id='dialog1'   style={{
    position: 'fixed',
    top: '5%',
    left: '15%',
    width: '70%',
    
    height: '90%',
backgroundColor: '#ece8ff',
boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
borderRadius: '15px',
display: 'flex',
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
zIndex: 3,
}}><h2 style={{    fontSize: 'xx-large',
fontFamily: 'auto',
fontVariant: 'small-caps',
padding: '20px'}}>Comment History</h2>
<div style={{    width: '90%',
height: '80%',
scrollbarColor: '#f1d84f #ededed',
scrollbarWidth: 'thin',
overflowY: 'scroll',
backgroundColor: '#e8e8e8',
border: 'solid 2px',
borderColor: '#988bd5',
boxShadow: 'rgb(152 139 214) 0px 0px 5px',
borderRadius: 'inherit'}} id='timeline1'>
<VerticalTimeline>
<VerticalTimelineElement
className="vertical-timeline-element--replier"
contentStyle={{     color: 'rgb(0, 0, 0)',
borderStyle: 'double',
borderRadius: '10px',
borderColor: '#fc7f00',
boxShadow: 'rgb(255 129 0) 0px 2px 35px',
borderWidth: 'thick' }}
contentArrowStyle={{ borderRight: '7px solid #ffeb3b' ,boxShadow: 'rgb(255 129 0) 0px 2px 35px',}}
date="10:15 AM"
dateClassName="dateClassName"
iconStyle={{ background: '#f57c00', color: '#fff' }}
icon={<Icon path={mdiRobotExcited} size={1}></Icon>}
>
<h3 className="vertical-timeline-element-title">ChatBox</h3>
<p>Welcome! Feel free to ask questions or add comments below.</p>
</VerticalTimelineElement>
{/* First Comment - Message */}
<VerticalTimelineElement
className="vertical-timeline-element--message"
contentStyle={{     color: 'rgb(0, 0, 0)',
borderStyle: 'double',
borderRadius: '10px',
borderColor: '#248b76',
boxShadow: 'rgb(0 121 107) 0px 2px 35px',
borderWidth: 'thick' }}
contentArrowStyle={{ borderRight: '7px solid #e0f7fa',boxShadow: 'rgb(0 121 107) 0px 2px 35px', }}
date="10:00 AM"
dateClassName="dateClassName"
iconStyle={{ background: '#00796b', color: '#fff' }}
icon={<Icon path={mdiAccount} size={1}></Icon>}
>
<h3 className="vertical-timeline-element-title">User 1</h3>
<p>This is the initial comment on the timeline.</p>
</VerticalTimelineElement>

{/* Reply Comment - Replier */}
<VerticalTimelineElement
className="vertical-timeline-element--replier"
contentStyle={{     color: 'rgb(0, 0, 0)',
borderStyle: 'double',
borderRadius: '10px',
borderColor: '#fc7f00',
boxShadow: 'rgb(255 129 0) 0px 2px 35px',
borderWidth: 'thick' }}
contentArrowStyle={{ borderRight: '7px solid #ffeb3b',boxShadow: 'rgb(255 129 0) 0px 2px 35px', }}
date="10:15 AM"
dateClassName="dateClassName"
iconStyle={{ background: '#f57c00', color: '#fff' }}
icon={<Icon path={mdiFaceAgent} size={1}></Icon>}
>
<h3 className="vertical-timeline-element-title">Replier</h3>
<p>This is a reply to the previous comment.</p>
</VerticalTimelineElement>

{/* Second Comment - Message */}
<VerticalTimelineElement
className="vertical-timeline-element--message"
contentStyle={{     color: 'rgb(0, 0, 0)',
borderStyle: 'double',
borderRadius: '10px',
borderColor: '#248b76',
boxShadow: 'rgb(0 121 107) 0px 2px 35px',
borderWidth: 'thick' }}
contentArrowStyle={{ borderRight: '7px solid #e0f7fa',boxShadow: 'rgb(0 121 107) 0px 2px 35px', }}
date="10:30 AM"
dateClassName="dateClassName"
iconStyle={{ background: '#00796b', color: '#fff' }}
icon={<Icon path={mdiAccount} size={1}></Icon>}
>
<h3 className="vertical-timeline-element-title">User 1</h3>
<p>Another message continuing the discussion.</p>
</VerticalTimelineElement>

{/* Reply Comment - Replier */}
<VerticalTimelineElement
className="vertical-timeline-element--replier"
contentStyle={{     color: 'rgb(0, 0, 0)',
borderStyle: 'double',
borderRadius: '10px',
borderColor: '#fc7f00',
boxShadow: 'rgb(255 129 0) 0px 2px 35px',
borderWidth: 'thick' }}
contentArrowStyle={{ borderRight: '7px solid #ffeb3b' ,boxShadow: 'rgb(255 129 0) 0px 2px 35px', }}
date="10:45 AM"
dateClassName="dateClassName"
iconStyle={{ background: '#f57c00', color: '#fff' }}
icon={<Icon path={mdiFaceAgent} size={1}></Icon>}
>
<h3 className="vertical-timeline-element-title">Replier</h3>
<p>Replying again to keep the conversation going.</p>
</VerticalTimelineElement>
</VerticalTimeline>




</div>
<button
style={{
  position: 'relative',
  top: '2%',
  marginTop: 'auto',
  padding: '10px 20px',
  backgroundColor: '#6d6d6d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '20px',
}}
onClick={closeDialog}
className="normalButton"
>
Close
</button>

</div>

)}
{isDialogOpen && (
    <div style={{position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
  backgroundColor: 'rgb(135 135 135 / 34%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  backdropFilter: 'blur(3px)'}} onClick={closeDialog}></div>
)}

<div className="footertab" style={ {  
    padding: '15px',
    zIndex: '1',
    position: 'fixed',
    width: '90%',
    bottom: '7vh',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    placeContent: 'end'}}>
   {updated ? (
<button className="footerbarbutton" style={{   display: 'flex', padding: '10px' ,
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#9583c6bd',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}> <Icon path={mdiSendOutline} size={1} color='white'></Icon> <span style={{    fontFamily: 'auto',
    fontSize: 'x-large',
    color: 'white',
    marginLeft: '10px'}}>Request Quotation</span></button>
   ): (<div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
    <button className="footerbarbutton" style={{   display: 'flex', padding: '10px' ,
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#9583c6bd',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}> <Icon path={mdiContentSaveCheckOutline} size={1} color='white'></Icon> <span style={{    fontFamily: 'auto',
    fontSize: 'x-large',
    color: 'white',
    marginLeft: '10px'}} 
    onClick={handeSave}>Save & Continue</span></button>
    <button className="footerbarbutton" style={{   display: 'flex', padding: '10px' ,
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#9583c6bd',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onClick={()=>{setgeneralInfoData(generalInfoInitialData);
        setRows(initialRows);
        setItems(initialItems);
        setComments(commentsInitial);
    }}
    > <Icon path={mdiFileUndoOutline} size={1} color='white'></Icon> <span style={{    fontFamily: 'auto',
    fontSize: 'x-large',
    color: 'white',
    marginLeft: '10px'}}>Discard Changes</span></button>
    </div>
)} 
</div>

<footer style={{display: 'flex',
    flexDirection: 'row', backgroundColor: '#030e22' ,    marginTop: '40px',
    padding: '40px',    alignItems: 'end',
    justifyContent: 'space-between'}}>
        <img style={{    marginLeft: '50px'}} src={mahLogo}></img>
        <div><var style={{border:'1px solid',    marginRight: '20px',
    color: '#c5c5c5'}}></var>
        <span style={{color:'white'}}>Copyright© 2024 Mahindra&Mahindra Ltd. All Rights Reserved.</span></div>
        
    </footer>
  </div>

    );
}
export default PrObjectPage;
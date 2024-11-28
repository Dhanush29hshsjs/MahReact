import { AppBar, Button, Grid, IconButton, Input, MenuItem, Paper, Select, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from "@material-ui/core";
import _ from 'lodash';
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
  mdiAttachmentCheck,
  mdiForumOutline,
  mdiMinus,
  mdiPlus,
  mdiDeleteForeverOutline,
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
import { deleteAndUpdRequestVehiclesByMaterialCode, deleteFiles, deletePurchaseRequestByUUID, deleteRequestVehiclesByMaterialCode, getCommentsByPurchaseEnquiryUuid, getFilesByPurchaseId, getFilesByUrl, getPurchaseRequestsByCustomerId, getPurchaseRequestsByUUID, getRequestVehiclesByPurchaseEnquiryUuid, getSh, getUserById, getVehiclesInventory, patchGeneralInfo, postFilesPurchaseReq, postRequestVehiclesByMaterialCode } from "../api";





var initialRowsCopy;
var initialItems = [];
var initialRows = [];
var initialRows1 = [];
var generalInfoInitialData ={};
var commentsInitial ='';
const PrObjectPage = ()=>{
//    const initialUpdated = true;
// const [refreshKey, setRefreshKey] = useState(0);
const[generalInfoLoader,setGeneralInfoLoader]=useState(true);
const[vehiclesLoader,setVehiclesLoader]=useState(true);
const[attachmentsLoader,setAttachmentsLoader]=useState(true);
const [updated,setUpdated]=useState(true);   
// const updated = false;
const [vehiclesSh,setVehiclesSh]=useState([]);
const [vehiclesShSelectedRows,setVehiclesShSelectedRows]=useState([]);
const [vehiclesShDialog,setVehiclesShDialog]=useState(false);

const [partnersSh,setPartnersSh]=useState([]);
const [partnersShDialog,setPartnersShDialog]=useState(false);
const [partnersSelectedRow,setPartnersSelectedRow]=useState(null);

const [commonShSelected,setCommonShSelected]=useState(null);
const [commonShSelectedField,setCommonShSelectedField]=useState(null);
const [commonShDialog,setCommonShDialog]=useState(false);
const [docTypeSh,setDocTypeSh]=useState([]);
const [divisionSh,setDivisionSh]=useState([]);
const [distriChSh,setDistriChSh]=useState([]);
const [salesOrgSh,setSalesOrgSh]=useState([]);
const [generalInfoData,setgeneralInfoData] = useState(generalInfoInitialData);
const [comments,setComments] = useState(commentsInitial);
const [commentHistory,setCommentHistory] = useState([]);
const [pageState,setPageState] = useState("");

const handleSelectionChange = (selection) => {
  setVehiclesShSelectedRows(selection); // Update the state with selected row IDs
};

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.zoom = "75%"; 
    
        // Optional: Cleanup function to reset zoom on component unmount if needed
        return () => {
          document.body.style.zoom = "100%";
        };
      }, []);
      // useEffect(async () => {
        // const fetchPageData= async ()=>{
          // try {
            
          
          // } catch (error) {
          //   console.error("Failed to fetch Purchase Request:", error);
          // }
        // }
        // await fetchPageData();
      // },[])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pageEditable, setPageEditable] = useState(false);
    const PageId = useParams().id;
    // const [pageStatus,setPageStatus] = useState("");
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
      
      useEffect( ()=>{
        try {
          
       
      //   $.ajax({

      //     url: "https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files",
      //     type: 'GET',
      //     success: function(res) {
      //         console.log("setting initialitems");

      //         // let initialItemsCopy = [];
      //         for(let i=0;i<res.value.length;i++){
      //           // let obj = {};
      //           // obj.id = i + 1; 
      //           // obj.fileName = res.value[i].fileName;
      //           // obj.mediaType = res.value[i].mediaType;
      //           // obj.url = res.value[i].url;
      //           // obj.oId = res.value[i].ID;
      //           // initialItemsCopy.push(obj);
      //         }
      //         // initialItems = initialItemsCopy;
      //         // setItems(initialItems);
      //         // setAttachmentsLoader(false);
      //                 },
      //     error : (res) => {
      //       console.log(res);
      //     }
      // });

      const fetchGeneralInfo = async ()=>{
        let pr = await getPurchaseRequestsByUUID(PageId);
        let custData = await getUserById(pr.data.value[0].customerId);
        if(pr.data.value[0].status == 'Draft'){
          setPageState('Draft');
        setPageEditable(true);}
        else if(pr.data.value[0].status == 'In Process'){
          setPageState('Quotation');
          setPageEditable(false)}
        else{
        setPageState('In Process');
        setPageEditable(false);  
      }
        generalInfoInitialData = {
          "companyName": custData.companyName,
          "contactPerson": custData.contactPerson,
          "phoneNumber": custData.phone,
          "emailAddress": custData.email,
          "van": custData.van,
          "address": custData.address,
          "purchaseEnquiryId":pr.data.value[0].purchaseEnquiryId,
          "documentType": pr.data.value[0].docType,
          "salesOrg": pr.data.value[0].salesOrg,
          "distributionChannel": pr.data.value[0].distributionChannels,
          "division": pr.data.value[0].division,
          "totalAmount":pr.data.value[0].totalAmount,
          "taxAmount":pr.data.value[0].taxAmount,
          "grandTotal":pr.data.value[0].grandTotal,
        };

        setgeneralInfoData(generalInfoInitialData);
        setGeneralInfoLoader(false);
        let vehicleInvData = await getVehiclesInventory();
        let vehicleInvDataSh = [];
        vehicleInvData.data.value.forEach((element,index) => {
          let vhData ={id:index,vehicleCode:element.vehicleCode,vehicleName:element.vehicleName,vehicleColor:element.vehicleColor,quantity:1};
          vehicleInvDataSh.push(vhData);
        });
        setVehiclesSh(vehicleInvDataSh);

        let partnersData = await getSh('Partners');
        let salesOrgData = await getSh('Sales Org');
        let distriChData = await getSh('Distribution Channel');
        let divisionData = await getSh('Division');
        let docTypeData = await getSh('Document Type');
        let partnersDataSh = [], 
    salesOrgDataSH = [], 
    distriChDataSH = [], 
    divisionDataSH = [], 
    docTypeDataSH = [];

        partnersData.data.value.forEach((element,index) => {
          let ptData ={id:index,sHKey:element.sHKey,sHField:element.sHField,sHId:element.sHId,sHDescription:element.sHDescription};
          partnersDataSh.push(ptData);
        });
        salesOrgData.data.value.forEach((element,index) => {
          let ptData ={id:index,sHKey:element.sHKey,sHField:element.sHField,sHId:element.sHId,sHDescription:element.sHDescription};
          salesOrgDataSH.push(ptData);
        });
        distriChData.data.value.forEach((element,index) => {
          let ptData ={id:index,sHKey:element.sHKey,sHField:element.sHField,sHId:element.sHId,sHDescription:element.sHDescription};
          distriChDataSH.push(ptData);
        });
        divisionData.data.value.forEach((element,index) => {
          let ptData ={id:index,sHKey:element.sHKey,sHField:element.sHField,sHId:element.sHId,sHDescription:element.sHDescription};
          divisionDataSH.push(ptData);
        });
        docTypeData.data.value.forEach((element,index) => {
          let ptData ={id:index,sHKey:element.sHKey,sHField:element.sHField,sHId:element.sHId,sHDescription:element.sHDescription};
          docTypeDataSH.push(ptData);
        });
        setPartnersSh(partnersDataSh);setSalesOrgSh(salesOrgDataSH);setDistriChSh(distriChDataSH);setDivisionSh(divisionDataSH);setDocTypeSh(docTypeDataSH);


        setVehiclesLoader(false);
        commentsInitial =pr.data.value[0].commentsText
        setComments(commentsInitial);
        let commentsHistory = await getCommentsByPurchaseEnquiryUuid(PageId);
        if(commentsHistory.data.value == null ||commentsHistory.data.value == undefined)
          commentsHistory.data.value = [];
        setCommentHistory(commentsHistory.data.value);
        console.log(commentsHistory.data.value);
      let requestVehicleData = await getRequestVehiclesByPurchaseEnquiryUuid(PageId);
      let initialRowsLet =[];
      console.log(requestVehicleData)
      requestVehicleData.data.value.forEach((vehileData,index)=>{
        initialRowsLet.push({id:(index+1),vehicleCode:vehileData.materialCode,vehicleName:vehileData.vehicleName,vehicleColor:vehileData.vehicleColor,quantity:vehileData.quantity,uuid:vehileData.vehicleId,partnerNumber:vehileData.partnerNumber,partnerRole:vehileData.partnerRole,pricePerUnit:vehileData.pricePerUnit,actualPrice:vehileData.actualPrice,band:vehileData.band,discount:vehileData.discount.replace(/[^0-9.]/g, ""),discountpertype:vehileData.discount.includes('%'),discountedPrice:vehileData.discountedPrice,taxPercentage:vehileData.taxPercentage,totalPrice:vehileData.totalPrice});
      })
      initialRows=initialRowsLet;
    //   initialRows = [
    //    // { id: 1, ID: 'QTN-001', DocType: 'Quotation', OrderType: 'Standard' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
    //    // { id: 2, ID: 'QTN-002', DocType: 'Inquiry', OrderType: 'Express' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
    //    // { id: 3, ID: 'QTN-003', DocType: 'Quotation', OrderType: 'Bulk Order' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
    //    // { id: 4, ID: 'QTN-004', DocType: 'Inquiry', OrderType: 'Standard' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
    //    // { id: 5, ID: 'QTN-005', vehicleCode: 'Quotation', OrderType: 'Custom' ,OrderType1: 'Standard', OrderType2: 'Standard', OrderType3: 'Standard'},
    //  ];
    if(initialRows == null ||initialRows == undefined)
      initialRows =[];
     setRows(initialRows);
     if(initialRows1.length!=initialRows.length)
      initialRows.forEach((row)=>{
        initialRows1.push(row);
        console.log(row);
      });
     
let FilesData = await getFilesByPurchaseId(PageId);
let initialItemsCopy = [];
// FilesData.data.value.forEach(async (file,index)=>{

  for(let i = 0;i<FilesData.data.value.length;i++){
    console.log(FilesData.data.value[i].id);
    let fileObj = await getFilesByUrl(`EnquiryFiles/${FilesData.data.value[i].id}/content`);
    console.log(fileObj);
  
    let obj = {};
    obj.id = i + 1; 
    obj.fileName = FilesData.data.value[i].fileName;
    obj.mediaType = FilesData.data.value[i].mediaType;
    obj.url =  URL.createObjectURL(fileObj);
    obj.oId = FilesData.data.value[i].id;
    initialItemsCopy.push(obj);
}
initialItems = initialItemsCopy;
if(initialItems == null ||initialItems == undefined)
  initialItems = [];
              setItems(initialItems);
              setAttachmentsLoader(false);

      }
      
      fetchGeneralInfo();
           
      
      
    } catch (error) {
            console.error(error);
    }
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
      const handleEditCellChange  = (params) =>{
        if(params.field == 'quantity'){
          if (params.props.value < 0) {
            params.props.value = 0;
          } 
          else if (params.props.value > 100) {
            params.props.value = 100;
          }
        }
      }
      const handleCellEditCommit = (newRow) =>{ 
        let updatedRow = rows.filter((row)=>row.id == newRow.id)[0];
        updatedRow[newRow.field] = newRow.value;
        initialRowsCopy = rows.map((row)=>{    if (row.id === updatedRow.id) {
            return updatedRow; // Return the updated row
        }
        return row; // Return the original row if it's not the updated one
        })
          }


          const [errors, setErrors] = useState({}); // Track errors by row ID

          const updateQuantity = (id, value) => {
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === id ? { ...row, quantity: value } : row
              )
            );
          };
        
          const handleInputChange = (id, value) => {
            if (value >= 1 && value <= 100) {
              updateQuantity(id, value);
              setErrors((prev) => ({ ...prev, [id]: false }));
            } else {
              setErrors((prev) => ({ ...prev, [id]: true }));
            }
          };
        
    const columns = [
        { field: "vehicleCode", headerName: "Vehicle Code", minWidth: 300 },
        // { field: "DocType", headerName: "DocType", flex: 1 ,editable: true ,renderEditCell :(params) =>  <EditDropdownCell {...params} /> ,minWidth: 250 },
        { field: "vehicleName", headerName: "Vehicle Name", flex: 1  ,minWidth: 350 },
        { field: "vehicleColor", headerName: "Vehicle Color", flex: 1  ,minWidth: 350 },
        // { field: "quantity", headerName: "quantity", flex: 1 ,editable: pageEditable ,minWidth: 200 ,type:'number' },
        {
          field: "quantity",
          headerName: "Quantity",
          flex: 1,
          minWidth: 200,
          // editable: true,
          type: "number",
          renderCell: pageEditable?(params) => {
            const hasError = errors[params.id] || false;
    
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() =>
                    handleInputChange(params.id, params.row.quantity - 1)
                  }
                  disabled={params.row.quantity <= 1}
                >
                  {/* <RemoveIcon /> */}

                  <Icon 
                  path={mdiMinus}
                  size={1}
                  color="black"
                  style={{ marginRight: "8px" }}
                />
                </Button>
                <TextField
                  value={params.row.quantity}
                  onChange={(e) =>
                    handleInputChange(params.id, parseInt(e.target.value, 10) || 0)
                  }
                  error={hasError}
                  helperText={hasError ? "Quantity must be between 1 and 100" : ""}
                  variant="standard"
                  // size="small"
                  style={{ width: "60px", margin: "0 10px" }}
                />
                <Button
                  onClick={() =>
                    handleInputChange(params.id, params.row.quantity + 1)
                  }
                  disabled={params.row.quantity >= 100}
                >
                 <Icon 
                  path={mdiPlus}
                  size={1}
                  color="black"
                  style={{ marginRight: "8px" }}
                />
                </Button>
              </div>
            );
          }:undefined,
        },
        { field: "partnerRole", renderCell: (params) =>{
          const hasError = params.value?false:true;
          return (
            <>
            {pageState == 'Draft'?(  <TextField
              value={params.value || ""}
              onClick={()=>handlePartnersShOpen(params.id)}
              error={hasError}
              helperText={hasError ? "* Required" : ""}
              variant="standard"
              style={{ width: "100%" }}
            />):(<div>{params.value}</div>)}
            </>
          );},  headerName: "Partner Role", flex: 1  ,minWidth: 350 },
        { field: "partnerNumber", renderCell: (params) =>{
          const hasError = params.value?false:true;
          return (
            <>
            {pageState == 'Draft'?(
              <TextField
                value={params.value || ""}
                onClick={()=>handlePartnersShOpen(params.id)}
                error={hasError}
                helperText={hasError ? "* Required" : ""}
                variant="standard"
                style={{ width: "100%" }}
              />):(<div>{params.value}</div>)}
              </>
            // </div>
          );}, headerName: "Partner Number", flex: 1  ,minWidth: 350 },


          {hide:pageState == 'Quotation'?false:true, field: "pricePerUnit", headerName: "Price per Unit.", flex: 1  ,minWidth: 350 },
          {hide:pageState == 'Quotation'?false:true, field: "actualPrice", headerName: "Actual Price", flex: 1  ,minWidth: 350 },
          {hide:pageState == 'Quotation'?false:true, field: "band", headerName: "Band Applied", flex: 1  ,minWidth: 350 },
          {hide:pageState == 'Quotation'?false:true, field: "discount", headerName: "Discount % / price", flex: 1  ,minWidth: 350 ,renderCell:(params)=>(<><TextField  onChange={(e)=>{
           if(e.target.value.trim() == "")
            e.target.value ='0';
           if(e.target.value.includes("-"))
            return
            let row = rows.find((row)=>row.id == params.row.id);
           let bandper =  parseFloat(row.band.match(/\((.+?)%\)/)[1]).toFixed(2);
           let actualPrice = parseFloat(row.actualPrice);
            if(row.discountpertype){
              var discountedprice = (actualPrice - (actualPrice * ((parseFloat(bandper)+parseFloat(parseFloat(e.target.value).toFixed(2))) / 100)));
              if(discountedprice < 1)
                return
              var totalprice = discountedprice + ((parseFloat(row.taxPercentage)*discountedprice)/100 );
            }else{
              var discountedprice = (actualPrice - (actualPrice * (parseFloat(bandper)/ 100)))-e.target.value;
              if(discountedprice < 1)
                return
              var totalprice = discountedprice + ((parseFloat(row.taxPercentage)*discountedprice)/100 );
            }
            if(e.target.value =='0')
              e.target.value =''
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === params.row.id ? { ...row, discount: e.target.value,discountedPrice:discountedprice.toString(),totalPrice:totalprice.toString() } : row
              )
            );
          }} value={params.value}></TextField> <div style={{margin:'auto'}}><input  id={params.id}
           onChange={()=>{console.log("hi",params.id)
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === params.id ? { ...row,discountpertype:!row.discountpertype} : row
              )
            );



            let row = rows.find((row)=>row.id == params.id);
            if(row.discount.trim() == "")
              row.discount ='0';
             if(row.discount.includes("-"))
              return
             
             let bandper =  parseFloat(row.band.match(/\((.+?)%\)/)[1]).toFixed(2);
             let actualPrice = parseFloat(row.actualPrice);
              if(!row.discountpertype){
                var discountedprice = (actualPrice - (actualPrice * ((parseFloat(bandper)+parseFloat(parseFloat(row.discount).toFixed(2))) / 100)));
                if(discountedprice < 1){
                  row.discount='0'
                  var discountedprice = (actualPrice - (actualPrice * ((parseFloat(bandper)+parseFloat(parseFloat(row.discount).toFixed(2))) / 100)));
                  var totalprice = discountedprice + ((parseFloat(row.taxPercentage)*discountedprice)/100 );
                   if(row.discount =='0')
                row.discount =''
                  setRows((prevRows) =>
                    prevRows.map((row) =>
                      row.id === params.row.id ? { ...row, discount: '',discountedPrice:discountedprice.toString(),totalPrice:totalprice.toString() } : row
                    )
                  );
                  return
                }
                var totalprice = discountedprice + ((parseFloat(row.taxPercentage)*discountedprice)/100 );
              }else{
                var discountedprice = (actualPrice - (actualPrice * (parseFloat(bandper)/ 100)))-parseFloat(row.discount);
                if(discountedprice < 1){
                  row.discount='0'
                  var discountedprice = (actualPrice - (actualPrice * ((parseFloat(bandper)+parseFloat(parseFloat(row.discount).toFixed(2))) / 100)));
                  var totalprice = discountedprice + ((parseFloat(row.taxPercentage)*discountedprice)/100 );
                  if(row.discount =='0')
                row.discount =''
                  setRows((prevRows) =>
                    prevRows.map((row) =>
                      row.id === params.row.id ? { ...row, discount: '',discountedPrice:discountedprice.toString(),totalPrice:totalprice.toString() } : row
                    )
                  );
                return
                }
                var totalprice = discountedprice + ((parseFloat(row.taxPercentage)*discountedprice)/100 );
              }
              if(row.discount =='0')
                row.discount =''
              setRows((prevRows) =>
                prevRows.map((row) =>
                  row.id === params.row.id ? { ...row, discount: row.discount.toString(),discountedPrice:discountedprice.toString(),totalPrice:totalprice.toString() } : row
                )
              );

          }}
           checked={ rows.find((row)=>row.id == params.id).discountpertype} type="checkbox"/>%</div></>)},
          {hide:pageState == 'Quotation'?false:true, field: "discountedPrice", headerName: "Discounted Price", flex: 1  ,minWidth: 350 },
          {hide:pageState == 'Quotation'?false:true, field: "taxPercentage", headerName: "Tax", flex: 1  ,minWidth: 350 },
          {hide:pageState == 'Quotation'?false:true, field: "totalPrice", headerName: "Total Price", flex: 1  ,minWidth: 350 },
      ];
      const columnsVehicleSh = [
        { field: "vehicleCode", headerName: "Vehicle Code", flex: 1  },
        { field: "vehicleName", headerName: "Vehicle Name", flex: 1  },
        { field: "vehicleColor", headerName: "Vehicle Color", flex: 1  }
      ];
      const columnsCommonSh = [
        { field: "sHKey",hide:true, headerName: "Vehicle Code", flex: 1  },
        { field: "sHField",hide:true, headerName: "Vehicle Name", flex: 1  },
        { field: "sHId", headerName: "Code", flex: 1  },
        { field: "sHDescription", headerName: "Name", flex: 1  },
      ];
      const columnsPartnersSh = [
        { field: "sHKey",hide:true, headerName: "Vehicle Code", flex: 1  },
        { field: "sHField",hide:true, headerName: "Vehicle Name", flex: 1  },
        { field: "sHId", headerName: "Role", flex: 1  },
        { field: "sHDescription", headerName: "Number", flex: 1  },
      ];
     
      const handeSave = async () =>{
        setAttachmentsLoader(true);
        if(!_.isEqual(generalInfoData, generalInfoInitialData) || !_.isEqual(comments, commentsInitial)){
          setGeneralInfoLoader(true);
          try {
            let body={contactPerson:generalInfoData.contactPerson,distributionChannels:generalInfoData.distributionChannel,division:generalInfoData.division,docType:generalInfoData.documentType,salesOrg:generalInfoData.salesOrg,commentsText:comments,totalAmount:generalInfoData.totalAmount,taxAmount:generalInfoData.taxAmount,grandTotal:generalInfoData.grandTotal}
            let res=await patchGeneralInfo(PageId,body);
            console.log(res);
            let pr = await getPurchaseRequestsByUUID(PageId);
        let custData = await getUserById(pr.data.value[0].customerId);
            generalInfoInitialData = {
              "companyName": custData.companyName,
              "contactPerson": custData.contactPerson,
              "phoneNumber": custData.phone,
              "emailAddress": custData.email,
              "van": custData.van,
              "address": custData.address,
              "documentType": pr.data.value[0].docType,
              "salesOrg": pr.data.value[0].salesOrg,
              "distributionChannel": pr.data.value[0].distributionChannels,
              "division": pr.data.value[0].division,
              "totalAmount":pr.data.value[0].totalAmount,
          "taxAmount":pr.data.value[0].taxAmount,
          "grandTotal":pr.data.value[0].grandTotal,
            };
    
            setgeneralInfoData(generalInfoInitialData);
            
            commentsInitial =pr.data.value[0].commentsText
        setComments(commentsInitial);
        
            setGeneralInfoLoader(false);
          } catch (error) {
              console.error("Failed to updategeneralInfo:", error);
          }
          setGeneralInfoLoader(false);
          }
          if(!_.isEqual(rows, initialRows)){
            try {
              setVehiclesLoader(true);
              let deletedRows = initialRows.filter((initialRow)=>!rows.some((row)=>row.vehicleCode == initialRow.vehicleCode));

              let newRows = rows.filter((row)=>!initialRows.some((iRow)=>iRow.vehicleCode== row.vehicleCode));
              // let updatedRows = rows.filter((row)=>initialRows.some((iRow)=>iRow.vehicleCode== row.vehicleCode ));
              let updatedRows = rows.filter((row) => 
                initialRows1.some((iRow) => 
                  (iRow.vehicleCode == row.vehicleCode && (iRow.quantity != row.quantity ||iRow.partnerRole != row.partnerRole ||iRow.partnerNumber != row.partnerNumber||iRow.discount != row.discount||iRow.discountedPrice != row.discountedPrice||iRow.totalPrice != row.totalPrice||iRow.discount != row.discount||iRow.discountpertype != row.discountpertype))
                )
              );

              const vehicleItemsOnSave = async ()=>{
                return new Promise(async (resolve)=>{
                  let delRes=await deleteAndUpdRequestVehiclesByMaterialCode(initialRows1,deletedRows,updatedRows,PageId);
              let postRes = await postRequestVehiclesByMaterialCode(newRows,PageId);
             
              resolve()
                })
              }
              await vehicleItemsOnSave();
              let requestVehicleData = await getRequestVehiclesByPurchaseEnquiryUuid(PageId);
              let initialRowsLet =[];
              console.log(requestVehicleData)
              requestVehicleData.data.value.forEach((vehileData,index)=>{
                initialRowsLet.push({id:(index+1),vehicleCode:vehileData.materialCode,vehicleName:vehileData.vehicleName,vehicleColor:vehileData.vehicleColor,quantity:vehileData.quantity,uuid:vehileData.vehicleId,partnerNumber:vehileData.partnerNumber,partnerRole:vehileData.partnerRole,pricePerUnit:vehileData.pricePerUnit,actualPrice:vehileData.actualPrice,band:vehileData.band,discount:vehileData.discount.replace(/[^0-9.]/g, ""),discountpertype:vehileData.discount.includes('%'),discountedPrice:vehileData.discountedPrice,taxPercentage:vehileData.taxPercentage,totalPrice:vehileData.totalPrice});
              })
              initialRows=initialRowsLet;
            
             setRows(initialRows);
             if(initialRows1.length!=initialRows.length)
              initialRows.forEach((row)=>{
                initialRows1.push(row);
                console.log(row);
              });
              setVehiclesLoader(false);
            } catch (error) {
              console.error("Failed to Update vehice Items:", error);
            }
            setVehiclesLoader(false)
          }

        let newFiles = items.filter((item)=>!item.oId);
        let deletedFiles = initialItems.filter((iItem)=>!items.some(item => item.oId === iItem.oId));
        // if(newFiles)
        //   await newFilesPr;
     
        function newFilesPr() {
          return  new Promise((resolve)=>{
            for (let index = 0; index < newFiles.length; index++) {
              const file ={
                "mediaType": newFiles[index].mediaType,
                "fileName": newFiles[index].fileName,
                "size": newFiles[index].fileObj.size,
                // "url": "https://6ad3155ftrial-dev-collage-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(id=b740ff11-a084-4624-9bd2-feb7edac0891,IsActiveEntity=true)/content",
                // "IsActiveEntity": true,
                "purchaseEnquiryUuid":PageId
              };
              const reader = new FileReader();
              
              reader.onload = async function (e) {
                const arrayBuffer = e.target.result; // File data in ArrayBuffer format
                let res= await postFilesPurchaseReq(file,arrayBuffer);
                console.log(res);
              //  await $.ajax({
              //       url: `https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(ID=${params.ID},IsActiveEntity=true)/content`,
              //       method: 'PUT',
              //       data: arrayBuffer,
              //       processData: false, // Do not process the data
              //       contentType: newFiles[index].fileObj.type, // Set content type to file's MIME type
              //       success: function () {
              //           // alert('File uploaded successfully!');
              //       },
              //       error: function (err) {
              //           console.error('Error uploading file:', err);
              //           // alert('File upload failed.');
              //       }
              //   });
            };
            reader.readAsArrayBuffer(newFiles[index].fileObj);
              
        
            // await $.ajax({
            //   url:'https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files',
            //   method : "POST",
            //   timeout:0,
            //   data:JSON.stringify(file),
            //   contentType:"application/json",
            //   success:async function (params) {
            //     console.log(params);
            //     // // const reader = new FileReader();
            //     // reader.onload = async function (e) {
            //     //     const arrayBuffer = e.target.result; // File data in ArrayBuffer format
        
            //     //    await $.ajax({
            //     //         url: `https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(ID=${params.ID},IsActiveEntity=true)/content`,
            //     //         method: 'PUT',
            //     //         data: arrayBuffer,
            //     //         processData: false, // Do not process the data
            //     //         contentType: newFiles[index].fileObj.type, // Set content type to file's MIME type
            //     //         success: function () {
            //     //             // alert('File uploaded successfully!');
            //     //         },
            //     //         error: function (err) {
            //     //             console.error('Error uploading file:', err);
            //     //             // alert('File upload failed.');
            //     //         }
            //     //     });
            //     // };
            //     // reader.readAsArrayBuffer(newFiles[index].fileObj);
            //   },
            //   error:function (params) {
            //     console.log(params);
            //   }
            // });  
             };
             resolve();
          })
        }
        
        function deleteFilesPr(){
          return  new Promise(async (resolve)=>{
            let deletedRes =await deleteFiles(deletedFiles);
            console.log(deletedRes);
            // for (let index = 0; index < deletedFiles.length; index++) {
            //   const deleteUrl=`https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(ID=${deletedFiles[index].oId},IsActiveEntity=true)`;
            //   await $.ajax({
            //     url:deleteUrl,
            //     method:'DELETE',
            //     success:function (params) {
            //         console.log(params)            
            //     },
            //     error:function (params) {
            //       console.log(params)            
            //   }
            //   });
              
            // }
  resolve();  
          });
        }
        function resetFilesPr(){
          return new Promise(async (resolve)=>{
           
    const intervalId = setInterval(async () => {
      let FilesData = await getFilesByPurchaseId(PageId);
      let initialItemsCopy = [];
      // FilesData.data.value.forEach(async (file,index)=>{
      
        for(let i = 0;i<FilesData.data.value.length;i++){
          console.log(FilesData.data.value[i].id);
          let fileObj = await getFilesByUrl(`EnquiryFiles/${FilesData.data.value[i].id}/content`);
          console.log(fileObj);
        
          let obj = {};
          obj.id = i + 1; 
          obj.fileName = FilesData.data.value[i].fileName;
          obj.mediaType = FilesData.data.value[i].mediaType;
          obj.url =  URL.createObjectURL(fileObj);
          obj.oId = FilesData.data.value[i].id;
          initialItemsCopy.push(obj);
      }
      initialItems = initialItemsCopy;   
      const currentFileNames = initialItems.map(item => item.fileName);
      const existingFileNames = items.map(file => file.fileName);
    
      // Check if all file names in `currentFileNames` are present in `existingFileNames`
      const allNamesMatch = currentFileNames.every(name => existingFileNames.includes(name));
    
      if (allNamesMatch) {
        console.log("All file names are present. Stopping interval.");
        clearInterval(intervalId); // Stop the interval
        setItems(initialItems); // Update the state
        setAttachmentsLoader(false); // Turn off loader if applicable
        resolve();
      }
    }, 2000);
                  // setItems(initialItems);
                  // setAttachmentsLoader(false);
                  
          })
        }

        // Usage example
        // async function runFunction() {
          await newFilesPr();
          await deleteFilesPr();
          await resetFilesPr();
        // }
        
        // runFunction();
        


        
        
        // if(deletedFiles)
        //   await deleteFilesPr;
       
  //       Promise.all([newFilesPr, deleteFilesPr])
  // .then(async () => {
  //   console.log("done");
    

  // })
  // .catch((error) => {
  //   console.error("An error occurred:", error);
  // });

      //   $.ajax({
      //     url: "https://dde7cfc6trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files",
      //     type: 'GET',
      //     success: function(res) {
      //         console.log("setting initialitems");

      //         let initialItemsCopy = [];
      //         for(let i=0;i<res.value.length;i++){
      //           let obj = {};
      //           obj.id = i + 1; 
      //           obj.fileName = res.value[i].fileName;
      //           obj.mediaType = res.value[i].mediaType;
      //           obj.url = res.value[i].url;
      //           obj.oId = res.value[i].ID;
      //           initialItemsCopy.push(obj);
      //         }
      //         initialItems = initialItemsCopy;
      //         setItems(initialItems);
              
      //                 },
      //     error : (res) => {
      //       console.log(res);
      //     }
      // });


      //   setAttachmentsLoader(false);
      }
      const requestQuotation = async ()=>{
        setGeneralInfoLoader(true);
        setVehiclesLoader(true);
        setAttachmentsLoader(true);
        var errString="";
        if(rows.length == 0)
          errString+= "\n-> Please select atlesat 1 item to request for quotation";
        if(rows.some((row)=>(!row.partnerRole ||!row.partnerNumber)))
          errString+= "\n-> Mandatory fields to be filled in List Of Items";
          if(items.length == 0)
            errString+= "\n-> Attachments are mandatory ";
          if(!comments)
            errString+= "\n-> Comments are mandatory";
            if(!generalInfoData.division|| !generalInfoData.distributionChannel||!generalInfoData.salesOrg||!generalInfoData.documentType)
       errString+= "\n-> some Mandatory fields are missing please make sure to fill them out!!";
        if(errString != ""){
          alert(errString);
          setGeneralInfoLoader(false);
        setVehiclesLoader(false);
        setAttachmentsLoader(false);
        return;
        }
            const reqQuotePr = async ()=>{
          return new Promise(async (resolve)=>{
            let res = await patchGeneralInfo(PageId,{status:'Create Request'});//deploy
            if(res){//deploy
// let pr =async()=> new Promise((resolve)=>{ setTimeout(() => {//testing
  
  // resolve();//testing
// }, 4000);})//testing
// await pr();//testing
setPageEditable(false);
setGeneralInfoLoader(false);
        setVehiclesLoader(false);
        setAttachmentsLoader(false);
            setPageState("In Process");
            resolve();//deploy
          }//deploy
          })
        }

       reqQuotePr();
       setRefreshKey1((prevKey) => prevKey + 1);
      // window.location.reload();
      };
      const [refreshKey, setRefreshKey] = useState(0);
      const [refreshKey1, setRefreshKey1] = useState(0);
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
    useEffect(()=>{
      let updatedVehicleSh= vehiclesSh.filter((vSh)=>!rows.some((row) => row.vehicleCode === vSh.vehicleCode));
      setVehiclesSh(updatedVehicleSh);

     },[rows])
    const addNewRow = (params) =>{
      console.log(vehiclesShSelectedRows);
      let newVehicles = vehiclesSh.filter((vehicle)=>vehiclesShSelectedRows.includes(vehicle.id));
      setVehiclesShDialog(false);
      newVehicles.forEach(async (newVeh,index) =>{
        newVeh.id = rows.length + (index + 1);
// const newRow = {id: rows.length + 1 ,vehicleCode:newVeh.vehicleCode,vehicleName:newVeh.vehicleName,vehicleColor:newVeh.vehicleColor};

      })
       setRows((prevRow) => [...prevRow, ...newVehicles]);   
       setVehiclesShSelectedRows([]);    
    }
   
    const removeRow = () =>{
        if(selectedRows.length > 0){
            
            const filteredRows = rows.filter((row) => !selectedRows.includes(row.id) ).map((row, index) => ({
                    ...row,
                    id: index + 1, // Reassign IDs starting from 1
                }));
              let newVehicleSh = rows.filter((row)=>filteredRows.some((fRow)=>fRow.vehicleCode !=  row.vehicleCode) );
              newVehicleSh.forEach((newVh,index)=>{
                newVh.id = index+1;
                newVh.quantity = 1;
              });
              vehiclesSh.forEach((vSh,index)=>{
                vSh.id = newVehicleSh.length + (index+1);
                
                newVehicleSh.push(vSh);
              })
              setVehiclesSh(newVehicleSh);
            setRows(filteredRows);
            setSelectedRows([]);
            refreshElementById();
        }else{
            alert("No rows selected to remove.");
        }
    }
    useEffect(() => {
      if(rows){
        let totalPrice=0;
        let grandTotal=0;
        rows.forEach((row)=>{
          totalPrice += parseFloat(parseFloat(row.discountedPrice).toFixed(2));
          grandTotal += parseFloat(parseFloat(row.totalPrice).toFixed(2));
        });
        let taxamt = parseFloat(parseFloat(grandTotal-totalPrice).toFixed(2));
        setgeneralInfoData((prev) => ({
          ...prev,
          totalAmount: totalPrice.toString(),
          taxAmount: taxamt.toString(),
          grandTotal: grandTotal.toString(),
        }));
      }
    },[rows])
    useEffect(() => {
        // Example logic to update `updated` based on some conditions
        if (_.isEqual(comments, commentsInitial) && _.isEqual(generalInfoData, generalInfoInitialData) &&  _.isEqual(rows, initialRows) &&  _.isEqual(items, initialItems) ) {
          setUpdated(true);
        }else{
            setUpdated(false);
            console.log(_.isEqual(comments, commentsInitial) , _.isEqual(generalInfoData, generalInfoInitialData) ,  _.isEqual(rows, initialRows) ,  _.isEqual(items, initialItems) )
          console.log(generalInfoData,generalInfoInitialData)
          }
        
      }, [generalInfoData , rows ,items,comments]);
    const openDialog = () => {
        setIsDialogOpen(true);
      }; 
    
      const closeDialog = () => {
        setIsDialogOpen(false);
      };
      const addPartner = async(params)=>{
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === partnersSelectedRow ? { ...row, partnerRole: params.row.sHId,partnerNumber:params.row.sHDescription } : row
          )
        );
        setPartnersSelectedRow(null);
        setPartnersShDialog(false);
      }
      const handlePartnersShOpen = async(params)=>{
        if(pageState=='Draft'){
          setPartnersSelectedRow(params);
        setPartnersShDialog(true);
        }
        
      }
      const addFieldFromSh = async(params)=>{
        // setgeneralInfoData({...generalInfoData,documentType:params.row.sHId});
        setgeneralInfoData((prev) => ({
          ...prev,
          [commonShSelectedField]: params.row.sHId,
        }));
        setCommonShDialog(false);setCommonShSelected(null);setCommonShSelectedField(null);
      }
      const handleCommonShOpen = async(field)=>{
        if(pageState=='Draft'){
        setCommonShSelectedField(field);
        if(field =='documentType' )
        setCommonShSelected(docTypeSh);
     else if(field ==  'salesOrg')
        setCommonShSelected(salesOrgSh);
     else if(field ==  'distributionChannel' )
        setCommonShSelected(distriChSh);
      else if(field == 'division')
        setCommonShSelected(divisionSh);
      setCommonShDialog(true);
}
      }
      const getDisplayValue = (doctype,arr)=>{
        let description = arr.find((obj)=>obj.sHId == doctype);
        if(description)
return doctype+" ("+description.sHDescription+")";
        return ""
      }
    return (
        <div
    id="firstTab"
    key={refreshKey1}
    style={{ display: "flex", flexDirection: "column"}}
  >
   <div
        style={{
          // rgb(211, 197, 255)
          background: "rgb(226 226 255)",
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
        <div style={{display:'flex',
flexDirection:'row'}}>
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
          {generalInfoData.purchaseEnquiryId}
          
        </span>
        {pageState == 'Draft' && (<div style={{ marginTop:'auto',   right: '15vh',
    position: 'sticky'
}} onClick={async()=>{
  setPageEditable(false);
  setGeneralInfoLoader(true)
  setVehiclesLoader(true)
  setAttachmentsLoader(true)
  let res = await deletePurchaseRequestByUUID(PageId);
  setGeneralInfoLoader(false)
  setVehiclesLoader(false)
  setAttachmentsLoader(false)
  if(res)
  window.history.back();}}>
<Icon
                  path={mdiDeleteForever}
                  size={1.5}
                  // color="white"
                  className="userProfileIconHBar1"
                />
</div>)}


</div>


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
            {pageState}
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
        {generalInfoLoader?( <SpinnerCircularSplit
              style={{ margin: "auto",padding: '30px',  minHeight: '350px' }}
              color="rgb(229 193 0)"
            ></SpinnerCircularSplit>):(
              <div style={{ display: 'flex',
                gap: '20px 40px',
                justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',     padding: '30px',  minHeight: '100px'}}>
                
                <TextField 
                  InputProps={{
                    readOnly: true,
                  }}
                value={generalInfoData.companyName} 
                className="prfields" 
                required 
                style={{ width: '60ch', backgroundColor: 'aliceblue' }} 
                label='Company Name' 
                variant="outlined"
                onChange={(e) => {
                    
                    setgeneralInfoData({ ...generalInfoData, companyName: e.target.value });
                    
            }}
              />
        
              <TextField 
                InputProps={{
                  readOnly: true,
                }}
                value={generalInfoData.contactPerson} 
                className="prfields" 
                required 
                style={{ width: '35ch', backgroundColor: 'aliceblue' }} 
                label='Contact Person' 
                variant="outlined"
                onChange={(e) => setgeneralInfoData({ ...generalInfoData, contactPerson: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: true,
                }}
                value={generalInfoData.phoneNumber} 
                className="prfields" 
                required 
                style={{ width: '25ch', backgroundColor: 'aliceblue' }} 
                label='Phone Number' 
                variant="outlined"
                onChange={(e) => setgeneralInfoData({ ...generalInfoData, phoneNumber: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: true,
                }}
                value={generalInfoData.emailAddress} 
                className="prfields" 
                required 
                style={{ width: '35ch', backgroundColor: 'aliceblue' }} 
                label='Email Address' 
                variant="outlined"
                onChange={(e) => setgeneralInfoData({ ...generalInfoData, emailAddress: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: true, 
                }}
                value={generalInfoData.van} 
                className="prfields" 
                required 
                style={{ width: '30ch', backgroundColor: 'aliceblue' }} 
                label='VAN' 
                variant="outlined"
                onChange={(e) => setgeneralInfoData({ ...generalInfoData, van: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: true,
                }}
                value={generalInfoData.address} 
                className="prfields" 
                required 
                style={{ width: '110ch', backgroundColor: 'aliceblue' }} 
                label='Address' 
                variant="outlined"
                onChange={(e) => setgeneralInfoData({ ...generalInfoData, address: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: !pageEditable,
                }}
                onClick={()=>handleCommonShOpen('documentType')}
                error={generalInfoData.documentType?false:true}
                // value={generalInfoData.documentType || ""} 
                value={getDisplayValue(generalInfoData.documentType,docTypeSh)}
                className="prfields" 
                required 
                style={{ width: '25ch', backgroundColor: pageEditable?'white':'aliceblue' }} 
                label='Document Type' 
                variant="outlined"
                // onChange={(e) => setgeneralInfoData({ ...generalInfoData, documentType: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: !pageEditable,
                }}
                onClick={()=>handleCommonShOpen('salesOrg')}
                error={generalInfoData.salesOrg?false:true}
                value={getDisplayValue(generalInfoData.salesOrg,salesOrgSh)} 
                className="prfields" 
                required 
                style={{ width: '25ch', backgroundColor:  pageEditable?'white':'aliceblue' }} 
                label='Sales Org.' 
                variant="outlined"
                // onChange={(e) => setgeneralInfoData({ ...generalInfoData, salesOrg: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: !pageEditable,
                }}
                onClick={()=>handleCommonShOpen('distributionChannel')}
                error={generalInfoData.distributionChannel?false:true}
                value={getDisplayValue(generalInfoData.distributionChannel,distriChSh)} 
                className="prfields" 
                required 
                style={{ width: '25ch', backgroundColor:  pageEditable?'white':'aliceblue' }} 
                label='Distribution Channel' 
                variant="outlined"
                // onChange={(e) => setgeneralInfoData({ ...generalInfoData, distributionChannel: e.target.value })}
              />
        
              <TextField 
                InputProps={{
                  readOnly: !pageEditable,
                }}
                onClick={()=>handleCommonShOpen('division')}
                error={generalInfoData.division?false:true}
                value={getDisplayValue(generalInfoData.division,divisionSh)} 
                className="prfields" 
                required 
                style={{ width: '25ch', backgroundColor:  pageEditable?'white':'aliceblue' }} 
                label='Division' 
                variant="outlined"
                // onChange={(e) => setgeneralInfoData({ ...generalInfoData, division: e.target.value })}
              />
        
                </div>
            )}
       
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

    <button hidden={!pageEditable} id="prObjPageSectionButton" className="footerbarbutton" style={{    marginLeft: 'auto',
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
    <button hidden={!pageEditable} id="prObjPageSectionButton" className="footerbarbutton" style={{ 
    marginRight: '20vh',
    paddingLeft: '15px',
    height: 'min-content',
    marginTop: '7vh',
    paddingRight: '15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#6d6d6d',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'}} title="Add Row."  onClick={()=>setVehiclesShDialog(true)}><Icon path={mdiTableRowPlusAfter} size={1.3} color='white'></Icon></button>
        </div>
            <div style={{ padding: '30px',  minHeight: '100px',    textAlign: vehiclesLoader?'center':''}}>
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
              
{vehiclesLoader?(<SpinnerCircularSplit
              style={{ margin: "auto",padding: '30px',  minHeight: '350px' }}
              color="rgb(229 193 0)"
            ></SpinnerCircularSplit>):(
              <DataGrid
        key={refreshKey}
        onSelectionModelChange={(params) => setSelectedRows(params)}
       rows={rows}
      
       columns={columns}
       style={{ maxHeight: '550px', width: '100%',overflowY:'scroll',scrollbarWidth: 'thin',
        scrollbarColor: '#e5c100 #d6d6d6' }}
              autoHeight
       checkboxSelection={pageEditable}
       disableSelectionOnClick
      onCellEditCommit={handleCellEditCommit}
      onEditCellPropsChange={handleEditCellChange}
 >
  
</DataGrid>
            )}

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

  {pageState == 'Quotation' && <section style={{ 
    height: '150px',
    marginTop: '30px',
    borderRadius: '2px',
    overflow: 'hidden',
    padding: '20px',
    // backgroundColor: '#ffffff',
    // boxShadow: 'rgb(0 0 0 / 57%) 0px 1px 3px'
}} > <section className="bandSection" style={{boxShadow:
    '0 0 10px #FFD700,0 0 2px #F7BC3A,0 0 20px #ffa500,inset 0 0 10px #ffe4b5'//gold
    // '0 0 12px #C0C0C0, 0 0 4px #B0B0B0, 0 0 18px #8A8A8A, inset 0 0 10px #D3D3D3'//silver
    // '0 0 15px #E5E4E2, 0 0 6px #F8F8F8, 0 0 25px #B0B0B0, inset 0 0 12px #FFFFFF'//platinum
    // ' 0 0 12px #5b4891a8, 0 0 5px #6a4d9e, 0 0 20px #8b7ba0, inset 0 0 10px #5b4891a8'//none
    }}>
    <div style={{      alignContent: 'center',  justifyItems: 'center', background: 
      'linear-gradient(to right, #d9b36b, #e9c98a, #e9d4a2, #e9c98a, #d9b36b)',//gold
      // 'linear-gradient(to right, #C0C0C0, #D8D8D8, #E6E6E6, #D8D8D8, #C0C0C0)',//silver
      // 'linear-gradient(to right, #E5E4E2, #F8F8F8, #FFFFFF, #F8F8F8, #E5E4E2)',//platinum
      // ' #5b4891a8',//none
       height:'30%',   border: '0.2rem solid #f4f4f4'}}>
      <h4 style={{    marginBottom: 'auto',
    marginTop: 'auto',    fontFamily: 'auto'}}>PRICING SUMMARY</h4>
    </div>
    <div style={{display:'flex',    backgroundColor: 'whitesmoke' ,flexDirection:'row',height:'70%',    placeContent: 'space-evenly'}}>
     
     <div style={{display:'flex',flexDirection:'column',    marginBottom: '20px',
    justifyContent: 'space-evenly',    width: '-webkit-fill-available'}}><span style={{    marginLeft: '20px',fontWeight: 'bolder',fontSize: 'small',color: 'dimgray'}}>TOTAL PRICE</span><span style={{    alignSelf: 'center',fontFamily: 'sans-serif',fontSize: 'larger',fontWeight: 'bold',color: 'darkslategray'}}>{generalInfoData.totalAmount}</span></div> 
    
    {/* <div style={{borderLeft: '6px solid green',
    height: '500px'}}></div> */}
    <hr></hr>
   
    
    <div  style={{display:'flex',flexDirection:'column',    marginBottom: '20px',
    justifyContent: 'space-evenly',    width: '-webkit-fill-available'}}><span style={{    marginLeft: '20px',fontWeight: 'bolder',fontSize: 'small',color: 'dimgray'}}>TAX Amount</span><span style={{    alignSelf: 'center',fontFamily: 'sans-serif',fontSize: 'larger',fontWeight: 'bold',color: 'darkslategray'}}>{generalInfoData.taxAmount}</span></div> 
    
    <hr></hr>
    
    <div  style={{display:'flex',flexDirection:'column',    marginBottom: '20px',
    justifyContent: 'space-evenly',    width: '-webkit-fill-available'}}><span style={{    marginLeft: '20px',fontWeight: 'bolder',fontSize: 'small',color: 'dimgray'}}>GRAND TOTAL</span><span style={{    alignSelf: 'center',fontFamily: 'sans-serif',fontSize: 'larger',fontWeight: 'bold',color: 'darkslategray'}}>{generalInfoData.grandTotal}</span></div> 
    </div>
  </section>
  </section>}
  

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

          {pageEditable && <div id="dragbox"  style={{
    backgroundImage: `url(${emptyFilesGif})`,    backgroundSize: 'contain', // Adjust size to fit
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   }} className="dragbox" onClick={() => testt()}  onDragOver={(event) => event.preventDefault()} onDrop={(event)=>handleDrop(event)} >

        <input multiple id="inputfile" type="file" hidden onChange={(event) => handleDrop(event)}/>
        {/* <Icon  path={mdiCloudUploadOutline} color='mediumslateblue' size={1.5}></Icon> */}
      
        <h3 style={{    marginBottom: '100%',
    fontFamily: 'system-ui',
    fontWeight: 'lighter'}}>Click / Browse Files to Upload!</h3>
      </div>}
      
{attachmentsLoader?(
  <SpinnerRomb size="6%" thickness={120} style={{margin:'auto'}} ></SpinnerRomb>
):(    items.length > 0 ? (
  <ul className="file-list" style={{ padding: "2%", width: "60%" }}>
    {items.map((file) => (
      <li key={file.id} style={{    width:!pageEditable?'80%':'auto',
        placeSelf:!pageEditable? 'center':''}} className="file-item">
        {getIconForMediaType(file.mediaType)}
        <h2 onClick={() => openFile(file)} className="filename">{file.fileName}</h2>
        {pageEditable?(<Icon  className="deletebutton" path={mdiDeleteForever} size={2} color="red" onClick={() => deleteFile(file)} />):(
          <Icon   path={mdiAttachmentCheck} size={2} color="gray" />
        )}
        
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
  readOnly={!pageEditable}
    placeholder="Write your comment here..."
    value={comments}
    
    onChange={(e) => setComments(e.target.value )}
    style={{
      backgroundColor:pageEditable?'white':'aliceblue',
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
{(!comments || comments.trim() === "") && (
  <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
    * This field is required.
  </div>
)}
  
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

{commentHistory.map((comment) => (
  <VerticalTimelineElement
    key={comment.commentId}
    className={
      comment.user === 'C'
        ? 'vertical-timeline-element--message'
        : 'vertical-timeline-element--replier'
    }
    position={comment.user === 'C' ? 'right' : 'left'} // Positioning dynamically
    contentStyle={{
      overflowWrap: 'break-word',
      color: 'rgb(0, 0, 0)',
      borderStyle: 'double',
      borderRadius: '10px',
      borderColor: comment.user === 'C' ? '#248b76' : '#fc7f00',
      boxShadow: comment.user === 'C'
        ? 'rgb(0 121 107) 0px 2px 35px'
        : 'rgb(255 129 0) 0px 2px 35px',
      borderWidth: 'thick',
    }}
    contentArrowStyle={{
      borderRight: comment.user === 'C'
        ? '7px solid #e0f7fa'
        : '7px solid #ffeb3b',
      boxShadow: comment.user === 'C'
        ? 'rgb(0 121 107) 0px 2px 35px'
        : 'rgb(255 129 0) 0px 2px 35px',
    }}
    date={comment.createdAt}
    dateClassName="dateClassName"
    iconStyle={{
      background: comment.user === 'C' ? '#00796b' : '#f57c00',
      color: '#fff',
    }}
    icon={
      <Icon
        path={comment.user === 'C' ? mdiAccount : mdiFaceAgent}
        size={1}
      />
    }
  >
    <h3 className="vertical-timeline-element-title">
      {comment.user === 'C' ? 'Me' : 'Replier'}
    </h3>
    <p>{comment.commentsText}</p>
  </VerticalTimelineElement>
))}


{/* First Comment - Message */}
{/* <VerticalTimelineElement
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
</VerticalTimelineElement> */}

{/* Reply Comment - Replier */}
{/* <VerticalTimelineElement
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
</VerticalTimelineElement> */}

{/* Second Comment - Message */}
{/* <VerticalTimelineElement
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
</VerticalTimelineElement> */}

{/* Reply Comment - Replier */}
{/* <VerticalTimelineElement
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
</VerticalTimelineElement> */}
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

<div  className="footertab" style={ {  
    
    padding: '15px',
    zIndex: '1',
    position: 'fixed',
    width: '90%',
    bottom: '7vh',
    left: '50%',
    transform: 'translateX(-50%)',
    display:pageState=='In Process'?'none':'flex',
    placeContent: 'end'}}>
   {updated ? (
<button className="footerbarbutton" 
onClick={()=>requestQuotation()}
style={{   display: 'flex', padding: '10px' ,
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#9583c6bd',
    boxShadow: '0px 3px 8px rgb(0 0 0 / 66%)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}> <Icon path={pageState=='Draft'?mdiSendOutline:mdiForumOutline} size={1} color='white'></Icon> <span style={{    fontFamily: 'auto',
    fontSize: 'x-large',
    color: 'white',
    marginLeft: '10px'}}>{pageState=='Draft'?'Request Quotation':'Negotiate'}  </span></button>
    
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

{vehiclesShDialog && <section style={{  height: '100vh',
    width: '100vw',}}>
  <div onClick={()=>setVehiclesShDialog(false)} style={{   backdropFilter: 'blur(2px)',
    backgroundColor: '#87868a8f',
    height: '-webkit-fill-available',
    width: '-webkit-fill-available',
    zIndex: '1100',
    position: 'fixed',
    top: '0',
    left: '0'}}></div>
  <div
  style={{
    zIndex: '1100',
    position: 'fixed',
    top: '0', // Ensure it's positioned at the top of the page
    left: '0', // Align with the left side of the page
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    width: '170vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    positionArea: 'center'
  }}
>
  {/* Header Section */}
  <h3 style={{ margin: '20px', flex: '0 0 auto' }}>Add Vehicles</h3>

  {/* Scrollable DataGrid Section */}
  <Paper style={{ flex: '1 1 auto', overflow: 'hidden' }}>
    <div style={{ height: '100%', overflowY: 'scroll',scrollbarWidth:'thin' }}>
      <DataGrid

        rows={vehiclesSh}
        columns={columnsVehicleSh}
        autoHeight
        pageSize={15}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
      />
    </div>
  </Paper>

  {/* Button Section */}
  <div style={{ padding: '20px', flex: '0 0 auto', textAlign: 'center' }}>
    <Button onClick={(params)=>addNewRow(params)} style={{    background: '#6d6d6d',
    color: 'white'}}>Confirm</Button>
  </div>
</div>


</section>}
{partnersShDialog && <section style={{  height: '100vh',
    width: '100vw',}}>
  <div onClick={()=>{setPartnersShDialog(false);setPartnersSelectedRow(null);}} style={{   backdropFilter: 'blur(2px)',
    backgroundColor: '#87868a8f',
    height: '-webkit-fill-available',
    width: '-webkit-fill-available',
    zIndex: '1100',
    position: 'fixed',
    top: '0',
    left: '0'}}></div>
  <div
  style={{
    zIndex: '1100',
    position: 'fixed',
    top: '0', // Ensure it's positioned at the top of the page
    left: '0', // Align with the left side of the page
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    width: '170vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    positionArea: 'center'
  }}
>
  {/* Header Section */}
  <h3 style={{ margin: '20px', flex: '0 0 auto' }}>Select Partner</h3>

  {/* Scrollable DataGrid Section */}
  <Paper style={{ flex: '1 1 auto', overflow: 'hidden' }}>
    <div style={{ height: '100%', overflowY: 'scroll',scrollbarWidth:'thin' }}>
      <DataGrid

        rows={partnersSh}
        columns={columnsPartnersSh}
        autoHeight
        pageSize={15}
        onRowClick={(params)=>addPartner(params)}
        // checkboxSelection
        // disableSelectionOnClick
        // onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
      />
    </div>
  </Paper>

  {/* Button Section */}
  <div style={{ padding: '20px', flex: '0 0 auto', textAlign: 'center' }}>
    {/* <Button onClick={(params)=>addNewRow(params)} style={{    background: '#6d6d6d',
    color: 'white'}}>Confirm</Button> */}
  </div>
</div>


</section>}
{commonShDialog && <section style={{  height: '100vh',
    width: '100vw',}}>
  <div onClick={()=>{setCommonShDialog(false);setCommonShSelected(null);setCommonShSelectedField(null);}} style={{   backdropFilter: 'blur(2px)',
    backgroundColor: '#87868a8f',
    height: '-webkit-fill-available',
    width: '-webkit-fill-available',
    zIndex: '1100',
    position: 'fixed',
    top: '0',
    left: '0'}}></div>
  <div
  style={{
    zIndex: '1100',
    position: 'fixed',
    top: '0', // Ensure it's positioned at the top of the page
    left: '0', // Align with the left side of the page
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    width: '170vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    positionArea: 'center'
  }}
>
  {/* Header Section */}
  <h3 style={{ margin: '20px', flex: '0 0 auto' }}>Choose Value</h3>

  {/* Scrollable DataGrid Section */}
  <Paper style={{ flex: '1 1 auto', overflow: 'hidden' }}>
    <div style={{ height: '100%', overflowY: 'scroll',scrollbarWidth:'thin' }}>
      <DataGrid

        rows={commonShSelected}
        columns={columnsCommonSh}
        autoHeight
        pageSize={15}
        onRowClick={(params)=>addFieldFromSh(params)}
        // checkboxSelection
        // disableSelectionOnClick
        // onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
      />
    </div>
  </Paper>

  {/* Button Section */}
  <div style={{ padding: '20px', flex: '0 0 auto', textAlign: 'center' }}>
    {/* <Button onClick={(params)=>addNewRow(params)} style={{    background: '#6d6d6d',
    color: 'white'}}>Confirm</Button> */}
  </div>
</div>


</section>}


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
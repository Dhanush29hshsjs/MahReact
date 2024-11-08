import axios from "axios";
import { Callbacks } from "jquery";

const baseURL = "https://3c552736trial-dev-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";

const instance = axios.create({
  baseURL
});

export const getTableData = async () => {
  const { data } = await instance.get("/PAN_Details_APR");

  return data;
};
export const getNotificationsByCustomerId = async (customerId,top)=>{
  var url;
if (top == 0)
 url =`EnquiryComments?$filter=customerId eq ${customerId}`;
else
  url =`EnquiryComments?$filter=customerId eq ${customerId}&$orderby=createdAt desc&$top=${top}`
const data = await instance.get(url);
return data.value || data;
};
export const getUserByLoginCred = async(userName , password)=>{
  const url = `Customer?$filter=email eq '${userName}' and password eq '${password}'`;
  const {data} = await instance.get(url);
    
  return  data.value || data;
};
export const getUserById = async(id)=>{
  const url = `Customer/${id}`;
  const {data} = await instance.get(url);
  return  data.value || data;
};
export const getPurchaseRequestsByCustomerId = async (customerId,top)=>{
  var url;
if (top == 0)
 url =`PurchaseEnquiry?$filter=customerId eq ${customerId}`;
else
  url =`PurchaseEnquiry?$filter=customerId eq ${customerId}&$orderby=createdAt desc&$top=${top}`
const data = await instance.get(url);
return data.value || data;
};
export const getPurchaseOrdersByCustomerId = async (customerId,top)=>{
  var url;
if (top == 0)
 url =`PurchaseOrder?$filter=customerId eq ${customerId}`;
else
  url =`PurchaseOrder?$filter=customerId eq ${customerId}&$orderby=createdAt desc&$top=${top}`
const data = await instance.get(url);
return data.value || data;
};
export const uploadUserFile = async (field,file,filetype, id) => {
  const uploadFile = async (path,mediatype) =>{
    const url1 = `Customer/${id}`;
    const url = `Customer/${id}/${path}`;
    try {
      const body = {[mediatype]:filetype}
      const response = await instance.patch(url1,body);
      console.log(response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    try {
      const response = await instance.put(url, file, {
        headers: {
          'Content-Type': filetype, // Set content type to file's MIME type
        },
        processData: false, // Do not process the data
      });
      
      console.log("File uploaded successfully:", response);
      return response; // Return the response data if needed
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Optionally rethrow to handle in calling function
    }
  }
  
  switch (field) {
    case 'gstCertificate':
     await uploadFile('gstCertificate','gstCertificateMediaType');
      break;
      case 'panCard':
       await uploadFile('panCardDoc','panMediaDocType');
      break;
      case 'bankMandate':
       await uploadFile('bankMandate','bankMediaType');
      break;
    default:
      console.error("Error uploading file");
    return "path not specified!"
      break;
  }

  
};
export const getUserFileByCustomerId = async (id) => {
  
    const url = `Customer/${id}`;
    try {
      const body = {
        gstCertificate: null,
    panCard: null,
    bankMandate: null,
    profilePic:null
      }
      const gstCertificatefile = await instance.get(url+"/gstCertificate",{ responseType: 'blob', headers: {
        'Content-Type': 'application/json'
    } });
      const panCardfile = await instance.get(url+"/panCardDoc",{ responseType: 'blob', headers: {
        'Content-Type': 'application/json'
    } });
      const bankMandatefile = await instance.get(url+"/bankMandate",{ responseType: 'blob' , headers: {
        'Content-Type': 'application/json'
    }});
    const profilePic = await instance.get(url+"/profilePic",{ responseType: 'blob' , headers: {
      'Content-Type': 'application/json'
  }});
      body.gstCertificate = gstCertificatefile.data.size?gstCertificatefile.data : null;
      body.panCard = panCardfile.data.size? panCardfile.data : null;
      body.bankMandate = bankMandatefile.data.size? bankMandatefile.data : null;
      body.profilePic = profilePic.data.size? profilePic.data : null;
      return body;
      
    } catch (error) {
      console.error("Error uploading file:", error);
    }
     
};
export const deleteUserFileByCustomerId = async (id,path) => {
  if(path == 'panCard')
    path = 'panCardDoc';
  const url = `Customer/${id}/${path}`;
  try {
   
    const deletedRes = await instance.delete(url);
    return deletedRes;
    
  } catch (error) {
    console.error("Error uploading file:", error);
  }
   
};
export const getDelProfilePic = async (id,call) => {
  const url = `Customer/${id}/profilePic`;
  try {
    const Response = await instance[call](url,{ responseType: 'blob', headers: {
      'Content-Type': 'application/json'
  } });
    return Response.data||Response;
    
  } catch (error) {
    console.error("Error getting/deleting profile pic:", error);
  }
   
};
export const uploadProfilePic = async (id,file,filetype) => {
  const url = `Customer/${id}/profilePic`;
    const url1 = `Customer/${id}`;
    try {
      const body = {profilePicType:filetype}
      const response = await instance.patch(url1,body);
      console.log(response);
    } catch (error) {
      console.error("Error updating customer :", error);
    }
    try {
      const response = await instance.put(url, file, {
        headers: {
          'Content-Type': filetype, // Set content type to file's MIME type
        },
        processData: false, // Do not process the data
      });
      
      console.log("File uploaded successfully:", response);
      return response; // Return the response data if needed
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Optionally rethrow to handle in calling function
    }   
};
export const updateProfileData = async (id,body) => {
  const url = `Customer/${id}`;
    try {

      const response = await instance.patch(url,body);
      console.log(response);
    } catch (error) {
      console.error("Error updating profile Data :", error);
    }   
};
// export const getTableCount = async () => {
//   const { data } = await instance.get("/PAN_Details_APR/$count");
//   return data;
// };

// export const getDetailsById = async(id)=>{
//   const url = `/PAN_Details_APR/${id}`;
//   const {data} = await instance.get(url);
//   return data.d?.results || data.d || data.value || data;
// }

// export const getkeyTableData = async(id)=>{
//   const url = `/PAN_WEB_EVENT_APR?$filter=(%20PAN_Number%20eq%20%27${id}%27)`;
//   const {data} = await instance.get(url);
//   return data.d?.results || data.d || data.value || data;
// }

// export const getVendorTableData = async(id)=>{
//   const url = `/PAN_vendor_data_APR?$filter=(%20PAN_Number%20eq%20%27${id}%27)`;
//   const {data} = await instance.get(url);
//   return data.d?.results || data.d || data.value || data;
// }

// export const getWorkflowTableData = async(id)=>{
//   const url = `/PAN_WORKFLOW_HISTORY_APR?$filter=(%20PAN_Number%20eq%20%27${id}%27)`;
//   const {data} = await instance.get(url);
//   return data.d?.results || data.d || data.value || data;
// }

// export const getVendorDetails = async(PAN_Number,Proposed_Vendor_Code)=>{
//   const url = `/PAN_vendor_data_APR?$filter=( PAN_Number eq '${PAN_Number}' and Proposed_Vendor_Code eq '${Proposed_Vendor_Code}' )`;
//   const {data} = await instance.get(url);
//   return data.d?.results || data.d || data.value || data;
// }

// export const getCommentHistory = async(id)=>{
//   const url = `/PAN_Comments_APR?$filter=(%20PAN_Number%20eq%20%27${id}%27)`;
//   const {data} = await instance.get(url);
//   return data.d?.results || data.d || data.value || data;
// }
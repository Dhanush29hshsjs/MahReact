import axios from "axios";
import { Callbacks } from "jquery";

const tokenURL = 'https://44f10b5ftrial.authentication.us10.hana.ondemand.com/oauth/token'; // Replace with your XSUAA token URL
const clientId = 'sb-Mahindra_sales-44f10b5ftrial-dev1!t369427';
const clientSecret = 'b60ebdcc-3dbb-449e-b0f6-f32b50151396$mwrsB0Ik71GDhwRBFFCDHyFdKlw8B3AJ9WTI3zrTkUQ=';
const username = 'pradeep.n@peolsolutions.com'; // Replace with the username
const password = 'Pradeep@123'; // Replace with the password

const getAccessToken = async () => {
  const credentials = btoa(`${clientId}:${clientSecret}`); // Base64 encode client_id:client_secret

  try {
    const response = await axios.post(
      tokenURL,
      new URLSearchParams({
        grant_type: 'password', // Use password grant type
        username: username,
        password: password,
      }).toString(), // Serialize the body
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`, // Pass client credentials in the Authorization header
        },
      }
    );

    return response.data.access_token; // Return the token
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Unable to fetch access token');
  }
};


const baseURL = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";

const instance = axios.create({
  baseURL
});
instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken(); // Get the token dynamically
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    } catch (error) {
      console.error('Error adding Authorization header:', error.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// export default instance;



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
 url =`PurchaseEnquiry?$filter=customerId eq ${customerId}&$orderby=createdAt desc`;
else
  url =`PurchaseEnquiry?$filter=customerId eq ${customerId}&$orderby=createdAt desc&$top=${top}`
const data = await instance.get(url);
return data.value || data;
};

export const getPurchaseRequestsByUUID = async (UUID,objectPageParent)=>{
  if(objectPageParent == "Order"){
    let url =`PurchaseOrder?$filter=purchaseOrderUuid eq ${UUID} and IsActiveEntity eq true`;
    const data = await instance.get(url);
    return data.value || data;
  }else{
    let url =`PurchaseEnquiry?$filter=purchaseEnquiryUuid eq ${UUID} and IsActiveEntity eq true`;
    const data = await instance.get(url);
    return data.value || data;
  }

};
// export const getVehiclesInventory = async ()=>{
//   let url =`VehicleInventory`;
//   const data = await instance.get(url);
//   return data.value || data;
//   };
  export const patchGeneralInfo = async (purchaseEnquiryUuid,body,entity)=>{
    if(entity == 'Order'){
      let url =`PurchaseOrder(purchaseOrderUuid=${purchaseEnquiryUuid},IsActiveEntity=true)`;
    const data = await instance.patch(url,body);
    return data.value || data;
    }else{
      let url =`PurchaseEnquiry(purchaseEnquiryUuid=${purchaseEnquiryUuid},IsActiveEntity=true)`;
      const data = await instance.patch(url,body);
      return data.value || data;
    }
    
    };
    // export const deleteAndUpdRequestVehiclesByMaterialCode = async (initialRows,deletedRows,updatedRows,pageId)=>{
    //   try {
    //     if(deletedRows.length){
    //       let deletedIds = initialRows.filter((initRow)=>deletedRows.some((delRow)=>delRow.vehicleCode == initRow.vehicleCode));
    //       deletedRows.forEach(async (row)=>{
    //         let url =`EnquiryVehicle(vehicleId=${row.uuid},IsActiveEntity=true)`  
    //         let delRes = await instance.delete(url);
    //         console.log(delRes);
    //       })
    //     }
    //     if(updatedRows.length){
    //       let updatedIds = initialRows.filter((initRow)=>updatedRows.some((delRow)=>delRow.vehicleCode == initRow.vehicleCode));
    //       updatedIds.forEach(async (row)=>{
    //         let url =`PurchaseEnquiry(purchaseEnquiryUuid=${pageId},IsActiveEntity=true)/enquiryToVehicle(vehicleId=${row.uuid},IsActiveEntity=true)`
    //         let updatedData = updatedRows.filter((updRow)=>updRow.vehicleCode == row.vehicleCode)  ;
    //         let body = {quantity:updatedData[0].quantity}
    //         let updRes = await instance.patch(url,body);
    //         console.log(updRes);
    //       })
          
    //     }
    //   } catch (error) {
        
    //   }
    //   // let url =`PurchaseEnquiry(purchaseEnquiryUuid=${purchaseEnquiryUuid},IsActiveEntity=true)`;
    //   // const data = await instance.patch(url,body);
    //   // return data.value || data;
    //   };
    export const deleteAndUpdRequestVehiclesByMaterialCode = async (initialRows, deletedRows, updatedRows, pageId) => {
      try {
        if (deletedRows.length) {
          let deletedIds = initialRows.filter((initRow) =>
            deletedRows.some((delRow) => delRow.vehicleCode == initRow.vehicleCode)
          );
    
          for (let i = 0; i < deletedIds.length; i++) {
            let row = deletedIds[i];
            let url = `EnquiryVehicle(vehicleId=${row.uuid},IsActiveEntity=true)`;
            let delRes = await instance.delete(url);
            console.log(delRes);
          }
        }
    
        if (updatedRows.length) {
          let updatedIds = initialRows.filter((initRow) =>
            updatedRows.some((updRow) => updRow.vehicleCode == initRow.vehicleCode)
          );
    
          for (let i = 0; i < updatedIds.length; i++) {
            let row = updatedIds[i];
            let url = `PurchaseEnquiry(purchaseEnquiryUuid=${pageId},IsActiveEntity=true)/enquiryToVehicle(vehicleId=${row.uuid},IsActiveEntity=true)`;
            let updatedData = updatedRows.filter((updRow) => updRow.vehicleCode == row.vehicleCode);
            let body = { quantity: updatedData[0].quantity ,discount:updatedData[0].discountpertype? updatedData[0].discount+"%":updatedData[0].discount,discountedPrice:updatedData[0].discountedPrice,totalPrice:updatedData[0].totalPrice,preferredDelDate:updatedData[0].preferredDelDate,preferredDelLocation:updatedData[0].preferredDelLocation};
            let updRes = await instance.patch(url, body);
            console.log(updRes);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    // export const postRequestVehiclesByMaterialCode = async (vehicles,pageId)=>{
    //     try {
    //       if(vehicles.length){
    //       let url=`PurchaseEnquiry(purchaseEnquiryUuid=${pageId},IsActiveEntity=true)/enquiryToVehicle`;
    //       vehicles.forEach(async (vehicle)=>{
    //         let body = {materialCode:vehicle.vehicleCode,quantity:vehicle.quantity,IsActiveEntity:true};
    //         let postRes= await instance.post(url,body);
    //         console.log(postRes);
    //       })}
    //     } catch (error) {
          
    //     }
    //     // let url =`PurchaseEnquiry(purchaseEnquiryUuid=${purchaseEnquiryUuid},IsActiveEntity=true)`;
    //     // const data = await instance.patch(url,body);
    //     // return data.value || data;
    //     };
    export const postRequestVehiclesByMaterialCode = async (vehicles, pageId) => {
      try {
        if (vehicles.length) {
          let url = `PurchaseEnquiry(purchaseEnquiryUuid=${pageId},IsActiveEntity=true)/enquiryToVehicle`;
    
          for (let i = 0; i < vehicles.length; i++) {
            let vehicle = vehicles[i];
            
            let body = { materialCode: vehicle.vehicleCode, quantity: vehicle.quantity,preferredDelDate:vehicle.preferredDelDate,preferredDelLocation:vehicle.preferredDelLocation, IsActiveEntity: true };
            let postRes = await instance.post(url, body);
            console.log(postRes);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    export const deletePurchaseRequestByUUID = async (pageId)=>{
      let url =`PurchaseEnquiry(purchaseEnquiryUuid=${pageId},IsActiveEntity=true)`;
      const data = await instance.delete(url);
      return data.value || data;
      };    
      export const getPartnersByPurchaseUuid = async (purchaseEnquiryUuid,objectPageParent)=>{
        if(objectPageParent == 'Order'){
          let url =`PurchasePartners?$filter=purchaseOrderUuid eq ${purchaseEnquiryUuid}`;
          const data = await instance.get(url);
          return data.value || data;
        }else{
          let url =`EnquiryPartners?$filter=purchaseEnquiryUuid eq ${purchaseEnquiryUuid}`;
          const data = await instance.get(url);
          return data.value || data;
        }
      
      };
    export const getRequestVehiclesByPurchaseEnquiryUuid = async (purchaseEnquiryUuid,objectPageParent)=>{
      if(objectPageParent == 'Order'){
        let url =`PurchaseVehicle?$filter=purchaseOrderUuid eq ${purchaseEnquiryUuid}`;
        const data = await instance.get(url);
        return data.value || data;
      }else{
        let url =`EnquiryVehicle?$filter=purchaseEnquiryUuid eq ${purchaseEnquiryUuid}`;
        const data = await instance.get(url);
        return data.value || data;
      }
    
    };
    export const postPurchaseReq = async (customerId)=>{
      let url =`PurchaseEnquiry`;
      let body ={customerId:customerId,IsActiveEntity:true};
      const res = await instance.post(url,body);
      return res.value || res;
      };
      export const getSh = async (field)=>{
        let url =`SH?$filter=sHField eq '${field}'`;
        const res = await instance.get(url);
        return res.value || res;
        };

        export const getPartnersSh = async (salesOrg,distributionChannels,division)=>{
          let url =`getPartnersSh(paramaters='{"division":"${division}","distributionChannels":"${distributionChannels}","salesOrg":"${salesOrg}"}')`;
          const res = await instance.get(url);
          return res.value || res;
          };
          export const getVehiclesSh = async (salesOrg,distributionChannels)=>{
            let url =`getVehiclesSh(paramaters='{"distributionChannels":"${distributionChannels}","salesOrg":"${salesOrg}"}')`;
            const res = await instance.get(url);
            return res.value || res;
            };
          export const patchPartnersRows = async (purchaseEnquiryUuid,partnerRole,body)=>{
            let url =`PurchaseEnquiry(purchaseEnquiryUuid=${purchaseEnquiryUuid},IsActiveEntity=true)/enquiryToPartners(purchaseEnquiryUuid=${purchaseEnquiryUuid},partnerRole='${partnerRole}',IsActiveEntity=true)`;
            const res = await instance.patch(url,body);
            return res.value || res;
            };

        export const createOrder = async (amount)=>{
          let url =`createOrder(amount='${amount}')`;
          const res = await instance.get(url);
          return res.value || res.data.value;
          };
    export const getCommentsByPurchaseEnquiryUuid = async (purchaseEnquiryUuid,objectPageParent)=>{
      if(objectPageParent == 'Order'){
        let url =`PurchaseComments?$filter=(purchaseOrderUuid eq ${purchaseEnquiryUuid} and customerId eq null)&$orderby=createdAt`;
      const data = await instance.get(url);
      return data.value || data;
      }
      else{
        let url =`EnquiryComments?$filter=(purchaseEnquiryUuid eq ${purchaseEnquiryUuid} and customerId eq null)&$orderby=createdAt`;
        const data = await instance.get(url);
        return data.value || data;
      }
      
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
export const getFilesByPurchaseId = async (purchaseEnquiryUuid,objectPageParent) => {
  if(objectPageParent == 'Order'){
    const url = `EnquiryFiles?$filter=purchaseOrderUuid eq ${purchaseEnquiryUuid}`;
    const data = await instance.get(url);
    
   return  data.value || data;
  }else{
    const url = `EnquiryFiles?$filter=purchaseEnquiryUuid eq ${purchaseEnquiryUuid}`;
    const data = await instance.get(url);
    
   return  data.value || data;
  }
  
};
export const getFilesByUrl = async (fileUrl) => {
  
  const url = fileUrl;
  const data = await instance.get(url,{ responseType: 'blob', headers: {
    'Content-Type': 'application/json'
} });
  
  
 return  data.data || data;;
};
export const deleteFiles = async (files) => {
for (let index = 0; index < files.length; index++) {
  const url = `EnquiryFiles/${files[index].oId}` ;
  let res = await instance.delete(url);
}
};
export const postFilesPurchaseReq = async (body,file) => {
  
  const url = 'EnquiryFiles';
  const postingFileData = await instance.post(url,body);

  const data = await instance.put(url+`/${postingFileData.data.id}/content`, file, {
    headers: {
      'Content-Type': body.mediaType, // Set content type to file's MIME type
    },
    processData: false, // Do not process the data
  });
  
  
 return  data.data || data;;
};
export const getInvoiceOrBillByPurchaseOrderUUID = async (id,fileUrl) => {
  const url = `PurchaseOrder(purchaseOrderUuid=${id},IsActiveEntity=true)/${fileUrl}`;
  try {
    const file = await instance.get(url,{ responseType: 'blob', headers: {
      'Content-Type': 'application/json'
  } });
  return file.data;
  } catch (error) {
    
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
export const updatePassword = async (id,password) => {
  const url = `Customer/${id}`;
    try {
      let body={password:password}
      const response = await instance.patch(url,body);
      console.log(response);
    } catch (error) {
      console.error("Error updating Password :", error);
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
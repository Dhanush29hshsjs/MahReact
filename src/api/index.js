import axios from "axios";

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
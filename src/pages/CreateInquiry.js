import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { styled } from '@mui/system';

const styles = {
  container: {
    width: '80%',
    margin: '0 auto', // Center horizontally
    padding: '20px',
  },
  section: {
    marginBottom: '30px', // Space between sections
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px', // Space between key-value pairs
  },
  formItem: {
    flex: '1 1 30%', // Each item takes up to 30% of the row width, allowing up to 3 items per row
    minWidth: '250px', // Minimum width to fit key and value
    backgroundColor: 'aliceblue', // Background color for the key-value pair container
    borderRadius: '4px',
    padding: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    fontWeight: 'bold',
    marginBottom: '5px', // Space between label and input
    color: 'black', // Color of the label text
  },
  formInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'none', // Prevent resizing for textarea
    color: 'black', // Color of the input text
    backgroundColor: 'white', // Background color for the input
    overflowWrap: 'break-word', // Ensures that text wraps properly
  },
  textarea: {
    maxHeight: '60px', // Limit height for textarea
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    backgroundColor:'aliceblue' // Handle overflow for smaller screens
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: 'cornflowerblue',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
  },
  dialogTitle: {
    backgroundColor: '#B0BEC5', // Grey color for the header
    color: 'white', // White text color for contrast
  },
  dialogContent: {
    backgroundColor: 'aliceblue', // Alice blue background for content
    padding: '20px',
  },
  dialogActions: {
    backgroundColor: '#B0BEC5', // Red background for the actions area
    padding: '10px',
  },
  closeButton: {
    color: 'white',
    backgroundColor:'primary' // Green color for the close button
  },
};

const StyledTextField = styled(TextField)(() => ({
  backgroundColor: 'white',
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
  '& .MuiInputBase-root': {
    borderRadius: '8px',
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  border: '1px solid #ccc',
  padding: '8px',
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: 'transparent',
}));

const CreateInquiry = () => {
  const [isManual, setIsManual] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [itemErrors, setItemErrors] = useState([]);
  const [partnerErrors, setPartnerErrors] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [comments, setComments] = useState([
    { user: 'User1', comment: 'This is the first comment.', date: '2024-09-01', time: '10:00 AM', action: 'Added' },
    { user: 'User2', comment: 'This is a response to the first comment.', date: '2024-09-02', time: '11:00 AM', action: 'Added' },
    // Add more local data as needed
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formFields, setFormFields] = useState({
    docType: '',
    salesOrg: '',
    distributionChannel: '',
    division: '',
    orderType: '',
  });
  const [items, setItems] = useState([{ itemNo: '', materialNumber: '', materialGroup: '', plant: '' }]);
  const [partners, setPartners] = useState([{ partnerNo: '', partnerName: '', partnerType: '' }]);
  const [attachments, setAttachments] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectedPartners, setSelectedPartners] = useState(new Set());

  const handleCreateManually = () => {
    setIsManual(true);
  };

  const handleFormFieldChange = (field, value) => {
    setFormFields({ ...formFields, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handlePartnerChange = (index, field, value) => {
    const newPartners = [...partners];
    newPartners[index][field] = value;
    setPartners(newPartners);
  };

  const addItemRow = () => {
    setItems([...items, { itemNo: '', materialNumber: '', materialGroup: '', plant: '' }]);
    setItemErrors([...itemErrors, {}]);
  };

  const addPartnerRow = () => {
    setPartners([...partners, { partnerNo: '', partnerName: '', partnerType: '' }]);
    setPartnerErrors([...partnerErrors, {}]);
  };

  const toggleSelectItem = (index) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(index)) {
      newSelectedItems.delete(index);
    } else {
      newSelectedItems.add(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const toggleSelectPartner = (index) => {
    const newSelectedPartners = new Set(selectedPartners);
    if (newSelectedPartners.has(index)) {
      newSelectedPartners.delete(index);
    } else {
      newSelectedPartners.add(index);
    }
    setSelectedPartners(newSelectedPartners);
  };

  const deleteSelectedItems = () => {
    const newItems = items.filter((_, index) => !selectedItems.has(index));
    const newErrors = itemErrors.filter((_, index) => !selectedItems.has(index));
    setItems(newItems);
    setItemErrors(newErrors);
    setSelectedItems(new Set());
  };

  const deleteSelectedPartners = () => {
    const newPartners = partners.filter((_, index) => !selectedPartners.has(index));
    const newErrors = partnerErrors.filter((_, index) => !selectedPartners.has(index));
    setPartners(newPartners);
    setPartnerErrors(newErrors);
    setSelectedPartners(new Set());
  };

  const validateForm = () => {
    const errors = {};
    const fieldLabels = {
      docType: 'Document Type',
      salesOrg: 'Sales Organisation',
      distributionChannel: 'Distribution Channel',
      division: 'Division',
      orderType: 'Order Type',
    };

    Object.keys(formFields).forEach((key) => {
      if (!formFields[key]) {
        errors[key] = `${fieldLabels[key]} is required`;
      }
    });

    return errors;
  };

  const validateItems = () => {
    let isValid = true;
    const newItemErrors = items.map(() => ({}));

    items.forEach((item, index) => {
      if (!item.itemNo) {
        newItemErrors[index].itemNo = 'Item Number is required';
        isValid = false;
      }
      if (!item.materialNumber) {
        newItemErrors[index].materialNumber = 'Material Number is required';
        isValid = false;
      }
      if (!item.materialGroup) {
        newItemErrors[index].materialGroup = 'Material Group is required';
        isValid = false;
      }
      if (!item.plant) {
        newItemErrors[index].plant = 'Plant is required';
        isValid = false;
      }
    });

    setItemErrors(newItemErrors);
    return isValid;
  };

  const validatePartners = () => {
    let isValid = true;
    const newPartnerErrors = partners.map(() => ({}));

    partners.forEach((partner, index) => {
      if (!partner.partnerNo) {
        newPartnerErrors[index].partnerNo = 'Partner Number is required';
        isValid = false;
      }
      if (!partner.partnerName) {
        newPartnerErrors[index].partnerName = 'Partner Name is required';
        isValid = false;
      }
      if (!partner.partnerType) {
        newPartnerErrors[index].partnerType = 'Partner Type is required';
        isValid = false;
      }
    });

    setPartnerErrors(newPartnerErrors);
    return isValid;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // return;
    }
    
    const itemsValid = validateItems();
    const partnersValid = validatePartners();

    if (!itemsValid || !partnersValid) {
      setSnackbarMessage('Mandatory details are missing in the item or partner table.');
      setSnackbarOpen(true);
      return;
    }

    setFormErrors({});
    setItemErrors([]);
    setPartnerErrors([]);
    console.log('Form submitted successfully:', formFields, items, partners, attachments);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', url.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        p: 2,
      }}
    >
          {/* Header Information Box */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              backgroundColor: 'aliceblue',
              p: 3,
              borderRadius: '20px',
              mb: 3
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Header Information</Typography>
            <Grid container spacing={2}>
              {Object.entries(formFields).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <StyledTextField
                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => handleFormFieldChange(key, e.target.value)}
                    error={!!formErrors[key]}
                    helperText={formErrors[key]}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Item Information Box */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              backgroundColor: 'aliceblue',
              p: 3,
              borderRadius: '20px',
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Item Information</Typography>
            
            {itemErrors.some(error => Object.keys(error).length > 0) && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                Mandatory details are missing in the item table.
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              {selectedItems.size > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={deleteSelectedItems}
                  sx={{ mr: 1 }}
                >
                  Delete Selected Items
                </Button>
              )}
              <Button variant="contained" onClick={addItemRow}>
                Add Item
              </Button>
            </Box>

            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Select</StyledTableCell>
                    <StyledTableCell>Item Number <span style={{ color: 'red' }}>*</span></StyledTableCell>
                    <StyledTableCell>Material Number <span style={{ color: 'red' }}>*</span></StyledTableCell>
                    <StyledTableCell>Material Group <span style={{ color: 'red' }}>*</span></StyledTableCell>
                    <StyledTableCell>Plant <span style={{ color: 'red' }}>*</span></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Checkbox
                          checked={selectedItems.has(index)}
                          onChange={() => toggleSelectItem(index)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={item.itemNo}
                          onChange={(e) => handleItemChange(index, 'itemNo', e.target.value)}
                          error={!!itemErrors[index]?.itemNo}
                          helperText={itemErrors[index]?.itemNo}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={item.materialNumber}
                          onChange={(e) => handleItemChange(index, 'materialNumber', e.target.value)}
                          error={!!itemErrors[index]?.materialNumber}
                          helperText={itemErrors[index]?.materialNumber}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={item.materialGroup}
                          onChange={(e) => handleItemChange(index, 'materialGroup', e.target.value)}
                          error={!!itemErrors[index]?.materialGroup}
                          helperText={itemErrors[index]?.materialGroup}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={item.plant}
                          onChange={(e) => handleItemChange(index, 'plant', e.target.value)}
                          error={!!itemErrors[index]?.plant}
                          helperText={itemErrors[index]?.plant}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Partner Information Box */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              backgroundColor: 'aliceblue',
              p: 3,
              borderRadius: '20px',
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Partner Information</Typography>

            {partnerErrors.some(error => Object.keys(error).length > 0) && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                Mandatory details are missing in the partner table.
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              {selectedPartners.size > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={deleteSelectedPartners}
                  sx={{ mr: 1 }}
                >
                  Delete Selected Partners
                </Button>
              )}
              <Button variant="contained" onClick={addPartnerRow}>
                Add Partner
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Select</StyledTableCell>
                    <StyledTableCell>Partner Number <span style={{ color: 'red' }}>*</span></StyledTableCell>
                    <StyledTableCell>Partner Name <span style={{ color: 'red' }}>*</span></StyledTableCell>
                    <StyledTableCell>Partner Type <span style={{ color: 'red' }}>*</span></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partners.map((partner, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Checkbox
                          checked={selectedPartners.has(index)}
                          onChange={() => toggleSelectPartner(index)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={partner.partnerNo}
                          onChange={(e) => handlePartnerChange(index, 'partnerNo', e.target.value)}
                          error={!!partnerErrors[index]?.partnerNo}
                          helperText={partnerErrors[index]?.partnerNo}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={partner.partnerName}
                          onChange={(e) => handlePartnerChange(index, 'partnerName', e.target.value)}
                          error={!!partnerErrors[index]?.partnerName}
                          helperText={partnerErrors[index]?.partnerName}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          variant="outlined"
                          fullWidth
                          required
                          value={partner.partnerType}
                          onChange={(e) => handlePartnerChange(index, 'partnerType', e.target.value)}
                          error={!!partnerErrors[index]?.partnerType}
                          helperText={partnerErrors[index]?.partnerType}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Attachment Section */}
          {/* Attachment Section */}
          {/* Attachment Section */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              backgroundColor: 'aliceblue',
              p: 3,
              borderRadius: '20px',
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Attachments</Typography>
            
            <Button
              variant="contained"
              component="label"
              sx={{ mb: 2 }}
            >
              Upload Documents
              <input
                type="file"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </Button>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              Uploaded Documents:
            </Typography>
            <Box>
              {attachments.map((attachment, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Button
                    variant="text"
                    onClick={() => downloadFile(attachment.url)}
                    sx={{ textAlign: 'left', flexGrow: 1 }}
                  >
                    {attachment.name}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const newAttachments = attachments.filter((_, i) => i !== index);
                      setAttachments(newAttachments);
                    }}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          
                    {/* Comments Section */}
          <Box
              sx={{
                width: '100%',
                maxWidth: 1000,
                backgroundColor: 'aliceblue',
                p: 3,
                borderRadius: '20px',
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                Comments
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'blue', color: 'white', mb: 2 }} // Set background color to blue
                    onClick={() => setDialogOpen(true)}// Assuming you have a function to open the dialog
                  >
                    Comments History
                </Button>
              </Typography>
              <TextField
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                placeholder="Add your comments here..."
                sx={{ mb: 2, bgcolor: 'white', '& .MuiOutlinedInput-root': { bgcolor: 'white' } }}
              />
          </Box>

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle style={styles.dialogTitle}>
              <Typography variant="h6">Comment History</Typography>
            </DialogTitle>
            <DialogContent style={styles.dialogContent}>
              {comments.length === 0 ? (
                <p>No comments available.</p>
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>
                      <strong>User:</strong> {comment.user} <br />
                      <strong>Comment:</strong> {comment.comment} <br />
                      <strong>Time:</strong> {new Date(comment.date).toLocaleString()} <br />
                      <strong>Status:</strong> {comment.action} <br />
                      <hr />
                    </li>
                  ))}
                </ul>
              )}
            </DialogContent>
            <DialogActions style={styles.dialogActions}>
              <Button onClick={() => setDialogOpen(false)}  style={styles.closeButton}>Close</Button>
            </DialogActions>
          </Dialog>




                    {/* Workflow History Section */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              backgroundColor: 'aliceblue',
              p: 3,
              borderRadius: '20px',
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Workflow History</Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Level</StyledTableCell>
                    <StyledTableCell>Employee ID</StyledTableCell>
                    <StyledTableCell>Employee Name</StyledTableCell>
                    <StyledTableCell>Begin Date</StyledTableCell>
                    <StyledTableCell>End Date</StyledTableCell>
                    <StyledTableCell>Days Taken</StyledTableCell>
                    <StyledTableCell>Result</StyledTableCell>
                    <StyledTableCell>Remarks</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Add your workflow history data here */}
                  {[
                    // Example data structure
                    { level: '1', employeeId: 'emp100', employeeName: 'Buddi/Maxy', beginDate: '', endDate: '', daysTaken: '', result: '', remarks: '' },
                    // Add more entries as needed...
                  ].map((history, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{history.level}</StyledTableCell>
                      <StyledTableCell>{history.employeeId}</StyledTableCell>
                      <StyledTableCell>{history.employeeName}</StyledTableCell>
                      <StyledTableCell>{history.beginDate}</StyledTableCell>
                      <StyledTableCell>{history.endDate}</StyledTableCell>
                      <StyledTableCell>{history.daysTaken}</StyledTableCell>
                      <StyledTableCell>{history.result}</StyledTableCell>
                      <StyledTableCell>{history.remarks}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>


          {/* Submit Button */}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Box>

          {/* Snackbar for error messages */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        
      
    </Box>
  );
};

export default CreateInquiry;

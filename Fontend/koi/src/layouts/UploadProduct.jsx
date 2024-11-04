import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Stack, Snackbar, Alert } from '@mui/material';

const UploadProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result); // Set the Base64 string
            };
            reader.readAsDataURL(file); // Read the file as a data URL
            setImage(file); // Optionally store the file for any other use
        }
    };

    const handleUpload = async () => {
        const payload = {
            productName,
            productDescription: description,
            price: parseFloat(price), // Ensure price is a number
            stockQuantity: parseInt(quantity), // Ensure quantity is a number
            image: imageBase64, // Use the Base64 string for the image
        };

        try {
            const response = await fetch("https://localhost:7230/Product/create-product", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify(payload), // Convert the payload to JSON
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the error message from the response
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const result = await response.json();
            console.log('Product uploaded:', result);

            // Show success message
            setSnackbarMessage('Product uploaded successfully!');
            setOpenSnackbar(true);
            // Optionally reset the form after a successful upload
            resetForm();
        } catch (error) {
            console.error("Error uploading product:", error);
            setSnackbarMessage('Failed to upload product.'); // Set error message
            setOpenSnackbar(true); // Open snackbar to show error message
        }
    };

    const resetForm = () => {
        setProductName('');
        setPrice('');
        setDescription('');
        setQuantity('');
        setImage(null);
        setImageBase64('');
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close snackbar
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            minWidth="170vh"
            bgcolor="#f5f5f5"
            p={3}
        >
            <Card sx={{ width: 500, padding: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Upload New Product
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />

                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                border: '1px dashed #aaa',
                                color: '#555',
                                justifyContent: 'left',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: '#333',
                                    backgroundColor: '#f9f9f9'
                                }
                            }}
                        >
                            {image ? image.name : 'Upload Image'}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleUpload}
                            sx={{
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                backgroundColor: '#4CAF50',
                                '&:hover': {
                                    backgroundColor: '#45A049'
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* Snackbar for success/error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UploadProduct;

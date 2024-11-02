import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Stack } from '@mui/material';

const UploadProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);

    const handleUpload = () => {
        // Xử lý upload sản phẩm
        console.log('Product uploaded:', { productName, price, description, quantity, image });
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
                                onChange={(e) => setImage(e.target.files[0])}
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
        </Box>
    );
};

export default UploadProduct;

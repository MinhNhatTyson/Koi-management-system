import React from "react";
import Button from '@mui/material/Button';
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const OrderPage = () => {
    return (
        <div className="order-page-content w-100">
            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">Order List</h3>
                <div className="table-responsive mt-3">
                    <table className="table table-hover table-bordered v-algin">
                        <thead className="thead-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Description</th>
                                <th>Order Price</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#12345</td>
                                <td>John Doe</td>
                                <td>Order mô tả chi tiết sản phẩm...</td>
                                <td>$100</td>
                                <td>3</td>
                                <td>
                                    <img src="https://example.com/product.jpg" alt="Product" width="50" />
                                </td>
                                <td>
                                    <div className="actions d-flex align-items-center justify-content-center">
                                        <Button color="secondary"><FaEye /></Button>
                                        <Button color="success"><FaPencilAlt /></Button>
                                        <Button color="error"><MdDelete /></Button>
                                    </div>
                                </td>
                            </tr>
                            {/* Các hàng khác có thể được thêm ở đây */}
                            <tr>
                                <td>#12345</td>
                                <td>John Doe</td>
                                <td>Order mô tả chi tiết sản phẩm...</td>
                                <td>$100</td>
                                <td>3</td>
                                <td>
                                    <img src="https://example.com/product.jpg" alt="Product" width="50" />
                                </td>
                                <td>
                                    <div className="actions d-flex align-items-center justify-content-center">
                                        <Button color="secondary"><FaEye /></Button>
                                        <Button color="success"><FaPencilAlt /></Button>
                                        <Button color="error"><MdDelete /></Button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>#12345</td>
                                <td>John Doe</td>
                                <td>Order mô tả chi tiết sản phẩm...</td>
                                <td>$100</td>
                                <td>3</td>
                                <td>
                                    <img src="https://example.com/product.jpg" alt="Product" width="50" />
                                </td>
                                <td>
                                    <div className="actions d-flex align-items-center justify-content-center">
                                        <Button color="secondary"><FaEye /></Button>
                                        <Button color="success"><FaPencilAlt /></Button>
                                        <Button color="error"><MdDelete /></Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;

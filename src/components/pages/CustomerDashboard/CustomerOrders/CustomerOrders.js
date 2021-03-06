import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CustomerOrders = () => {
    const { users } = useAuth();
    const [customerOrders, setCustomerOrders] = useState([]);
    useEffect(() => {
        const url = `https://vast-lake-15285.herokuapp.com/manageOrders/${users?.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCustomerOrders(data))

    }, [customerOrders, users?.email])

    // delete operation 
    const handleDeleteClick = (id) => {
        const process = window.confirm("Are you sure! You Want to delete")
        if (process) {
            const url = `https://vast-lake-15285.herokuapp.com/manageOrders/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        alert('Deleted Successfully')
                        const remaining = customerOrders.filter(order => order._id !== id)
                        setCustomerOrders(remaining);
                    }
                })
        }
    }

    const handleAlertClick = () => {
        alert('Payment Added Soon')
    }
    return (
        <div className='container'>
            <h1 className='text-center mt-5 mb-5'>Orders</h1>
            <div className='table-responsive-sm'>
                <table className="table table-sm table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerOrders.map((customerOrder) =>
                            
                                
                                <tr>
                                    <th scope="row">*</th>
                                    <td>{customerOrder.name}</td>
                                    <td>{customerOrder.userEmail}</td>
                                    <td>{customerOrder.productName}</td>
                                    <td>$ {customerOrder.price}</td>
                                    <td>{customerOrder.date}</td>
                                    <td><i style={{ cursor: 'pointer' }} onClick={handleAlertClick} className="fab fa-amazon-pay text-warning text-center"></i></td>
                                    <td>{customerOrder.orderStatus}</td>
                                    {customerOrder.orderStatus === 'Pending' ? <td><i style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(customerOrder._id)} className="fas fa-trash text-danger"></i></td> : <td></td> }

                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default CustomerOrders;
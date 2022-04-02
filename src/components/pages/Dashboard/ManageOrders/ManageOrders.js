import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
    const [manageOrders, setManageOrders] = useState([]);
    const { name, email, address, contactNumber, productName, price, orderStatus, date } = manageOrders;
    useEffect(() => {
        fetch('http://localhost:5000/manageOrders')
            .then(res => res.json())
            .then(data => setManageOrders(data))
    }, [manageOrders])

    const handleUpdateClick = (id, status) => {
        const data = {status: status};
        const process = window.confirm("Are you sure")
        if(process) {
            const url = `http://localhost:5000/manageOrders/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body:JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount === 1) {
                    alert("Successfully Updated ");
                    setManageOrders(manageOrders);
                }
            });
        }
    };

    // delete operation 
    const handleDeleteClick = (id) => {
        const process = window.confirm("Are you sure! You Want to delete")
        if(process) {
            const url = `http://localhost:5000/manageOrders/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount === 1) {
                    alert('Deleted Successfully')
                    const remaining = manageOrders.filter(order => order._id !== id)
                    setManageOrders(remaining);
                }
            })
        }
    }
    return (
        <div className='container'>
            <h1 className='text-center mt-5 mb-5'>Manage Orders</h1>
            <div>
                <table className="table table-sm table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Status Change</th>
                            <th scope="col">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageOrders.map((manageOrder) =>

                                <tr>
                                    <th scope="row">*</th>
                                    <td>{manageOrder.name}</td>
                                    <td>{manageOrder.email}</td>
                                    <td>{manageOrder.productName}</td>
                                    <td>$ {manageOrder.price}</td>
                                    <td>{manageOrder.date}</td>
                                    <td>{manageOrder.orderStatus}</td>

                                    {/* 
                            <td><i onClick={() => handleDeleteClick(order._id)} className="fas fa-trash text-danger"></i></td> */}

                                    <td className="text-center">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle btn-sm"
                                                type="button"
                                                id="dropdownMenu2"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="fas fa-tasks"></i> manage
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenu2"
                                            >
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateClick(manageOrder._id, "Approved")
                                                        }
                                                        className="dropdown-item"
                                                        type="button"
                                                    >
                                                        Approved
                                                    </button>
                                                </li>
                                                
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateClick(manageOrder._id, "Shipped")
                                                        }
                                                        className="dropdown-item"
                                                        type="button"
                                                    >
                                                        Shipped
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateClick(manageOrder._id, "Delivered")
                                                        }
                                                        className="dropdown-item"
                                                        type="button"
                                                    >
                                                        Delivered
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td><i style={{cursor:'pointer'}} onClick={() => handleDeleteClick(manageOrder._id)} className="fas fa-trash text-danger"></i></td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;
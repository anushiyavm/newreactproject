import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './data';

function Users() {
    let navigate = useNavigate();
    let token = localStorage.getItem("authToken");
    let [data, setData] = useState([]);
    let [show, setShow] = useState(false);
    let [userRole, setUserRole] = useState(""); // State to hold user role

    function logout() {
        localStorage.clear();
        navigate("/login");
    }

    useEffect(() => {
        async function findAll() {
            let users = await fetch("http://localhost:2311/all/users", {
                method: "GET",
                headers: {
                    "auth-token": `${token}`,
                    "Content-Type": "application/json"
                }
            });
            let resp = await users.json();
            if (resp.response === "Authentication failed" || resp.response === "no token") {
                navigate("/login");
            }
            if (resp.data) {
                setShow(true);
                setData(resp.data);
                // Set userRole based on the first user (or modify as needed)
                // Assuming that the first user in the data array is the logged-in user
                if (resp.data.length > 0) {
                    setUserRole(resp.data[0].role);
                }
            }
        }
        findAll();
    }, [navigate, token]);

    return (
        <div className='user-div'>
            <div className='registered-users'>
                <div className='nav-bar d-flex justify-content-between align-items-center ps-5 pe-5' style={{ height: "100px", background: "#00325E" }}>
                    <p style={{ color: "white", fontWeight: "600", fontSize: "20px", marginTop: "4px" }}> Welcome</p>
                    <button className='btn' style={{ background: "red", color: "white" }} onClick={logout}>Logout</button>
                </div>
                <div className='all-users'>
                    {show ? <div>
                        <div>
                            <p className='fs-4 mt-3'>Registered users</p>
                            <div className='datas'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user, ind) => (
                                            <tr key={ind}>
                                                <td data-label="Name">{user.firstName} {user.lastName}</td>
                                                <td data-label="Email">{user.email}</td>
                                                <td data-label="Role">{user.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> : <p className='mt-4'>Loading....</p>}

                    {/* Conditionally render button based on user role */}
                    {userRole === "admin" && (
                        <button className='btn btn-primary mt-3'>Admin Action</button> // Replace with your admin action
                    )}
                </div>
                <ProductList />
            </div>
        </div>
    );
}

export default Users;

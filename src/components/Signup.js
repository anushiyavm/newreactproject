import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import add from "./images/user.png";

function Signup() {
    let [formData, setFormData] = useState({
       name:"",
        email: "",
        password: "",
        roles: ""
    });
    let [msg, setMsg] = useState("");
    let [show, setShow] = useState(false);
    let [btn, setBtn] = useState("Signup");
    let [disable, setDisable] = useState(false);
    let navigate = useNavigate();

    async function createUser(obj) {
        setDisable(true);
        setBtn("Checking...");
        try {
            const response = await fetch("http://localhost:2311/signup", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const result = await response.json();
            if (result.ok) {
                navigate("/login");
            } else {
                setMsg(result.response);
                setShow(true);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setBtn("Signup");
            setDisable(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password } = formData;

        if (password.length < 6 || password.length >= 16) {
            setShow(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }

        createUser(formData);
    }

    function handleChange(e) {
        let { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setShow(false);
    }

    return (
        <div className='signup-div min-vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className='sign-div'>
                <div className='my-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-comp'>
                            <div className='d-flex justify-content-center mb-3'>
                                <img src={add} alt='Signup avatar' className='signup-avatar' style={{ width: "90px", height: "90px" }} />
                            </div>
                            <div className='inp-comp d-flex flex-column justify-content-center align-items-stretch' style={{ gap: "20px" }}>
                                <div className='name-field d-flex flex-md-row flex-column justify-content-center align-items-stretch' style={{ gap: "10px" }}>
                                    
                                    <input
                                        type='text'
                                        placeholder='name'
                                        name='name'
                                        value={formData.name}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <input
                                    type='email'
                                    placeholder='Your email'
                                    name='email'
                                    value={formData.email}
                                    required
                                    onChange={handleChange}
                                />
                                <input
                                    type='password'
                                    placeholder='Your password'
                                    name='password'
                                    value={formData.password}
                                    required
                                    onChange={handleChange}
                                />
                                <select
                                    required
                                    name='role'
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">
                                        Select your role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            {show && <p className='error mt-2' style={{ textAlign: "center" }}>{msg}</p>}
                            <div className='btn-div mt-4'>
                                <button className='btn bg-success fw-semibold' style={{ background: "#00CCFF", color: "white", width: "100%" }}
                                disabled={disable}>
                                    {btn}
                                </button>
                            </div>
                            <div className='mt-2'>
                                <Link to="/login"><p style={{ textAlign: "center", marginRight: "20px" }}>Already have an account?</p></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

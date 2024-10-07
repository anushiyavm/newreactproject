import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import add from "./images/user.png";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [btn, setBtn] = useState("Login");
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    async function createUser(obj) {
        setDisable(true);
        setBtn("Verifying...");
        try {
            const response = await fetch("https://backendserver-af6p.onrender.com/login", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const result = await response.json();
            if (result.ok) {
                localStorage.setItem("userId", result.id);
                localStorage.setItem("authToken", result.token);
                navigate("/all-users");
            } else {
                setMsg(result.response);
                setShow(true);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setBtn("Login");
            setDisable(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formData;

        if (password.length < 6 || password.length >= 16) {
            setShow(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }

        createUser({ email, password });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setShow(false);
    }

    return (
        <div className='signup-div login-div min-vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className='sign-div'>
                <div className='my-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-comp'>
                            <div className='d-flex justify-content-center mb-3'>
                                <img src={add} alt='Signup avatar' className='signup-avatar' style={{ width: "90px", height: "90px" }} />
                            </div>
                            <div className='inp-comp d-flex flex-column justify-content-center align-items-stretch' style={{ gap: "20px", width: "350px" }}>
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
                            </div>
                            {show && <p className='error mt-2' style={{ textAlign: "center" }}>{msg}</p>}
                            <div className='btn-div mt-4'>
                                <button className='btn bg-success fw-semibold' style={{ background: "#00CCFF", color: "white", textAlign: "center", width: "30%" }} disabled={disable}>{btn}</button>
                            </div>
                            <div className='mt-2'>
                            <Link to="/forgot"><p style={{ textAlign: "center", marginRight: "20px", marginTop: "20px" }}>Forgot password ?</p></Link>
                                <Link to="/"><p style={{ textAlign: "center", color: "white", textDecoration: "none" }}>Don't have an account?</p></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

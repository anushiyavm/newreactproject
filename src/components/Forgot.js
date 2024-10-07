import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import add from "./images/user.png";

function Forgot() {
    let [email, setEmail] = useState("");
    let [msg, setMsg] = useState("");
    let [show, setShow] = useState(false);
    let [btn, setBtn] = useState("Forgot");
    let [disable, setDisable] = useState(false);
    let navigate = useNavigate();

    async function createUser(obj) {
        setDisable(true);
        setBtn("Verifying...");
        try {
            let response = await fetch("https://backendserver-af6p.onrender.com/forgot", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let result = await response.json();
            if (result.ok) {
                alert(result.response);
                navigate("/login")
            }
            else {
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
        let obj = {
            email
        }

        createUser(obj);
    }

    function handleChange(e) {
        setEmail(e.target.value)
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
                                    value={email}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            {show && <p className='error mt-2' style={{ textAlign: "center" }}>{msg}</p>}
                            <div className='btn-div mt-4'>
                                <button className='btn bg-success fw-semibold' style={{ background: "#00CCFF", color: "white", textAlign: "center", width: "30%" }} disabled={disable}>{btn}</button>
                            </div>
                            <div className='mt-2'>
                            
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgot;

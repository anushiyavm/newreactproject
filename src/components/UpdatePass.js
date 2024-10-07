import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import add from "./images/user.png"

function UpdatePass() {
    let { id, token } = useParams();
    let [show, setShow] = useState(true);
    let [btn, setBtn] = useState("Update");
    let [password, setPassword] = useState("");
    let navigate = useNavigate();
    let [msg, setMsg] = useState("");
    let [show1, setShow1] = useState(false);
    let [enable, setEnable] = useState(false);
    useEffect(() => {

        async function verifytoken() {
            let isValid = await fetch(`https://backendserver-af6p.onrender.com/token-verify/${id}/${token}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            let response = await isValid.json();
            if (response.ok) {
                setShow(false);
            } else {
                alert(response.response);
                navigate("/forgot")
            }
        }
        verifytoken();
    }, [])

    function handleSubmit(e) {
        
        e.preventDefault()
        if (password.length < 6 || password.length >= 16) {
            setShow1(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }
        let obj = {
            password
        }
        addNewPass(obj);
    }
    async function addNewPass(obj) {
        setBtn("Updating...")
        setEnable(true);
        try {
            let addUser = await fetch(`https://backendserver-af6p.onrender.com/update/${id}`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            })
            let response = await addUser.json();
            if (response.ok) {

                alert(response.response);
                navigate("/login")
            }
            else {
                setMsg(response.response);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally {
            setBtn("Update");
            setEnable(true);
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setShow1(false);
    }
    return (
        <div className='signup-div update-div d-flex justify-content-center align-items-center min-vh-100'>
            {show ? <div>

                <div className='d-flex justify-content-center align-items-center'><div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                    <span className='ms-3 text-white'>Verifying.... Please wait</span>
                </div>

            </div>
                :
                <div className='login-div d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='container my-sign-div d-flex justify-content-center align-items-center pt-5 pb-5'>
                    <div className='my-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-comp'>
                            <div className='d-flex justify-content-center mb-3'>
                                <img src={add} alt='Signup avatar' className='signup-avatar' style={{ width: "90px", height: "90px" }} />
                            </div>
                            <div className='inp-comp d-flex flex-column justify-content-center align-items-stretch' style={{ gap: "20px", width: "350px" }}>
                                <input
                                    type='password'
                                    placeholder='Your password'
                                    name='password'
                                    value={password}
                                    required
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            {show && <p className='error mt-2' style={{ textAlign: "center" }}>{msg}</p>}
                            <div className='btn-div mt-4'>
                                <button className='btn bg-success fw-semibold' style={{ background: "#00CCFF", color: "white", textAlign: "center", width: "30%" }} disabled={enable}>{btn}</button>
                            </div>
                            <div className='mt-2'>
                            
                            </div>
                        </div>
                    </form>
                </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UpdatePass;

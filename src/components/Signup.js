import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";
const Signup = (props) => {
    const [Credentials, setCredentials] = useState({ name: "", email: "", password: "" ,cpassword: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Credentials.password===Credentials.cpassword){
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name: Credentials.name, email: Credentials.email, password: Credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken)
            navigate("/");
            props.showAlert("Account Created Succefully","success")
        }
        else {
            props.showAlert("Invalid credentials","danger")
        }
    }else{
        props.showAlert("Password does not match","danger")
    }
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h2 className='mb-4'>Signup to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={Credentials.name} onChange={onChange} minLength={3}required />
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={Credentials.email} aria-describedby="emailHelp" onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={Credentials.password} onChange={onChange} minLength={5}required/>
                </div>
                <div className="my-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" className="form-control" id="cpassword" value={Credentials.cpassword} onChange={onChange} minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup

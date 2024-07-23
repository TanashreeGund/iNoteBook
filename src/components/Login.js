import React, {useState}from 'react'
import { useNavigate} from "react-router-dom";


const Login = (props) => {
    const [Credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({email:Credentials.email, password:Credentials.password})
        });
        const json=await response.json();
        console.log(json);
        setCredentials({email:"", password:""})
        if(json.success) {
            
            props.showAlert("Login successful","success");
            localStorage.setItem('token', json.authToken)
            navigate("/");
            
        }
        else {
            props.showAlert("Invalid credentials","danger")
        }
    }
    const onChange = (e) =>{
        setCredentials({...Credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2 className='mb-4'>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  value={Credentials.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={Credentials.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
    )
}

export default Login

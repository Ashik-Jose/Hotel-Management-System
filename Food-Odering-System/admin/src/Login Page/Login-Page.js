import { useState } from 'react';
import './Login-Page.css';
import signIn from '../Assets/signIn.svg';
import signInErr from '../Assets/SignInErr.svg';
import { useNavigate } from 'react-router';
import API from '../api';

const LoginPage = () => {

const [login,setLogin] = useState({username:"",password:""})
const [err,setErr] = useState(false);
const navigate = useNavigate();
    return (
        <div className="LoginPage">
            <div className='login-box'>
                <h1 className='login-heading'>Login</h1>
                <form>
                    <div style={{ marginBottom: "12px" }}>
                        <label><p style={{
                            marginLeft: "10px",
                            marginTop: "0px",
                            fontSize: "20px",
                            fontWeight: "bold"
                        }}>Name</p></label>
                        <input className="login-name" value={login.username} onChange={(e) => {setLogin({...login, username:e.target.value}); setErr(false)}}/>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                        <lable><p style={{
                            marginLeft: "10px",
                            marginTop: "0px",
                            fontSize: "20px",
                            fontWeight: "bold"
                        }}>Password</p></lable>
                        <input className="login-password" type="password" value={login.password} onChange={(e) => {setLogin({...login, password:e.target.value});setErr(false)}}/>
                    </div>
                </form>
                <img style={{ marginTop: "13px", cursor: err ? "default" : "pointer" }} src={err ? signInErr : signIn} alt="" disabled={err} onClick={()=> {
                    API.post('/login', login).then((response) => {
                     console.log("Signed IN")
                     navigate('/home')
                    }).catch(error => {
                        setErr(true);
                        console.log("Error");
                    });
                }}/>
            </div>
        </div>
    );
}

export default LoginPage;
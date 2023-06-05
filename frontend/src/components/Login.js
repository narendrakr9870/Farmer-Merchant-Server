import React,{useState} from "react";
// import { Link } from "react-router-dom";
import Clock from 'react-live-clock';
import { NavLink } from "react-router-dom";
import logo from '../images/favicon.png';
import "../index.css";
import { FcAlarmClock} from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
// import axios from "axios";

const Login = () => {
  
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const loginDetails = async (data) => {

    setLoading(true);
    try{
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );
      console.log("FORM RESPONSE......", savedUserResponse);
      if(savedUserResponse.status === 200){
        alert('Login Successful');
        navigate('/admin');
      }
      else alert('Invalid credentials');
      setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <>

      {
            loading ? <Spinner />  :
            <div>
<div className="header">
        <img src={logo} alt="{logo}"/>
        <h1>Farmer-Merchant Server</h1>
        <div className="datetime">
          <FcAlarmClock className="clock"/>
          <Clock format={'hh:mm:ss A'} ticking={true}/>
        </div>
      </div>

      <nav className="navbar">
        <span>
          <i className="fa fa-home cls"></i>
          <NavLink to="/" className="navlink"> Home </NavLink>
        </span>
      </nav>
      
      <div className="login-container">
        <form onSubmit={handleSubmit(loginDetails)}>
            <div className="login-section">
              <label htmlFor="email">Email</label>
              <input className="boxes" type="email" id="email" placeholder="Enter your email" {...register("email")} required/>
            </div>
            <div className="login-section">
              <label htmlFor="password">Password</label>
              <input className="boxes" type="password" id="password" placeholder="Enter your password" {...register("password")} required/>
            </div>
            <div className="login-section">
              <label htmlFor="role">User Type</label>
              <select className="boxes" {...register("role")} >
                <option value="admin">Admin</option>
                <option value="farmer">Farmer</option>
                <option value="merchant">Merchant</option>
              </select>
            </div>
            <div>
              <button type="submit" className='submit'>Login to Continue</button>
            </div>
            <NavLink to="/forgotPassword" className="forgot"> Forgot password? </NavLink>
        </form>
      </div>
      </div>
      }
    </>
  )
}

export default Login;
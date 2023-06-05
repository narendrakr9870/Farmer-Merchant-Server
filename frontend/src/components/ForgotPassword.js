import React,{useState} from "react";
import Clock from 'react-live-clock';
import { NavLink } from "react-router-dom";
import logo from '../images/favicon.png';
import "../index.css";
import { FcAlarmClock} from "react-icons/fc";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
// import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {

    const { register, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);

    const emailDetail = async (data) => {
    
    setLoading(true);
    
    try{
        const savedUserResponse = await fetch(
            `${process.env.REACT_APP_BASE_URL}/forgotPassword`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...data }),
            }
          );
          console.log("FORM RESPONSE......", savedUserResponse);
          if(savedUserResponse.status === 200){
            alert('Password has been sent to your email');
          }
          else alert('Invalid details');

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

        <div className="login-container">
            <form onSubmit={handleSubmit(emailDetail)}>
                <div className="login-section">
                    <label htmlFor="email">Email</label>
                    <input className="email-field" type="email" id="email" placeholder="Enter your email" {...register("email")} required/>
                </div>
            
                <div>
                <button type="submit" className='submit'>Submit</button>
                </div>
                <NavLink to="/login" className="login-page"> Login Page </NavLink>
            </form>
        </div>
        </div>}
    </>
    )
}

export default ForgotPassword;
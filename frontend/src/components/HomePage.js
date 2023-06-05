import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import { NavLink } from "react-router-dom";
import logo from '../images/favicon.png';
import "../index.css";
import { FcAlarmClock} from "react-icons/fc";
import Spinner from "../components/Spinner";


const HomePage = () => {

  const [vegData, setVegData] = useState();
  const [loading, setLoading] = useState(false);

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const getAllData = async () => {
    setLoading(true);
    try {
      const getData = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getAllVegetables`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getData.json();
      setVegData(res);
    } 
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllData();
  },[]);

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
      <span>
        <i className="fa fa-bars cls"></i>
        <NavLink to="/#about" className="navlink"> About </NavLink>
      </span>
      <span>
        <i className="fa fa-phone-square cls"></i>
        <NavLink to="/#contact" className="navlink"> Contact </NavLink>
      </span>
      <span style={{float:'right'}}>
        <i className="fa fa-user cls"></i>
        <NavLink to="/login" className="navlink"> Login </NavLink>
      </span>

    </nav>

    <div className="banner">
    </div>

    <div className='row'>
      <div className='leftcolumn'>
        <div className="card">
          <h2>WHAT YOU CAN DO HERE</h2>
          <div className="details">
            <p>
              On this website 'Farmer-Merchant Server', farmers can view their daily vegetables' sales, total sales, advance amount taken, etc. Merchants can view their generated slip for the vegetables they have bought, and the previous payments they have made, if any. Also, anyone can view the market rate of different vegetables and interested farmer or merchant can take benefit of this.
            </p>
          </div>
        </div>

        <div className="card" id="about">
          <h2>ABOUT US</h2>
          <div className="details">
            <p>
              Here, we simply maintain daily record of sales and further process those data to generate bills for the merchants.
            </p>
          </div>
        </div>
      </div>

      <div className='rightcolumn'>

        <div className="card">
          <h2>Market Rate</h2>
          <div className="details2">
            <div>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th>
                      S.No.
                    </th>
                    <th>
                      Vegetable
                    </th>
                    <th>
                      Average Rate
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {vegData?.data.map((vegetable,count) => (
                    <tr key={vegetable.veg_id} className="table-row">
                      <td className="table-data">
                        {++count}
                      </td>
                      <td className="table-data">
                        {vegetable.veg_name}
                      </td>
                      <td className="table-data">
                        {average(vegetable.rate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>

    <div className='footer' id="contact">
      <p className="contact">Contact us at </p>
      <p>Phone : <a href="tel:+919852449826" title="click to call">+91 9852449826</a></p>
      <p>Email : <a href="mailto:narendra0@yahoo.com" title="click to email">narendra0@yahoo.com</a></p>
    </div>
    </div>
  }
    </>
  )
}

export default HomePage;
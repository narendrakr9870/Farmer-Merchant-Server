import React,{ useEffect, useState } from "react";
import Clock from 'react-live-clock';
import { NavLink , useNavigate} from "react-router-dom";
import logo from '../images/favicon.png';
import "../index.css";
import { FcAlarmClock} from "react-icons/fc";
import Spinner from "../components/Spinner";

const Dashboard = () => {

    const [entryData, setEntryData] = useState();
    const [loading, setLoading] = useState(false);



    const getAllData = async () => {
    setLoading(true);
    try {

      const getData = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getData.json();
      setEntryData(res);

    } 
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllData();
  },[]);

    // const navigate = useNavigate();
    // const [authenticated, setauthenticated] = useState(null);
    // useEffect(() => {
    // const loggedInUser = localStorage.getItem("authenticated");
    // if (loggedInUser) {
    //   setauthenticated(loggedInUser);
    // }
    // }, []);

    // if (!authenticated) {
    //     navigate('/login');
    // } else {

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
                <i className="fa fa-edit cls"></i>
                <NavLink to="/admin/dataEntry" className="navlink"> Data Entry </NavLink>
            </span>
            <span>
                <i className="fa fa-folder-open cls"></i>
                <NavLink to="/admin/sells" className="navlink"> Sells </NavLink>
            </span>
            <span>
                <i className="fa fa-server cls"></i>
                <NavLink to="/admin/bills" className="navlink"> Bills </NavLink>
            </span>
            <span>
                <i className="fa fa-ticket cls"></i>
                <NavLink to="/admin/advance" className="navlink"> Advance </NavLink>
            </span>
            <span>
                <i className="fa fa-plus-square cls"></i>
                <NavLink to="/admin/createUser" className="navlink"> Register </NavLink>
            </span>
            <span style={{float:'right'}}>
                <i className="fa fa-sign-out cls"></i>
                <NavLink to="/" className="navlink"> Logout </NavLink>
            </span>
            <span style={{float:'right'}}>
                <i className="fa fa-user cls"></i>Narendra
                </span>
        </nav>

        <div className="table-container">
            <h2><u>Latest Entries</u></h2>
            <table><thead>
                <tr className="thead">
                    <th>S.No.</th>
                    <th>Farmers</th>
                    <th>Items</th>
                    <th>Weight</th>
                    <th>Rate</th>
                    <th>Merchants</th>
                    <th>Action</th>
                </tr></thead>
                {/* <tbody>
                {entryData?.data.map((entries,count) => (
                <tr key={entries._id}>
                    <th>{++count}</th>
                    <th>{entries.farmer}</th>
                    <th>{entries.vegtable}</th>
                    <th>{entries.weight}</th>
                    <th>{entries.rate}</th>
                    <th>{entries.merchant}</th>
					<th><input type="button" value="Update"/></th>
                </tr>
                ))}</tbody> */}
            </table>
        </div>
        </div>
        }
    
    </>
    )
    }

// }
export default Dashboard;
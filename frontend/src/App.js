import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Forgot from "./components/ForgotPassword";
import "./index.css"


function App() {

    try {

      const getData = fetch(
        `${process.env.REACT_APP_BASE_URL}/admin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      var res = getData.json;
    }
    catch(error){console.log(error)}

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element = { <Forgot />} />
        <Route path="/admin" element={<Dashboard {...res}/>} />
      </Routes>
    </div>
  );
}

export default App;

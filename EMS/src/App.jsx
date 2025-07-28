import React from "react";
import Header from "./Component/Header/Header";
import Dashboard from "./Component/Dashboard/Dashboard";
import {  Route, Routes } from "react-router-dom";
import NotFound from "./Component/NotFound/NotFound";
import PostUser from "./Component/Employee/PostUser";
import UpdateEmp from "./Component/UpdateUser/UpdateEmp"


const App = () => {
  return (
    <div >
      <Header />
  
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employee" element={<PostUser/>} />
    <Route path="/employee:id" element={<UpdateEmp/>} />

    <Route path="*" element={<NotFound />} />


  </Routes>


    </div>
  );
};

export default App;

import React, { useContext, useEffect } from "react";

import Wizard from '../Forms/Wizard/Wizard.js'

import { ThemeContext } from "../../../context/ThemeContext";

const Home = () => {


  const {changeBackground} = useContext(ThemeContext);
  useEffect(()=>{
    changeBackground({value:'light', label:'Light'})
  },[])
  return (
    <Wizard/>
  );
};

export default Home;

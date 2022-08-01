import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { userSelector } from "../store/session";
import NavBar from "./NavBar";
import { useEffect } from "react";

const HomePage = () => {
  return (
    <div>
        Hi! This is the Discord homepage
    </div>
  );
};

export default HomePage;

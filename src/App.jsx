import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dictionary from "./dictionary/Dictionary";

const App = () => (
    <>
        <Dictionary />
        <ToastContainer />
    </>
);

export default App;

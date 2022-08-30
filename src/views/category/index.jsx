import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const Category = (props) => {
    const location = useLocation();
    const state = location.state;
    console.log(state);
    return (
        <div><p>hello</p></div>
    );
};

export default Category;
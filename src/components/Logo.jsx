import React from "react";
import logoImg from "../assets/adding_Post.png"
function Logo({width = '120px'}) {
    return (
       <img 
       src={logoImg}
       alt="Logo"
       style={{ width }}
       className=""
        />
    )
}

export default Logo
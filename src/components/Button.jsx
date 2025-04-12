import React from "react";

export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className ='',
    ...props
}) {
    // const btnHandler = async(data) => {
    //     // console.log("clicked sucussfully");
    //     console.log(data);
        
    //     // const userData = await authService.createAccount(data)
    //     // console.log("userData Fetched",userData);
        
       
        
    // }
    return (
        <button 
        // onClick={btnHandler}
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
        {...props}>
            {children}
        </button>
    )
}

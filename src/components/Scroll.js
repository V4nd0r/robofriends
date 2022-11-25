import React from "react";

const Scroll = (props) => {
    return (
       <div style={{ border: '2px solid black', height: '800 px'}}>
            {props.children}
        </div>
    );
};

export default Scroll;

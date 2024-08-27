import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
// this is the filled heart


function FavoriteButton(){
    return(
        <>
<button className="btn p-2 position-absolute top-0 end-0 m-2 rounded-circle" style={{ backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <CiHeart size={20} />
              </button>
      </>
    );

}

export default FavoriteButton;
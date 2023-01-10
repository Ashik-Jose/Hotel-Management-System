import React from "react";
import { useNavigate } from "react-router";
import './homePage.css';
import bill from '../Assets/billingIcon.svg';
import food from '../Assets/foodIcon.svg';
import kitchen from '../Assets/kitchenIcon.svg';
import resources from '../Assets/ResourcesIcon.svg';
import staff from '../Assets/staffIcon.svg';
import logout from '../Assets/logout.png'


const Home =() => {
  const navigate = useNavigate();
    return (
        <div>
         <div> <img height="60px" style={{float:"right",paddingRight:"30px",cursor:"pointer"}} src={logout} alt="" onClick={()=>{navigate('/')}}/></div>
            <h1 className="home-heading">Hello, Select your Option</h1>
    <div className='row1'>
    <div className='table-card' onClick={()=> {navigate('/staff')}}>
        <div className="card-content">
            <img src={staff} alt="" />
      <div className='card-name'>Staff</div>
      </div>
    </div>
    <div className='table-card' onClick={()=>{navigate('/food')}}>
    <div className="card-content">
    <img src={food} alt="" />
      <div className='card-name'>Food</div>
      </div>
    </div>
    <div className='table-card' onClick={()=>{navigate('/resources')}}>
    <div className="card-content">
    <img src={resources} alt="" />
      <div className='card-name'>Resources</div>
      </div>
    </div>
    </div>
    <div className='row2'>
    <div style={{marginRight:"8rem"}} className='table-card' onClick={()=>{navigate('/kitchen')}}>
    <div className="card-content">
    <img src={kitchen} alt="" />
      <div className='card-name' style={{marginTop: "2rem"}}>Kitchen</div>
      </div>
    </div>
    <div className='table-card' onClick={()=>{navigate('/billing')}}>
    <div className="card-content">
    <img src={bill} alt="" />
      <div className='card-name'>Billing</div>
      </div>
    </div>
    </div>
    </div>
    );
}

export default Home;
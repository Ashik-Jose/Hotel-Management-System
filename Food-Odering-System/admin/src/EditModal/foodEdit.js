import React, { useState } from 'react';
import './modal.css';
import API from '../api';

const  Modal=({ isVisible, onClose,details })=> {
    console.log(details)
    const [data,setData] = useState({
        name:details.name,
        price:details.price,
        availability:details.availability
    })

    if (!isVisible) return null;

  return(
    <div className="main-card">
        <form>
            <h1 className="heading">ADD NEW FOOD</h1>
            <div className="form-group">
                <label className="form-label">Name </label>
                <input className="form-control" type="text" value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Price </label>
                <input className="form-control" type="number" value={data.price} onChange={(e)=>{setData({...data,price:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Availability </label>
                <input className="form-control" type="text" value={data.availability} onChange={(e)=>{setData({...data,availability:e.target.value})}}/>
            </div>
            <div className="button-group">
                <button className="btn1" type="button" onClick={()=>{onClose()}} >CANCEL</button>
                <button className="btn2" type="buttom" onClick={()=>{
                        console.log(data)

                        API.put('/updatefood',data).then((response) => {
                          
                            console.log(response.data)
                            // setData(response.data)
                        }).catch(error => {
                            console.log(error)
                        });
                        
                        }}>SAVE</button>
            </div>
        </form>
    </div>
)
}

export default Modal;
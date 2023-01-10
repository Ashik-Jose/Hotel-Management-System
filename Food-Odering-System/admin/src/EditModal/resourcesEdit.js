import React, { useState } from 'react';
import './modal.css';
import API from '../api';

const  Modal=({ isVisible, onClose,details })=> {

    const [data,setData] = useState({
        name:details.name,
        quantity:details.quantity,
        supply_source:details.supply_source,
        defective:details.defective
    })
    if (!isVisible) return null;

  return(
    <div className="main-card">
        <form>
            <h1 className="heading">ADD NEW RESOURCE</h1>
            <div className="form-group">
                <label className="form-label">Name </label>
                <input className="form-control" type="text" value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Quantity </label>
                <input className="form-control" type="number"  value={data.quantity} onChange={(e)=>{setData({...data,quantity:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Supply Source </label>
                <input className="form-control" type="text"  value={data.supply_source} onChange={(e)=>{setData({...data,supply_source:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Defective </label>
                <input className="form-control" type="number" value={data.defective} onChange={(e)=>{setData({...data,defective:e.target.value})}}/>
            </div>
            <div className="button-group">
                <button className="btn1" type="button" onClick={()=>{onClose()}} >CANCEL</button>
                <button className="btn2" type="buttom"  onClick={()=>{
                        console.log(data)

                        API.put('/updateresources',data).then((response) => {
                          
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
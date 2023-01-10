import React, { useState } from 'react';
import './modal.css';
import API from '../api';

const  Modal=({ isVisible, onClose })=> {
    const [data,setData] = useState({
        bill_id:"",
        billingdate:"",
        amount:"",
        type_of_payment:""
    })

    if (!isVisible) return null;

  return(
    <div className="main-card">
        <form>
            <h1 className="heading">ADD NEW BILL</h1>
            <div className="form-group">
                <label className="form-label">Bill ID </label>
                <input className="form-control" type="text" value={data.bill_id} onChange={(e)=>{setData({...data,bill_id:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Billing Date </label>
                <input className="form-control" type="date" value={data.billingdate} onChange={(e)=>{setData({...data,billingdate:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Amount </label>
                <input className="form-control" type="number" value={data.amount} onChange={(e)=>{setData({...data,amount:e.target.value})}}/>
            </div>
            <div className="form-group">
                <label className="form-label">Payment type </label>
                <select className="form-select" value={data.type_of_payment} onChange={(e)=>{setData({...data,type_of_payment:e.target.value})}}>
                        <option disabled hidden selected></option>
                        <option className='form-option' value="Cash">Cash</option>
                        <option className='form-option' value="Card" >Card</option>
                        <option className='form-option' value="UPI" >UPI</option>
                    </select>
                    </div>
            <div className="button-group">
                <button className="btn1" type="button" onClick={()=>{onClose()}} >CANCEL</button>
                <button className="btn2" type="buttom" onClick={()=>{
                        console.log(data)

                        API.post('/insertbilling',data).then((response) => {
                          
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
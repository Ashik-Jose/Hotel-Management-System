import React, { useState } from 'react';
import './modal.css';
import API from '../api';

const Modal = ({ isVisible, onClose,details }) => {


    const [data, setData] = useState({
        employee_id: details.emp_id,
        name: details.name,
        age: details.age,
        gender: details.gender,
        position: details.position,
        salary: details.salary,
        datehired: details.datehired         
    })


    if (!isVisible) return null;



    return (
        <div className="main-card">
            <form>
                <h1 className="heading">EDIT STAFF</h1>
                <div className="form-group">
                    <label className="form-label">Employee ID </label>
                    <input className="form-control" type="text" value={data.employee_id} onChange={(e)=>{setData({...data,employee_id:e.target.value})}}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Name </label>
                    <input className="form-control" type="text" value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Age </label>
                    <input className="form-control" type="number" value={data.age} onChange={(e)=>{setData({...data,age:e.target.value})}}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Gender </label>
                    <select className="form-select" value={data.gender} onChange={(e)=>{setData({...data,gender:e.target.value})}}>
                        <option disabled hidden selected></option>
                        <option className='form-option' value="male">Male</option>
                        <option className='form-option' value="female" >Female</option>
                        <option className='form-option' value="other" >Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Hire Date </label>
                    <input className="form-control" type="date" value={data.datehired} onChange={(e)=>{setData({...data,datehired:e.target.value})}}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Position </label>
                    <select className="form-select" value={data.position} onChange={(e)=>{setData({...data,position:e.target.value})}}>
                        <option disabled hidden selected></option>
                        <option className='form-option' value="Chief Chef">Chief Chef</option>
                        <option className='form-option' value="Proprieter">Proprieter</option>
                        <option className='form-option' value="Chef">Chef</option>
                        <option className='form-option' value="Waiter">Waiter</option>                </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Salary </label>
                    <input className="form-control" type="number" value={data.salary} onChange={(e)=>{setData({...data,salary:e.target.value})}}/>
                </div>
                <div className="button-group">
                    <button className="btn1" type="button" onClick={() => { onClose() }} >CANCEL</button>
                    <button className="btn2" type="buttom" onClick={()=>{
                        console.log(data)

                        API.put('/updateemployee_details',data).then((response) => {
                          
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
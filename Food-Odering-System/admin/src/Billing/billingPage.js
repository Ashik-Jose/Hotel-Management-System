import React, { useState } from "react";
import { useNavigate } from "react-router";
import './billingPage.css';
import Arrow from '../Assets/BackArrow.svg';
import Edit from '../Assets/edit.svg';
import Add from '../Assets/add.svg';
import EditSmall from '../Assets/editSmall.svg';
import Delete from '../Assets/delete.svg';
import API from "../api";
import { useEffect } from "react";
import Modal from "../Modal/billModal";

const Billing = () => {
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false);
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [showedit,setShowEdit] = useState(false);
    const [foodData,setFoodData] = useState();

    useEffect(() => {
        setLoading(true)
        API.get('/getbilling').then((response) => {
            setLoading(false)
            console.log(response.data)
            setData(response.data)
        }).catch(error => {
            navigate('/home')
        });
    }, []);
    return (
        <div>
            {loading ? <div></div> : 
            <div style={{opacity: showModal || showedit ? "0.3" : ""}}>
            <div className="staff-heading">
                <div style={{display:"flex"}} className="left-title">
                <img style={{cursor:"pointer"}} src={Arrow} alt="" onClick={() => {navigate('/home')}}/>
                <p style={{color:"white"}} className="staff-title">Billing</p>
                </div>
                <div className="right-title">
                {/* <img style={{marginRight:"50px",cursor:"pointer"}} src={Edit} alt="" onClick={() => {setEdit(!edit)}}/> */}
                <img style={{cursor:"pointer"}} src={Add} alt="" onClick={()=>{setShowModal(true);}}/>
                </div>
            </div>
            <div className="billing-table">
                <div className="billing-table-heading" >
                    <p>BILL ID</p>
                    <p>DATE</p>
                    <p>AMOUNT</p>
                    <p>PAYMENT TYPE</p>
                </div>
                {data.map((bill) => (
                   <div className="billing-table-contents">
                <div style={{display:"flex",marginLeft:"13%"}}>
                     {/* <img style={{marginRight:"20px",visibility: edit ? "" : "hidden"}}  src={Delete} alt="" />
                 <img style={{marginRight:"20px",visibility: edit ? "" : "hidden"}} src={EditSmall} alt="" /> */}
                    <p>{bill.bill_id}</p>
                    </div>
                    <p style={{marginLeft:"13%"}}>{bill.billingdate.slice(0,10)}</p>
                    <p style={{marginLeft:"15%"}}>{bill.amount}</p>
                    <p style={{marginLeft:"24%"}}>{bill.type_of_payment}</p>
                </div> 
                ))}
                
                </div>
                </div>
            }
             {showModal && <Modal isVisible={showModal} onClose={() => { setShowModal(false); }}  />}
        </div>

    );
}

export default Billing;
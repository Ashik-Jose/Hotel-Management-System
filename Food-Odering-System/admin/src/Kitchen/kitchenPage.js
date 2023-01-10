import React, { useState } from "react";
import { useNavigate } from "react-router";
import './kitchenPage.css';
import Arrow from '../Assets/BackArrow.svg';
import Edit from '../Assets/edit.svg';
import Add from '../Assets/add.svg';
import EditSmall from '../Assets/editSmall.svg';
import Delete from '../Assets/delete.svg';
import { useEffect } from "react";
import API from "../api";
import Modal from "../Modal/kitchenModal";
import Modal2 from "../EditModal/kitchenEdit";

const Kitchen = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showedit, setShowEdit] = useState(false);
    const [kitchenData, setKitchenData] = useState();

    useEffect(() => {
        setLoading(true)
        API.get('/getkitchen').then((response) => {
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
                <div style={{ opacity: showModal || showedit ? "0.3" : "" }}>
                    <div className="staff-heading">
                        <div style={{ display: "flex" }} className="left-title">
                            <img style={{ cursor: "pointer" }} src={Arrow} alt="" onClick={() => { navigate('/home') }} />
                            <p style={{ color: "white" }} className="staff-title">Kitchen</p>
                        </div>
                        <div className="right-title">
                            <img style={{ marginRight: "50px", cursor: "pointer" }} src={Edit} alt="" onClick={() => { setEdit(!edit) }} />
                            <img style={{ cursor: "pointer" }} src={Add} alt="" onClick={() => { setShowModal(true); }} />
                        </div>
                    </div>
                    <div className="kitchen-table">
                        <div className="kitchen-table-heading" >
                            <p>NAME</p>
                            <p>QUANTITY</p>
                            <p>PACKED</p>
                        </div>
                        {data.map((kitchen) => (
                            <div className="kitchen-table-contents">
                                <div style={{ display: "flex", marginLeft: "6%" }}>
                                    <img style={{ marginRight: "20px", visibility: edit ? "" : "hidden",cursor:"pointer" }} src={Delete} alt="" onClick={()=>{
                    
                    API.delete('/deletekitchen',{
                        data:{
                            name: kitchen.name
                        }
                    }).then((response) => {
                        console.log(response.data)
                        window.location.reload()
                        // setData(response.data)
                    }).catch(error => {
                        console.log(error)
                    });
                    
                    }}/>
                                    <img style={{ marginRight: "20px", visibility: edit ? "" : "hidden",cursor:"pointer" }} src={EditSmall} alt="" onClick={() => {
                                        setKitchenData(kitchen)
                                        setShowEdit(!showedit)
                                    }} />
                                    <p>{kitchen.name}</p>
                                </div>
                                <p style={{ marginLeft: "30%" }}>{kitchen.quantity}</p>
                                <p style={{ marginLeft: "32%" }}>{kitchen.packed}</p>
                            </div>

                        ))}

                    </div>

                </div>
            }
            {showModal && <Modal isVisible={showModal} onClose={() => { setShowModal(false); }} />}
            {showedit && <Modal2 isVisible={showedit} onClose={() => { setShowEdit(false); }} details={kitchenData} />}
        </div>
    );
}

export default Kitchen;
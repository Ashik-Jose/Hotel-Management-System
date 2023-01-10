import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import './foodPage.css';
import Arrow from '../Assets/BackArrow.svg';
import Edit from '../Assets/edit.svg';
import Add from '../Assets/add.svg';
import EditSmall from '../Assets/editSmall.svg';
import Delete from '../Assets/delete.svg';
import API from "../api";
import Modal from "../Modal/foodModal";
import Modal2 from "../EditModal/foodEdit";

const Food = () => {
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false);
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([]);
    const [showModal,setShowModal] = useState(false)
    const [showedit,setShowEdit] = useState(false);
    const [foodData,setFoodData] = useState();

    useEffect(() => {
        setLoading(true)
        API.get('/getfood').then((response) => {
            setLoading(false)
            console.log(response.data)
            setData(response.data)
        }).catch(error => {
            navigate('/home')
        });
    },[]);
    return (
        <div>
            {loading ? <div></div> : 
            <div style={{opacity: showModal || showedit ? "0.3" : ""}}>
            <div className="staff-heading">
                <div style={{display:"flex"}} className="left-title">
                <img style={{cursor:"pointer"}} src={Arrow} alt="" onClick={() => {navigate('/home')}}/>
                <p style={{color:"white"}} className="staff-title">FOOD</p>
                </div>
                <div className="right-title">
                <img style={{marginRight:"50px",cursor:"pointer"}} src={Edit} alt=""  onClick={() => {setEdit(!edit)}}/>
                <img style={{cursor:"pointer"}} src={Add} alt="" onClick={()=>{setShowModal(true);}}/>
                </div>
            </div>
            <div className="food-table">
                <div style={{marginLeft:"12rem"}} className="food-table-heading" >
                    <p>NAME</p>
                    <p style={{marginLeft:"8rem"}}>PRICE</p>
                    <p>AVAILABILITY</p>
                </div>
                {data.map((food) => (
                   <div className="food-table-contents">
                <div style={{display:"flex"}}>
                     <img style={{marginRight:"20px",visibility: edit ? "" : "hidden",cursor:"pointer"}}  src={Delete} alt="" onClick={()=>{
                    
                    API.delete('/deletefood',{
                        data:{
                            name: food.name
                        }
                    }).then((response) => {
                        console.log(response.data)
                        window.location.reload()
                        // setData(response.data)
                    }).catch(error => {
                        console.log(error)
                    });
                    
                    }}/>
                 <img style={{marginRight:"20px",visibility: edit ? "" : "hidden",cursor:"pointer"}} src={EditSmall} alt="" onClick={()=>{
                setFoodData(food)
                setShowEdit(!showedit)}}/>
                    <p>{food.name}</p>
                    </div>
                    <p>{food.price}</p>
                    <p>{food.availability}</p>
                </div> 
                ))}
                
                </div>
            </div>
}
{showModal && <Modal isVisible={showModal} onClose={() => { setShowModal(false); }}  />}
{showedit && <Modal2 isVisible={showedit} onClose={() => { setShowEdit(false); }} details={foodData} />}
        </div>
    );
}

export default Food;
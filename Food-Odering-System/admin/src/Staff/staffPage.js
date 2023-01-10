import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import './staffPage.css';
import Arrow from '../Assets/BackArrow.svg';
import Edit from '../Assets/edit.svg';
import Add from '../Assets/add.svg';
import Delete from '../Assets/delete.svg';
import EditSmall from '../Assets/editSmall.svg';
import API from '../api';
import Modal from "../Modal/staffModal";
import Modal2 from "../EditModal/staffEdit";

const Staff = () => {
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false);
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState([])
    const [showModal,setShowModal] = useState(false)
    const [showedit,setShowEdit] = useState(false);
    const [staffData,setStaffData] = useState();

    useEffect(() => {
        setLoading(true)
        API.get('/getstaff').then((response) => {
            setLoading(false)
            console.log(response.data)
            setData(response.data)
        }).catch(error => {
            navigate('/home')
        });
    },[]);


    return (
        <div>
            {(loading)? <div>sdcs</div> : 
            <div style={{opacity: showModal || showedit ? "0.3" : ""}}>
            <div className="staff-heading">
            <div style={{display:"flex"}} className="left-title">
            <img style={{cursor:"pointer"}} src={Arrow} alt="" onClick={() => {navigate('/home')}}/>
            <p style={{color:"white"}} className="staff-title">STAFF</p>
            </div>
            <div className="right-title">
            <img style={{marginRight:"50px",cursor:"pointer"}} src={Edit} alt="" onClick={() => {
                setEdit(!edit)
            }}/>
            <img style={{cursor:"pointer"}} src={Add} alt="" onClick={()=>{setShowModal(true);}}/>
            </div>
        </div>
        
            <div className="staff-table">
            <div className="staff-table-heading" >
                <p>EMPLOYEE ID</p>
                <p>NAME</p>
                <p>AGE</p>
                <p>GENDER</p>
                <p>HIRE DATE</p>
                <p>POSITION</p>
                <p>SALARY</p>
            </div>
            {data.map((stf) => (
              
            <div className="staff-table-contents">
               <div style={{display:"flex"}}>
                 <img style={{marginRight:"20px",visibility: edit ? "" : "hidden",cursor:"pointer"}} type="buttom"  src={Delete} alt="" onClick={()=>{
                        API.delete('/deletestaff',{
                            data:{
                                emp_id:stf.emp_id
                            }
                        }).then((response) => {
                        //   console.log(stf.emp_id)
                            console.log(response.data)
                            window.location.reload()
                            // setData(response.data)
                        }).catch(error => {
                            console.log(error)
                        });
                        
                        }}
                 />
             <img style={{marginRight:"20px",visibility: edit ? "" : "hidden",cursor:"pointer"}} src={EditSmall}  alt="" onClick={()=>{
                setStaffData(stf)
                setShowEdit(!showedit)}}/>
             
               <p>{stf.emp_id}</p>
                </div> 
                <p style={{marginLeft:"9%"}}>{stf.name}</p>
                <p style={{marginLeft:"4%"}}>{stf.age}</p>
                <p style={{marginLeft:"9.5%"}}>{stf.gender}</p>
                <p style={{marginLeft:"11%"}}>{stf.datehired.slice(0,10)}</p>
                <p style={{marginLeft:"11%"}}>{stf.position}</p>
                <p style={{marginLeft:"9%"}}>{stf.salary}</p>
            </div>
          ))}  
        </div>
        
        
        </div>
            }
            {showModal && <Modal isVisible={showModal} onClose={() => { setShowModal(false); }}  />}
            {showedit && <Modal2 isVisible={showedit} onClose={() => { setShowEdit(false); }} details={staffData} />}
        </div>
    );
}

export default Staff;
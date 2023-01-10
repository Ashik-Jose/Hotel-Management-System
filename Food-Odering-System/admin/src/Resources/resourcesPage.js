import React,{useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import './resourcesPage.css';
import Arrow from '../Assets/BackArrow.svg';
import Edit from '../Assets/edit.svg';
import Add from '../Assets/add.svg';
import EditSmall from '../Assets/editSmall.svg';
import Delete from '../Assets/delete.svg';
import API from "../api";
import Modal from "../Modal/resourcesModal.js";
import Modal2 from "../EditModal/resourcesEdit";

const Resources = () => {
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false)
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([]);
    const [showModal,setShowModal] = useState(false)
    const [showedit,setShowEdit] = useState(false);
    const [resourcesData,setResourcesData] = useState();
    const [val,setVal] = useState({name:""})

    useEffect(() => {
        setLoading(true)
        API.get('/getresources').then((response) => {
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
                <p style={{color:"white"}} className="staff-title">Resources</p>
                </div>
                <div className="right-title">
                <img style={{marginRight:"50px",cursor:"pointer"}} src={Edit} alt="" onClick={()=>{setEdit(!edit)}}/>
                <img style={{cursor:"pointer"}} src={Add} alt="" onClick={()=>{setShowModal(true);}}/>
                </div>
            </div>
            <div className="resources-table">
                <div className="resources-table-heading" >
                    <p>NAME</p>
                    <p>QUANTITY</p>
                    <p>SUPPLY SOURCE</p>
                    <p>DEFECTIVE</p>
                </div>
                {data.map((resources) => (
                  <div className="resources-table-contents">
                <div style={{display:"flex"}}>
                     <img style={{marginRight:"20px",visibility: edit ? "" : "hidden",cursor:"pointer"}}  src={Delete} alt="" onClick={()=>{
                    
                        API.delete('/deleteresource',{
                            data:{
                                name: resources.name
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
                setResourcesData(resources)
                setShowEdit(!showedit)}}/>
                    <p>{resources.name}</p>
                    </div>
                    <p style={{marginLeft:"19%"}}>{resources.quantity}</p>
                    <p style={{marginLeft:"22%"}}>{resources.supply_source}</p>
                    <p style={{marginLeft:"19%"}}>{resources.defective}</p>
                </div>  
                ))}
                
                </div>
                </div>
            }
             {showModal && <Modal isVisible={showModal} onClose={() => { setShowModal(false); }}  />}
             {showedit && <Modal2 isVisible={showedit} onClose={() => { setShowEdit(false); }} details={resourcesData} />}
        </div>
    );
}

export default Resources;
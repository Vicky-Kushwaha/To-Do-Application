import "./ToDo.css";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {addTask, getTask} from "../action/todoAction";

const ToDo = () => {

const dispatch = useDispatch();  

const {data} = useSelector((state)=> state.listData)  


const[inputValue,setInputValue] = useState("");
const[listData,setListData] = useState();
const[edit,setEdit] = useState(false);
const[currIndex,setCurrIndex] = useState();

// setting data into listData on every change of data
useEffect(()=>{
   if(data){
      setListData(data)
   }else{
      setListData([])
   }
},[data])


// setting input value
const handleValue = (event) => {
    setInputValue(event.target.value)
}


const handleSubmit = (event) => {

   event.preventDefault();

// editing task
   if(edit && inputValue){
      listData[currIndex].value = inputValue;
      dispatch(addTask(listData));
      setEdit(false)

   }else if(inputValue){

   const newtask = {value: inputValue, status: "todo"}   
   const newListData = [...listData, newtask];
   setListData(newListData);             // adding task
   dispatch(addTask(newListData))
   }
   setInputValue(""); 
}


// deleting task
const handleDelete = (index) => {
   listData.splice(index,1);
   dispatch(addTask(listData))
}


// editing task
const handleEdit = (index) => {

   setInputValue(listData[index].value)
   setCurrIndex(index)
   setEdit(true);

}

// updating status of task
const handleStatus = (index,status) => {
    if(status==="todo"){
      listData[index].status = "complete"
    }else{
      listData[index].status = "todo"
    }

    dispatch(addTask(listData));
}

// getting task on every update of listData
useEffect(()=>{
   dispatch(getTask())
},[dispatch,listData])  


  return (
    <>
       <div className="toDo_container">
          <div className="toDo_box">
             <div className="input_box">
             <form onSubmit={handleSubmit}>
                <input type="text" name="value" value={inputValue} placeholder="add item" onChange={handleValue} />
                <button  type="submit">+</button>
             </form>
             </div>
             <h2 className="heading">To-Do List</h2>
             <div className="toDo_list">
                {
                  listData && listData.map((elem,index)=>(
                  <div className="item" key={index}>
                     <span className={elem.status==="todo" ? "status" : "completeStatus  status"} onClick={()=> handleStatus(index,elem.status)}>{elem.status==="todo" ?  <PanoramaFishEyeIcon /> : <TaskAltIcon />}</span>
                     <p className={elem.status==="todo" ? "todo" : "complete"}>{elem.value}</p>
                     <div className="todo_actions">
                        <span onClick={()=> handleDelete(index)}><DeleteIcon className="delete" /></span>
                        <span onClick={()=> handleEdit(index)}><EditIcon  className="edit" /></span> 
                     </div>
                   </div>
                  ))
                }

             </div>
          </div>
       </div>
    </>
  )
}

export default ToDo;
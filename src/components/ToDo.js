import "./ToDo.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
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
const[currIndex,setCurrIndex] = useState()

useEffect(()=>{
   if(data){
      setListData(data)
   }
},[data])

const handleValue = (event) => {
    setInputValue(event.target.value)
}


const handleSubmit = (event) => {
   event.preventDefault();
   if(edit){
      listData[currIndex] = inputValue;
      dispatch(addTask(listData))
   }else{
   const newListData = [...listData, inputValue];
   setListData(newListData);
   dispatch(addTask(newListData));
   }
   setInputValue(""); 
}


const handleDelete = (index) => {
   listData.splice(index,1);
   dispatch(addTask(listData))
}

const handleEdit = (index) => {

   setInputValue(listData[index])
   setCurrIndex(index)
   setEdit(true);

}


useEffect(()=>{
   dispatch(getTask())
},[dispatch,listData])  


  return (
    <>
       <div className="toDo_container">
          <div className="toDo_box">
             <div className="input_box">
             <form onSubmit={handleSubmit}>
                <input type="text" value={inputValue} placeholder="add item" onChange={handleValue} />
                <button  type="submit">+</button>
             </form>
             </div>
             <h2 className="heading">To-Do List</h2>
             <div className="toDo_list">
                {
                  listData && listData.map((elem,index)=>(
                  <div className="item" key={index}>
                     <span className="status">{<CloseIcon />}</span>
                     <p className="todo_text">{elem}</p>
                     <div className="todo_actions">
                        <span onClick={()=> handleDelete(index)}><DeleteIcon /></span>
                        <span onClick={()=> handleEdit(index)}><EditIcon /></span> 
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
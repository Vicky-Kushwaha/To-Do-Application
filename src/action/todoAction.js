


// add task to local storage

export const addTask = (data) => (dispatch) => {
   localStorage.setItem("data",JSON.stringify(data));
   dispatch({
    type: "addTask",
   })
}


// getting added task
export const getTask = () => (dispatch) => {

let  data = JSON.parse(localStorage.getItem("data"));

    dispatch({
     type: "getTask",
     payload: data
    });
 }


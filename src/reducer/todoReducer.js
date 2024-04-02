

export const todoReducer = (state={data:[]},action) => {
    switch(action.type){

        case "addTask" :
            return{
              success: true
            }

        case "getTask":
          return{
            data: action.payload
          }    

         default: 
          return state;   

    }
}
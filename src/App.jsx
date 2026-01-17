import React from 'react'
import {useState,useEffect} from 'react'
import "./App.css"
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';



const App = () => {

 let [todo,setTodo]=useState("todo ra ayya")  

let [todos, setTodos] = useState(() => {
  let JSONstring = localStorage.getItem("all the todos");
  return JSONstring ? JSON.parse(JSONstring) : [];
});

 const [showFinished, setshowFinished] = useState(true);


 // use effect is used so that when ever there are changes being made the useEffect is rendered and values are saved to the local storage
 useEffect(()=>{
  localStorage.setItem("all the todos",JSON.stringify(todos)); 
 },[todos])  


 
 const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
 
  function handleChange(e)
  {
    setTodo(e.target.value)
  }

  function handleAdd()
  {
     setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
     setTodo("")
     
  }
  function handleCheckbox(id)
  {
     setTodos(  // map return array of all updated values so we first find the id and then perform updation
    todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    );
  }

  function handleDelete(id)
  {
    setTodos(todos.filter(item=>{return(item.id!=id)})) // filter returns a new array which matches the given conditions and this new array is overwritten by the setTodos()
  }

  function handleEdit(id)
  {
    let t=todos.filter(item=>(item.id==id)) // selecting the item which needs to be edited
    setTodo(t[0].todo);  // array with only that item will be retured so select it and pass the new value

     setTodos(todos.filter(item=>{return(item.id!=id)})) // remove the old id item because it is being updated
  }

  return ( 
    <>
      <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-2 bg-purple-100 min-h-[80vh] max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl'>
         
        <div className="addTodo ">
          <h2 className='font-bold text-xl text-center sm:text-left'>Add a Todo</h2>
          <div className='m-5 flex flex-col sm:flex-row items-center justify-center gap-2'>
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className='bg-white rounded-lg w-full sm:w-[70%] p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base sm:text-lg'
              placeholder='Enter your context for the Todo'
            />
            <button
              onClick={handleAdd}
              disabled={todo.length<=3}
              className='rounded-lg w-full sm:w-auto px-4 py-2 bg-purple-600 text-white font-semibold shadow hover:bg-purple-800 transition-all duration-200 mt-2 sm:mt-0 text-base sm:text-lg'
            >
              Add
            </button>
          </div>
        </div>
         
         
         
         
         
        <h2 className='font-bold text-xl text-center sm:text-left'>Your Todos</h2>

        <div className="flex items-center mb-4 flex-wrap gap-2">
          <input
            className='w-5 h-5 accent-purple-600 rounded mr-2'
            id='show'
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label className='mx-2 text-lg font-medium' htmlFor="show">Show Finished</label>
        </div>

        <div className="todos flex flex-col gap-4">
          {todos.length === 0 && (
            <div className='text-2xl text-center font-bold'>NO tasks today!!</div>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex flex-col sm:flex-row items-center m-2 sm:m-5 bg-white rounded-lg p-2 border border-gray-300 shadow-sm gap-2 sm:gap-0"
              >
                <input
                  type="checkbox"
                  className="m-2 w-5 h-5 accent-purple-600 rounded order-1 sm:order-0"
                  onChange={() => handleCheckbox(item.id)}
                  checked={item.isCompleted}
                />
                <div
                  className={`${item.isCompleted ? "line-through font-bold" : ""} text-base sm:text-lg flex items-center justify-start bg-white rounded-lg p-2 w-full sm:w-[350px] md:w-[400px] lg:w-[500px] h-12 overflow-x-auto scrollbar-hide border border-gray-200`}
                  style={{ minWidth: '200px', maxWidth: '100%' }}
                >
                  {item.todo}
                </div>
                <div className="buttons flex flex-row gap-2 order-2 sm:order-0 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='rounded-lg px-4 py-2 bg-purple-600 text-white font-semibold shadow hover:bg-purple-800 transition-all duration-200 text-base sm:text-lg'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='rounded-lg px-4 py-2 bg-purple-600 text-white font-semibold shadow hover:bg-purple-800 transition-all duration-200 text-base sm:text-lg'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}

export default App

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const inputFocus = useRef(null);

  const add = async () => {
    if (task.trim() === "") return;

    const res = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({taskName:task}),
    });

    const newTodo = await res.json();

    setTodos([...todos, newTodo]);
    setTask("");
  };

const deleteTask = async(index) => {
    try{
    const res = await fetch(`http://localhost:8000/todos/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(!res.ok) throw new Error("Failed to delete")
    
    setTodos(todos.filter(todo=> todo._id !== index));
}catch(err){
  console.log(err)
}
  };

const handleEdit = async(id, newText) =>{
  try{
    const res = await fetch(`http://localhost:8000/todos/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({taskName: newText}),
    })
    if(!res.ok) throw new Error("Failed to Edit")

      setTodos(
        todos.map((t)=>(
           t._id === id?{...t, taskName: newText }:t
        ))
      )
  }catch(err){
    console.log(err);
  }
}

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    // let storage = localStorage.getItem("todos");

    // if (storage) {
    //   setTodos(JSON.parse(storage));
    // }

    fetch("http://localhost:8000/todos")
    .then((res)=>res.json())
    .then((data)=>setTodos(data))
    .catch((err)=>console.log(`Error fetching todos ${err}`))
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-gray-400 text-center">
          Todos
        </h1>
        <div className="flex gap-2 p-4 bg-white shadow rounded-xl">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            ref={inputFocus}
            placeholder="write your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></input>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={() => add()}
            onClickCapture={() => inputFocus.current.focus()}
          >
            add
          </button>
        </div>

        <ul className="mt-4 space-y-3 w-full max-w-md">
          {todos.map((t) => (
            <div className="flex gap-2" key={t._id}>
            <li
              className="flex-1 bg-white px-4 py-2 rounded-lg shadow"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e)=> handleEdit(t._id, e.target.innerText)}
              
            >
              {t.taskName}{" "}
              </li>
              <button
                className="bg-red-500 text-white px-3  py-1 rounded-md text-sm hover:bg-red-600 transition"
                onClick={() => deleteTask(t._id)}
              >
                delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

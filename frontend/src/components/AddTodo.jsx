import React,{useState, useRef} from 'react'

function AddTodo({onAdd}) {

    const [task, setTask] = useState("");
    const inputFocus = useRef(null);

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(task.trim() === "") return;
        onAdd(task);
        setTask("")
        inputFocus.current.focus();
    }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white shadow rounded-xl">
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
          >
            add
          </button>
        </form>
  )
}

export default AddTodo
import React,{useState} from 'react'

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const add = (()=>{
    if(task.trim() ==="") return;
    setTodos([...todos, task]);
    setTask("");
  })

  const deleteTask = ((index)=>{
    const newTodos = todos.filter((_,i)=> i !== index)
    setTodos(newTodos)
  })
  return (
    <div>
      <input type="text" placeholder='write your task' value={task} onChange={(e)=>setTask(e.target.value)}></input>
      <button onClick={()=>add()}>add</button>

      <ul id='taskContainer' style={{ listStyle: "none", padding: 0 }}>
      {
        todos.map((t,i)=>(
          <li key={i}>
            {t}{" "}
            <button onClick={()=>deleteTask(i)}>delete</button>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default App
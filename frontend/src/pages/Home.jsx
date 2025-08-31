import React,{useState, useEffect} from 'react'
import {fetchTodos, addTodo, deleteTodo, editTodo} from "../services/todoService.js"
import AddTodo from '../components/AddTodo.jsx';
import TodoItem from '../components/TodoItem';
import TodoList from '../components/TodoList.jsx';

function Home() {
      const [todos, setTodos] = useState([]);
    
    //   useEffect(() => {
    //     if (todos.length > 0) {
    //       localStorage.setItem("todos", JSON.stringify(todos));
    //     }
    //   }, [todos]);
    
      useEffect(() => {
        // let storage = localStorage.getItem("todos");
    
        // if (storage) {
        //   setTodos(JSON.parse(storage));
        // }
    
        fetchTodos()
        .then(setTodos)
        .catch((err)=>console.log(`Error fetching todos ${err}`))
      }, []);

      const handleAdd = async(taskName)=>{
        const newTodo = await addTodo(taskName);
        setTodos([...todos, newTodo])
      }

      const handleDelete = async(id)=>{
        await deleteTodo(id);
        setTodos(todos.filter(todo=>todo._id !== id));
      }

      const handleEdit = async(id, newText)=>{
        await editTodo(id, newText);
        setTodos(
            todos.map((t)=>(
                t._id === id?{...t, taskName:newText}:t
            ))
        )
      }
    
      return (
        <div className="min-h-screen flex justify-center items-start bg-gray-100">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4 text-gray-400 text-center">
              Todos
            </h1>

            <AddTodo onAdd={handleAdd}/>
    
            <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit}/>
          </div>
        </div>
      )

}

export default Home
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const inputFocus = useRef(null);

  const add = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

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
    let storage = localStorage.getItem("todos");

    if (storage) {
      setTodos(JSON.parse(storage));
    }
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
          {todos.map((t, i) => (
            <li
              className="flex justify-between item-center bg-white px-4 py-2 rounded-lg shadow"
              key={i}
            >
              {t}{" "}
              <button
                className="bg-red-500 text-white px-3  py-1 rounded-md text-sm hover:bg-red-600 transition"
                onClick={() => deleteTask(i)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

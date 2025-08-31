import React from 'react'

function TodoItem({todo, onDelete, onEdit}) {
  return (
    <div className="flex gap-2" key={todo._id}>
            <li
              className="flex-1 bg-white px-4 py-2 rounded-lg shadow"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e)=> onEdit(todo._id, e.target.innerText)}
              
            >
              {todo.taskName}
              </li>
              <button
                className="bg-red-500 text-white px-3  py-1 rounded-md text-sm hover:bg-red-600 transition"
                onClick={() => onDelete(todo._id)}
              >
                delete
              </button>
            </div>
  )
}

export default TodoItem
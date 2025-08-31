import React from 'react'
import TodoItem from './TodoItem'

function TodoList({todos, onDelete, onEdit}) {
  return (
    <ul className="mt-4 space-y-3 w-full max-w-md">
          {todos.map((t) => (
            <TodoItem key={t._id} todo={t} onDelete={onDelete} onEdit={onEdit}/>
          ))}
        </ul>
  )
}

export default TodoList
const API_URL = "http://localhost:8000/todos"

export const fetchTodos= async ()=>{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
}
  
  export const addTodo = async (taskName) => {

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({taskName}),
    });

    if(!res.ok) throw new Error("Failed to add todo");
    return res.json();
  };

export const deleteTodo = async(index) => {
    try{
    const res = await fetch(`${API_URL}/${index}`, {method: 'DELETE'})
    if(!res.ok) throw new Error("Failed to delete")
}catch(err){
  console.log(err)
}
  };

export const editTodo = async(id, newText) =>{
  try{
    const res = await fetch(`${API_URL}/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({taskName: newText}),
    })
    if(!res.ok) throw new Error("Failed to Edit")
  }catch(err){
    console.log(err);
  }
}
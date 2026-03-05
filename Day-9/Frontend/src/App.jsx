import { useState , useEffect } from 'react'
import axios from "axios"

import './App.css'



function App() {
  const [notes ,setNotes] = useState([  ])

function fetchNotes(){
  axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
    setNotes(res.data.notes)
    
    })
}
  useEffect(() =>{
    fetchNotes()
  } , [])
 

  function handleSubmit(e){
    e.preventDefault()

    const {title , description } = e.target.elements

    console.log(title.value,description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  
  function handleDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  
  return (
    <>

     <form className='note-create-form'onSubmit={handleSubmit}>
       <input name='title' type="text" placeholder='Enter title' />
       <input name='description' type="text" placeholder='Enter description' />
       <button>Create Note</button>
     </form>
     
     

    <div className='notes'>
      {
        notes.map(notes=>{
        return  <div className='note'>
          <h1>{notes.title}</h1>
          <p>{notes.description}</p>
          <button onClick={()=>{handleDeleteNote(notes._id)}}>Delete</button>
      </div>
        })
      }
      
    </div>
    </>

  )
}

export default App

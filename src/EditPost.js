import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Missing from "./Missing";
import DataContext from "./context/DataContext";

const EditPost = () => {
  const{posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle}=useContext(DataContext)

  const{id} =useParams();
  const post=posts.find(post=>(post.id).toString()===id);
  useEffect(()=>{
    if(post){
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditTitle,setEditBody])

  return (
    <main className="NewPost">
      {editTitle&&
      <>
      <h2>Edit Post</h2>
      <form  className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e)=>setEditTitle(e.target.value)}
        >
        </input>
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          type="text"
          required
          value={editBody}
          onChange={(e)=>setEditBody(e.target.value)}
        >
        </textarea>
        <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>

      </form>
      </>
      }
      {!editTitle&& <Missing/>
      }
    </main>
  )
}

export default EditPost
import { useContext } from "react";
import { useParams , Link } from "react-router-dom"
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();

  const post = posts.find(post => (post.id).toString() === id );

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2 className="postTitle">{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }

        {!post &&
          <>
            <h2>Post not Found</h2>
            <p>Well, that's Disappointing</p>
            <p>
              <Link to='/'>Visit Our HomePage</Link>
            </p>
          </>
        }
      </article>
    </main>
  );
};

export default PostPage;

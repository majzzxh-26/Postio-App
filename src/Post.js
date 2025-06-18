import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Added style for link appearance */}
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{
                    (post.body).length <= 25
                        ? post.body
                        : `${(post.body).slice(0, 25)}...`
                }</p>
            </Link>
        </article>
    )
}

export default Post;
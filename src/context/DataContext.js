import { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../api/posts.js";
import useWindowSize from "../hooks/useWindowSize.js";
import useAxiosFetch from "../hooks/useAxiosFetch.js";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('https://postio-app-backend.onrender.com/posts');

  // load posts when data is fetched
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // filter posts on search
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      (post.body || '').toLowerCase().includes(search.toLowerCase()) ||
      (post.title || '').toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  // handle submit (create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { title: postTitle, body: postBody, datetime };

    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // handle edit
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { title: editTitle, body: editBody, datetime };

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider value={{
      width, search, setSearch, searchResults, fetchError, isLoading,
      postBody, setPostBody, postTitle, setPostTitle, handleSubmit,
      posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,
      handleDelete
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

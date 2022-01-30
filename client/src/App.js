import react from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import ActiveBlog from "./Components/ActiveBlog";

function App() {
  const [activeBlog, setActiveBlog] = useState({ state: false, id: null });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  

  useEffect(async () => {
    const result = await axios (`${API_URL}/posts`)
    setData(result.data);
  }, []);

  useEffect(() => {
    const getComments = async () =>{
      const result = await axios (`${API_URL}/posts/${Number(activeBlog.id)+1}/comments`);
      setComments(result.data);
      setLoading(false)
    }
    getComments();
  }, [activeBlog.id])
  
  const handleTitleClick = (e) => {
    setLoading(true)
    activeBlog.id !== e.target.id
      ? setActiveBlog(
          { state: true, id: e.target.id },
        )
      : setActiveBlog(
          { state: activeBlog.state ? false : true, id: e.target.id },
        );
  };


  return (
    <div>
      <h1>BLOG!</h1>
      {data.map((item, i) => (
        <div key={i}>
          <h3 id={i} onClick={handleTitleClick}>
            {i + 1} {item.title}
          </h3>
          {activeBlog.state && Number(activeBlog.id) === i ? (
            <ActiveBlog 
              articleBody={item.body}
              loadingInfo={loading}
              comments={comments}
            />) : null
        }
        </div>
      ))}
    </div>
  );
}

export default App;

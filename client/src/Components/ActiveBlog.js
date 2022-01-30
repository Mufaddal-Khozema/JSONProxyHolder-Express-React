import react from "react";

const ActiveBlog = ({articleBody, loadingInfo, comments }) => {
    return <div>
        <p>{articleBody}</p>
        <b>Comments</b>
        <ul>
          {loadingInfo ? 'loading...' : (comments.map((comment, i) => (
            <li key={i}>
              <b>{comment.name}</b> {comment.body}
            </li>
          )))}
        </ul>
      </div>
};

export default ActiveBlog;

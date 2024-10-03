import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postID } = useParams();

  const getPostDetails = async () => {
    const res = await axios.get(`http://localhost:4000/posts/${postID}`);

    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", postID],
    queryFn: getPostDetails,
  });

  if (error) {
    return <p> Error ........ </p>;
  }

  if (isLoading) {
    return <p> Loading ........ </p>;
  }

  const { title, desc } = data;

  return (
    <div>
      <div className="post">
        <div className="post-title"> {title} </div>
        <div className="post-desc"> {desc} </div>
      </div>
    </div>
  );
};

export default PostDetails;

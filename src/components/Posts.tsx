import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface PostsInterface {
  id: number;
  title: string;
  desc: string;
}

const Posts = () => {
  const getPosts = async () => {
    const res = await axios.get<PostsInterface[]>(
      "http://localhost:4000/posts"
    );
    return res.data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // staleTime: 2000,  make data fresh for 2 seconds and then send request
    // refetchInterval: 1000, Polling => make request every 1 second
    // refetchIntervalInBackground: true, makink request in background
    // enabled: false,
  });

  if (error) {
    return <p>Error ........</p>;
  }

  if (isLoading) {
    return <p>Loading ........</p>;
  }

  return (
    <div>
      {/* send request when clcick on button */}
      {/* <button onClick={() => refetch()}> Fetch Posts </button>   */}
      {data?.map((item) => (
        <Link to={`${item.id}`} key={item.id}>
          <div className="post">
            <div className="post-title"> {item.title} </div>
            <div className="post-desc"> {item.desc} </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;

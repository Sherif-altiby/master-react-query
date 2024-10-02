import axios from "axios";
import { useQuery } from "react-query";

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
    enabled: false,
  });

  if (error) {
    return <p>Error ........</p>;
  }

  if (isLoading) {
    return <p>Error ........</p>;
  }

  return (
    <div>
      <button onClick={() => refetch()}> Fetch Posts </button>
      {data?.map((item) => (
        <div className="post" key={item.id}>
          <div className="post-title"> {item.title} </div>
          <div className="post-desc"> {item.desc} </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

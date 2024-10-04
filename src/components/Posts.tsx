import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface PostsInterface {
  id?: number | string;
  title: string;
  desc: string;
}

interface OldDataType {
  data: PostsInterface[];
}

const getPosts = async () => {
  const res = await axios.get<PostsInterface[]>("http://localhost:4000/posts");
  return res.data; // Ensure this returns an array
};

const createPost = async (post: PostsInterface) => {
  const res = await axios.post("http://localhost:4000/posts", post);
  return res.data;
};

const Posts = () => {
  const queryClient = useQueryClient();

  const [title, setPostTitle] = useState("");
  const [desc, setPostDesc] = useState("");

  const { data, error, isLoading } = useQuery<PostsInterface[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    onError: (error) => {
      console.error("Error fetching posts:", error);
    },
  });

  const { mutate } = useMutation({
    mutationFn: createPost,

    onMutate: async (post: PostsInterface) => {
      await queryClient.cancelQueries(["posts"]);

      const previousData = queryClient.getQueryData<OldDataType>(["posts"]);

      queryClient.setQueryData<OldDataType>(["posts"], (oldQueryData) => {
        if (!oldQueryData || !Array.isArray(oldQueryData.data)) {
          return {
            data: [{ ...post, id: 1 }],
          };
        }

        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...post, id: oldQueryData.data.length + 1 },
          ],
        };
      });

      return { previousData };
    },

    onError: (err, post, context) => {
      queryClient.setQueryData(["posts"], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (error) {
    return <p>Error loading posts...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(data)) {
    return <p>No posts found.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: PostsInterface = { title, desc };
    mutate(post);
    setPostDesc("");
    setPostTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Post description"
          value={desc}
          onChange={(e) => setPostDesc(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      {data?.map((item) => (
        <Link to={`${item.id}`} key={item.id}>
          <div className="post">
            <div className="post-title">{item.title}</div>
            <div className="post-desc">{item.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;

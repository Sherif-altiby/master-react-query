import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface FruiteInterface {
  id: number;
  name: string;
}

const Pagination = () => {
  const [num, setNum] = useState(1);

  const getFruites = async (pageId: number) => {
    const res = await axios.get<FruiteInterface[]>(
      `http://localhost:4000/fruites/?_limit=4&_page=${pageId}`
    );
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fruites"],
    queryFn: () => getFruites(num),
  });

  if (isLoading) {
    return <p>Loading .......</p>;
  }

  if (error) {
    return <p>Error .......</p>;
  }

  return (
    <div>
      {data?.map((item) => (
        <Link to={`${item.id}`} key={item.id}>
          <div className="post">
            <div className="post-title"> {item.name} </div>
          </div>
        </Link>
      ))}
      <button
        onClick={() => setNum((preve) => preve + 1)}
        disabled={num === 5 ? true : false}
      >
        {" "}
        NextPage{" "}
      </button>
      <button
        onClick={() => setNum((preve) => preve - 1)}
        disabled={num === 1 ? true : false}
      >
        {" "}
        lastPage{" "}
      </button>
    </div>
  );
};

export default Pagination;

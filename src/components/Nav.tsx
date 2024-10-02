import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="container">
      <div className="link">
        <Link to={"/"}> Home </Link>
      </div>
      <div className="link">
        <Link to={"/posts"}> Posts </Link>
      </div>
    </nav>
  );
};

export default Nav;

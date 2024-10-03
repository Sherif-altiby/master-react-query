import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import Pagination from "./components/Pagination";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postID" element={<PostDetails />} />
            <Route path="/fruites" element={<Pagination />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

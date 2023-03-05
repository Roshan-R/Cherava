import Navbar from "./components/Navbar";
import HomepageElement from "./components/HomepageElement";
import NewHomepageElement from "./components/NewHomepageElement";
import getDbDataFromDataId from "./helpers/Connection";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import timeSince from "./helpers/Time";
import Masonry from "react-masonry-css";

import "./Home.css";

function Home(props) {
  const [userid, setUserid] = useState(() => {
    return localStorage.getItem("userid");
  });
  const [workflows, setWorkflows] = useState([]);

  const breakpointColumnsObj = {
    default: 3,
  };

  const fetchProducts = async () => {
    const { data } = await axios.post("http://localhost:3000/getData/", {
      id: userid,
    });
    // const p = data;
    // p.forEach(element => {

    //   console.log(element)
    // });
    setWorkflows(data);
    console.log("Workflows", workflows);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="my-12 mx-7">
        <div className="text-4xl font-semibold">Your Workflows</div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {workflows.map((workflow) => (
            <HomepageElement
              key={workflow.id}
              name={workflow.name}
              data={workflow.data}
              time={timeSince(workflow.lastupdated) + " ago"}
            />
          ))}
          <NewHomepageElement />
        </Masonry>
      </div>
    </div>
  );
}

export default Home;

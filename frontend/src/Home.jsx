import Navbar from "./components/Navbar";
import HomepageElement from "./components/HomepageElement";
import NewHomepageElement from "./components/NewHomepageElement";
import React, { useState, useEffect } from "react";
import GithubSignIn from './components/GithubSignIn';

import timeSince from "./helpers/Time";
import Masonry from "react-masonry-css";
import "./Home.css";

function Home() {

    const [workflows, setWorkflows] = useState([]);
    const breakpointColumnsObj = {
        default: 3,
    };

    const fetchProducts = async () => {
        const options = {
            credentials: 'include',
            method: 'GET',
        }
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND}/api/v1/workflows/get`, options
        );
        const data = await response.json();
        setWorkflows(data);
        console.log("Workflows", workflows);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <GithubSignIn />
            <div className="my-12 mx-7">
                <div className="text-4xl font-semibold">Your Workflows</div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
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

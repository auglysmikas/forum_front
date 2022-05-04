import React, {useContext, useEffect} from 'react';
import http from "../plugins/http";
import Topic from "./Topic";
import MyContext from "../context/MyContext";



const MainForum = () => {

    const {getTopics, setTopics} = useContext(MyContext)

    useEffect(() => {
        http.get("allPosts").then(res => {
            if (res.success) {
                setTopics(res.allPosts)
            }
        })
    }, [])

    return (
        <div className="forum  f-column-rev center">

            {getTopics.length > 0 &&
                getTopics.map((topic, ind) => <Topic topic={topic} key={ind}/>
                )}
            <h1>Forum</h1>
        </div>
    );
};

export default MainForum;
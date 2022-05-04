import React, {useEffect, useContext} from 'react';
import MyContext from '../context/MyContext'
import Topic from "./Topic";

const Favorites = () => {

    const {getFavorite, setFavorite} = useContext(MyContext)
    const {getTopics} = useContext(MyContext)

    useEffect(() => {

    }, [])

    return (
        <div className="d-flex f-column al-center ">
            {getFavorite.map(x => getTopics.map(topic =>
                topic._id === x &&
                <Topic topic={topic}/>))}
        </div>
    );
};

export default Favorites;
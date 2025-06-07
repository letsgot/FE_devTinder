import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Usercard from '../Profile/Usercard'
import { removeUserFromFeed, setFeed } from '../../redux/slicers/feedSlice';
import { baseUrl } from '../../constants';


const Feed = () => {
    const userData = useSelector(state => state.user);
    console.log(userData, "userData");

    const dispatch = useDispatch();

    const feed = useSelector(state => state.feed.feed);

    const fetchFeed = async () => {
        try {
            let res = await axios.get(`${baseUrl}user/feed?page=1&limit=20`, { withCredentials: true });
            console.log(res);
            dispatch(setFeed(res.data.data));
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => { fetchFeed() }, []);
    const handleClick = async (status, receiverId) => {
        try {
            console.log(status, receiverId);
            await axios.post(`${baseUrl}request/send/${status}/${receiverId}`, {}, { withCredentials: true });

            if (feed.length <= 1) {
                fetchFeed();
            }
            else {
                dispatch(removeUserFromFeed({ _id: receiverId }));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        feed && feed.length > 0 ? (
            <div className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-md mb-4">
                <Usercard {...feed[0]} />
                <div className="mt-2 flex gap-2">
                    <button className="btn btn-error" onClick={() => handleClick("ignored", feed[0]._id)}>Ignored</button>
                    <button className="btn btn-success" onClick={() => handleClick("interested", feed[0]._id)}>Interested</button>
                </div>
            </div>
        ) : (
            <div>🚀 You're all caught up!</div>
        )
    );

}

export default Feed;
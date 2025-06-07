import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../../redux/slicers/connectionSlice";
import { baseUrl } from '../../constants';
// const baseUrl = import.meta.env.VITE_APP_BASE_URL;
import Usercard from '../Profile/Usercard'
const Request = () => {

    const requests = useSelector(state => state.connection.requests);

    const dispatch = useDispatch();

    const fetchRequest = async () => {
        let res = await axios.get(`${baseUrl}user/request/received`, { withCredentials: true });
        dispatch(setRequests(res.data.data));
    }

    useEffect(() => {
        fetchRequest();
    }, [])

    const handleClick = async (status, requestId) => {
        try {
            console.log(status, requestId);
            await axios.post(`${baseUrl}request/receive/${status}/${requestId}`, {}, { withCredentials: true });
            fetchRequest();
        } catch (error) {
           console.log(error.message);
        }
    }

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mt-10 mb-6">Pending Requests</h2>
            {requests && Array.isArray(requests) && (
                requests.map((request, index) => (
                    <div key={index} className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-md mb-4">
                        <Usercard firstName={request?.sender?.firstName} lastName={request?.sender?.lastName} age={request?.sender?.age} gender={request?.sender?.gender} photoUrl={request?.sender?.photoUrl} />
                        <div className="mt-2 flex gap-2">
                            <button className="btn btn-error" onClick={() => handleClick("rejected", request?._id)}>Reject</button>
                            <button className="btn btn-success" onClick={() => handleClick("accepted", request?._id)}>Accept</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Request
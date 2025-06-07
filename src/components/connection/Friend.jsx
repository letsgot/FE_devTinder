import { useEffect } from "react";
import axios from "axios";
import { setConnection } from "../../redux/slicers/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from '../../constants';

// const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Friend = () => {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.connection.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${baseUrl}user/connections`, { withCredentials: true });
      console.log(res.data.data, "response from connection");
      dispatch(setConnection(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="font-bold text-2xl text-center mt-10 mb-6">Connections</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {friends && Array.isArray(friends) && friends.map((friend, index) => (
          <div
            key={index}
            className="bg-gray-50  shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 transition-transform hover:scale-[1.01]"
          >
            <img
              src={friend.photoUrl || "/default-avatar.png"}
              alt={friend.firstName || "User Avatar"}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-black text-lg font-semibold">{friend.firstName + " " + friend.lastName || "Unnamed"}</h3>
              <p className="text-sm text-gray-600">
                {friend.description || "No description provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friend;

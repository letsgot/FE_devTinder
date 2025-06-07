import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const Navbar = () => {
    const navigate = useNavigate();
    const userDetail = useSelector(state => state.user.user);
    const handleLogout = async () => {
        try {
            await axios.post(`${baseUrl}auth/logout`, {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.log("Error", error.message);
        }
    }
    return (
        <div className="w-full navbar bg-base-300 shadow-sm px-10">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">Dev Tinder</Link>
            </div>
            <div className="flex gap-2">
                {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                <div className="flex items-center">Welcome {userDetail?.firstName}</div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={userDetail?.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to='/friends' className="justify-between">
                                Connections
                            </Link>
                        </li>
                        <li>
                            <Link to='/requests' className="justify-between">
                                Requests
                            </Link>
                        </li>

                        <li><div onClick={() => handleLogout()}>Logout</div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
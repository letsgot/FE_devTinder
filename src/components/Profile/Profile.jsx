import { useEffect, useState } from 'react'
import Usercard from './Usercard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slicers/userSlice';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Profile = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const userDetail = useSelector(state => state.user.user);

  const fetchUser = async () => {
    if (!userDetail) {
      try {
        let res = await axios.get(`${baseUrl}profile`, { withCredentials: true });
        dispatch(setUser(res?.data));
        console.log(res, "response");
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setFirstName(userDetail?.firstName);
    setLastName(userDetail?.lastName);
    setPhotoUrl(userDetail?.photoUrl);
    setAge(userDetail?.age);
    setGender(userDetail?.gender);
  }, [userDetail]);

  const handleSave = async () => {
    try {
      let updatedProfile = await axios.patch(`${baseUrl}profile/edit`, { firstName, lastName, age, gender, photoUrl }, { withCredentials: true });
      console.log(updatedProfile, "updatedProfile");
      dispatch(setUser(updatedProfile?.data?.queryObject));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='flex justify-evenly items-center' >
      <div className='flex justify-center items-center mt-10'>
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Profile Update</h2>
            <fieldset className="fieldset w-60">
              <legend className="fieldset-legend text-left">FirstName</legend>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset w-60">
              <legend className="fieldset-legend text-left">LastName</legend>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset w-60">
              <legend className="fieldset-legend text-left">Age</legend>
              <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset w-60">
              <legend className="fieldset-legend text-left">Gender</legend>
              <input value={gender} onChange={(e) => setGender(e.target.value)} type='text' className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset w-60">
              <legend className="fieldset-legend text-left">Photo Url</legend>
              <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type='text' className="input" placeholder="Type here" />
            </fieldset>
            <div onClick={() => handleSave()} className="card-actions mt-2">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <Usercard firstName={firstName} lastName={lastName} age={age} gender={gender} photoUrl={photoUrl} />
    </div>
  )
}

export default Profile;
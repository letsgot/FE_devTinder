const Usercard = ({ firstName, lastName, age, gender, photoUrl }) => {
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="User Profile" />
            </figure>
            <div className="card-body">
                <h2 className="flex justify-center card-title text-center">{firstName} {lastName}</h2>
                <div className='flex justify-evenly '>
                    <div>Age: {age}</div>
                    <div>Gender: {gender}</div>
                </div>
                <p className="text-center">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            </div>
        </div>
    )
}

export default Usercard
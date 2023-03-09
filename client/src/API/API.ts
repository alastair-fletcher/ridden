// ADD USER TO DB ON SIGN UP (or 1st Google Login)
export const addUser = (uid: string, email: string | null) => {
  const user = {
    email: email,
    userId: uid,
    //TODO - is the bikeIds necessary?
    bikeIds: [],
  };
  fetch('http://localhost:8000/api/v1/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
}

// Get single user
export const getSingleUser = (uid: string) => {
  fetch(`http://localhost:8000/api/v1/users/${uid}`)
}

// ADD LIKE TO LIKES ARRAY ON USER DOCUMENT IN DB
export const toggleLike = (uid: string | undefined, bikeId: string | null) => {
  const likedBike = {
    bikeId: bikeId,
  };
  fetch(`http://localhost:8000/api/v1/users/${uid}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(likedBike),
  })
}

// ADD USER TO DB ON SIGN UP (or 1st Google Login)
export const addUser = (userId: string, email: string | null) => {
  const user = { email, userId };
  fetch('http://localhost:8000/api/v1/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
}

// Get single user
export const getSingleUser = async (uid: string | undefined) => {
  const res = await fetch(`http://localhost:8000/api/v1/users/${uid}`)
  const json = await res.json()
  return json
}

// ADD LIKE TO LIKES ARRAY ON USER DOCUMENT IN DB
export const toggleLike = (uid: string | undefined, bikeId: string | null) => {
  const likedBike = { bikeId };
  fetch(`http://localhost:8000/api/v1/users/${uid}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(likedBike),
  })
}
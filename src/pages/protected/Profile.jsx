import React from 'react'
import UserProfileCard from '../../components/UserProfileCard'
import { useAuth } from '../../context/authContext'

const Profile = () => {
    const {user} = useAuth()
  return (
    <div>
      <Helmet>
        <title> {user.name} | Profile </title>
      </Helmet>
      <div className='flex justify-center mt-16'>
        <UserProfileCard user1={user}/>
      </div>
    </div>
  )
}

export default Profile
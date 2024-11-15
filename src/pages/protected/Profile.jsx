import React from 'react'
import UserProfileCard from '../../components/UserProfileCard'
import { useAuth } from '../../context/authContext'

const Profile = () => {
    const {user} = useAuth()
  return (
    <div className='flex justify-center mt-16'>
        <UserProfileCard user1={user}/>
    </div>
  )
}

export default Profile
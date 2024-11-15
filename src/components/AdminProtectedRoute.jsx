import React from 'react'
import {  ROLE_GUEST } from '../config/constants'

const AdminProtectedRoute = ({element: Component,role = ROLE_GUEST }) => {
  return (
    <div>AdminProtectedRoute</div>
  )
}

export default AdminProtectedRoute
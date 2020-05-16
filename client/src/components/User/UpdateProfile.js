import React from 'react'
import UserLayout from '../../hoc/userlayout'
import UpdatePersonalInfo from './UpdatePersonalInfo'

export default function UpdateProfile() {
    return (
     <UserLayout>
         <h1>Profile</h1>
         <UpdatePersonalInfo />
     </UserLayout>
    )
}

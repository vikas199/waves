import React from 'react'
import UserLayout from '../../../hoc/userlayout'
import ManageBrands from './ManageBrands'
import ManageWoods from './ManageWoods'



function ManageCategories() {
    return (
        <UserLayout>
          <ManageBrands />
          <ManageWoods /> 
        </UserLayout>
    )
}


export default ManageCategories

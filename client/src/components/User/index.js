import React from 'react'
import UserLayout from '../../hoc/userlayout'
import MyButton from '../../utils/button'

function UserDashBoard({user}){
    return(
        <UserLayout>
          <div>
              <div className="user_nfo_panel">
                  <h1>User Information</h1>
                  <div>
                     <span>name: {user.userData.name}</span>
                      <span>lastname: {user.userData.lastname}</span>
                      <span>email: {user.userData.email}</span>
                  </div>
                  <MyButton type="default" title="Edit Account Info" linkTo="/user/user_profile"/>
              </div>
              <div className="user_nfo_panel">
                  <h1>History Purchases</h1>
                  <div className="user_product_block_wrapper"></div>
              </div>
          </div>
        </UserLayout>
    )
}

export default UserDashBoard;
import React from "react"
import { Switch, Route } from "react-router-dom"

import Layout from "./hoc/layout"
import Home from "./components/Home"
import RegisterLogin from "./components/Register"
import Register from "./components/Register/register"
import UserDashBoard from "./components/User"
import Auth from "./hoc/auth"
import Shop from "./components/Shop"
import AddProducts from "./components/User/Admin/AddProducts"
import ManageCategories from "./components/User/Admin/ManageCategories"
import ProductDeatil from "./Product/index"
import Cart from "./components/Cart/Cart"
import UpdateProfile from "./components/User/UpdateProfile"
import UpdateSiteInfo from "./components/User/Admin/ManageSite"
import PageNotFound from "./utils/pageNotFound"
import AddFile from "./components/User/Admin/AddFile"
import ResetPassword from "./components/Reset_Password/index"
import ResetConfirmPassword from "./components/Reset_Password/ResetConfirmPassword"

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashBoard, true)} />
        <Route path="/user/cart" exact component={Auth(Cart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProducts, true)} />
        <Route path="/admin/site_info" exact component={Auth(UpdateSiteInfo, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/admin/add_file" exact component={Auth(AddFile, true)} />
        <Route path="/reset_password/:token" exact component={Auth(ResetConfirmPassword, false)} />
        <Route path="/reset_user" exact component={Auth(ResetPassword, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/product_detail/:id" exact component={Auth(ProductDeatil, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes

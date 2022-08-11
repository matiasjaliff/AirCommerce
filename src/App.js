import React from "react"
import { Route, Routes } from 'react-router';

import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Home from "./components/Home";
import Store from "./components/Store";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import SortBy from "./components/SortBy";
import SuperAdmin from "./components/SuperAdmin";
import  Profile  from './components/Profile';
//import Users from './components/Users';
import  History  from './components/History';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductView from "./components/ProductView";
import ProfileEdit from "./commons/ProfileEdit";
import UserSingleView from "./components/UserSingleView";
import ProductAdminView from "./components/ProductAdminView";
import AdminViewEdit from "./components/AdminViewEdit";
import AdminView from "./components/AdminView";

/* import UserOrders from "./components/UserOrders" */

import UserOrders from "./components/UserOrders";
import NotAllowed from "./components/NotAllowed";



export default function App() {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    let isAdmin, isSuperAdmin = "";
    userStorage ? isAdmin = userStorage.isAdmin : isAdmin = false;
    userStorage ? isSuperAdmin = userStorage.superAdmin : isAdmin = false;

    return (
        <>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Store" element={<Store />} />
                <Route exact path="/Store/:search" element={<Grid />} />
                <Route exact path='/Store/sortBy/:type' element={<SortBy />} />
                <Route exact path='/account/:user' element={<Account />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/:id" element={<ProductView />} />
                <Route exact path="/user_orders" element={<UserOrders />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/profile_edit" element={<ProfileEdit />} />
                <Route exact path='/history' element={<History />} />            
                <Route exact path="/SuperAdmin/users/:dni" element={<UserSingleView /> } />
                <Route exact path="/SuperAdmin/users" element={<SuperAdmin /> } />
                <Route exact path='/update_product' element={isAdmin ? <ProductAdminView /> : <NotAllowed />}/>
                <Route exact path='/update_product/:search' element={isAdmin ? <ProductAdminView /> : <NotAllowed />}/>
                <Route exact path='/update_product/single/:id' element={isAdmin ? <AdminViewEdit /> : <NotAllowed />}/>
                <Route exact path='/create_product' element={isAdmin ? <AdminView /> : <NotAllowed />}/>
                
                
                

            </Routes>
        </>

    );
};

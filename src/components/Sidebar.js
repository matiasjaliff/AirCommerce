import React from "react";

import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import s from "../styles/Sidebar.module.css"

const Sidebar = () => {

  const { user } = useContext(AuthContext)
  
  const userStorage = JSON.parse(localStorage.getItem("user"));
  
  return (
    <>
      <div className={s.sidebarContainer}>

        <div className={s.sidebar}>
          <ul className={s.list}>
            <li>
              <Link  to="/account">
                <FaIcons.FaShoppingBag />My Current Order
              </Link>
            </li>

            <li >
              <Link to="/history">
                <FaIcons.FaBoxOpen /> My Orders
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <FaIcons.FaUser />My Profile
              </Link>
            </li>

          </ul>

          {
            userStorage.isAdmin ? (

              <div>
                <ul>
                  <li>
                    <Link to="/create_product">
                    <FaIcons.FaStoreAlt/>  Create new product
                    </Link>
                  </li>
                  <li >
                    <Link to="/update_product">
                    <FaIcons.FaStore/> Update product
                    </Link>
                  </li>
                  <li>
              <Link to="/user_orders">
                <FaIcons.FaUser />User orders
              </Link>
            </li>
                </ul>
              </div>
            ) : null
          }

          {
            userStorage.superAdmin ? (

              <div>
                <ul>
                  <li>

                <Link to="/SuperAdmin/users">
                <FaIcons.FaUserTie/> Manage users
                </Link>
                  </li>
                
                </ul>
              </div>
            ) : null
          }
        </div>
      </div>
    </>
  );

}

export default Sidebar

import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
//import { useContext } from 'react'
//import { AuthContext } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import s from '../styles/Profile.module.css'

const Profile = () => {

  const [users,setUsers]=useState([])

  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(async () => {
    try{
    const users= await axios.get(`http://localhost:8080/api/users/${userStorage.id}`)
    console.log(users);
    setUsers(users.data)
    }catch(error){console.log(error)}
}, [])

  return (
    <div >
      <Container>
        <div style={{justifyContent: 'center', alignItems: "center" }}>

        <h1 className={s.h1} >My Profile</h1>
        <Table>
          <thead>
            <tr>
              <th className={s.th}>Name</th>
              <th className={s.th}>Last Name</th>
              <th className={s.th}>E-mail</th>
              <th className={s.th}>DNI</th>
              <th className={s.th}>Address</th>
              
            </tr>
          </thead>
          <tbody>
            {
                <tr>
                  <td className={s.td}>{users.name}</td>
                  <td className={s.td}>{users.surname}</td>
                  <td className={s.td}>{users.email}</td>
                  <td className={s.td}>{users.dni}</td>
                  <td className={s.td}>{users.address}</td>
            
                  <td>
                  <Link to="/profile_edit"><Button className={s.dropbtn}>EDIT</Button></Link></td>
                </tr>
              
            }

          </tbody>

        </Table>
        </div>

      </Container>

    </div>
  )
}

export default Profile
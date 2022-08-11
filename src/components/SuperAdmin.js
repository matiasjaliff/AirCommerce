import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ImSearch } from 'react-icons/im';
import { Button, Container, Table } from 'react-bootstrap'
import useInput from '../hooks/useInput';
import { success } from '../hooks/Alerts'
import s from '../styles/SuperAdmin.module.css'

const SuperAdmin = () => {
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const input = useInput();
    const navigate = useNavigate()

  const handleRol = async (userId, userAdmin) => {
    
    try {
      userAdmin
        ? await axios.put(
            `http://localhost:8080/api/admin/takeRol/${userStorage.id}/${userId}`
          )
        : await axios.put(
            `http://localhost:8080/api/admin/giveRol/${userStorage.id}/${userId}`
          );
          success()
      const users = await axios.get(`http://localhost:8080/api/admin/${userStorage.id}`)
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    navigate(`/SuperAdmin/users/${input.value}`)
   
  };

  const reload = () => {
    
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/${userStorage.id}`)
   .then((users) => setUsers(users.data));
   
  }, []);

  return ( 
<div>
      <Container>
        
        <div onSubmit={handleSubmit}>
        <form >
        <div className={s.searchBox}>
          <input
            className={s.searchInput}
            type="search"
            placeholder="Search User By DNI"
            aria-label="Search"
            {...input}
          />
          <button className="searchButton" variant="outline-success" >
            
          </button>
        </div>
      </form>
      </div>
        <Table>
          <thead>
            <tr >
              <th className={s.th}>Name</th>
              <th className={s.th}>Last Name</th>
              <th className={s.th}>E-mail</th>
              <th className={s.th}>DNI</th>
              <th className={s.th}>Address</th>
              <th className={s.th}>Admin</th>
              <th className={s.th}>Give or Take Rol</th>

            </tr>
          </thead>
          {users.map((user, index) => {
            return (
          <tbody key={index}>
            {
                <tr>
                  <td className={s.td}>{user.name}</td>
                  <td className={s.td}>{user.surname}</td>
                  <td className={s.td}>{user.email}</td>
                  <td className={s.td}>{user.dni}</td>
                  <td className={s.td}>{user.address}</td>
                  <td className={s.td}>{(user.isAdmin)? "Yes" : "No"}</td>
                  <td className={s.td}><button className={s.dropbtn} onClick={() => {handleRol(user.id, user.isAdmin)}}>{user.isAdmin ? 'Take Rol Admin' : 'Give Rol Admin'}</button></td>
                </tr>

            }

          </tbody>
            )})}
        </Table>

      </Container>

    </div>

  )
    
};


    
  

export default SuperAdmin;

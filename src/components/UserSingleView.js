import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { ImSearch } from 'react-icons/im';
import useInput from '../hooks/useInput';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { success } from '../hooks/Alerts';
import s from '../styles/SuperAdmin.module.css'

const UserSingleView = () => {
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const { dni } = useParams();
  const [searchUser, setSearchUser] = useState({});
  const input = useInput();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    navigate(`/SuperAdmin/users/${input.value}`);
  };

  const handleRol = async () => {
    try {
      searchUser.isAdmin
        ? await axios.put(
            `http://localhost:8080/api/admin/takeRol/${userStorage.id}/${searchUser.id}`
          )
        : await axios.put(
            `http://localhost:8080/api/admin/giveRol/${userStorage.id}/${searchUser.id}`
          );
      const user = await axios.get(
        `http://localhost:8080/api/admin/users/${userStorage.id}/${searchUser.dni}`
      );
      success()
      setSearchUser(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      const user = await axios.get(
        `http://localhost:8080/api/admin/users/${userStorage.id}/${dni}`
      );
      setSearchUser(user.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Container>
        <div onSubmit={handleSubmit}>
          <form>
            <div className={s.searchBox}>
              <input
                type="search"
                placeholder="Search User By DNI"
                className={s.searchInput}
                aria-label="Search"
                {...input}
              />
              <button className="searchButton" variant="outline-success">
                
              </button>
            </div>
          </form>
        </div>
        <Table>
          <thead>
            <tr>
            <th className={s.th}>Name</th>
              <th className={s.th}>Last Name</th>
              <th className={s.th}>E-mail</th>
              <th className={s.th}>DNI</th>
              <th className={s.th}>Address</th>
              <th className={s.th}>Admin</th>
              <th className={s.th}>Give or Take Rol</th>
            </tr>
          </thead>

          <tbody key={'searchUser'}>
            {
              <tr>
                <td className={s.td}>{searchUser.name}</td>
                <td className={s.td}>{searchUser.surname}</td>
                <td className={s.td}>{searchUser.email}</td>
                <td className={s.td}>{searchUser.dni}</td>
                <td className={s.td}>{searchUser.address}</td>
                <td className={s.td}>{searchUser.isAdmin ? 'Yes' : 'No'}</td>
                <td className={s.td}>
                  <button className={s.dropbtn}
                    onClick={() => {
                      handleRol(searchUser.id, searchUser.isAdmin);
                    }}
                  >
                    {searchUser.isAdmin ? 'Take Rol Admin' : 'Give Rol Admin'}
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserSingleView;

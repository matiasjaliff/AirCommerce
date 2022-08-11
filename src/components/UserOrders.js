import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'


const UserOrders = () => {

    useEffect(async() => {
        try{
            const orders = await axios.get('/admin/order')
            console.log(orders)
        }catch(error){console.log(error)}
      
    
      
    }, []) 
    

  return (
    <div>UserOrders</div>
  )
}

export default UserOrders
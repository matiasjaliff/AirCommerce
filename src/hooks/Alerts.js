import Swal from 'sweetalert2'



export function registered(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'User Register',
      showConfirmButton: false,
      timer: 1500
    })
  }

export function userExist(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'User Already Exist',
      showConfirmButton: false,
      timer: 1500
    })
  }

  export function success(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500
    })
  }

  export function errorLogin(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Password or Email must be wrong',
      showConfirmButton: false,
      timer: 1500
    })
  }

  export function add(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product Added',
      showConfirmButton: false,
      timer: 1500
    })
  }

  export function checkOut(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Checked Out',
      showConfirmButton: false,
      timer: 1500
    })
  }

  export function create(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product successfully created',
      showConfirmButton: false,
      timer: 1500
    })
  }

  export function update(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product successfully updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  

 

  
 
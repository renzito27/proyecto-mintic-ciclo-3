import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router';
import apiBaseUrl from '../shared/utils/Api';
import ForbidenComponent from '../shared/components/forbiden/ForbidenComponent';

function HomePage() {
    const[products,setProducts] = useState([]);
    const [validUser, setValidUser] = useState(false);
    const { user, isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const verifySesion = () => {
        const cookies = document.cookie;
        let state = false;
        if (cookies.includes('auth0')){
            state = true;
     
  
        }
    const getProducts = async()=>{

   try{ 
     const response = await fetch(`${apiBaseUrl}/get-products `);
     const jsonResponse = await response.json();
     const responseProducts = jsonResponse.data;
     const listproducts = responseProducts.map((product) =>
     <tr>
         <th scope="row">{product.id}</th>
         <td>{product.name}</td>
         <td>{product.price}</td>
         <td>{product.stock}</td>
         <td>{product.description}</td>
     </tr>
 );
 setProducts(listproducts)
 }
 catch(error){
     console.log(error)

 }    
 
 }

 const validateUserRole = async () => {
  const response = await fetch(`${apiBaseUrl}/get-user?email=${user.email}`);
  const jsonResponse = await response.json();
  return jsonResponse;
}
const grantAccess = async () => {

  let userData;
  if (isAuthenticated) {
      userData = await validateUserRole();
  }
  else {

       if(!verifySesion()){
        loginWithRedirect();
 

    }
     
       
      setValidUser(false);
      return;
  }

  if (userData) {
      if (userData.role !== "invited") {
          setValidUser(true);
          localStorage.setItem("state", userData.role);
          await getProducts();
      }
      else {
          localStorage.setItem("state", userData.role);
          setValidUser(false);
      }
  }
  else {
      setValidUser(false);
  }

      return state;
  }

  //console.log("Valid user: " + validUser)
}

 useEffect (()=>{
     grantAccess();

 },[isAuthenticated, validUser]);

    return (
        <div className="container">
           {validUser ?  <table className="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
        {products}
  </tbody>
</table> : <ForbidenComponent/>}
        </div>
    )
}

export default HomePage

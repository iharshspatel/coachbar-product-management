import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Product from './Product';
import { useGetAllUserMutation } from '../slices/usersApiSlice';

const ProductGrid = ({products , deleteHandler}) => {

  const [getAllUser] = useGetAllUserMutation();
  const [alluser, setAllUsers] = useState([]);

  async function getAllUsers(){
    let {data} = await getAllUser();
    setAllUsers(data.users)
  }

  useEffect(()=>{
    getAllUsers();
  },[])

  return (
    <Container>
        <Row>
        {
            products.map((product)=><Product key={product._id} product={product} deleteHandler={deleteHandler} alluser={alluser}/>)
        }
        </Row>
    </Container>
  )
}

export default ProductGrid
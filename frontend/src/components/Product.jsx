import React, { useState } from 'react'
import { Col, Card, Button , Form} from 'react-bootstrap';
import {useSelector} from 'react-redux'
import { useUpdateProductMutation } from '../slices/productApiSlice';
import { useNavigate } from "react-router-dom"
import Loader from './Loader';

import { toast } from 'react-toastify';

const Product = ({ product , deleteHandler, alluser }) => {
    const navigate = useNavigate();

    function editHandler(id){
        navigate("/product/"+id);
    }

    const { userInfo } = useSelector((state) => state.auth);
    const [userId , setUserId] = useState('')
    const [updateProduct] = useUpdateProductMutation();

    if(alluser.length === 0 && userInfo.isAdmin){
        return <Col md={{'span':4}} gap={2}>
        <Card className="mb-4">
            <Loader/>
        </Card>
    </Col>
    }

    async function updateUser(id){
        let newProduct = {...product}
        newProduct['userId'] = userId;
        newProduct['id']=id;
        await updateProduct(newProduct).unwrap();
        toast.success(`Product is Updated.`);
        
    }

    return (
        <Col md={{'span':4}} gap={2}>
            <Card className="mb-4">
                <Card.Img variant="top" src={product.imageURL} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                        <br/>
                        Source:{product.source}
                    </Card.Text>

                    {userInfo.isAdmin && <Form.Group className='my-2' controlId='userId'>
        <Form.Label>Select User</Form.Label>
        <Form.Select defaultValue={`${product.userId}`} onChange={(e)=>setUserId(e.target.value)} aria-label="Default select example">
            {
              alluser.map((i)=><option key={i.id} value={i.id}>{i.name}</option>)
            }
          
        </Form.Select>
        </Form.Group>}

                    
                    <Button className='m-2' variant="secondary" onClick={()=>{editHandler(product._id)}}>Edit</Button>
                    <Button className='m-2' variant="dark" onClick={()=>{deleteHandler(product._id)}}>Delete</Button>
                    {
                        userInfo.isAdmin && <Button className='m-2' variant="light" onClick={()=>{updateUser(product._id)}}>Update User</Button>
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Product
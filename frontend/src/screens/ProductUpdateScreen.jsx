import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateProductMutation } from '../slices/productApiSlice';
import FormContainer from '../components/FormContainer';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { useProductData } from '../hooks/useProductData';

const ProductUpdateScreen = () => {

  const { id } = useParams()

  const [product, setProduct] = useProductData(id);
  const [alluser, setAllUsers] = useGetAllUsers([]);


  const [updateProduct] = useUpdateProductMutation()

  const { userInfo } = useSelector((state) => state.auth);

  function formHandler(type, value) {
    let newProduct = { ...product };
    newProduct[type] = value;
    setProduct(newProduct);
  }



  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      product.id = id
      const res = await updateProduct(product).unwrap();
      toast.success(`Product is Updated.`);
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Update Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={product.name}
            onChange={(e) => formHandler('name', e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='sku'>
          <Form.Label>Sku</Form.Label>
          <Form.Control
            type='sku'
            placeholder='Enter SKU'
            value={product.sku}
            onChange={(e) => formHandler('sku', e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='description'
            placeholder='Enter Description'
            value={product.description}
            onChange={(e) => formHandler('description', e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className='my-2' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='category'
            placeholder='Enter Category'
            value={product.category}
            onChange={(e) => formHandler('category', e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='imageURL'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='imageURL'
            placeholder='Enter Image URL'
            value={product.imageURL}
            onChange={(e) => formHandler('imageURL', e.target.value)}
          ></Form.Control>
        </Form.Group>

        {userInfo.isAdmin && <Form.Group className='my-2' controlId='userId'>
          <Form.Label>Select User</Form.Label>
          <Form.Select onChange={(e) => formHandler("userId", e.target.value)} aria-label="Default select example">
            <option>Select User</option>
            {
              alluser.map((i) => <option value={i.id}>{i.name}</option>)
            }

          </Form.Select>
        </Form.Group>}

        <Button type='submit' variant='primary' className='mt-3'>
          Submit
        </Button>

      </Form>

    </FormContainer>
  )
}

export default ProductUpdateScreen
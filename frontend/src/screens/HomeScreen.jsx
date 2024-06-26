import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeleteProductMutation, useGetAllProductsMutation } from '../slices/productApiSlice';
import { InputGroup, Form, Row, Col } from 'react-bootstrap';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid';
import NoProducts from '../components/NoProducts.jsx';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSource, setSelectedSource] = useState([])

  const [getAllProduct] = useGetAllProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const { userInfo } = useSelector((state) => state.auth);

  async function getAllProducts() {
    let { data } = await getAllProduct();
    setProducts(data.products);
    setFilteredProducts(data.products);
    const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
    setCategories(uniqueCategories);
  }

  async function deleteHandler(id) {
    await deleteProduct(id);
    await getAllProducts();
  }

  function filterProducts() {

    const searchTerm = searchText.toLowerCase();
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm)
    );

    if (searchTerm === 0) {
      filters = products;
    }

    if (selectedCategories.length === 0) {
      setFilteredProducts(filtered);
    } 
    else {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
    }

    if (selectedSource.length === 0) {
      setFilteredProducts(filtered);
    } 
    else {
      filtered = filtered.filter((product) =>
        selectedSource.includes(product.source)
      );
      setFilteredProducts(filtered);
    }
  }


  function toggleCategory(category) {
    const newSelectedCategories = [...selectedCategories];
    const index = newSelectedCategories.indexOf(category);
    if (index > -1) {
      newSelectedCategories.splice(index, 1);
    } else {
      newSelectedCategories.push(category);
    }
    setSelectedCategories(newSelectedCategories);
  }

  function toggleSource(source) {
    const newSelectedSource = [...selectedSource];
    const index = newSelectedSource.indexOf(source);
    if (index > -1) {
      newSelectedSource.splice(index, 1);
    } else {
      newSelectedSource.push(source);
    }
    setSelectedSource(newSelectedSource);
  }


  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    filterProducts()
  }, [selectedCategories, selectedSource, searchText])

  if (!userInfo) {
    return <Hero />;
  }

  if (products.length === 0) {
    return <NoProducts/>
  }

  return (
    <>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by Name or SKU"
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
      <Row className="">
        <Col md={2} className='border border-1 rounded h-100 pb-4'>
          <h3 className='my-3'>Filters</h3>
          <Form>
            <h6 className='my-2'>Categories</h6>
            {categories.map((category, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
            ))}
            <h6 className='my-2'>Sources</h6>
            {["ADMIN", "USER"].map((source, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={source}
                checked={selectedSource.includes(source)}
                onChange={() => toggleSource(source)}
              />
            ))}
          </Form>
        </Col>
        <Col md={10}>
          <ProductGrid products={filteredProducts} deleteHandler={deleteHandler} />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
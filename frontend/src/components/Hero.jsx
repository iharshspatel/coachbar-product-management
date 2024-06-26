import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Coachbar.io Product Management</h1>
          <p className='text-center mb-4'>
            User can manage Products based on their role. 
          </p>
          <div className='d-flex'>
              <Link className='text-white bg-primary p-2 rounded' to="/login">Sign In</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;

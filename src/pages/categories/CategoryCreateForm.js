import React, { useState } from 'react';
import { Form, Button, Container, Row, Col ,Alert} from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser} from "../../contexts/CurrentUserContext";
import { Link} from "react-router-dom";



const CategoryCreateForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const currentUser = useCurrentUser();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() !== '') {
      createCategory(categoryName);
      setCategoryName('');
    }
  };


  const createCategory = (name) => {
    axios.post('https://productive-c40034b33280.herokuapp.com/categories/', { name })
      .then(response => {
        alert('Category created successfully!');
      })
      .catch(error => {
        alert(`Error creating category: ${error.response.data.detail}`);
      });
  };

  const loggedInContent = (
    <>
      <h2>Create Category</h2>
      <Form onSubmit={handleSubmit}>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form>
    </>
    );
  
  const loggedOutContent = (
  <>
  <Alert variant='secondary'>
    <Alert.Heading>Hey, nice to see you</Alert.Heading>
    <p>
    However you must sign in to add a category ! 
    </p>
    <hr />
    <p className="mb-0">
        <Link  to="/signin">
               have'nt sign in yet? <span>Sign in now!</span>
        </Link>
    </p>
  </Alert>
  
  </>
  
  );

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          
          {currentUser ? loggedInContent : loggedOutContent}
         
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryCreateForm;

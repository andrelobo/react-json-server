import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form, Navbar, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


const api ="http://localhost:5000/users";


const initialState = {

  name:"",
  email:"",
  contact:"",
  address:"",
};


function App() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);

  const { name, email, contact, address } = state;




  useEffect(() => {
    loadUsers();

  }, []);


  const loadUsers = async () => {
    const response = await axios.get(api);
    setData(response.data);
  };


  const handleChange = (e) => {

   let { name, value } = e.target;

   setState({ ...state, [name]: value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact || !address){
      toast.error("Please fill all the fields");
    } else {

      axios.post(api, state);
      toast.success("User added successfully");
      setState({ name:"", email:"", contact:"", address:""});
      setTimeout(() => loadUsers(), 500);
    }
  };
  return (
   <>

   <ToastContainer />
    <Navbar bg="primary" variant="dark" className="justify-content-center" >
      <Navbar.Brand>
          React json server app with react-bootstrap
      </Navbar.Brand>
    </Navbar>  
    <Container style={{ marginTop: "70px"}}>
    <Row>
      <Col md={4}>
     <Form onSubmit={handleSubmit}>

       <Form.Group>
       
       <Form.Label style={{ textAlign: "left"}}>Name</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter Name"
        name="name"
        value={name}  
        onChange={handleChange}    
        />       
       </Form.Group>  

       <Form.Group>
       <Form.Label style={{ textAlign: "left"}}>Email</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter Email"
        name="email"
        value={email}  
        onChange={handleChange}        
        />       
       </Form.Group>

       <Form.Group>
       <Form.Label style={{ textAlign: "left"}}>Contact</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter Contact"
        name="contact"
        value={contact} 
        onChange={handleChange}         
        />       
       </Form.Group>

       <Form.Group>
       <Form.Label style={{ textAlign: "left"}}>Address</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter address"
        name="address"
        value={address} 
        onChange={handleChange}      
        />       
       </Form.Group>
       <div className="d-grid gap-2 mt-2"> 
        <Button type="submit" variant="primary" size="1g">
        
         Submit
        </Button>
      </div>

     </Form>



      </Col>
      <Col md={8}>
      <Table bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        {data && data.map((item, index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>{item.address}</td>
              <td>

              <ButtonGroup>
                <Button style= {{marginRight: "5px"}} variant="secondary">
                  
                Update             
                
                </Button>
                <Button style= {{marginRight: "5px"}} variant="danger">
                  
                Delete             
                
                </Button>
              </ButtonGroup>
              </td>
            </tr>
          </tbody>
        ))}
      
      
      </Table>
      </Col>
    </Row>
    </Container>
   
   </>
  );
}

export default App;

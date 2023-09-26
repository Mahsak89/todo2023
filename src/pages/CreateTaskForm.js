import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from "react-router";
import { axiosReq } from "../api/axiosDefaults";


function CreateTaskForm() {

    const [errors, setErrors] = useState({});

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        startdate: '',
        deadline: '',
        priority: '',
      });
      const { title, description, startdate, deadline, priority} = taskData;
      const history = useHistory();

      const handleChange = (event) => {
        setTaskData({
          ...taskData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("title", title);
        formData.append("description", description);
        formData.append("startdate", startdate);
        formData.append("deadline", deadline);
        formData.append("priority", priority);
        
    
        try {
          const { data } = await axiosReq.post("/tasks/", formData);
          history.push(`/posts/${data.id}`);
        } catch (err) {
          console.log(err);
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
      };


  return (
    <div>
      <h2>Create New Task</h2>

      <Form onSubmit={handleSubmit} >
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={handleChange}
           
          />
        </Form.Group>
        {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formStartdate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            name="startdate"
            value={startdate}
            onChange={handleChange}
           
          />
        </Form.Group>
        {errors?.startdate?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formDeadline">
          <Form.Label>Deadline:</Form.Label>
          <Form.Control
            type="datetime-local"
            name="deadline"
            value={deadline}
            onChange={handleChange}
           
           
          />
        </Form.Group>
        {errors?.deadline?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formPriority">
          <Form.Label>Priority:</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={priority}
            onChange={handleChange}
          
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Control>
        </Form.Group>
        {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
 
    </div>
  )
}

export default CreateTaskForm
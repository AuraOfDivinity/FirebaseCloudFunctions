import React from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback
} from "reactstrap";
import "./AddToDo.css";

export default function AddToDo() {
  return (
    <Container className="AddForm">
      <h2>Sign In</h2>
      <Form className="form" onSubmit={e => this.submitForm(e)}>
        <Col>
          <FormGroup>
            <Label>Add To Do</Label>
            <Input
              type="text"
              name="todo"
              id="exampleEmail"
              placeholder="Please enter the new to do here"
            />
          </FormGroup>
        </Col>
      </Form>
    </Container>
  );
}

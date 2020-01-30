import React, { Component } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios
      .get("https://us-central1-todoapp-70bd7.cloudfunctions.net/getItems")
      .then(response => {
        console.log(response.data);
        this.setState({
          items: response.data
        });
      });
  }

  handleDelete(id) {
    return axios
      .delete(
        `
    https://us-central1-todoapp-70bd7.cloudfunctions.net/delete?id=${id}`
      )
      .then(response => {
        this.setState({
          items: response.data
        });
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="4"></Col>
          <Col sm="4">
            {this.state.items.map((item, index) => (
              <div style={{ margin: "0 auto" }} key={index}>
                <Row>
                  <Card
                    body
                    style={{
                      float: "none",
                      margin: "10px"
                    }}
                  >
                    <CardText>{item.item}</CardText>
                    <Button
                      color="danger"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      Delete Item
                    </Button>
                  </Card>
                </Row>
              </div>
            ))}
          </Col>
          <Col sm="4"></Col>
        </Row>
      </div>
    );
  }
}

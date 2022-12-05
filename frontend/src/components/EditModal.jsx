import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCoordinates: this.props.activeCoordinates,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeCoordinates = { ...this.state.activeCoordinates, [name]: value };
    this.setState({ activeCoordinates });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Coordinates</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Lat</Label>
              <Input
                id="coordinates-lat"
                name="user_lat"
                value={this.state.activeCoordinates.user_lat}
                onChange={this.handleChange}
                placeholder="Enter Latitude"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Lon</Label>
              <Input
                id="coordinates-lon"
                name="user_lon"
                value={this.state.activeCoordinates.user_lon}
                onChange={this.handleChange}
                placeholder="Enter Longitude"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeCoordinates)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
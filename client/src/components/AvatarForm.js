import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";

// Actions
import { updateAvatar } from "../actions/userActions";

class AvatarForm extends Component {
  constructor() {
    super();

    this.state = {
      file: ""
    };
  }

  onChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { file } = this.state;

    const formData = new FormData();

    formData.append("avatar", file);

    this.props.updateAvatar(formData);

    this.setState({
      file: ""
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input type="file" name="avatar" onChange={this.onChange} />
          </FormGroup>
          <Button>Upload</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { updateAvatar }
)(AvatarForm);

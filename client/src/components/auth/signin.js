import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    // handleSumit is from redux-form
    // email and password comes from 'fields' from reduxForm call at bottom of this module
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
        <fieldset className="form-group">
          <label>Email</label>
          {/* {...email} means use the email helper from redux-form */}
          <input {...email} className="form-control"></input>
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <input {...password} className="form-control" type="password"></input>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// reduxForm works just like connect so it can take mapStateToProps and mapDispatchToProps
// except arguments are shifted across by 1
export default reduxForm({
  // form is the key that reduxForm will place the property names inside our
  // application state
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

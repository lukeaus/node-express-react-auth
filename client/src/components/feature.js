import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <div>
          This is a feature!
        </div>
        <div>
          Secret message: {this.props.secretMsg}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ secretMsg }) {
  return { secretMsg }
}

export default connect(mapStateToProps, actions)(Feature);

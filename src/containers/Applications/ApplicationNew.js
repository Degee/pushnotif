import Component from 'react-pure-render/component';
import React from 'react';
import {connect} from 'react-redux';
import {ApplicationsForm} from 'components';
import {createApplication} from 'redux/modules/applications';
import {reset as resetForm} from 'redux-form';
import {Alert, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';

@connect(() => ({}), {createApplication, resetForm})
export default class ApplicationNew extends Component {

  static propTypes = {
    createApplication: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {showCreated: false};
  }

  handleSubmit = (data) => {
    this.props.createApplication(data)
      .then(() => {
        this.props.resetForm('applicationsNew');
        this.showMessage();
      });
  };

  showMessage() {
    this.setState({showCreated: true});
    setTimeout(() => {
      this.setState({showCreated: false});
    }, 3000);
  }

  render() {
    return (
      <div className="container">
        <div>
          <div className="pull-right">
            <Link to="/applications" className="btn btn-primary btn-large">
              <Glyphicon glyph="arrow-left" />{' '}Back
            </Link>
          </div>
        </div>
        <h1>Add New Application</h1>

        {this.state.showCreated &&
        <Alert bsStyle="success">
          <strong>New Application</strong> has been successfully added.
        </Alert>
        }

        <ApplicationsForm onSubmit={this.handleSubmit}/>

      </div>
    );
  }
}

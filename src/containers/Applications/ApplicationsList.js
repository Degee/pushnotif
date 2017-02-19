import Component from 'react-pure-render/component';
import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router';
import {Table, Glyphicon, Label} from 'react-bootstrap';
import {getApplications, switchApplicationStatus, deleteApplication} from 'redux/modules/applications';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

@connect(
  (state) => ({
    applications: state.applications.list
  }),
  {getApplications, switchApplicationStatus, deleteApplication})
export default class ApplicationsList extends Component {

  static propTypes = {
    applications: React.PropTypes.array.isRequired,
    getApplications: React.PropTypes.func.isRequired,
    switchApplicationStatus: React.PropTypes.func.isRequired,
    deleteApplication: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {confirmDelete: false};
    this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.getApplications();
  }

  handleStatusChange(id, isActive) {
    this.props.switchApplicationStatus(id, isActive);
  }

  handleShowDeleteConfirm(id) {
    this.setState({confirmDelete: id});
  }

  handleDelete() {
    this.props.deleteApplication(this.state.confirmDelete)
      .then(() => this.setState({confirmDelete: false}));
  }

  handleCloseConfirm() {
    this.setState({confirmDelete: false});
  }

  render() {
    const {applications} = this.props;
    const styles = require('./Application.scss');

    return (
      <div className="container">
        <h1>Applications</h1>

        <Link
          to="/applications/new"
          className={`btn btn-success ${styles.marginTopBottom}`}>+ Add New Application</Link>

        {applications.length ?
          <Table striped bordered condensed hover responsive>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Subscribe URI</th>
              <th>Status</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {applications.map((app, key) =>
              <tr key={`application-row-${key}`}>
                <td>{key + 1}</td>
                <td>
                  <Link to={`/applications/${app._id}`}>
                    {app.name}
                  </Link>
                </td>
                <td>{moment(app.createdAt).format('YYYY-MM-DD')}</td>
                <td>{app.baseUri}</td>
                <td className="text-center" onClick={this.handleStatusChange.bind(this, app._id, app.isActive)}>
                  {app.isActive ?
                    <Label bsStyle="success" className={styles.clickable}>Active</Label>
                    :
                    <Label className={styles.clickable}>Disabled</Label>
                  }
                </td>
                <td className="text-center">
                  <Glyphicon glyph="trash"
                             onClick={this.handleShowDeleteConfirm.bind(this, app._id)}
                             className={styles.clickable}/>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
          :
          <div className={styles.noItems}>
            No applications
          </div>
        }

        {this.state.confirmDelete &&
          <ConfirmModal handleClose={this.handleCloseConfirm} handleDelete={this.handleDelete} />
        }

      </div>
    );
  }

}

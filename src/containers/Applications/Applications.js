import React, {Component} from 'react';
import ApplicationsList from './ApplicationsList';
import Helmet from 'react-helmet';

export default class Applications extends Component {

  static propTypes = {
    children: React.PropTypes.element
  };

  render() {
    const {children} = this.props;
    return (
      <div className="container">
        <Helmet title="Applications"/>
        {
          children ? children : <ApplicationsList />
        }
      </div>
    );
  }

}

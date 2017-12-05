import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid" >
        <p className="navbar-text">{props.user.id} - {props.user.name}</p>
        <p className="navbar-text pull-right">{props.user.nickname}</p>
      </div>
    </nav>
  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    nickname: PropTypes.string
  }).isRequired
};

export default UserInfo;

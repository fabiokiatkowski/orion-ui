import React from 'react';

export default function UserInfo (props) {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid" >
        <p className="navbar-text">{props.user.id} - {props.user.name}</p>
        <p className="navbar-text pull-right">{props.user.nickname}</p>
      </div>
    </nav>
  );
}
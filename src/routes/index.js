import React from 'react';
import PropTypes from 'prop-types';
import UserRoutes from './UserRoutes';

export default function Routes({ uid }) {
  console.warn('Routes');
  return (
    <>
      <UserRoutes uid={uid} />
    </>
  );
}

Routes.propTypes = {
  uid: PropTypes.string.isRequired,
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/session';

const SignOutButton = () => {
  const dispatch = useDispatch();

  const onSignOut = async (e) => {
    await dispatch(signOut());
  };

  return <button onClick={onSignOut}>Sign out</button>;
};

export default SignOutButton;

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../store/session';

const SignOutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignOut = async (e) => {
    await dispatch(signOut());
    history.push("/");
  };

  return <button onClick={onSignOut}>Sign out</button>;
};

export default SignOutButton;

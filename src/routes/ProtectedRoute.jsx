import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import FullPageLoading from '../Components/UI/FullPageLoading';
import { useGetUserQuery } from '../services/apiAuth';
import { getItem } from '../utils/localStorage';

const ProtectedRoute = ({ children, authPage }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetUserQuery(null, {
    skip: !getItem('token'),
  });
  const isAuth = data;

  useEffect(() => {
    // If is loading return
    if (isLoading) return;

    // do not show login page when authenticated
    if (isAuth && authPage) {
      navigate('/home');
    }

    // If not authenticated and not in auth page navigate to login
    if (!isAuth && !authPage) {
      navigate('/login');
    }
  }, [isAuth, authPage, navigate, isLoading]);

  // If loading return spinner
  if (isLoading) return <FullPageLoading />;

  if (!isLoading && authPage && isAuth) return null;
  if (!isLoading && !authPage && !isAuth) return null;

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  authPage: PropTypes.bool,
};

export default ProtectedRoute;

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('userid');

  if (role && token) {
    return {
      role,
      token,
      id
    };
  }
  return false;
};

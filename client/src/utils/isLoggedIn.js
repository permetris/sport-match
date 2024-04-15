export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('userid');
  const username = localStorage.getItem('username');

  if (role && token) {
    return {
      role,
      token,
      id,
      username
    };
  }
  return false;
};

import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URL;

export const httpGetUser = async (userId) => {
  return await axios.get(`${URL}/user/${userId}`);
};
export const httpUpdateUser = async (userId, editedUser) => {
  delete editedUser._id;

  return await axios.put(`${URL}/user/${userId}`,
    editedUser, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
};

export const httpGetUserHistory = async (id) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${URL}/user/${id}/history`, {
    headers: {
      Authorization: token
    }
  });
};

export const httpGetMatch = async (id) => {
  return await axios.get(`${URL}/match/${id}`);
};

export const httpGetReservation = async (id) => {
  return await axios.get(`${URL}/reservation/${id}`);
};

export const httpPasswordChange = async (data, user) => {
  return await axios.patch(`${URL}/${user.id}/reset-password`, data, {
    headers: {
      Authorization: user.token
    }
  });
};

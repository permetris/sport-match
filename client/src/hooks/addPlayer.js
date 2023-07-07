import axios from 'axios';
import { useToastifySuccess, useToastifyError } from '../../src/hooks/useToastify';

export const handleAddPlayerClick = async (id, setPlayerRegistered) => {
  const modifyData = async () => {
    try {
      const userId = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const onePlayerAdd = await axios.put(`${process.env.REACT_APP_SERVER_URL}/reservation/${id}/add-player/${userId}`, null, {
        headers: {
          Authorization: token
        }
      });
      setPlayerRegistered(onePlayerAdd);
      useToastifySuccess('Successfully added to reservation');
    } catch (err) {
      useToastifyError(err);
    }
  };
  modifyData();
};

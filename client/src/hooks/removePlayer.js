import axios from 'axios';
import { toastSuccess, toastError } from '../../src/hooks/useToastify';

export const handleRemovePlayerClick = async (id, setPlayerRegistered) => {
  const modifyData = async () => {
    try {
      const userId = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const onePlayerRemove = await axios.put(`${process.env.REACT_APP_SERVER_URL}/reservation/${id}/player-withdraw/${userId}`, null, {
        headers: {
          Authorization: token
        }
      });
      if (onePlayerRemove) {
        setPlayerRegistered(!onePlayerRemove);
      }
      toastSuccess('Successfully removed from reservation');
    } catch (err) {
      toastError(err);
    }
  };
  modifyData();
};

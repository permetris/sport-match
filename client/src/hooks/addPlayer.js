import axios from 'axios';
import { toastSuccess, toastError } from '../../src/hooks/useToastify';

export const httpAddPlayerToReservation = async (reservationId) => {
  console.log(reservationId);
  const modifyData = async () => {
    try {
      const userId = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const onePlayerAdd = await axios.put(`${process.env.REACT_APP_SERVER_URL}/reservation/${reservationId}/add-player/${userId}`, null, {
        headers: {
          Authorization: token
        }
      });
      toastSuccess('Successfully added to reservation');
    } catch (err) {
      toastError(err);
    }
  };
  modifyData();
};

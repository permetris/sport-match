import { toast } from 'react-toastify';

const options = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
};

export const toastError = (err) => {
  if (err.response) {
    const errors = err.response.data.message;
    if (errors instanceof Array) {
      for (const error of errors) {
        toast.error(error, options);
      }
    }
    toast.error(errors, options);
  }
};

export const toastSuccess = (message) => {
  toast.success(message, options);
};

export const toastWarning = (message) => {
  toast.warning(message, options);
};

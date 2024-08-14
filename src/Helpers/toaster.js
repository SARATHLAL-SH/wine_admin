import { ToastContainer,notify, toast } from 'react-toastify';
export const notifySuccess = (msg) => {
    toast.success(msg, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
   }
  export const notifyError = (msg) => {
    toast.error(msg, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      
      }); 
   }
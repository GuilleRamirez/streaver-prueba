import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const defaultToastConfig = {
  duration: 3000,
  newWindow: true,
  close: true,
  stopOnFocus: true,
};

export default function showToast(text: string, isError = false) {
  Toastify({
    ...defaultToastConfig,
    text,
    style: {
      background: isError
        ? 'linear-gradient(to right,rgb(255, 1, 1),rgb(255, 94, 94))'
        : 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
}

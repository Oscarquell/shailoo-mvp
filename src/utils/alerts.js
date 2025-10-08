import {toast} from "react-toastify";
import Alert from '../components/alert/alert';


const showSuccess = (title, msg, options) => {
    toast.success(<Alert title={title} msg={msg}/>, options)
}

const showError = (title, msg, options) => {
    toast.error(<Alert title={title} msg={msg}/>, options)
}

const showWarning = (title, msg, options) => {
    toast.warning(<Alert title={title} msg={msg}/>, options)
}

export {
    showError,
    showSuccess,
    showWarning
}
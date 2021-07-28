import {toast } from 'react-toastify';
import './ReactToast.css';

const ReactToast = props => {
  let option = {};
  if (props.position) option['position'] = props.position;
  if (props.position) option['autoClose'] = props.position;
  if (props.hideProgressBar) option['hideProgressBar'] = props.hideProgressBar;
  if (props.closeOnClick) option['closeOnClick'] = props.closeOnClick;
  if (props.pauseOnHover) option['pauseOnHover'] = props.pauseOnHover;
  if (props.progress) option['progress'] = props.progress;
  if (props.className) option['className'] = props.className;
  if (props.transition) option['transition'] = props.transition;
  if (props.pauseOnFocusLoss)
    option['pauseOnFocusLoss'] = props.pauseOnFocusLoss;
  if (props.closeOnClick) option['closeOnClick'] = props.closeOnClick;

  if (props.draggable) option['draggable'] = props.draggable;
  if (props.draggablePercent)
    option['draggablePercent'] = props.draggablePercent;
  if (props.draggableDirection)
    option['draggableDirection'] = props.draggableDirection;
  if (props.message) {
    if(props.type)
    {
      switch (props.type) {
        case "success":
          toast.success(props.message, option);
          break;
        case "error":
          toast.error(props.message, option);
          break;
        case "info":
          toast.info(props.message, option);
          break;
        case "warning":
          toast.warn(props.message, option);
          break;
        case "dark":
          toast.dark(props.message, option);
          break;
        default:
          toast(props.message, option);
          break;
      }
      if(props.type) new Audio(`${process.env.PUBLIC_URL}/asset/sounds/${props.type}.mp3`).play();
    }

    
  }
};

export default ReactToast;
/* {`${process.env.PUBLIC_URL}/asset/images/coming-soon.svg`} */
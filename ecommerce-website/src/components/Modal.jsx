import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={classes['modal-overlay']}>
      <div className={classes['modal-content']}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById('overlays');
const Modal = (props)=>{
    return (
        <>
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </>
    )
}
export default Modal;
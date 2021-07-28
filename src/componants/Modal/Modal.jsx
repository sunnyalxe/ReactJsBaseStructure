//http://reactcommunity.org/react-modal/
import { useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root')

const Modal = (props) => {
  var subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '';
  }

  function closeModal(){
    setIsOpen(false);
    if(props.doRefresh)  
    {
      const doRefresh = props.doRefresh + 1;
      props.setDoRefresh && props.setDoRefresh(doRefresh);
    }
  }
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)'
    }
  };
  const ChildComponant = props.child;
  return (<>
        <button  className={props.btnCoverClass && props.btnCoverClass} onClick={openModal}><i className={props.btnClass}></i> {props.btnTitle}</button> 
      
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Table"
        shouldCloseOnOverlayClick={false} 
        shouldCloseOnEsc={false} 
      >
        <div className="page-wrapper" id={props.id} >
          <div className="page-row">
            <header className="d-flex align-items-center ReactModal-Header">
              <div className="d-flex align-items-center text-dark text-decoration-none w-100">                
                <h1 ref={_subtitle => (subtitle = _subtitle)}>{props.title}</h1>
                <button className="Reactmodal-CloseBtn" onClick={closeModal}></button>
              </div>    
            </header>
            <ChildComponant {...props} closeModal={closeModal}/>            
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default Modal;
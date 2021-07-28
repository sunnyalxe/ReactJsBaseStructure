import { useState} from 'react';
import ReactModal from 'react-modal';
import './Model.css';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

const Model = (props) => {
  var subtitle;
  const [isModelOpen,setIsModelOpen] = useState(false);
  function openModal() {
    setIsModelOpen(true);
    props.onModalOpen && props.onModalOpen();
  }

  function afterOpenModal() {
    props.afterModalOpen && props.afterModalOpen();
  }

  function closeModal(){
    setIsModelOpen(false);
    props.onModalClose && props.onModalClose();
  }
  const customStyles = props.customStyles || null;
  return (<div>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        isOpen={isModelOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={props.contentLabel}
        shouldCloseOnOverlayClick={false} 
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </ReactModal>
    </div>
  );
}
export default Model;
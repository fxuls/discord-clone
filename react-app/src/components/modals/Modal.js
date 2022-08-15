import { useDispatch } from "react-redux";
import { hideModal } from "../../store/ui";
import ImageModal, { IMAGE_MODAL } from "./ImageModal";
import CreateServerModal, { CREATE_SERVER_MODAL } from "./CreateServerModal";

const Modal = ({ modal }) => {
    const dispatch = useDispatch();

    const closeModal = () => dispatch(hideModal());
    const stopPropagation = (e) => e.stopPropagation();

    let modalComponent;
    switch (modal.type) {
        case IMAGE_MODAL:
            modalComponent = <ImageModal modal={modal} stopPropagation={stopPropagation} />;
            break;

        case CREATE_SERVER_MODAL:
            modalComponent = <CreateServerModal modal={modal} stopPropagation={stopPropagation} />;
            break;
            
        default:
            closeModal();
            return null;
    }

    return <div className="modal-overlay" onMouseDown={closeModal}>
        {modalComponent}
    </div>;
}

export default Modal;

import ImageModal, { IMAGE_MODAL } from "./ImageModal";

const Modal = ({ modal }) => {
    let modalComponent;
    switch (modal.type) {
        case IMAGE_MODAL:
            modalComponent = <ImageModal modal={modal}/>
            break;

        default:
            console.log("modal not found");
            return null;
    }

    return <div className="modal-overlay">
        {modalComponent}
    </div>;
}

export default Modal;

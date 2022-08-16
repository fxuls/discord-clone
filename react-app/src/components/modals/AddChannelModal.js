import AddChannelForm from "../app/server/AddChannelForm";

export const ADD_CHANNEL_MODAL = "modals/ADD_CHANNEL_MODAL";

const AddChannelModal = ({ modal, stopPropagation }) => {
    return (<div className="form-modal" onMouseDown={stopPropagation}>
        <AddChannelForm serverId={modal.serverId} />
    </div>);
}

export default AddChannelModal;

import AddChannelForm from "../app/server/AddChannelForm";

export const ADD_CHANNEL_MODAL = "modals/ADD_CHANNEL_MODAL";

const AddChannelModal = ({ stopPropagation }) => {
    return (<div className="form-modal" onMouseDown={stopPropagation}>
        <AddChannelForm />
    </div>);
}

export default AddChannelModal;

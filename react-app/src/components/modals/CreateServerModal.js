import CreateServerForm from "../app/server/CreateServerForm";

export const CREATE_SERVER_MODAL = "modals/CREATE_SERVER_MODAL";

const CreateServerModal = ({ stopPropagation }) => {
    return (<div className="form-modal" onMouseDown={stopPropagation}>
        <CreateServerForm />
    </div>);
}

export default CreateServerModal;

import CreateServerForm from "../app/server/CreateServerForm";

export const CREATE_SERVER_MODAL = "modals/CREATE_SERVER_MODAL";

const CreateServerModal = () => {
    return (<div className="form-modal form-container">
        <CreateServerForm />
    </div>);
}

export default CreateServerModal;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addServerChannel } from "../../../store/servers";
import { hideModal } from "../../../store/ui";

const AddChannelForm = ({ serverId }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState("");

  const validateName = () => {
    let errorMessage = "";
    if (!name) errorMessage = "Channel name is required";
    else if (name.length > 19) errorMessage = "Must be 19 characters or fewer";
    else if (name.indexOf(" ") !== -1)
      errorMessage = "Channel name cannot contain spaces";

    setNameError(errorMessage);
    return !errorMessage;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validateName()) {
      const data = await dispatch(addServerChannel(serverId, name));
      if (data.errors) setErrors(data.errors);
      else dispatch(hideModal());
    }
  };

  useEffect(() => {
    if (hasSubmitted) {
      validateName();

      // parse backend errors obj
      const errObj = errors.reduce((obj, error) => {
        error = error.split(" : ");
        obj[error[0]] = error[1];
        return obj;
      }, {});

      if (errObj.name) setNameError(errObj.name);
    }
  }, [name, hasSubmitted, errors]);

  return (
    <form onSubmit={onSubmit} id="add-channel-form">
      <h1>Add channel</h1>

      <div className="form-row">
        <label htmlFor="name">Channel name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            if (e.target.value.length <= 19) setName(e.target.value);
          }}
          value={name}
          placeholder="name"
        />
        <label htmlFor="name" className="field-error">
          {nameError}
        </label>
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default AddChannelForm;

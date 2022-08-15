import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../../../store/servers";
import { hideModal } from "../../../store/ui";

const CreateServerForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState("");
  const [isPublicError, setIsPublicError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateName = () => {
    let errorMessage = "";
    if (!name) errorMessage = "Name is required";
    else if (name.length < 3) errorMessage = "Name must be at least 3 characters";
    else if (name.length > 30) errorMessage = "Name must be fewer than 30 characters";
    setNameError(errorMessage);
    return !errorMessage;
  }

  const validateIsPublic = () => {
    let errorMessage = "";
    if (!isPublic) errorMessage = "Privacy option is required";
    setIsPublicError(errorMessage);
    return !errorMessage;
  }

  useEffect(() => {
    if (hasSubmitted) {
      validateName();
      validateIsPublic();

      // parse backend errors obj
      const errObj = errors.reduce((obj, error) => {
        error = error.split(" : ");
        obj[error[0]] = error[1];
        return obj;
      }, {});

      if (errObj.name) setNameError(errObj.name);
      if (errObj.public) setIsPublicError(errObj.public);
    }
  }, [name, isPublic, hasSubmitted, errors])

  const onCreateServer = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // validations
    const validations = [
      validateName(),
      validateIsPublic(),
    ];

    if (!validations.includes(false)) {
      const data = await dispatch(createServer(name, isPublic));
      if (data.errors) setErrors(data.errors);
      else dispatch(hideModal());
    }
  }

  return (
    <form onSubmit={onCreateServer} id="create-server-form">
      <h1>Create a Server</h1>

      <div className="form-row">
        <label htmlFor="name">Server name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="name"
        />
        <label htmlFor="name" className="field-error">
          {nameError}
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="isPublic">Privacy</label>
        <div className="radio-input-row">
        <label className="radio-input">
          Public
          <input
            type="radio"
            name="isPublic"
            onChange={(e) => setIsPublic(true)}
            value={true}
            checked={isPublic}
          />
        </label>

        <label className="radio-input">
          Private
          <input
            type="radio"
            name="isPublic"
            onChange={(e) => setIsPublic(false)}
            value={false}
            checked={!isPublic}
          />
        </label>
        </div>
        <label htmlFor="public" className="field-error">
          {isPublicError}
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateServerForm;

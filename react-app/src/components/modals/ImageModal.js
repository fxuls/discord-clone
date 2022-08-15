export const IMAGE_MODAL = "modals/IMAGE_MODAL";

const ImageModal = ({ modal, stopPropagation }) => {
  const { imageUrl } = modal;

  return (
    <div className="image-modal">
      <div className="image-container">
        <img src={imageUrl} onMouseDown={stopPropagation} alt={imageUrl}/>
        <a
          href={imageUrl}
          target="_blank"
          rel="noreferrer"
          className="transparent-caret-color"
          onMouseDown={stopPropagation}
        >
          Open original
        </a>
      </div>
    </div>
  );
};

export default ImageModal;

import { Dialog } from "@headlessui/react";
import { urlFor } from "../utils";

const QuickView = ({
  isOpen,
  closeModal,
  name,
  description,
  mainImage,
  images,
}) => {
  return (
    <>
      {isOpen && (
        <Dialog static open={isOpen} onClose={closeModal} className="modal">
          <Dialog.Overlay className="overlay" />
          <div className="modal-card">
            <Dialog.Title>{name}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            <button onClick={closeModal}>Close</button>

            <section className="all-images-container">
              <img src={mainImage} alt="Main property image" />
              <div>
                {images.map((img, index) => (
                  <img src={urlFor(img.asset)} alt={img.caption} key={index} />
                ))}
              </div>
            </section>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default QuickView;

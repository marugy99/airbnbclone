import { urlFor } from "../utils";

const PropertyImages = ({ imageUrl, images }) => {
  return (
    <section className="property-images-container">
      <img src={imageUrl} alt="Main property image" />
      <div className="property-images">
        {images.map((img, index) => (
          <img src={urlFor(img.asset)} alt={img.caption} key={index} />
        ))}
      </div>
    </section>
  );
};

export default PropertyImages;

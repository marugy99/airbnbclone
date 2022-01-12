import { sanityClient } from "../../sanity";
import { isPlural, urlFor, getRatings, checkObj } from "../../utils";
import PropertyImages from "../../components/PropertyImages";
import Reviews from "../../components/Reviews";
import Amenities from "../../components/Amenities";
import Maps from "../../components/Maps";
import QuickView from "../../components/QuickView";
import {
  BsFillStarFill,
  BsFillShareFill,
  BsHeart,
  BsEyeFill,
} from "react-icons/bs";
import { SiGoogletranslate } from "react-icons/si";
import { useState } from "react";

const Property = (property) => {
  const singleProperty = property.property;
  const {
    title,
    id,
    description,
    host,
    imageUrl,
    beds,
    bedrooms,
    propertyType,
    pricePerNight,
    location,
    images,
    reviews,
  } = singleProperty;

  const [modal, setModal] = useState(null);

  const openModal = (value) => {
    setModal(value);
  };

  const hideModal = () => {
    setModal(null);
  };

  return (
    <article className="container property">
      <header className="property-header-container">
        <div className="text-sm">
          <h1 className="text-xl">{title}</h1>

          <div className="property-header">
            <span className="red-icon" aria-hidden="true">
              <BsFillStarFill />
            </span>
            <p>
              <strong>{getRatings(reviews)}</strong>
            </p>
            <p className="reviews-count">
              <strong>
                ({reviews.length} review{isPlural(reviews.length)})
              </strong>
            </p>
          </div>
        </div>
        <div className="property-actions text-sm">
          <button aria-label="Share">
            <span aria-hidden="true">
              <BsFillShareFill />
            </span>
            <p>Share</p>
          </button>
          <button aria-label="Save">
            <span aria-hidden="true">
              <BsHeart />
            </span>
            <p>Save</p>
          </button>
        </div>
      </header>

      <button
        onClick={() => openModal(id)}
        className="btn-view-all"
        aria-label="View all images"
      >
        <div className="view-all-images" aria-hidden="true">
          <BsEyeFill />
        </div>
        <PropertyImages imageUrl={imageUrl} allImages={images} />
      </button>

      <QuickView
        isOpen={modal === id}
        closeModal={() => hideModal()}
        name={title}
        description={description}
        mainImage={imageUrl}
        images={images}
      />

      <div className="property-details-container">
        <div>
          <section>
            <header className="property-details-header">
              <div>
                <p className="text-lg">
                  Entire {propertyType} hosted by {host.name}
                </p>
                <div className="flex-center text-base text-light">
                  <p>
                    {beds} Bed{isPlural(beds)}
                  </p>
                  <span aria-hidden="true">&#8226;</span>
                  <p>
                    {bedrooms} Bedroom{isPlural(bedrooms)}
                  </p>
                </div>
              </div>
              <img
                src={urlFor(host.mainImage.asset)}
                className="host-avatar"
                alt="Host avatar"
              />
            </header>

            <hr />

            <Amenities propertyType={propertyType} />
          </section>

          <hr />

          <section>
            <button className="translate" aria-label="Translate to Spanish">
              Translate to Spanish
              <SiGoogletranslate />
            </button>
            <p>{description}</p>
          </section>
        </div>

        <div className="property-price-container">
          <section className="property-price">
            <header className="flex-center">
              <p className="text-lg no-margin">
                ${pricePerNight}{" "}
                <span className="text-light text-medium">/ night</span>
              </p>
              <div className="flex-center text-sm">
                <span className="red-icon" aria-hidden="true">
                  <BsFillStarFill />
                </span>
                <p>
                  <strong>{getRatings(reviews)}</strong>
                </p>
                <p className="reviews-count">
                  <strong>
                    ({reviews.length} review{isPlural(reviews.length)})
                  </strong>
                </p>
              </div>
            </header>

            <div className="availability-container">
              <div className="flex-center">
                <div className="right-margin">
                  <label htmlFor="check-in">Check-in</label>
                  <input type="text" id="check-in" />
                </div>
                <div>
                  <label htmlFor="check-out">Checkout</label>
                  <input type="text" id="check-out" />
                </div>
              </div>
              <div>
                <p>Guests</p>
                <select name="guest">
                  <option defaultValue="1 guest">1 guest</option>
                  <option value="2 guests">2 guests</option>
                  <option value="3 guests">3 guests</option>
                </select>
              </div>
            </div>

            <button className="check-avail">Check availability</button>
          </section>
        </div>
      </div>

      <hr />

      <Reviews data={reviews} />

      <hr />

      <article className="location-map">
        <h2>Location</h2>

        <Maps location={location} />
      </article>
    </article>
  );
};

export default Property;

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const query = `*[ _type == "property" && slug.current == "${slug}" ][0]{
    title,
    id,
    location,
    propertyType,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      mainImage
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        mainImage
      }
    },
    "imageUrl": mainImage.asset->url,
    images[] {
      caption,
      asset
    }

  }`;
  const property = await sanityClient.fetch(query);

  if (checkObj(property)) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        property,
      },
    };
  }
}

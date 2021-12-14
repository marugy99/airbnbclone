import { sanityClient } from "../../sanity";
import urlBuilder from "@sanity/image-url";
import { isPlural } from "../../utils";
import {
  BsFillStarFill,
  BsHouseDoor,
  BsStars,
  BsPinAngle,
  BsFillShareFill,
  BsHeart,
  BsTranslate,
} from "react-icons/bs";
import { SiGoogletranslate } from "react-icons/si";

const urlFor = (source) =>
  urlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  }).image(source);

const Property = (property) => {
  const singleProperty = property.property;
  const {
    title,
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

  // Get all the ratings and convert it to a number
  const ratings = reviews.map((review) => parseInt(review.rating.slice(0, 1)));

  return (
    <article className="container">
      <header className="property-header-container">
        <div className="text-sm">
          <h1 className="text-xl">{title}</h1>

          <div className="property-header">
            <span className="red-icon" aria-hidden="true">
              <BsFillStarFill />
            </span>
            <p>
              <strong>
                {ratings.reduce((a, b) => a + b, 0) / ratings.length}
              </strong>
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

      <section className="property-images-container">
        <img src={imageUrl} alt="Main property image" />
        <div className="property-images">
          {images.map((img, index) => (
            <img src={urlFor(img.asset)} alt={img.caption} key={index} />
          ))}
        </div>
      </section>

      <div className="property-details-container">
        <div>
          <section>
            <div className="property-details-header">
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
            </div>

            <hr />

            <div className="property-amenities">
              <span aria-hidden="true">
                <BsHouseDoor />
              </span>
              <div>
                <p className="text-medium">Entire home</p>
                <p className="text-base text-gray text-light">
                  You’ll have the {propertyType} to yourself.
                </p>
              </div>
            </div>

            <div className="property-amenities">
              <BsStars />
              <div>
                <p className="text-medium">Enhanced Clean</p>
                <p className="text-base text-gray text-light">
                  This Host committed to Airbnb's 5-step enhanced cleaning
                  process.
                </p>
              </div>
            </div>

            <div className="property-amenities">
              <BsPinAngle />
              <div>
                <p className="text-medium">Great location</p>
                <p className="text-base text-gray text-light">
                  100% of recent guests gave the location a 5-star rating.
                </p>
              </div>
            </div>
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
            <div className="flex-center">
              <p className="text-lg no-margin">
                ${pricePerNight}{" "}
                <span className="text-light text-medium">/ night</span>
              </p>
              <div className="flex-center text-sm">
                <span className="red-icon" aria-hidden="true">
                  <BsFillStarFill />
                </span>
                <p>
                  <strong>
                    {ratings.reduce((a, b) => a + b, 0) / ratings.length}
                  </strong>
                </p>
                <p className="reviews-count">
                  <strong>
                    ({reviews.length} review{isPlural(reviews.length)})
                  </strong>
                </p>
              </div>
            </div>

            <button className="check-avail">Check availability</button>
          </section>
        </div>
      </div>

      {/* <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p> */}

      {/* <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.rating}</p>
          <p>{review.reviewDescription}</p>
          <p>{review.traveller.name}</p>
          <img
            src={urlFor(review.traveller.mainImage.asset)}
            alt="User avatar"
          />
        </div>
      ))} */}
    </article>
  );
};

export default Property;

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const query = `*[ _type == "property" && slug.current == "${slug}" ][0]{
    title,
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

  if (!property) {
    return {
      props: {
        notFound: true,
      },
    };
  } else {
    return {
      props: {
        property,
      },
    };
  }
}

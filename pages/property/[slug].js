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
} from "react-icons/bs";

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

  console.log(ratings);

  return (
    <article className="container">
      <header className="property-header">
        <div className="text-sm">
          <h1 className="text-xl">{title}</h1>

          <p>
            <span aria-hidden="true">
              <BsFillStarFill />
            </span>
            {ratings.reduce((a, b) => a + b, 0) / ratings.length}
          </p>

          <p>
            {reviews.length} review{isPlural(reviews.length)}
          </p>
        </div>
        <div className="text-sm">
          <a href="#">
            <BsFillShareFill />
            Share
          </a>
          <a href="#">
            <BsHeart />
            Save
          </a>
        </div>
      </header>

      <section className="property-images">
        <img src={imageUrl} alt="Main property image" />
        {images.map((img, index) => (
          <img src={urlFor(img.asset)} alt={img.caption} key={index} />
        ))}
      </section>

      <div className="property-details">
        <div>
          <section>
            <div>
              <div>
                <p>
                  Entire {propertyType} hosted by {host.name}
                </p>
                <p>
                  {beds} Bed{isPlural(beds)}
                </p>
                <p>
                  {bedrooms} Bedroom{isPlural(bedrooms)}
                </p>
              </div>
              <img src={urlFor(host.mainImage.asset)} alt="Host avatar" />
            </div>

            <p>
              <BsHouseDoor />
              Entire home <br />
              <span>You’ll have the {propertyType} to yourself.</span>
            </p>
            <p>
              <BsStars />
              Enhanced Clean <br />
              <span>
                This Host committed to Airbnb's 5-step enhanced cleaning
                process.
              </span>
            </p>
            <p>
              <BsPinAngle />
              Great location <br />
              <span>
                100% of recent guests gave the location a 5-star rating.
              </span>
            </p>
          </section>

          <section>
            <p>{description}</p>
          </section>
        </div>

        <section>
          <p>${pricePerNight} / night</p>
          <button>Check availability</button>
        </section>
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

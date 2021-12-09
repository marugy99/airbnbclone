import { sanityClient } from "../../sanity";
import urlBuilder from "@sanity/image-url";
import { isPlural } from "../../utils";
import {
  BsFillStarFill,
  BsHouseDoor,
  BsStars,
  BsPinAngle,
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
    <article>
      <h1>Property</h1>
      <section>
        <h2>{title}</h2>
        <p>
          <span aria-hidden="true">
            <BsFillStarFill />
          </span>
          {ratings.reduce((a, b) => a + b, 0) / ratings.length}
        </p>
        <p>
          {reviews.length} review{isPlural(reviews.length)}
        </p>
        <p>{description}</p>
        <p>Host: {host.name}</p>
        <img src={urlFor(host.mainImage.asset)} alt="Host avatar" />
        <img src={imageUrl} alt="Main property image" />
        <p>
          {beds} Bed{isPlural(beds)}
        </p>
        <p>
          {bedrooms} Bedroom{isPlural(bedrooms)}
        </p>
        <p>{propertyType}</p>
        <p>${pricePerNight}</p>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lng}</p>
        {images.map((img, index) => (
          <div key={index}>
            <img src={urlFor(img.asset)} alt={img.caption} />
          </div>
        ))}
        <h2>Amenities</h2>
        <p>
          <BsHouseDoor />
          Entire home <br />
          <span>You’ll have the {propertyType} to yourself.</span>
        </p>
        <p>
          <BsStars />
          Enhanced Clean <br />
          <span>
            This Host committed to Airbnb's 5-step enhanced cleaning process.
          </span>
        </p>
        <p>
          <BsPinAngle />
          Great location <br />
          <span>100% of recent guests gave the location a 5-star rating.</span>
        </p>
        <h2>Reviews</h2>
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
        ))}
      </section>
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

import { sanityClient } from "../sanity";
import Link from "next/link";
import { BsFillStarFill } from "react-icons/bs";
import { getRatings, isPlural } from "../utils";
import DashboardMap from "../components/DashboardMap";

export default function Home({ properties }) {
  return (
    <>
      <div className="home-container">
        <div className="properties-list">
          <h1 className="text-sm">Airbnb Clone by Maru</h1>
          {properties.map((property, index) => (
            <Link href={`/property/${property.slug.current}`} key={index}>
              <a>
                <section className="property-tile">
                  <img src={property.imageUrl} alt="Main property image" />
                  <div>
                    <p className="text-sm">
                      Entire {property.propertyType} hosted by{" "}
                      {property.host.name}
                    </p>
                    <h2 className="text-medium">{property.title}</h2>
                    <p className="text-base">{property.description}</p>

                    <div className="property-tile-stats">
                      <div>
                        <span className="red-icon" aria-hidden="true">
                          <BsFillStarFill />
                        </span>
                        <span className="no-margin">
                          <strong>{getRatings(property.reviews)}</strong>
                        </span>
                        <span className="reviews-count">
                          ({property.reviews.length} review
                          {isPlural(property.reviews.length)})
                        </span>
                      </div>
                      <div>
                        <p className="price-per-night text-lg no-margin">
                          ${property.pricePerNight}{" "}
                          <span className="text-light text-medium">
                            / night
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </a>
            </Link>
          ))}
        </div>
        <div>
          <section className="map-container">
            <DashboardMap properties={properties} />
          </section>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const query = `*[ _type == "property" ]{
    title,
    location,
    slug,
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
  }`;
  const properties = await sanityClient.fetch(query);

  if (properties.length === 0) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
}

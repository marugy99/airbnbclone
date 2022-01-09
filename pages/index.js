import { sanityClient } from "../sanity";
import Link from "next/link";
import { BsFillStarFill } from "react-icons/bs";
import { getRatings, isPlural } from "../utils";
import DashboardMap from "../components/DashboardMap";
import QuickView from "../components/QuickView";
import { useState } from "react";

const Home = ({ properties }) => {
  const [modal, setModal] = useState(null);

  const openModal = (value) => {
    setModal(value);
  };

  const hideModal = () => {
    setModal(null);
  };

  return (
    <>
      <div className="home-container">
        <div className="properties-list">
          <h1 className="text-sm">
            Airbnb Clone by{" "}
            <a
              href="https://marucodes.com/"
              className="author-credit"
              target="_blank"
              rel="noreferrer"
            >
              Maru
            </a>
          </h1>
          {properties.map((property, index) => (
            <section className="property-tile" key={index}>
              <img src={property.imageUrl} alt="Main property image" />
              <div>
                <p className="text-sm">
                  Entire {property.propertyType} hosted by {property.host.name}
                </p>
                <Link href={`/property/${property.slug.current}`} key={index}>
                  <a>
                    <h2 className="text-medium">{property.title}</h2>
                  </a>
                </Link>
                <p className="text-base">{property.description}</p>

                <button
                  onClick={() => openModal(property.id)}
                  className="view-modal"
                >
                  Quick View
                </button>

                <QuickView
                  isOpen={modal === property.id}
                  closeModal={() => hideModal()}
                  name={property.title}
                  description={property.description}
                  mainImage={property.imageUrl}
                  images={property.images}
                />

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
                      <span className="text-light text-medium">/ night</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
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
};

export default Home;

export async function getServerSideProps() {
  const query = `*[ _type == "property" ]{
    title,
    location,
    slug,
    propertyType,
    pricePerNight,
    id,
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

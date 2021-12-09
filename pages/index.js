import { sanityClient } from "../sanity";
import Link from "next/link";

export default function Home({ properties }) {
  console.log(properties);
  return (
    <main>
      <h1>Airbnb Clone by Maru</h1>
      {properties.map((property) => (
        <Link href={`/property/${property.slug.current}`} key={property.id}>
          <a>
            <section>
              <h2>{property.title}</h2>
              <p>{property.description}</p>
            </section>
          </a>
        </Link>
      ))}
    </main>
  );
}
export async function getServerSideProps() {
  const query = '*[ _type == "property" ]';
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

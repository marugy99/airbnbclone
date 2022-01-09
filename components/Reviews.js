import { urlFor } from "../utils";

const Reviews = ({ data }) => {
  return (
    <>
      {data && (
        <article className="reviews">
          <h2>Reviews</h2>
          <div className="review-container">
            {data.map((review, index) => (
              <section key={index}>
                <header className="review-header">
                  <img
                    src={urlFor(review.traveller.mainImage.asset)}
                    alt="User avatar"
                  />
                  <div>
                    <p>
                      <strong>{review.traveller.name}</strong>
                    </p>
                    <p>{review.rating}</p>
                  </div>
                </header>
                <p>{review.reviewDescription}</p>
              </section>
            ))}
          </div>
        </article>
      )}
    </>
  );
};

export default Reviews;

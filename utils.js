import urlBuilder from "@sanity/image-url";

export const isPlural = (ele) => (ele > 1 ? "s" : "");

// URL builder for images array coming from studio
export const urlFor = (source) =>
  urlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  }).image(source);

export const getRatings = (reviews) => {
  if (reviews) {
    // Get all the ratings in a new array and convert each one to a number
    const ratings = reviews.map((review) =>
      parseInt(review.rating.slice(0, 1))
    );
    // Get ratings average
    const ratingsAvg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    // Return value
    return ratingsAvg;
  }
};

// Check if it's an object
export const checkObj = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

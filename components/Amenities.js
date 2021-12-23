import { BsHouseDoor, BsStars, BsPinAngle } from "react-icons/bs";

const Amenities = ({ propertyType }) => {
  return (
    <>
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
            This Host committed to Airbnb's 5-step enhanced cleaning process.
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
    </>
  );
};

export default Amenities;

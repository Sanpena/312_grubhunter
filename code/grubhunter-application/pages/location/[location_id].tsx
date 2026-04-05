import { GetServerSideProps } from "next";
import LocationDetails from "../../components/location-details";
import dbConnect from "../../middleware/mongodb";
import { findLocationsById } from "../../mongoose/locations/services";

const LocationPage = ({ location }: any) => {
  if (!location) return <p>Not found</p>;

    return (
    <>
        <h1>{location.name}</h1>
        <LocationDetails location={location} />
    </>
    );
};

export default LocationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { location_id } = context.params as any;
    await dbConnect();
    const locationArray = await findLocationsById([location_id]);
    const location = locationArray[0] || null;

    if (!location) {
        return { notFound: true };
    }

    return {
        props: {
        location: JSON.parse(JSON.stringify(location)),
        },
    };
};
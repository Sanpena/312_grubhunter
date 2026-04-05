import Head from "next/head";
import LocationsList from "../components/locations-list";
import dbConnect from "../middleware/mongodb";
import { findAllLocations } from "../mongoose/locations/services";

export async function getStaticProps() {
    await dbConnect();

    const locations = await findAllLocations();

    return {
        props: {
        locations: JSON.stringify(locations),
        },
    };
}

const HomePage = ({ locations }: any) => {
    const parsedLocations = JSON.parse(locations);

    return (
        <>
        <Head>
            <title>All Locations</title>
        </Head>

        <h1>All Locations</h1>

        <LocationsList locations={parsedLocations} />
        </>
    );
};

export default HomePage;
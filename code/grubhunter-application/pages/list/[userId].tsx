import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LocationsList from "../../components/locations-list";
import { LocationType } from "../../mongoose/locations/schema";
import dbConnect from "../../middleware/mongodb";
import { onUserWishlist } from "../../mongoose/locations/services";

interface WishListPageProps {
  data: {
    locations: string;
  };
  userId: string;
}

const WishListPage = ({ data, userId }: WishListPageProps) => {
  const { data: session } = useSession();
  const locations = JSON.parse(data.locations) as LocationType[];
  const isOwner = session?.user?.fdlst_private_userId === userId;
  const pageTitle = isOwner ? "Your Wish List" : "Wish List";

  return (
    <>
      <Head>
        <title>{pageTitle} | GrubHunter</title>
      </Head>
      <h1>{pageTitle}</h1>
      {isOwner && locations.length === 0 && (
        <p>You have no locations saved to your wish list yet.</p>
      )}
      <LocationsList locations={locations} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as { userId: string };

  try {
    await dbConnect();
    const locations = await onUserWishlist(userId);
    return {
      props: {
        data: { locations: JSON.stringify(locations) },
        userId,
      },
    };
  } catch (err) {
    return {
      props: {
        data: { locations: JSON.stringify([]) },
        userId,
      },
    };
  }
};

export default WishListPage;
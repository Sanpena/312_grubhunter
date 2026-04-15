import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../button";
import styles from "./index.module.css";

interface Props {
    location: any;
}

interface WishlistInterface {
    locationId: string;
    userId: string;
}

const LocationDetails = ({ location }: Props) => {
    const { data: session } = useSession();
    const [onWishlist, setOnWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = session?.user?.fdlst_private_userId;
        setOnWishlist(!!(userId && location?.on_wishlist?.includes(userId)));
    }, [session, location]);

    const wishlistAction = async ({ locationId, userId }: WishlistInterface) => {
        console.log("locationId:", locationId);
        console.log("userId:", userId);
        if (loading) return;
        setLoading(true);

    const action = onWishlist ? "removeWishlist" : "addWishlist";

    const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `
            mutation {
            ${action}(location_id: "${locationId}", user_id: "${userId}")
            }
            `   ,
            }),
        });

        console.log("response status:", response.status);
        const data = await response.json();
        console.log("response data:", JSON.stringify(data));

        if (response.ok) {
            setOnWishlist(!onWishlist);
        }

        setLoading(false);
    };

    if (!location) return <p>No data</p>;
    const userId = session?.user?.fdlst_private_userId;

    return (
        <>
        <ul className={styles.root}>
            <li>Address: {location.address}</li>
            <li>Zipcode: {location.zipcode}</li>
            <li>Borough: {location.borough}</li>
            <li>Cuisine: {location.cuisine}</li>
            <li>Grade: {location.grade}</li>
        </ul>
        {userId && (
        <Button
            variant={onWishlist ? "outline" : "blue"}
            disabled={loading}
            clickHandler={() =>
                wishlistAction({ locationId: location.location_id, userId })
            }
            >
            {onWishlist ? "Remove from your Wishlist" : "Add to your Wishlist"}
        </Button>
        )}
        </>
    );
};

export default LocationDetails;
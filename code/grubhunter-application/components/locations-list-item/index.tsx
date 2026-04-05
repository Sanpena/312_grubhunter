import Link from "next/link";
import styles from "./index.module.css";

interface Props {
    location: any;
}

const LocationsListItem = ({ location }: Props) => {
    return (
        <li className={styles.root}>
            <Link href={`/location/${location.location_id}`} style={{ display: "block", width: "100%" }}>
            <h2>{location.name}</h2>
            <small>{location.cuisine} · {location.borough}</small>
            </Link>
        </li>
    );
};

export default LocationsListItem;
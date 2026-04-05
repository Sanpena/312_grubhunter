interface Props {
    location: any;
}

const LocationDetails = ({ location }: Props) => {
    if (!location) return <p>No data</p>;

    return (
        <ul>
            <li>Address: {location.address}</li>
            <li>Zipcode: {location.zipcode}</li>
            <li>Borough: {location.borough}</li>
            <li>Cuisine: {location.cuisine}</li>
            <li>Grade: {location.grade}</li>
        </ul>
    );
};

export default LocationDetails;
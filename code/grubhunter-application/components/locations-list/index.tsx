import LocationsListItem from "../locations-list-item";

interface Props {
    locations: any[];
}

const LocationsList = ({ locations }: Props) => {
    return (
        <ul>
        {locations.map((loc) => (
            <LocationsListItem
            key={loc.location_id}
            location={loc}
            />
        ))}
        </ul>
    );
};

export default LocationsList;
import {useNavigate} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import styles from "./Map.module.css";
import {useCities} from "../contexts/CitiesProvider.jsx";
import Spinner from "./Spinner.jsx";
import Button from "./Button.jsx";
import {useUrlPosition} from "../../hooks/useUrlPosition.js";

function Map() {
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLat, mapLng] = useUrlPosition();

  // Function to fetch user location
  function fetchUserLocation() {
    setIsLoading(true);
    fetch("http://ip-api.com/json/")
        .then((res) => res.json())
        .then((data) => {
          setMapPosition([data?.lat, data?.lon]);
        })
        .catch(() => alert("Cannot fetch current user location."))
        .finally(() => setIsLoading(false));
  }

  // Call fetchUserLocation when the component mounts
  useEffect(fetchUserLocation, []);

  useEffect(() => {
    if (mapLng && mapLat) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
      <div className={styles.mapContainer}>
        {isLoading ? (
            <Spinner/>
        ) : (
            <>
              <Button type="position" onClick={fetchUserLocation}>
                Use your position
              </Button>
              <MapContainer className={styles.map} center={mapPosition} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker key={city.id} position={[city.position?.lat, city.position?.lng]}>
                      <Popup>
                        <span>{city.emoji}</span> <span>{city.cityName}</span>
                      </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
              </MapContainer>
            </>
        )}
      </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;

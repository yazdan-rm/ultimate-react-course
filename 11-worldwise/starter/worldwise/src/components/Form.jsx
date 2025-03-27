import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {useUrlPosition} from "../../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import {useCities} from "../contexts/CitiesProvider.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127462 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://nominatim.openstreetmap.org/reverse`;

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const {createCity, isLoading} = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchData() {
      try {
        setIsLoadingGeocoding(true);
        setError("");
        const res = await fetch(`${BASE_URL}?format=json&lat=${lat}&lon=${lng}&accept-language=local`);
        const data = await res.json();

        if (!data.address.city) throw new Error("City is not detect");
        if (data.error) throw new Error("That doesn't seem to be a city. Click somewhere else 😊");

        setCityName(data.address.city || "");
        setCountry(data.address.country || "");
        setEmoji(data.address.country_code.toUpperCase() || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng}
    }

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner/>;

  if (!lat && !lng) return <Message message={"Start by clicking somewhere on the map"}/>;

  if (error) return <Message message={error}/>;
  return (
      <form className={`${styles.form} ${isLoading && styles.loading}`} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <DatePicker
              id={"date"}
              selected={date}
              dateFormat={"dd/MM/yyyy"}
              onChange={date => setDate(date)}/>
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type={'primary'}>Add</Button>
          <Button type={'back'} onClick={(e) => {
            e.preventDefault();
            navigate(-1)
          }}>&larr; Back</Button>
        </div>
      </form>
  );
}

export default Form;

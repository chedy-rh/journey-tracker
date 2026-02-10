 /* eslint-disable @typescript-eslint/ban-ts-comment */

import { SyntheticEvent, useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button.tsx";
import BackButton from "../BackButton.tsx";
import useUrlPosition from "../../hooks/useUrlPosition.ts";
import Message from "../Message/Message.tsx";
import Spinner from "../Spinner/Spinner.tsx";
//@ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 import { useCities } from "../../contexts/CitiesContext.tsx";
 import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode: any) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<any>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [isGeoCodingLoading, setIsGeoCodingLoading] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("");
  const [geoCodingError, setGeocodingError] = useState<string>("");

  const [lat, lng] = useUrlPosition();

  useEffect(() => {

    if(!lat && !lng) return;

    async function fetchCityData() {
      try {
        setGeocodingError("");
        setIsGeoCodingLoading(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        const data = await response.json();

        if (!data.countryCode) {
          throw new Error("No city found for that area. Click elsewhere 😁");
        }

        setCityName(data?.city || data?.locality);
        setCountry(data?.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err: any) {
        console.log(err);
        setGeocodingError(err.message);
      } finally {
        setIsGeoCodingLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isGeoCodingLoading) return <Spinner />;

  if (!lat && !lng) return <Message message={"Start by clicking somewhere on the map!!"} />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
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
          id="date"
          onChange={(date:any) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
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
        <Button type="primary" onClick={handleSubmit}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

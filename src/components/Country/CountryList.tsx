import styles from "./CountryList.module.css";
import { City, Country } from "../../types";
import Spinner from "../Spinner/Spinner.tsx";
import CountryItem from "./CountryItem/CountryItem.tsx";
import Message from "../Message/Message.tsx";
import { useCities } from "../../contexts/CitiesContext.tsx";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <Message message="No cities found. Add your first city using the map !!" />
    );
  }
  const countries: Country[] = cities.reduce((arr:any, city:City) => {
    if (!arr.map((el:City) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country: Country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

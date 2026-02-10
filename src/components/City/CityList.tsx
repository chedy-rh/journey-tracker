import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner.tsx";
import CityItem from "./CityItem/CityItem.tsx";
import Message from "../Message/Message.tsx";
import { useCities } from "../../contexts/CitiesContext.tsx";

export default function CityList() {
 const {cities , isLoading} =useCities()
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <Message message="No cities found. Add your first city using the map !!" />
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

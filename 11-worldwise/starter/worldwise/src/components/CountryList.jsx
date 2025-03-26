import styles from './CountryList.module.css'
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";

function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner/>;

  if (!cities.length) return (<Message message={'No countries found.'}/>)

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(el => el.country).includes(city.country)) return [...arr, {
      country: city.country,
      emoji: city.emoji
    }]; else return arr;
  }, [])

  return (<ul className={styles.countryList}>
    {countries.map((country) => (<CountryItem key={country.id} country={country}/>))}
  </ul>);
}

export default CountryList;
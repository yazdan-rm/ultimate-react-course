import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // get all cities on mount
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(() => alert('There was an error loading data...'))
        .finally(() => setIsLoading(false));
  }, []);

  // get city by id
  async function getCity(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data)
    } catch {
      alert('There was an error fetching data...')
    } finally {
      setIsLoading(false);
    }
  }

  // create city
  async function createCity(newCity) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();

      setCities(cities => [...cities, data]);
    } catch {
      alert('There was an error creating data...')
    } finally {
      setIsLoading(false);
    }
  }

  // delete city
  async function deleteCity(id) {
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {method: 'DELETE'});
      setCities(cities => cities.filter((c) => c.id !== id));
    } catch {
      alert('There was an error deleting data...')
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <CitiesContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
        {children}
      </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("useCities must be used within CitiesProvider");
  return context;
}

export {CitiesProvider, useCities};
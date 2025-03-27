import {createContext, useContext, useEffect, useReducer} from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {...state, isLoading: true};
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function CitiesProvider({children}) {
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

  // get all cities on mount
  useEffect(() => {
    dispatch({type: "loading"});
    fetch(`${BASE_URL}/cities`)
        .then(res => res.json())
        .then(data => dispatch({type: "cities/loaded", payload: data}))
        .catch(() => dispatch({type: "rejected", payload: 'There was an error loading data...'}));
  }, []);

  // get city by id
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: "city/loaded", payload: data});
    } catch {
      dispatch({type: "rejected", payload: 'There was an error fetching data...'});
    }
  }

  // create city
  async function createCity(newCity) {
    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      dispatch({type: "cities/created", payload: data});
    } catch {
      dispatch({type: "rejected", payload: 'There was an error creating data...'});
    }
  }

  // delete city
  async function deleteCity(id) {
    dispatch({type: "loading"});
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {method: 'DELETE'});
      dispatch({type: "cities/deleted", payload: id});
    } catch {
      dispatch({type: "rejected", payload: 'There was an error deleting data...'});
    }
  }

  return (
      <CitiesContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        error,
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
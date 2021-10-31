import { useEffect, useRef, useState } from 'react';
import Header from './components/header/Header';
import { cities } from './data/countries';
import './App.css';
const cityTimezones = require('city-timezones');

function App() {

  const [time, setTime] = useState();
  const [timeTouched, setTimeTouched] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [cityFocused, setCityFocused] = useState(false);
  const cityRef = useRef();

  useEffect(() => {
    setAvailableCities(cities);
  }, []);

  const addCity = () => {

    if (!time) {
      setTimeTouched(true);
      return;
    }
    const city = cityRef.current.value;
    // cityTimeZones -  looking up timezones
    const cityLookup = cityTimezones.lookupViaCity(city);

    if (cityLookup.length) {
      setSelectedCities([...selectedCities, { name: city, timezone: cityLookup[0].timezone }]);
      cityRef.current.value = '';
      setAvailableCities(availableCities.filter(item => item !== city));
    }
  }

  const deleteCity = (city) => {
    setSelectedCities(selectedCities.filter(item => item.name !== city));
    setAvailableCities([...availableCities, city]);
  }

  const citySelected = (city) => {
    cityRef.current.value = city;
    setCityFocused(false);
  }

  // Calculates time from given timezone
  const timeOfCity = (tz) => {
    const d = new Date();
    const enteredTime = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + time);
    return enteredTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: tz });
  }

  const filterCities = (val) => {
    const tempCities = cities.filter(city => selectedCities.map(item => item.name).indexOf(city) === -1);
    setAvailableCities(tempCities.filter(city => city.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) !== -1));
  }

  return (
    <div className="App">
      <Header />
      <section className="content">
        <div className="form-input">
          <label>Enter Time : </label>
          <input type="time" placeholder="--:--" onChange={(e) => setTime(e.target.value)} onBlur={() => setTimeTouched(true)} />
          <span className="err" hidden={time || !timeTouched}>Enter valid time</span>
        </div>

        <table className="city-tbl">
          <thead>
            <tr>
              <td>City</td>
              <td>Time</td>
              <td>TimeZone</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {selectedCities.map((city, index) => (
              <tr key={index}>
                <td>{city.name}</td>
                <td>{timeOfCity(city.timezone)}</td>
                <td>{city.timezone}</td>
                <td><img src="assets/images/delete.svg" alt="delete" onClick={() => deleteCity(city.name)} /></td>
              </tr>
            ))
            }
          </tbody>
        </table>

        {!selectedCities.length && <div className="no-city">No city is selected</div>}

        <div className="form-input add-city">
          <input type="text" placeholder="Select City" ref={cityRef}
            onChange={(e) => filterCities(e.target.value)}
            onFocus={() => setCityFocused(true)}
            onBlur={() => setCityFocused(false)} />

          {cityFocused && <div className="city-select-list">
            {availableCities.map((city, index) => (<span key={index} onMouseDown={() => citySelected(city)}>{city}</span>))}
          </div>
          }
          <button onClick={addCity}>Add</button>
        </div>
      </section>
    </div>
  );
}

export default App;

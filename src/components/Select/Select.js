import { useEffect, useRef, useState } from "react";
import "./Select.css";


function Select({ items, selected }) {

    const [availableCities, setAvailableCities] = useState([]);
    const [cityFocused, setCityFocused] = useState(false);
    const cityRef = useRef();

    useEffect(() => {
        console.log(items);
        setAvailableCities(items);
    }, []);

    const filterCities = (val) => {
        const tempCities = items.filter(city => items.indexOf(city) === -1);
        setAvailableCities(tempCities.filter(city => city.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) !== -1));
    }

    const citySelected = (city) => {
        cityRef.current.value = city;
        setCityFocused(false);
        selected(city);
    }

    return <div className="select-content">
        <input type="text" placeholder="Select City" ref={cityRef}
            onChange={(e) => filterCities(e.target.value)}
            onFocus={() => setCityFocused(true)}
            onBlur={() => setCityFocused(false)} />

        {cityFocused && <div className="city-select-list">
            {availableCities.map((city, index) => (<span key={index} onMouseDown={() => citySelected(city)}>{city}</span>))}
        </div>
        }
    </div>

}

export default Select;
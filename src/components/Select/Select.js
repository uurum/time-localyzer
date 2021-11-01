import { useEffect, useRef, useState } from "react";
import "./Select.css";


function Select({ items, selected, placeholder }) {

    const [availableItems, setAvailableItems] = useState([]);
    const [defaultItems, setDefaultItems] = useState([]);
    const [itemFocused, setItemFocused] = useState(false);
    const itemRef = useRef();

    useEffect(() => {
        setAvailableItems(items);
        setDefaultItems(items);
        itemRef.current.value = '';
    }, [items]);

    const filterItems = (val) => {
        const filtered = defaultItems.filter(item => item.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) !== -1);
        setAvailableItems(filtered);
        if(filtered.length === 1 && val.toLocaleLowerCase() === filtered[0].toLocaleLowerCase()) {
            itemSelected(val);
        }
    }

    const itemSelected = (city) => {
        itemRef.current.value = city;
        setItemFocused(false);
        selected(city);
    }

    return <div className="select-content">
        <input type="text" placeholder={placeholder} ref={itemRef}
            onChange={(e) => filterItems(e.target.value)}
            onFocus={() => setItemFocused(true)}
            onBlur={() => setItemFocused(false)} />

        {itemFocused && <div className="item-select-list">
            {availableItems.map((city, index) => (<span key={index} onMouseDown={() => itemSelected(city)}>{city}</span>))}
        </div>
        }
    </div>

}

export default Select;
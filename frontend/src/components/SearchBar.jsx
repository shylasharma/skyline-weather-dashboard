import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { searchCities } from "../services/weatherService";

function SearchBar({
  city,
  setCity,
  handleSearch,
}) {

  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  // Search while typing
  useEffect(() => {

    const timer = setTimeout(async () => {

      if (city.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await searchCities(city);

      setSuggestions(results);

    }, 300);

    return () => clearTimeout(timer);

  }, [city]);

  // Hide dropdown when clicking outside
  useEffect(() => {

    function handleClickOutside(event) {

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  return (
    <div
  className={`search-wrapper ${suggestions.length ? "has-suggestions" : ""}`}
  ref={wrapperRef}
>

      <div className="search">

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSearch(city);

              setSuggestions([]);

            }

          }}
        />

        <button
          onClick={() => {
            handleSearch(city);
            setSuggestions([]);
          }}
        >
          <FiSearch />
        </button>

      </div>

      {suggestions.length > 0 && (

        <div className="suggestions">

          {suggestions.map((item) => (

            <div
              key={`${item.id}-${item.name}`}
              className="suggestion-item"
              onClick={() => {

                setCity(item.name);

                handleSearch(item.name);

                setSuggestions([]);

              }}
            >

              <FiMapPin />

              <div>

                <strong>{item.name}</strong>

                <p>
                  {item.country}
                  {item.admin1 ? `, ${item.admin1}` : ""}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SearchBar;
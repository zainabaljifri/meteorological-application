import React , { useState, useEffect }from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Search(props) {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch('http://localhost:8000/api/cities/' )
      .then((response) =>(response.json()))
      .then((data) => {setCities(data)
        console.log(cities);})
  }, []);
  var cityJson = []

  cities.map(function(c) {
        cityJson.push({
            "id" : c.id,
            "name"  : `${c.name_ar} - ${c.name_en} (${c.center_lat}, ${c.center_lon})`
        });
    })

  const handleOnSearch = (string, results) => {
    string==''?setQuery(''):console.log(string);;
    console.log(cities[0]);
    console.log(string, results)
  }
  const handleOnClear = () => {
    setQuery("");
  };

  const handleOnSelect = (city) => {
    setQuery(city.name)
    console.log(city)
  }
  const handleOnclick = () => {
    props.onClick(query);
    setQuery("");
  }

  const formatResult = (city) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{city.name}</span>
      </>
    )
  }

  return (
    <>
      <div className="input-group">
        <div style={{ width: 500 }}>
          <ReactSearchAutocomplete
            items={cityJson}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            inputSearchString={query}
            onClear={handleOnClear}
            formatResult={formatResult}
          />
        </div>
        <button autoFocus className="button" id="clear-btn" onClick={handleOnclick} hidden={(query == '') ? 'hidden' : ''}><i className="fa-solid fa-plus"></i></button>

      </div>
      </>
  )
}

export default Search;
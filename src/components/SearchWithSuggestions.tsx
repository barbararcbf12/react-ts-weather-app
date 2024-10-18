import React, { memo } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";

const PUBLIC_KEY = process.env.REACT_APP_MAPBOX_PUBLIC_KEY;

function SearchWithSuggestions({ onChange }: any) {

  return (
    <MapboxAutocomplete
      placeholder="Search City or Zip Code"
      publicKey={ PUBLIC_KEY }
      inputClass='w-full m-0'
      onSuggestionSelect={ onChange }
      resetSearch={ true }
    />
  )
};

export default memo(SearchWithSuggestions);
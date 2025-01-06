import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const LocationSearch = ({ updateValue }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    handleSearch('a')
  }, [])

  const handleSearch = async (value) => {
    if (!value) {
      setLocations([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('https://open.oapi.vn/location/provinces', {
        params: {
          page: 0,
          size: 30,
          query: value, 
        },
      });

      setLocations(response.data.data || []);
    } catch (error) {
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setSelectedLocation(value || null);
    updateValue(value)
  };

  return (
    <Select
      showSearch
      placeholder="Select a location"
      value={selectedLocation}
      onChange={handleChange}
      onSearch={handleSearch}
      loading={loading}
      style={{ width: '100%' }}
      allowClear 
      options={locations.map((location) => ({
        value: location.name,
        label: location.name,
      }))}
    />
  );
};

export default LocationSearch;

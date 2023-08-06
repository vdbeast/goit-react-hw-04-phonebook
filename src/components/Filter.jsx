import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  }
  
  return (
    <label className="label">
      Find contacts by name
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
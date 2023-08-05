import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <label className="label">
      Find contacts by name
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
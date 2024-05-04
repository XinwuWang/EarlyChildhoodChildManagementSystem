
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

const TMealDetail = ({ id, date, morning_tea, lunch, afternoon_tea }) => {
    const location = useLocation();
    const { id, date, morning_tea, lunch, afternoon_tea } = location.state || {}; // Default to an empty object if location.state is null
    console.log(id);

    return (
        <div>
            <h2>Meal Detail</h2>
            <div>ID: {id}</div>
            <div>Date: {date}</div>
            <div>Morning Tea: {morning_tea}</div>
            <div>Lunch: {lunch}</div>
            <div>Afternoon Tea: {afternoon_tea}</div>
        </div>
    );
}

TMealDetail.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    morning_tea: PropTypes.string.isRequired,
    lunch: PropTypes.string.isRequired,
    afternoon_tea: PropTypes.string.isRequired,
};

export default TMealDetail
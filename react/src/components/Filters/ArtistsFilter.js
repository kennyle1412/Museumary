/*
    --ArtistsFilter.js--
        Filter Artists through its unique attributes.

    State:
        Stateless Component

    Props / Attributes:
        culture -- what is the artist's culture
        handleChange -- callback function to masterfilter to change state
*/

import React from 'react';
import BaseFilter from './BaseFilter'

const ArtistFilter = ({ culture, handleChange }) => {
    return (
        <span>
            <strong> Culture: </strong>
            <input
                type="text"
                name="culture"
                value={culture}
                onChange={handleChange}
            />
        </span>
    );
}

// Export the filter enhanced by the BaseFilter
export default BaseFilter(ArtistFilter);
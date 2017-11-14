/*
    -- VenuesFilter.js --
        Filter Venues through its unique attributes.

    State:
        Stateless Component

    Props / Attributes:
        country -- which country is the venue in
        handleChange -- callback function to masterfilter to change state
*/

import React from 'react';
import SelectFilter from './SelectFilter';
import BaseFilter from './BaseFilter'

/*
    Define a Country list with its corresponding value
        key -- will be sent to the query
        value -- will show up on the UI

        NOTE: a 'None' key returns defaults to everything in the api
*/

const COUNTRY_LIST = {
    'None': 'All',
    'USA': 'USA',
    'Finland': 'Finland',
    'New Zealand': 'New Zealand'
}

const VenuesFilter = ({ country, handleChange }) => {
    return (
        <span>
            <strong> Country: </strong>
            <SelectFilter
                name='country'
                value={country}
                attributes={COUNTRY_LIST}
                handleChange={handleChange} />
        </span>
    );
}

// Export the filter enhanced by the BaseFilter
export default BaseFilter(VenuesFilter);
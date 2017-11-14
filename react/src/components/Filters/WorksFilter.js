/*
    -- WorksFilter.js --
        Filter Works through its unique attributes.

    State:
        Stateless Component

    Props / Attributes:
        venue -- which venue is the work in
        medium -- what medium is the work
        art_type -- what art type is the work
        handleChange -- callback function to masterfilter to change state
*/

import React from 'react';
import SelectFilter from './SelectFilter';
import BaseFilter from './BaseFilter'

/*
    Define a Venues list with its corresponding value
        key -- will be sent to the query
        value -- will show up on the UI

    NOTE: a 'None' key returns defaults to everything in the api
*/

const VENUES_LIST = {
    'None': 'All',
    'Harvard Art Museum': 'Harvard',
    'The Walters Art Museum': 'Walters',
    'Auckland Museum': 'Auckland',
    'Cooper Hewitt, Smithsonian Design Museum': 'Cooper',
    'Finnish National Gallery': 'Finnish'
}

const WorksFilter = ({ art_type, medium, venue, handleChange }) => {
    return (
        <span>
            <strong> Art Type: </strong>
            <input                                      // art_type
                type='text'
                name='art_type'
                value={art_type}
                onChange={handleChange}
            />
            &nbsp;&nbsp;
            <strong> Medium: </strong>
            <input                                      // medium
                type='text'
                name='medium'
                value={medium}
                onChange={handleChange}
            />
            &nbsp;&nbsp;
            <strong> Venue: </strong>
            <SelectFilter                               // venue
                name='venue'
                value={venue}
                attributes={VENUES_LIST}
                handleChange={handleChange} />
            &nbsp;&nbsp;
        </span>
    );
}

// Export the filter enhanced by the BaseFilter
export default BaseFilter(WorksFilter);
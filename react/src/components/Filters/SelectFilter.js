/*
    -- SelectFilter.js --
    Filter based on selected attribute.
        attributes -- in the specific model's full page.
        alphabet -- startswith option - filter by first letter
*/

import React from 'react';

/*
    Define the alphabet if the filter is a startswith component
        key -- will be sent to the query
        value -- will show up on the UI

    NOTE: a 'None' key returns defaults to everything in the api
*/

const ALPHABET = {
    'None': 'All', 'A':'A', 'B':'B',
    'C':'C', 'D':'D', 'E':'E', 'F':'F',
    'G':'G', 'H':'H', 'I':'I', 'J':'J',
    'K':'K', 'L':'L', 'M':'M', 'N':'N',
    'O':'O', 'P':'P', 'Q':'Q', 'R':'R',
    'S':'S', 'T':'T', 'U':'U', 'V':'V',
    'W':'W', 'X':'X', 'Y':'Y', 'Z':'Z'
}

/* Create options based on set attributes */
const OptionList = ({ attributes }) => {
    return Object.keys(attributes).map(attr =>
        <option value={attr} key={attr}>{attributes[attr]}</option>
    );
}

const OrderByFilter = ({ name, value, attributes, handleChange }) => {
    attributes = name === 'startswith' ? ALPHABET : attributes;

    return (
        <select
            name={name}
            value={value}
            onChange={handleChange}>
            <OptionList attributes={attributes} />
        </select>
    );
}

export default OrderByFilter;
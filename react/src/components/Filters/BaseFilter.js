/*
    --BaseFilter.js--
    Higher order component that acts as an enhancer for the model filters
        ArtistsFilter
        WorksFilter
        VenuesFilter
        TypesFilter

    Contains all the default buttons / options for filtering.

    State:
        Sateless component that recieves its props from masterfilter

    Props:
        startswith -- alphabetical filter option
        order_by -- filter by the model's attributes
        order -- ascending or descending order
        attributes -- the attributes of each model that can be filtered
        handleChange -- callback function that tells the masterfilter something changed
        applyFilter -- callback function that signals the masterfilter to change the FullPage state

        NOTE:
        Also contains the unique attirbutes of the specific model. Look at the
        Specific Filter page to see what they are.
*/

import React from 'react';
import SelectFilter from './SelectFilter';

/* Create the base filter. Keep props packed to pass into individual filter. */
const BaseFilter = WrappedFilter => ({ ...props }) => {
    const {
        startswith,
        order_by,
        order,
        attributes,
        handleChange,
        applyFilter
    } = props;

    return (
        <div className='container'>
            <div align='middle'>
                <strong> Starts With: </strong>
                <SelectFilter                       // startswith
                    name='startswith'
                    value={startswith}
                    handleChange={handleChange}/>
                &nbsp;&nbsp;
                <WrappedFilter                      // WrappedFilter
                    {...props}/>
                 &nbsp;&nbsp;
                <strong> Order By: </strong>
                <SelectFilter                       // order_by
                    name='order_by'
                    value={order_by}
                    attributes={attributes}
                    handleChange={handleChange}/>
                &nbsp;&nbsp;
                <strong> Order: </strong>
                <select                             // order
                    name='order'
                    value={order}
                    onChange={handleChange}>
                    <option value='ascending'> Ascending </option>
                    <option value='descending'> Descending </option>
                </select>
            </div>
            <br/>
            <div>
                <button                             // apply
                    type='button'
                    name='Apply'
                    onClick={applyFilter}>
                    Apply Filter
                </button>
                <button                             // applyReset
                    type='button'
                    name='Reset'
                    onClick={applyFilter}>
                    Reset
                </button>
            </div>
            <br/>
        </div>
    );
}

export default BaseFilter;



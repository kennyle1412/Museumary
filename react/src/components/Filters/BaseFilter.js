/*
    MasterFilter higher order component that wraps the other filters
        artists
        works
        venues
        types

    Contains all the default buttons / options for filtering.
        startswith -- alphabetical filter option
        order_by -- filter by the model's attributes
        order -- ascending or descending order
        apply -- signal that there is a need to apply the filter
        reset -- signal that things need to be reset back to default parameters

    State:
        The state of component is determined by the passed default parameters
        and determines what needs to be filtered

    Props:
        defaultParams -- the default parameters given by the model's FullPage
        applyFilter -- the callback function that allows the filter to change the FullPage state
        attributes -- the attributes of each model that can be filtered
*/

import React from 'react';
import SelectFilter from './SelectFilter';

function BaseFilter(WrappedFilter) {
    return function BaseFilterClass ({ ...state }, { ...props }) {
        const {
            startswith,
            order_by,
            order,
            attributes,
            handleChange,
            applyFilter
        } = props

        return (
            <div className="container">
                <div align="middle">
                    <strong> Starts With: </strong>
                    <SelectFilter
                        name="startswith"
                        value={startswith}
                        handleChange={handleChange} />
                    &nbsp;&nbsp;
                    <WrappedFilter
                        {...state}
                        attributes={attributes}
                        handleChange={handleChange}
                    />
                     &nbsp;&nbsp;
                    <strong> Order By: </strong>
                    <SelectFilter
                        name="order_by"
                        value={order_by}
                        attributes={attributes}
                        handleChange={handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order: </strong>
                    <select
                        name="order"
                        value={order}
                        onChange={handleChange}>
                        <option value="ascending"> Ascending </option>
                        <option value="descending"> Descending </option>
                    </select>
                </div>
                <br/>
                <div>
                    <button
                        type="button"
                        name="Apply"
                        onClick={applyFilter} >
                        Apply Filter
                    </button>
                    <button
                        type="button"
                        name="Reset"
                        onClick={applyFilter} >
                        Reset
                    </button>
                </div>
                <br/>
            </div>
        );
    }
}

export default BaseFilter;



/*
    -- MasterFilter.js --
    Higher order component that wraps the other filters and handles the
        parameters that determines what needs to be filtered.

    State:
        The default state of the component is determined by the
            default parameters and used to reset the filter. After the inital
            set the state is controlled by its child filters

    Props:
        defaultParams -- the default parameters given by the model's FullPage
        applyFilter   -- the callback function that changes the FullPage state
        handleChange  -- the function that changes state based on actions of the
                         base filters

    Inspiration from:
        https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
        https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
*/

import React, { Component } from 'react';

var MasterFilter = WrappedFilter => class extends Component {
        /*
            constructor
                sets state to default parameters
                binds the functions -- applyFilter and handleChange
        */
        constructor(props) {
            super(props);
            this.state = props.defaultParams;

            // group bound functions to pass in as props easier
            this.bindFunctions = {
                applyFilter: this.applyFilter.bind(this),
                handleChange: this.handleChange.bind(this)
            }
        }

        /* Calls applyFilter from FullPage with the new parameters */
        applyFilter(event) {
            // set to the default parameters if reset action
            // setState is not guaranteed to immediately execute so we don't
            // use this.state right after - unless in callback function
            if(event.target.name === "Reset") {
                this.setState(this.props.defaultParams);
                this.props.applyFilter(this.props.defaultParams);
            }
            else {
                this.props.applyFilter(this.state);
            }
        }

        /* Handles state changes when there is a new value */
        handleChange(event) {
            this.setState({ [event.target.name]: event.target.value });
        }

        /*
            Combines state, props, and bindedFunctions and passes everything to
                the wrapped filter.
        */
        render() {
            const props = {...this.state, ...this.props, ...this.bindFunctions};

            return <WrappedFilter {...props} />;
        }
}

export default MasterFilter;


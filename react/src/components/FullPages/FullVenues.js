import React from 'react';
import Thumbnail from 'components/Thumbnail'

import { Link } from 'react-router-dom';
import { VenuesPage } from 'components/Pages'
import { VenuesFilter } from 'components/Filters'

import 'components/Full.css';

const defaultProps = {
    defaultParams: {
        order_by: "name",
        order: "ascending",
        startswith: "",
        country: ""
    },

    attributes: {
        name: "Name",
        country: "Country",
        city: "City",
        street: "Street"
    }
}

class FullVenues extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            params: props.defaultParams
        };

        this.changePage = this.changePage.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    changePage(pageNumber) {
        let params = Object.assign({}, this.state.params);
        params.page = pageNumber;

        this.setState({ params: params });
    }

    applyFilter(newParams) {
        this.setState({ params: newParams })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const params = this.state.params;
        const newParams = nextState.params;

        for(var param in params) {
            if(params[param] !== newParams[param]) {
                return true;
            }
        }

        return false;
    }

    render() {
            return (
                <div className="FullVenues">
                    <VenuesFilter
                        {...this.props}
                        applyFilter={this.applyFilter}
                    />
                    <VenuesPage
                        params={this.state.params}
                        changePage={this.changePage}
                    />
                </div>
            );
    }
}

FullVenues.defaultProps = defaultProps;

export default FullVenues;

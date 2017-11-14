import React from 'react';

import Page from 'components/Page'
import Thumbnail from 'components/Thumbnail'
import Pagination from 'components/Pagination'

import Harvard from 'static/images/Harvard.jpg';
import Cooper from 'static/images/Cooper.jpg';
import Auckland from 'static/images/Auckland.jpg';
import Finnish from 'static/images/Finnish.jpg';
import Walters from 'static/images/Walters.jpg';

import { VenuesFilter } from 'components/Filters'

import 'components/Full.css';

const MUSEUMS = [Harvard, Walters, Auckland, Cooper, Finnish]

const defaultProps = {
    defaultParams: {
        page: 1,
        entries_per_page: 16,
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
    },

    base_url: 'http://api.museumary.me/venue?',
    instance_url: '/venues/'
}

class FullVenues extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            info: {},
            items: [],
            params: props.defaultParams,
            numPages: 0
        };

        this.changePage = this.changePage.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    changePage(pageNumber) {
        if(pageNumber !== this.state.params.page) {
            let params = Object.assign({}, this.state.params);
            params.page = pageNumber;

            this.loadPage(params)
        }
    }

    applyFilter(newParams) {
        let _newParams = {}; // Object.assign({}, this.props.defaultParams)
        const currParams = this.state.params;

        for(const key in this.props.defaultParams) {
            if(!newParams.hasOwnProperty(key))
                continue;

            let val = newParams[key].toString();
            if(val && val.toLowerCase() !== 'none' && currParams[key] !== val) {
                _newParams[key] = val;
            }
        }

        if(_newParams) {
            _newParams = Object.assign({}, this.props.defaultParams, _newParams)
            this.loadPage(_newParams)
        }
    }

     componentDidMount() {
        /* change for dynamic loading */

        this.loadPage(this.props.defaultParams)
    }

    componentWillReceiveProps(nextProps) {
        const params = this.props.params
        const nextParams = nextProps.params

        for(const key in params) {
            if(params[key] !== nextParams[key]) {
                return this.loadPage(nextParams)
            }
        }
    }

    loadPage(params) {
        let _newParams = Object.assign({}, this.props.defaultParams, params)

        let arr = []
        for(const key in _newParams) {
            arr.push(key+'='+_newParams[key])
        }

        fetch(this.props.base_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                this.loadItems(items.objects, items.info.num_pages)
            })
    }

    loadItems(items, numPages) {
        const instance_url = this.props.instance_url;

        const parsedItems = items.map(item => {
            item.url = instance_url + item.id;
            item.image_url = MUSEUMS[item.id-1]
            item.type = "venue"
            item.description_id = item.id

            return item;
        })

        this.setState({ items: parsedItems, numPages: numPages })
    }

    render() {
        return (
            <div className="FullVenues">
                <VenuesFilter
                    {...this.props}
                    applyFilter={this.applyFilter}
                />
                <Page items={this.state.items} />
                <Pagination
                    page={this.state.params.page}
                    numPages={this.state.numPages}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

FullVenues.defaultProps = defaultProps;

export default FullVenues;

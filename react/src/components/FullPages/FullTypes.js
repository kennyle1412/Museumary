
import React from 'react';

import Page from 'components/Page'
import Pagination from 'components/Pagination';

import { TypesFilter } from 'components/Filters';

const defaultProps = {
    defaultParams: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        medium: ""
    },

    attributes: {
        name: "Name"
    },

    work_url: 'http://api.museumary.me/work/',

    base_url: 'http://api.museumary.me/art_type?',
    instance_url: '/types/'
}

class FullTypes extends React.Component {
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
            if(newParams.hasOwnProperty(key) && currParams[key] !== newParams[key]) {
                _newParams[key] = newParams[key];
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
        let arr = []
        for(const key in params) {
            arr.push(key+'='+params[key])
        }

        fetch(this.props.base_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                this.loadItems(items.objects, items.info.num_pages, params)
            })
    }

    loadItems(items, numPages, params) {
        const instance_url = this.props.instance_url;

        Promise.all(items.map((artType) => {
            const work_ids = artType.work_ids;
            const id = work_ids[Math.floor(Math.random()*work_ids.length)];

            return fetch(this.props.work_url+id)
        }))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(works => {
            const parsedItems = works.map((work, index) => {
                let type = items[index]

                type.url = instance_url + type.id;
                type.image_url = work.image_url;

                const works_count = type.work_ids.length
                const artists_count = type.artist_ids.length
                const medium_count = type.medium_ids.length

                type.details = ["Artists: " + artists_count, "Works: " + works_count, "Mediums: " + medium_count]

                return type;
            })

            this.setState({ items: parsedItems, numPages: numPages, params: params })
        })
    }

    render() {
        return (
            <div className="FullTypes">
                <TypesFilter
                    {...this.props}
                    applyFilter={this.applyFilter}
                />
                <Page items={this.state.items} />
                <br/>
                 <Pagination
                    page={this.state.params.page}
                    numPages={this.state.numPages}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

FullTypes.defaultProps = defaultProps

export default FullTypes;

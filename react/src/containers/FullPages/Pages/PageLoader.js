

import React, { Component } from 'react';

import Pagination from 'components/Pagination'

var PageLoader = (Parser, Filter) => class extends Component {
    constructor(props) {
        super(props);
        this.state = { info: {}, objects: [] }
    }

    componentDidMount() {
        this.loadPage(this.props.params);
    }

    componentWillReceiveProps(nextProps) {
        this.loadPage(nextProps.params);
    }

    loadPage(params) {
        let arr = []
        for(const key in params) {
            arr.push(key+'='+params[key])
        }

        fetch(this.props.base_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                const { objects, info } = items;
                this.setState({ info: info, objects: objects })
            })
    }

    render() {
        if(!this.state.objects)
            return <div> Waiting </div>

        const { objects, info } = this.state;

        return (
            <div>
                <Filter {...this.props} />
                <Parser items={objects} instance_url={this.props.instance_url}/>
                <Pagination page={info.page} numPages={info.num_pages} changePage={this.props.changePage} />
            </div>
        );
    }
}

export default PageLoader;

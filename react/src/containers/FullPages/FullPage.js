
import React, { Component } from 'react';
import Pagination from 'components/Pagination';

var FullPage = (_defaultProps, PageLoader) => class extends Component {
    static defaultProps = _defaultProps;

    constructor(props) {
        super(props);
        this.state = this.props.defaultParams;

        this.bindFunctions = {
            changePage: this.changePage.bind(this),
            applyFilter: this.applyFilter.bind(this)
        }
    }

    changePage(pageNumber) {
        if(pageNumber !== this.state.page) {
            this.setState({ page: pageNumber });
        }
    }

    applyFilter(newParams) {
        this.setState(newParams);
    }

    componentWillReceiveProps(nextProps) {
        /* change for dynamic loading */

        const params = this.props.params
        const nextParams = nextProps.params

        for(const key in params) {
            if(params[key] !== nextParams[key]) {
                this.setState(nextParams)
            }
        }
    }

    render() {
        const newProps = {...this.props, ...this.bindFunctions}

        return <PageLoader params={this.state} {...newProps} />
    }
}

export default FullPage;

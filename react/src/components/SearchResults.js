import React from 'react';
import Highlighter from 'react-highlight-words';
import Thumbnail from './Thumbnail';
import Pagination from './Pagination';

import { Link } from 'react-router-dom';
import './Full.css';

const defaultProps = {
    initialPage: 1,
    entries_per_page: 10,
    url: 'http://api.museumary.me/search/'
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: [],
            page: 1,
            numPages: 0,
            oldQuery: this.props.location.state.search
        };

        this.changePage = this.changePage.bind(this)
    }
    componentDidMount(){
        this.changePage(this.props.initialPage)
    }

    changePage(pageNumber) {
        const num_entries = 'entries_per_page='+this.props.entries_per_page
        const page = 'page=' + pageNumber
        const query = this.props.location.state.search

        return (
            fetch(this.props.url+query+'?'+page+'&'+num_entries)
                .then(result=>result.json())
                .then(items=> {
                    const numPages = items.info.num_pages;
                    this.setState({ items: items, page: pageNumber, numPages: numPages })
                    if(this.state.oldQuery !== this.props.location.state.search) {
                        this.setState({ oldQuery: this.props.location.state.search})
                    }
                })
        );
    }


    render() {
        if(this.state.oldQuery !== this.props.location.state.search) {
            this.changePage(1);
            return <div>Searching for {this.props.location.state.search}...</div>;
        }

        if(this.state.items.objects){
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                var url = '';
                if(obj.category === 'art_type') {
                    url = '/types/' + obj.id
                }
                else {
                    url = "/" + obj.category + "s/" + obj.id
                }
                // replace(this.props.location.state.search, "<b>"+this.props.location.state.search+"</b>")
                var description = obj.description;
                if(500 < obj.description.length ) {
                    var lowerQuery = this.props.location.state.search.toLowerCase();
                    var words = obj.description.split(" ");
                    description = '';
                    for(var i = 0; i < words.length; i++) {
                        if(words[i].toLowerCase().includes(lowerQuery)) {
                            description = description + words[i]
                            i++
                            if(words.length - 7 >= 0) {
                                var targ = i + 5
                                while(i < targ) {
                                    description = description + ' ' + words[i];
                                    i++;
                                }
                                description = description + "..."
                            }
                            else {
                                while(i < words.length) {
                                    description = description + ' ' + words[i];
                                    i++;
                                }
                            }
                        }
                    }
                }
                arr.push(
                    <div>
                        <Link to={url} activeClassName="active">
                            <h3>
                                <Highlighter
                                    highlightClassName='YourHighlightClass'
                                    searchWords={[this.props.location.state.search]}
                                    autoEscape={true}
                                    textToHighlight={obj.name}
                                />
                            </h3>
                        </Link>
                        <br/>
                            <Highlighter
                                highlightClassName='YourHighlightClass'
                                searchWords={[this.props.location.state.search]}
                                autoEscape={true}
                                textToHighlight={description}
                            />
                        <br/><br/>
                    </div>
                );
            }, this);

            if(arr.length === 0) {
                return <div>No search results for {this.props.location.state.search}</div>;
            }
            return (
                <div className="SearchResults">
                    <div className="container">
                        <div className="row">
                            {arr}
                            <Pagination
                                 page={this.state.page}
                                 numPages={this.state.items.info.num_pages}
                                 changePage={this.changePage}
                            />
                        </div>
                        <br/>
                        <br/>
                   </div>
               </div>
           );
        }
        else {
            return <div>Searching for {this.props.location.state.search}...</div>;
        }
    }
}

SearchResults.defaultProps = defaultProps;

export default SearchResults;

import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';

class FullWorks extends React.Component {
    constructor() {
        super();
        this.state={items:[]};
    }
    componentDidMount(){
        fetch(`http://api.museumary.me/work?entries_per_page=5000`)
            .then(result=>result.json())
            .then(items=>this.setState({items}))
    }


    render() {
        if(this.state.items.objects){
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                arr.push(obj);
            });

            return <div className="FullWorks">
                        <div className="container">
                            <div className="row">
                                {
                                    arr.map(
                                        function(obj) {
                                            var url = '/works/' + obj.id;
                                            var cont = "";
                                            if(obj.name.length > 25)
                                            {
                                                cont = "...";
                                            }
                                            return <div className="col-md-3">
                                                        <Link to={url} activeClassName="active"><strong>{obj.name.substring(0, 25) + cont}</strong></Link>
                                                        <br/>
                                                        <Link to={url} activeClassName="active">
                                                        <img src={obj.image_url} className="img-rounded" width="200" height="300"/>
                                                        </Link>
                                                        <br/>
                                                        <br/>
                                                        <br/>
                                                        </div>;
                                        }
                                    )
                                }
                            </div>
                            <br/>
                            <br/>
                        </div>
                </div>;
        }
        else {
            return <div className="FullWorks"></div>;
        }
    }
}

export default FullWorks;

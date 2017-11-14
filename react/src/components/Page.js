
import React from 'react';
import Thumbnail from './Thumbnail';

const Page = ({ items }) => {
    return (
        <div className="container">
            <div className="row">
                {
                    items.map(item =>
                        <Thumbnail
                            key={item.id}
                            url={item.url}
                            type={item.type}
                            name={item.name}
                            details={item.details}
                            image_url={item.image_url}
                            description_id={item.description_id}/>
                    )
                }
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default Page;
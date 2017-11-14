
import React from 'react';
import Page from 'components/Page';

import Gentleman from 'static/images/Gentleman.png'

const ArtistsParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        item.url = instance_url + item.id;
        item.image_url = item.image_url || Gentleman;
        item.details = ["Born: " + item.birth, "Died: " + (item.death ? item.death : "n/a"), "Culture: " + item.culture];

        return item;
    })

    return <Page items={parsedItems} />
}

export default ArtistsParser;

import React from 'react';
import Page from 'components/Page';

import Harvard from 'static/images/Harvard.jpg';
import Cooper from 'static/images/Cooper.jpg';
import Auckland from 'static/images/Auckland.jpg';
import Finnish from 'static/images/Finnish.jpg';
import Walters from 'static/images/Walters.jpg';

const MUSEUMS = [Harvard, Walters, Auckland, Cooper, Finnish]

const VenuesParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        item.url = instance_url + item.id;
        item.image_url = MUSEUMS[item.id-1]
        item.type = "venue"
        item.description_id = item.id

        return item;
    })

    return <Page items={parsedItems} />
}

export default VenuesParser;

import React from 'react';
import Page from 'components/Page';

export const WorksParams = {
    defaultParams: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        art_type: "",
        medium: "",
        venue: ""
    },

    attributes: {
        name: "Name",
        date: "Date"
    },

    base_url: 'http://api.museumary.me/work/?',
    instance_url: '/works/'
}

const WorksParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        let { venue, artist } = item;

        item.url = instance_url + item.id;
        item.name = item.name.slice(0, 25) + (item.name.length > 25 ? '...' : '');

        venue = venue.slice(0, 7);
        artist = artist.slice(0, 7) + (artist.length > 7 ? '...' : '')
        item.details = ['Artist: ' + artist, 'Date: ' + item.date, "Venue: " + venue];

        return item;
    })

    return <Page items={parsedItems} />
}

export default WorksParser;
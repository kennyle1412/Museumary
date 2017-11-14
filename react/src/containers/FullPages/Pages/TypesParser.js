
import React from 'react';
import Page from 'components/Page';

const TypesParser = ({ items, instance_url }) => {
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

        return <Page items={parsedItems} />
    })
}

export default TypesParser;
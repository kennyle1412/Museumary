
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

export const VenuesParams = {
    defaultParams: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        country: ""
    },

    attributes: {
        name: "Name",
        country: "Country",
        city: "City",
        street: "Street"
    },

    base_url: 'http://api.museumary.me/venue?',
    instance_url: '/venues/'
}

export const ArtistsParams = {
    defaultParams: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        culture: ""
    },

    attributes: {
        name: "Name",
        birth: "Birth",
        death: "Death",
        birthplace: "Birth Place",
        deathplace: "Death Place",
        culture: "Culture"
    },

    base_url: 'http://api.museumary.me/artist?',
    instance_url: '/artists/'
}

export const TypesParams = {
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


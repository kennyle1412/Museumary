
Component Filtering. Input fields are exact matches only.

-- MasterFilter.js --
Higher Order Component container that contains the changing logic and holds the
    parameters that determines what to filter. Builds its state based on what's
    passed in as the defaultParams.

-- BaseFilter.js --
Higher Order Component enhancer component that wraps all the base filters with
    the default options and parameters.

Defaults:
    startswith -- alphabetical filter option
    order_by -- filter by the model's attributes
    order -- ascending or descending order
    apply -- signal that there is a need to apply the filter
    reset -- signal that things need to be reset back to default parameters

-- ArtistsFilter.js --
Filter Artists based on:
    culture -- what is the artist's culture

    attributes:
        name
        birth
        death
        birthplace
        deathplace
        culture

-- Types --
Filter ArtTypes based on:
    medium -- the medium of the art type

    attributes:
        name

-- Works --
Filter Works based on:
    venue -- which venue is the work in
    medium -- what medium is the work
    art_type -- what art type is the work


    attributes:
        name
        date

-- Venues --
Filter Venues based on:
    country -- which country is the venue in

    attributes:
        name
        country
        city
        street

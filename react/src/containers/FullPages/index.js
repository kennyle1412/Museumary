
import FullPage from './FullPage';

import {
    ArtistsParams,
    WorksParams,
    VenuesParams,
    TypesParams
} from './DefaultParameters'

import {
    WorksPage,
    TypesPage,
    VenuesPage,
    ArtistsPage
} from './Pages'

export const FullWorks = FullPage(WorksParams, WorksPage);
export const FullArtists = FullPage(ArtistsParams, ArtistsPage);
export const FullVenues = FullPage(VenuesParams, VenuesPage);

export { default as FullTypes } from './FullTypes';

// export const FullTypes = FullPage(TypesParams, TypesLoader);



import PageLoader from './PageLoader'

import {
    WorksFilter,
    ArtistsFilter,
    VenuesFilter,
    TypesFilter
} from 'components/Filters'

import ArtistsParser from './ArtistsParser';
import WorksParser from './WorksParser';
// import TypesParser from './TypesParser';
import VenuesParser from './VenuesParser';

export const ArtistsPage = PageLoader(ArtistsParser, ArtistsFilter);
export const WorksPage = PageLoader(WorksParser, WorksFilter);
// export const TypesPage = PageLoader(TypesParser, TypesFilter);
export const VenuesPage = PageLoader(VenuesParser, VenuesFilter);


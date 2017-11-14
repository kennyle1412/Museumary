
import FullPage from './FullPage';

import {
    ArtistsParams,
    WorksParams,
    VenuesParams,
    TypesParams
} from './DefaultParameters'

import {
    WorksFilter,
    ArtistsFilter,
    VenuesFilter,
    TypesFilter
} from 'components/Filters'

import WorkLoader from './WorksParser';

export const FullWorks = FullPage(WorksParams, WorkLoader);


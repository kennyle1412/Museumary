
/* Export file for the model filters. */

// Import the MasterFilter container to handle filter logic
import MasterFilter from 'containers/MasterFilter';

// Import filters from each file
import ArtistsFilterBase from './ArtistsFilter';
import TypesFilterBase from './TypesFilter';
import WorksFilterBase from './WorksFilter';
import VenuesFilterBase from './VenuesFilter';

// Export the filter wrapped in the Master Filter
export const ArtistsFilter = MasterFilter(ArtistsFilterBase);
export const TypesFilter = MasterFilter(TypesFilterBase);
export const WorksFilter = MasterFilter(WorksFilterBase);
export const VenuesFilter = MasterFilter(VenuesFilterBase);


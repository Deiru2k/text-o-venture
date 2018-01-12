import store from 'src/store';

// locations
import Shrine from './locations/shrine';

// POI
import Donations from './poi/donations';

// Items
import Leaflet from './items/leaflet';

export default {
  start: 'shrine',
  locations: {
    shrine: new Shrine(store),
  },
  poi: {
    donations: new Donations(store),
  },
  items: {
    leaflet: new Leaflet(store),
  },
};

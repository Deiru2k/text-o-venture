import * as R from 'ramda';

import POI from 'src/engine/prototypes/poi';

export const closedStatePath = ['poi', 'donations', 'closedState'];

export default class Dontaions extends POI {
  generalDescription = 'A small box for donations to the shrine.';

  description = {
    closed: `${this.generalDescription} It appears to be closed.`,
    open: `${this.generalDescription} It appears to be open. There's a small leaflet inside. Other than that, it's empty.`,
  }

  describe() {
    const closedState = R.pathOr('closed', closedStatePath, this.store.getState());
    return R.pathOr(this.description.closed, [closedState], this.description);
  }

  items() {
    const closedState = R.pathOr('closed', closedStatePath, this.store.getState());

    if (closedState === 'open') {
      return ['leaflet'];
    }

    return [];
  }

  action(action) {
    const closedState = R.pathOr('closed', closedStatePath, this.store.getState());

    if (action === 'open' && closedState === 'closed') {
      this.store.dispatch({ type: 'SET_PATH', key: closedStatePath, value: 'open' });
      this.store.dispatch({ type: 'ADD_TEXT', text: 'You open the donations box. There\'s a small leaflet inside. No money though.' });
    } else if (action === 'open') {
      this.store.dispatch({ type: 'ADD_TEXT', text: 'Donation box is already open.' });
    } else if (action === 'inspect') {
      this.store.dispatch({ type: 'ADD_TEXT', text: this.describe() });
    } else {
      this.store.dispatch({ type: 'ADD_TEXT', text: 'You try this, and it doesn\'t work. What a surprise.' });
    }
  }
}

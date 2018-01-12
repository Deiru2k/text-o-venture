import Item from 'src/engine/prototypes/item';

export default class Leaflet extends Item {
  action(action) {
    if (action === 'read' || action === 'inspect') {
      this.store.dispatch({ type: 'ADD_TEXT', text: 'WELCOME TO EASTERN PROJECT, a game of adventure, danger, and low cunning. No computer should be without one!' });
    }
  }
}

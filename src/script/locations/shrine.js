import Location from 'src/engine/prototypes/location';

export default class Shrine extends Location {
  description = 'You\'re standing on an open path, west of shrine, with an open front door. There\'s a small donation box here.'

  describe() {
    return this.description;
  }

  poi() {
    return ['donations'];
  }
}

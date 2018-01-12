import * as R from 'ramda';

const positionPath = ['player', 'position'];
const inventoryPath = ['player', 'inventory'];

export default class Engine {
  connectionWords = ['with', 'about', 'to'];

  constructor(script, store) {
    this.script = script;
    this.store = store;
  }

  start() {
    const start = this.script.start;
    const areaDescription = this.script.locations[start].describe();
    this.store.dispatch({ type: 'SET_PATH', key: positionPath, value: start });
    this.store.dispatch({ type: 'ADD_TEXT', text: areaDescription });
  }

  getSubject(name) {
    const itemSubject = R.path(['items', name], this.script);
    const poiSubject = R.path(['poi', name], this.script);
    const locationSubject = R.path(['locations', name], this.script);

    return itemSubject || poiSubject || locationSubject;
  }

  collectPoiItems(poiList = []) {
    const poiEntitityList = poiList.map(poiName => this.script.poi[poiName]);
    return R.flatten(R.uniq(poiEntitityList.map(
      poi => poi.items(),
    )));
  }

  action(command = 'None ') {
    this.store.dispatch({ type: 'ADD_TEXT', text: `> ${command}` });
    const sanitizedCommand = command.replace(/the /g, '');
    const currentArea = this.script.locations[R.path(positionPath, this.store.getState())];
    const inventory = R.pathOr([], inventoryPath, this.store.getState());
    const potentialSubjects = [
      ...currentArea.poi(),
      ...this.collectPoiItems(currentArea.poi()),
      ...currentArea.directions(),
      ...currentArea.items(),
      ...inventory,
    ];

    const subjectName = R.find(subj => sanitizedCommand.search(` ${subj}`) !== -1)(potentialSubjects);

    if (subjectName) {
      const action = sanitizedCommand.split(` ${subjectName}`)[0];
      const rightClause = command.split(` ${subjectName}`);
      const subject = this.getSubject(subjectName);
      subject.action(action, rightClause, this.script);
    } else {
      this.store.dispatch({ type: 'ADD_TEXT', text: 'Whatever it is you\'re looking for, it\'s not here. Tough luck.' });
    }
  }
}

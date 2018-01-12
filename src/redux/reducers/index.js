import * as R from 'ramda';
import { handleActions } from 'redux-actions';

const reducer = handleActions({
  SET_PATH: (state, { key, value }) => {
    const pathLens = R.lensPath(key);

    return R.set(pathLens, value, state);
  },
  ADD_TEXT: (state, { text }) => ({
    ...state,
    text: [...(state.text || []), text],
  }),
  CLEAR_TEXT: state => ({
    ...state,
    text: [],
  }),
  LOAD_GAME: (state, save) => save,
}, {
  text: [],
});

export default reducer;

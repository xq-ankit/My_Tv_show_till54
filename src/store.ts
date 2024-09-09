import { applyMiddleware, combineReducers, createStore } from "redux";
import showReducers from "./reducers/showReducers";
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "@redux-devtools/extension";
import { debounce, takeEvery, takeLatest } from "redux-saga/effects";
import { LOAD_SHOW, SHOWS_QUERY_CHANGE } from "./actions/shows";
import { fetchShowDetail, fetchShows } from "./sagas/Shows";

const reducer=combineReducers({
shows:showReducers,
});
function*rootSaga(){
    //   yield takeEvery(SHOWS_QUERY_CHANGE,fetchShows)
    //  yield takeLatest(SHOWS_QUERY_CHANGE,fetchShows)
    yield debounce(200,SHOWS_QUERY_CHANGE,fetchShows);
    yield takeEvery(LOAD_SHOW,fetchShowDetail);
}

const sagaMiddleware = createSagaMiddleware()
const store=createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga)


export type State=ReturnType<typeof reducer>;

export default store;

//1.Make space in state for new Data
//       -add new reducers in the store and define state
//       -Or add keys to existing state in redducers(s).

//2. Define action(s) and action creator(s)
//3. create mapDispatchToProp and accordingly add props to components
// --later on Saga will also come in the picture at this step

//4. Dispactch action(s)
// -------Testing Step 1 check in redux devtol that right action should be gettting Dispatched-------------

//5. add switch case to reducer for various action and/or add saga method
//6. add selector(s)
//7. mapStateToprops
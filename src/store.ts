import { combineReducers, createStore } from "redux";
import showReducers from "./reducers/showReducers";

const reducer=combineReducers({
shows:showReducers,
});

const store=createStore(reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
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

//5. add switch case to reducer for various action
//6. add selector(s)
//7. mapStateToprops
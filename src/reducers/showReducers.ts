import { produce, WritableDraft } from "immer";
import { AnyAction } from "redux";
import { Show } from "../models/Show";


// Define your action type
const SHOW_LOADED = 'SHOW_LOADED';

// Define the action creator
export const showLoadedAction = (shows: Show[]) => ({
  type: SHOW_LOADED,
  payload: shows,
});

export type State = {
  shows: { [showId: number]: Show };
  query: string;
};

export const initialState: State = {
  shows: {},
  query: "",
};

function showReducers(state = initialState, action: AnyAction): State {
  switch (action.type) {
      case SHOW_LOADED:
          return produce(state,(draft)=>{
                 const shows=action.payload as Show[]
                 const showSchema=Schema("shows")
              });

    default:
      return state;
  }
}

export default showReducers;
function Schema(arg0: string) {
  throw new Error("Function not implemented.");
}


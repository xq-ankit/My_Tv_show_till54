import { produce } from "immer";
import { AnyAction } from "redux";
import { SHOW_DETAIL_LOADED, SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/shows";  
import { Show} from "../models/Show";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query: string;
  query_shows:{[query:string]:number[]};
  loading:boolean;
};

export const initialState: State = {
  shows: {},
  query: "",
  query_shows:{},
  loading:false,
};

function showReducers(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const { shows } = action.payload;
        if(!shows || shows.length ===0){
            return;
        }
        const showSchema = new schema.Entity("shows");
        const normalizedData = normalize(shows, [showSchema]);
        draft.loading=false;
        draft.query_shows[draft.query]=normalizedData.result;
        draft.shows = {...draft.shows,...normalizedData.entities.shows};
      });

    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        draft.query = action.payload;
        draft.loading=true;
      });

    case SHOW_DETAIL_LOADED:
      return produce(state, (draft) => {
        const show = action.payload as Show;
        draft.shows[show.id] = show;
      });

    default:
      return state;
  }
}

export default showReducers;

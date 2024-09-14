import { call, put } from "redux-saga/effects";
import { loadShowDetail, searchShows } from "../api";
import { showLoadedAction, ShowActionLoaded, castLoadedAction } from "../actions/shows";
import { Action } from "../actions";

// handle fetching of shows based on query
export function* fetchShows(action: Action): Generator<any, any, any> {
    const shows = yield call(searchShows, action.payload);
    yield put(showLoadedAction(shows, action.payload)); 
}

// handle fetching details of a specific show
export function* fetchShowDetail(action: Action): Generator<any, any, any> {
      const show = yield call(loadShowDetail, action.payload); 
      yield put(ShowActionLoaded(show));
  }
  
  

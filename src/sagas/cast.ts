import { call, put } from "redux-saga/effects";
import { loadShowCast } from "../api"; 
import { castLoadedAction } from "../actions/cast";
import { Action } from "../actions";

export function* fetchShowCast(action: Action): Generator<any, any, any> {
  try {
    const cast = yield call(loadShowCast, action.payload);
    yield put(castLoadedAction(action.payload, cast));
  } catch (error) {
    console.error("Error fetching cast:", error);
  }
}

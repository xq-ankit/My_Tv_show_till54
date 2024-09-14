import { produce } from "immer";
import { AnyAction } from "redux";
import { CAST_LOADED } from "../actions/cast";

export type CastState = {
  [showId: number]: { name: string; image: { medium: string } }[];
};

export const initialCastState: CastState = {};

function castReducers(state = initialCastState, action: AnyAction): CastState {
  switch (action.type) {
    case CAST_LOADED:
      return produce(state, (draft) => {
        draft[action.payload.showId] = action.payload.cast;
      });
    default:
      return state;
  }
}

export default castReducers;

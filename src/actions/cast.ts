import { CastMember } from "../models/Cast"; 
export const LOAD_CAST = "LOAD_CAST";
export const CAST_LOADED = "CAST_LOADED";

export type CastLoadedPayload = {
  showId: number;
  cast: CastMember[];
};

export const loadCastAction = (showId: number) => ({
  type: LOAD_CAST,
  payload: showId,
});

export const castLoadedAction = (showId: number, cast: CastMember[]) => ({
  type: CAST_LOADED,
  payload: { showId, cast },
});

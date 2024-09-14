import { State } from "../store"; 
import { CastMember } from "../models/Cast";

export const castSelector = (state: State, showId: number): CastMember[] => {
  return state.cast[showId] || []; 
};

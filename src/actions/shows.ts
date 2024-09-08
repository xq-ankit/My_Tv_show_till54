import { ActionCreator } from ".";
import { Show } from "../models/Show";

export const SHOWS_LOADED= "SHOWS_LOADED";

export const showLoadedAction:ActionCreator<Show[]>=(shows:Show[]) => ({
    type: SHOWS_LOADED,
    payload: shows,
});
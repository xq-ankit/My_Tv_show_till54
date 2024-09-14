import { Show } from "../models/Show";
import { ActionCreator } from ".";

export const SHOWS_LOADED = "SHOWS_LOADED";
export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE";
export const SHOW_DETAIL_LOADED = "SHOW_DETAIL_LOADED";
export const LOAD_SHOW = "LOAD_SHOW";

export type ShowLoadedPayload = {
  shows: Show[];
  query: string;
};

// Action to load shows with the query
export const showLoadedAction: ActionCreator<ShowLoadedPayload> = (
  shows: Show[],
  query: string
) => ({
  type: SHOWS_LOADED,
  payload: { shows, query },
});

// Action to handle query change
export const ShowsQueryChangeAction: ActionCreator<string> = (query) => ({
  type: SHOWS_QUERY_CHANGE,
  payload: query,
});

// Action to load a single show
export const ShowActionLoaded: ActionCreator<Show> = (show: Show) => ({
  type: SHOW_DETAIL_LOADED,
  payload: show,
});

// Action to trigger the loading of a single show (for use in saga)
export const loadShowAction: ActionCreator<number> = (showId: number) => ({
  type: LOAD_SHOW,
  payload: showId,
});

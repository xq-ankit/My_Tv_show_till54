import { createSelector } from "reselect";
import { State } from "../store";

export const ShowsStateSelector=(state:State)=>state.shows;
export const showsQuerySelector=createSelector(
    ShowsStateSelector,
    (showState)=>showState.query
);

export  const showsMapSelector=createSelector(
    ShowsStateSelector,
    (showsState)=>showsState.shows
)
export const queryShowMapSelector=createSelector(
    ShowsStateSelector,
    (showsState)=>showsState.query_shows
);

export const showsLoadingSelector=createSelector(
    ShowsStateSelector,(showsState)=>showsState.loading
)

export const showsSelector=createSelector(
    showsMapSelector,
     showsQuerySelector,
     queryShowMapSelector,
     (showsMap,query,queryShowsMap)=>queryShowsMap[query]?.map((showId)=>showsMap[showId]));


import { FC, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
// import { searchShows } from "../api";
import { Show } from "../models/Show";
import {
  // showLoadedAction,
  ShowsQueryChangeAction,
} from "../actions/shows";
import { connect, ConnectedProps, ConnectProps } from "react-redux";
import { State } from "../store";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";

type ShowListPageProps = ReduxProps
// {
//   shows: Show[];
//   query: string;
//   showsLoaded: (shows: Show[], query: string) => void;
//   showsQueryChange: (query: string) => void;
// };

const ShowListPage: FC<ShowListPageProps> = ({
  shows,
  query,
  // showsLoaded,
  showsQueryChange,
}) => {
  // useEffect(() => {
  //   searchShows(query).then((shows) => showsLoaded(shows, query));
  // }, [query, showsLoaded]);
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChange(event.target.value);
        }}
      />
      {shows && ( <div className="flex flex-wrap justify-center">
        {shows.map((s) => (
          <ShowCard key={s.id} show={s} />
        ))}
      </div>)}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
  };
};

const mapDispatchToProps = {
  // showsLoaded: showLoadedAction,
  showsQueryChange: ShowsQueryChangeAction,
};
const connector= connect(mapStateToProps, mapDispatchToProps)
type ReduxProps=ConnectedProps<typeof connector>;
export default connector(ShowListPage);
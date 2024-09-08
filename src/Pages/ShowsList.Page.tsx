import { FC, useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { searchShows } from "../api";
import { Show } from "../models/Show";
import { showLoadedAction } from "../actions/shows";
import { connect } from "react-redux";

type ShowListPageProp = {
  showsLoaded: (shows: Show[]) => void;
};

const ShowListPage: FC<ShowListPageProp> = ({ showsLoaded }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      searchShows(query).then(fetchedShows => {
        setShows(fetchedShows);
        showsLoaded(fetchedShows); // Dispatch the action here
      });
    } else {
      setShows([]);
      showsLoaded([]); // Optionally dispatch an empty array when no query
    }
  }, [query, showsLoaded]);

  return (
    <div className="mt-2">
      <SearchBar value={query} onChange={(event) => setQuery(event.target.value)} />
      <div className="flex flex-wrap justify-center">
        {shows.map((s) => <ShowCard key={s.id} show={s} />)}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  showsLoaded: showLoadedAction,
};

export default connect(null, mapDispatchToProps)(ShowListPage);

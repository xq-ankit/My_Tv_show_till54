import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { connect, ConnectedProps } from "react-redux";
import { showsMapSelector } from "../selectors/Shows";
import { castSelector } from "../selectors/Cast";
import { loadShowAction} from "../actions/shows";
import { loadCastAction } from "../actions/cast";
import { State } from "../store";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";

type OwnProps = WithRouterProps;
type ShowDetailPageProps = ReduxProps & OwnProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({ params,
    show,
    cast,
    loadShow,
    loadCast }) => {
    useEffect(() => {
    loadShow(+params.showId);
    loadCast(+params.showId);
  }, [params.showId, loadShow, loadCast]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2">
      <Link
        to="/"
        className="flex items-center space-x-2 px-4 py-2 w-24 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700"
      >
        <IoReturnDownBackOutline className="text-xl" />
        <span>Back</span>
      </Link>
      <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show.genres.map((genre) => (
          <GenrePill name={genre} key={genre} />
        ))}
      </div>
      <div className="mt-2 flex">
        <img
          src={show.image?.medium || "https://placehold.co/400"}
          alt="Show poster"
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p dangerouslySetInnerHTML={{ __html: show.summary || "" }} />
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: <span className="text-gray-700">{show.rating.average}/10</span>
          </p>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {cast.map((member) => (
            <CastCard key={member.name} avatarLink={member.image} name={member.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  show: showsMapSelector(state)[+ownProps.params.showId],
  cast: castSelector(state, +ownProps.params.showId),
});

const mapDispatchToProps = {
  loadShow: loadShowAction,
  loadCast: loadCastAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));

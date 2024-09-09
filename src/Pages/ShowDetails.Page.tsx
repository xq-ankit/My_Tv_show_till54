import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { connect, ConnectedProps } from "react-redux";
import { showsMapSelector } from "../selectors/Shows";
import { loadShowAction } from "../actions/shows";
import { State } from "../store";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";

type OwnProps = WithRouterProps;
type ShowDetailPageProps = ReduxProps & OwnProps;

interface CastMember {
  name: string;
  image: { medium: string };
}

const ShowDetailPage: FC<ShowDetailPageProps> = ({ params, show, loadShow }) => {
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    loadShow(+params.showId);
  }, [params.showId, loadShow]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${params.showId}/cast`);
        const data = await response.json();
        setCast(data.map((item: any) => ({
          name: item.person.name,
          image: item.person.image?.medium || "https://placehold.co/200"
        })));
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    if (show) {
      fetchCast();
    }
  }, [show, params.showId]);

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
          alt=""
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
            <CastCard
              key={member.name}
              avatarLink={member.image}
              name={member.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  show: showsMapSelector(state)[+ownProps.params.showId],
});

const mapDispatchToProps = {
  loadShow: loadShowAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));

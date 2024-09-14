import axios from "axios";
import { Show } from "./models/Show";
import { CastMember } from "./models/Cast"; // 

const BASE_URL = "https://api.tvmaze.com/";

export const searchShows = async (keyword: string): Promise<Show[]> => {
  try {
    const response = await axios.get<{ show: Show }[]>(`${BASE_URL}search/shows?q=${keyword}`);
    return response.data.map((item) => item.show);
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw error;
  }
};

export const loadShowDetail = async (showId: number): Promise<Show> => {
  try {
    const response = await axios.get<Show>(`${BASE_URL}shows/${showId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show details for ID ${showId}:`, error);
    throw error;
  }
};

export const loadShowCast = async (showId: number): Promise<CastMember[]> => {
  const response = await axios.get<any>(`${BASE_URL}shows/${showId}/cast`);
  return response.data.map((item: any) => ({
    name: item.person.name,
    image: item.person.image?.medium || "https://placehold.co/200",
  }));
};

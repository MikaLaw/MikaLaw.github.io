import axios from "axios";

export default class API {
  api = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
    headers: {
      "x-api-key": "2fe99868-1bda-4579-9041-2e5a2e98a63b",
    },
  });

  getCats = async (catsFilter) => {
    let responseData = await this.api.get("images/search", {
      params: { ...catsFilter },
    });

    return responseData;
  };

  getFavoriteCats = async (catsFilter) => {
    let responseData = await this.api.get("favourites", {
      params: { ...catsFilter },
    });

    return responseData;
  };

  saveFavouriteCats = async ({ image_id, sub_id }) => {
    let responseData = await this.api.post("favourites", { image_id, sub_id });

    return responseData;
  };

  deleteFavouriteCats = async ({ image_id }) => {
    let responseData = await this.api.delete(`favourites/${image_id}`);

    return responseData;
  };
}

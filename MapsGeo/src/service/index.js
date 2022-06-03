import axios from "axios";

export default class API {
  api = axios.create({
    baseURL: "DNS.csv",
  });

  getAddress = async () => {
    let responseData = await this.api.get("", {});

    return responseData;
  };
}

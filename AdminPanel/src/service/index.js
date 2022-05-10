import axios from "axios";
import Cookies from "js-cookie";

export default class API {
  api = axios.create({
    baseURL: "./AdminPanel/build/",
    responseType: "json",
  });

  authUser = async (username, password) => {
    let responseData = new Promise((resolve, reject) => {
      resolve({
        data: {
          success: true,
          token: "dklsdfkldcvkjxhvdu5768739485403rlksdg",
        },
      });
    });

    return responseData;
  };

  getUsers = async (filters) => {
    let responseData = await this.api.get("users.json", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      params: {},
    });
    if (filters.id) {
      return {
        data: {
          users: responseData.data.users.filter(
            (user) => user.id === +filters.id
          ),
          count: 1,
        },
      };
    }
    if (filters.regDate) {
      function timestampToDate(ts) {
        var d = new Date();
        d.setTime(ts);
        return (
          ("0" + d.getDate()).slice(-2) +
          "." +
          ("0" + (d.getMonth() + 1)).slice(-2) +
          "." +
          d.getFullYear()
        );
      }

      return {
        data: {
          users: responseData.data.users.filter(
            (user) => timestampToDate(user.regDate * 1000) === filters.regDate
          ),
          count: 1,
        },
      };
    }
    if (filters.orderBy && filters.orderBy === "age") {
      if (filters.order === "asc") {
        return {
          data: {
            users: responseData.data.users
              .sort((a, b) => a.age - b.age)
              .splice(filters.offset, filters.limit),
            count: responseData.data.count,
          },
        };
      } else if (filters.order === "desc") {
        return {
          data: {
            users: responseData.data.users
              .sort((a, b) => b.age - a.age)
              .splice(filters.offset, filters.limit),
            count: responseData.data.count,
          },
        };
      }
    }
    if (filters.sex && filters.sex.length !== 0) {
      let userArr = [];
      for (let i = 0; i < filters.sex.length; i++) {
        userArr.push(
          responseData.data.users.filter((user) => user.sex === filters.sex[i])
        );
      }
      return {
        data: {
          users: userArr.flat().splice(filters.offset, filters.limit),
          count: userArr.flat().length,
        },
      };
    } else if (filters.sex === null) {
      return {
        data: {
          users: responseData.data.users.splice(filters.offset, filters.limit),
          count: responseData.data.count,
        },
      };
    }

    return {
      data: {
        users: responseData.data.users.splice(filters.offset, filters.limit),
        count: responseData.data.count,
      },
    };
  };

  updateUser = async (userId) => {
    let responseData = await this.api.get("users.json", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      params: {},
    });
    return responseData;
  };

  getTraffics = async (filters) => {
    let responseData = await this.api.get("traffics.json", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      params: {},
    });
    if (filters.isBlocked && filters.isBlocked.length !== 0) {
      let trafficsArr = [];
      for (let i = 0; i < filters.isBlocked.length; i++) {
        trafficsArr.push(
          responseData.data.traffics.filter(
            (traffic) => traffic.isBlocked + "" === filters.isBlocked[i]
          )
        );
      }
      return {
        data: {
          traffics: trafficsArr.flat().splice(filters.offset, filters.limit),
          count: trafficsArr.flat().length,
        },
      };
    } else if (filters.isBlocked === null) {
      return {
        data: {
          traffics: responseData.data.traffics.splice(
            filters.offset,
            filters.limit
          ),
          count: responseData.data.count,
        },
      };
    }

    if (filters.id) {
      return {
        data: {
          traffics: responseData.data.traffics.filter(
            (traffic) => traffic.id === +filters.id
          ),
          count: 1,
        },
      };
    }

    return {
      data: {
        traffics: responseData.data.traffics.splice(
          filters.offset,
          filters.limit
        ),
        count: responseData.data.count,
      },
    };
  };

  getTraffic = async (id) => {
    let responseData = await this.api.get("traffics.json", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      params: {},
    });

    return responseData.data.traffics.filter((traffic) => traffic.id === +id);
  };

  getDocs = async () => {
    let responseData = await this.api.get("docs.json", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      params: {},
    });

    return responseData;
  };

  updateDocs = async (id) => {
    let responseData = await this.api.get("docs.json", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      params: {},
    });

    return responseData;
  };
}

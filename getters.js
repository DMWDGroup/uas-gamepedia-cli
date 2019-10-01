const axios = require("axios");
const qs = require("qs");
const chalk = require("chalk");
const getLongest = require("./utils").getLongest;

module.exports.getTournaments = query => {
  let queryString = qs.stringify(query);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://lol.gamepedia.com/api.php?${queryString}`);
      data = response.data.cargoquery;
      return resolve([...data].map(x => x.title.Name));
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

module.exports.getMatches = query => {
  let queryString = qs.stringify(query);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://lol.gamepedia.com/api.php?${queryString}`);
      data = response.data.cargoquery;

      let longest = getLongest(data);

      return resolve(
        [...data].map(x => {
          let versus = `${x.title.WinTeam} ${chalk.red("vs")} ${x.title.LossTeam}`.padEnd(longest, " ");

          return {
            value: x.title.MatchHistory,
            name:
              versus +
              `${chalk.red(" | ")} ${x.title["DateTime UTC"]} ${chalk.red(" | ")} ${
                // name: `${x.title.WinTeam} ${chalk.red("vs")} ${x.title.LossTeam} ${chalk.red(" | ")} ${x.title["DateTime UTC"]} ${chalk.red(" | ")} ${
                x.title.Patch
              }`
          };
        })
      );
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

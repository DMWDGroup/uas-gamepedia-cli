const chalk = require("chalk");

clear = str => {
  return " " + str + " ";
};

module.exports.generateURLs = url => {
  const serviceURL = "https://acs.leagueoflegends.com/v1/stats/game/";
  let mh = url;

  let id = url.split("#match-details/")[1];
  id = id.slice(0, id.indexOf("&"));

  let ss = serviceURL + id;

  let splitId = id.split("?");
  let tl = serviceURL + splitId[0] + "/timeline?" + splitId[1];

  return {
    MatchHistory: clear(mh),
    StatsJSON: clear(ss),
    TimelineJSON: clear(tl)
  };
};

module.exports.getLongest = data => {
  let longest = null;

  data.forEach(x => {
    let versus = `${x.title.WinTeam} ${chalk.red("vs")} ${x.title.LossTeam}`;

    if (versus.length > longest) {
      longest = versus.length;
    }
  });

  return longest;
};

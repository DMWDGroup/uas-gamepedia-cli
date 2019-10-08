const chalk = require("chalk");

clear = str => {
  return " " + str + " ";
};

module.exports.generateURLs = matchHistoryURL => {
  const serviceURL = "https://acs.leagueoflegends.com/v1/stats/game/";
  let matchHistory = matchHistoryURL;

  let matchId = matchHistoryURL.split("#match-details/")[1];
  matchId = matchId.slice(0, matchId.indexOf("&"));

  let stats = serviceURL + matchId;

  let splitId = matchId.split("?");
  let timeline = serviceURL + splitId[0] + "/timeline?" + splitId[1];

  return {
    MatchHistory: clear(matchHistory),
    StatsJSON: clear(stats),
    TimelineJSON: clear(timeline)
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

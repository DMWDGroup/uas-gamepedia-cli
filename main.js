const inquirer = require("inquirer");
const queryMaker = require("./queryMaker");
const getters = require("./getters");
const utils = require("./utils");
const chalk = require("chalk");
const cliSpiner = require("cli-spinners");
const ora = require("ora");

const makeCoffe = m => new Promise(r => setTimeout(r, m));

const main = async () => {
  console.clear();

  let tournamentsQuery = queryMaker({
    tables: "Tournaments=TS",
    fields: "Name",
    where: "TS.Name LIKE '%ultraliga%' AND TS.IsQualifier=0"
  });
  let tournaments = await getters.getTournaments(tournamentsQuery);
  let tournamentsPromptConfig = [
    {
      type: "list",
      name: "Tournament",
      message: chalk.green("Select tournament"),
      prefix: chalk.green.bold("^^"),
      suffix: chalk.green.bold(" ^^"),
      choices: tournaments
    }
  ];
  let tournament = await inquirer.prompt(tournamentsPromptConfig);
  let matchesQuery = queryMaker({
    tables: "ScoreboardGame=SG",
    fields: "Tournament, WinTeam, LossTeam, DateTime_UTC, Gamelength, Patch, MatchHistory, UniqueGame",
    where: `SG.Tournament='${tournament.Tournament}'`
  });

  const spinner = ora({
    prefixText: chalk.blue("Fetching data"),
    spinner: cliSpiner.triangle,
    color: "blue"
  }).start();
  await makeCoffe(213);
  spinner.stop();

  let matches = await getters.getMatches(matchesQuery);
  let matchesPromptConfig = [
    {
      type: "list",
      name: "Match",
      message: chalk.green.bold("Select match"),
      prefix: chalk.green.bold("^^  "),
      suffix: chalk.green.bold("    ^^"),
      choices: matches
    }
  ];
  let match = await inquirer.prompt(matchesPromptConfig);

  const spinner1 = ora({
    prefixText: chalk.blue("Processing data"),
    spinner: cliSpiner.triangle,
    color: "blue"
  }).start();
  await makeCoffe(345);
  spinner1.stop();

  console.log(utils.generateURLs(match.Match));

  ora().succeed(chalk.green.bold("That's all folks!"));
  process.exit();
};

main();

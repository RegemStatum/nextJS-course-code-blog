const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "AlKon",
        mongodb_password: "6tV4X0k05avYOcT6",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site",
      },
    };
  }

  return {
    env: {
      mongodb_username: "AlKon",
      mongodb_password: "6tV4X0k05avYOcT6",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
  };
};

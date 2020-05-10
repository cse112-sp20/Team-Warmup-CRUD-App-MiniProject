const chrome = require("chromedriver");

module.exports = {
  src_folders: ["nightwatch_tests"],

  webdriver: {
    start_process: true,
    server_path: chrome.path,
    port: 9515,
    log_path: false,
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
};

const SCREENSHOT_PATH = './screenshots/';
const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
  src_folders: [
    'test/functional/specs'
  ],
  output_folder: 'test/functional/reports',
  // page_objects_path: 'test/functional/page-objects',
  selenium: {
    start_process: true,
    server_path: './node_modules/nightwatch/bin/selenium.jar',
    cli_args: {
      'webdriver.chrome.driver': './node_modules/nightwatch/bin/chromedriver'
    }
  },
  test_settings: {
    default: {
      selenium_host: 'localhost',
      selenium_port: 4444,
      screenshots: {
        enabled: false
      },
      globals: {
        waitForConditionTimeout: 5000
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['start-maximized']
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true
      }
    }
  }
};

/* eslint-disable */
require('fs').stat(`${BINPATH}/selenium.jar`, (err, stat) => {
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, (error) => {
      if (error) throw new Error(error);
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
/* eslint-enable */

function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? `0${count}` : count.toString();
}

let FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  const a = browser.options.desiredCapabilities;
  const meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  const metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  FILECOUNT += 1;
  return `${SCREENSHOT_PATH}${metadata}_${padLeft(FILECOUNT)}_`;
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;

const findOctober = (text, browser) => {
  browser
    .waitForElementVisible('.datepicker-previous-wrapper')
    .click('.datepicker-previous-wrapper', () => {
      browser.getText('.popover-title > .text-center > span', (result) => {
        if (result.value !== 'October 2017') {
          findOctober(result.value, browser);
        }
      });
    });
};

module.exports = {
  'login sucess': (browser) => {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('.navbar-brand', 5000);
  },

  'change date': (browser) => {
    browser
      .waitForElementVisible('.toggle__button')
      .click('.panel-representates-data-label')
      .waitForElementVisible('.popover-title > .text-center > span')
      .getText('.popover-title > .text-center > span', (result) => {
        if (result.value !== 'October 2017') {
          findOctober(result.value, browser);
        }
      })
      .useXpath()
      .waitForElementVisible("//span[text()='October']", 5000)
      .useCss()
      .click('.popover-content > table > tbody > tr:nth-child(5) > td:nth-child(3)')
      .pause(200)
      .getText(
        '#controlled-tab-2-pane-11 > div > div:nth-child(1) ' +
        '> div > div.react-grid-Main > div > div:nth-child(2) ' +
        '> div > div > div > div:nth-child(1) > div:nth-child(7) ' +
        '> div > div > span > div',
        (result) => {
          browser.assert.equal(result.value, 'IVAN');
        }
      );
  },

  'filter test': (browser) => {
    browser
      .click('#controlled-tab-2-pane-11 > div > div:nth-child(1) > div > div.react-grid-Toolbar > div > button')
      .waitForElementVisible('#controlled-tab-2-pane-11 > div > div:nth-child(1) > div > div.react-grid-Main > div > div.react-grid-Header > div:nth-child(2) > div > div:nth-child(7) > div:nth-child(1) > div > input')
      .setValue('#controlled-tab-2-pane-11 > div > div:nth-child(1) > div > div.react-grid-Main > div > div.react-grid-Header > div:nth-child(2) > div > div:nth-child(7) > div:nth-child(1) > div > input', 'Samuel')
      .pause(200)
      .getText(
        '#controlled-tab-2-pane-11 > div > div:nth-child(1) ' +
        '> div > div.react-grid-Main > div > div:nth-child(2) ' +
        '> div > div > div > div:nth-child(1) > div:nth-child(7) ' +
        '> div > div > span > div',
        (result) => {
          browser.assert.equal(result.value, 'SAMUEL');
        }
      )
      .clearValue('#controlled-tab-2-pane-11 > div > div:nth-child(1) > div > div.react-grid-Main > div > div.react-grid-Header > div:nth-child(2) > div > div:nth-child(7) > div:nth-child(1) > div > input')
      .setValue('#controlled-tab-2-pane-11 > div > div:nth-child(1) > div > div.react-grid-Main > div > div.react-grid-Header > div:nth-child(2) > div > div:nth-child(7) > div:nth-child(1) > div > input', 'E')
      .pause(100)
      .getText(
        '#controlled-tab-2-pane-11 > div > div:nth-child(1) ' +
        '> div > div.react-grid-Main > div > div:nth-child(2) ' +
        '> div > div > div > div:nth-child(1) > div:nth-child(7) ' +
        '> div > div > span > div',
        (result) => {
          browser.assert.equal(result.value, 'ELEANDRO');
        }
      );
  },

  'agroup data': (browser) => {
    browser
      .useXpath()
      .click('//*[@id="controlled-tab-3-pane-21"]/div/div/form/div[2]/div/div/label')
      .pause(300)
      .getText(
        '//*[@id="controlled-tab-2-pane-11"]/div/div[1]/div/div[2]/div/div[2]/div/div/div/div[1]/div[8]/div/div/span/div',
        (result) => {
          browser.assert.equal(result.value, '180');
        }
      )
      .click('//*[@id="controlled-tab-3-pane-21"]/div/div/form/div[2]/div/div/label')
      .pause(300)
      .getText(
        '//*[@id="controlled-tab-2-pane-11"]/div/div[1]/div/div[2]/div/div[2]/div/div/div/div[1]/div[8]/div/div/span/div',
        (result) => {
          browser.assert.equal(result.value, '1192');
        }
      );
  },

  'more filters': (browser) => {
    browser
      .setValue('//*[@id="controlled-tab-2-pane-11"]/div/div[1]/div/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div/input', 'sc')
      .getText(
        '//*[@id="controlled-tab-2-pane-11"]/div/div[1]/div/div[2]/div/div[2]/div/div/div/div[1]/div[7]/div/div/span/div',
        (result) => {
          browser.assert.equal(result.value, 'LAERCIO');
        }
      )
      .setValue('//*[@id="controlled-tab-2-pane-11"]/div/div[1]/div/div[2]/div/div[1]/div[2]/div/div[4]/div[1]/div/input', 'am')
      .getText(
        '//*[@id="controlled-tab-2-pane-11"]/div/div[1]/div/div[2]/div/div[2]/div/div/div/div[1]/div[7]/div/div/span/div',
        (result) => {
          browser.assert.equal(result.value, 'JEANCARLOS');
        }
      );
  },

  'end ': (browser) => {
    browser.end();
  }
};

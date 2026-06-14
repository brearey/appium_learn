const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Medium Phone API 36',
  'appium:browserName': 'Chrome',
  'appium:chromedriverAutodownload': true,
  'appium:noReset': true, // Не сбрасывать состояние между сессиями
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    await driver.url('https://ykt.ru');
    console.log('✅ Сайт открыт');
    await driver.pause(3000);
    const title = await driver.getTitle();
    console.log('📄 Заголовок:', title);
  } catch (err) {
    console.error('❌ Ошибка:', err.message);
  } finally {
    // Упрощенное закрытие без дополнительных проверок
    await driver.deleteSession().catch(() => {});
  }
}

runTest();
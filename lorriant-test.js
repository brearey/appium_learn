const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Medium Phone API 36',
  'appium:appPackage': 'package:com.android.chrome',
  // 'appium:appActivity': '.Settings',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

(async () => {
    const client = await remote(wdOpts);
    try {
        await client.url('https://lorriant.ru');
        // Wait for page to load and check HTTP status via performance logs
        const logs = await client.getLogs('performance');
        const networkResponse = logs.find(log => {
            try {
                const message = JSON.parse(log.message).message;
                return message.method === 'Network.responseReceived' &&
                    message.params.response.url === 'https://lorriant.ru' &&
                    message.params.response.status === 200;
            } catch (e) { return false; }
        });
        if (networkResponse) {
            console.log('✅ lorriant.ru loaded with status 200');
        } else {
            console.error('❌ Failed to verify status 200 for lorriant.ru');
            process.exit(1);
        }
    } finally {
        await client.deleteSession();
    }
})();

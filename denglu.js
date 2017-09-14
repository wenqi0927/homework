require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver;
var By = webdriver.By;
var fs = require('fs');
var path = require('path')
var rootpath = getRootPath();
let rootPath = path.resolve(__dirname);


function getRootPath() {
    let rootPath = path.resolve(__dirname);
    while (rootPath) {
        if (fs.existsSync(rootPath + '/package.json')) {
            break;
        }
        rootPath = rootPath.substring(0, rootPath.lastIndexOf(path.sep));
    }
    return rootPath;
}

describe('登录', function () {
    this.timeout(60000);

    describe('用例1：登陆正确用户', function () {
        before(async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();
            await driver.get('http://192.168.238.128:3000/signin');
               
        });
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootpath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('输入用户名', async function () {
            await driver.findElement(By.id('name')).sendKeys('1505399200170');
        });
        it('输入密码', async function () {
            await driver.findElement(By.id('pass')).sendKeys('123456');
        });
        it('点击登陆按钮', async function () {
            await driver.findElement(By.className('span-primary')).click();
        });
    });
    describe('用例2：输入错误用户名', function () {
        before(async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();
            await driver.get('http://192.168.238.128:3000/signin');
               
        });
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootpath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('输入用户名', async function () {
            await driver.findElement(By.id('name')).sendKeys('1505399');
        });
        it('输入密码', async function () {
            await driver.findElement(By.id('pass')).sendKeys('123456');
        });
        it('点击登陆按钮', async function () {
            await driver.findElement(By.className('span-primary')).click();
        });
    });
    describe('用例3：输入错误密码', function () {
        before(async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();
            await driver.get('http://192.168.238.128:3000/signin');
               
        });
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootpath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('输入用户名', async function () {
            await driver.findElement(By.id('name')).sendKeys('1505399200170');
        });
        it('输入密码', async function () {
            await driver.findElement(By.id('pass')).sendKeys('1234');
        });
        it('点击登陆按钮', async function () {
            await driver.findElement(By.className('span-primary')).click();
        });
    });
    describe('用例4：用户名为空', function () {
        before(async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();
            await driver.get('http://192.168.238.128:3000/signin');
               
        });
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootpath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('输入用户名', async function () {
            await driver.findElement(By.id('name')).sendKeys('');
        });
        it('输入密码', async function () {
            await driver.findElement(By.id('pass')).sendKeys('1234');
        });
        it('点击登陆按钮', async function () {
            await driver.findElement(By.className('span-primary')).click();
        });
    });
    describe('用例5：密码为空', function () {
        before(async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();
            await driver.get('http://192.168.238.128:3000/signin');
               
        });
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootpath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('输入用户名', async function () {
            await driver.findElement(By.id('name')).sendKeys('1505399200170');
        });
        it('输入密码', async function () {
            await driver.findElement(By.id('pass')).sendKeys('');
        });
        it('点击登陆按钮', async function () {
            await driver.findElement(By.className('span-primary')).click();
        });
    });
});

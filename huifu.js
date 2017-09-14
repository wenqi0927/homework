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

    describe('用例1：回复话题', function () {
        before(async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();
            await driver.get('http://192.168.238.128:3000/signin');
            await driver.findElement(By.id('name')).sendKeys('1505399200170');
            await driver.findElement(By.id('pass')).sendKeys('123456');
            await driver.findElement(By.className('span-primary')).click();
        });
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootpath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('点击话题', async function () {
            await driver.findElement(By.xpath('//*[@id="topic_list"]/div[1]/span[1]')).click();
            await driver.sleep(2000)
        });    
        it('点击输入框输入回复内容', async function () {
            await driver.findElement(By.className('CodeMirror-scroll')).click();
            await driver.actions().mouseMove(driver.findElement(By.className('CodeMirror-scroll'))).sendKeys('呵呵').perform();
        });
        it('点击回复', async function () {
            await driver.findElement(By.xpath('//*[@id="reply_form"]/div/div/div[3]/input')).click()
        });
    });   
});
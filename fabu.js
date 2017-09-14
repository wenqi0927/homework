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

    describe('用例1：发布分享话题', function () {
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
        it('点击发布话题按钮', async function () {
            await driver.findElement(By.id('create_topic_btn')).click();
        });
        it('选择板块', async function () {
            await driver.findElement(By.id('tab-value')).click();
        });
        it('选择分享', async function () {
            await driver.findElement(By.xpath('//*[@id="tab-value"]/option[2]')).click();
        });
        it('输入标题', async function () {
            await driver.findElement(By.id('title')).sendKeys('长恨歌')
        });
        it('点击输入框输入内容', async function () {
            await driver.findElement(By.className('CodeMirror-scroll')).click();
            await driver.actions().mouseMove(driver.findElement(By.className('CodeMirror-scroll'))).sendKeys('汉皇重色思倾国，御宇多年求不得').perform();
        });
        it('点击提交', async function () {
            await driver.findElement(By.xpath('//*[@id="create_topic_form"]/fieldset/div/div/div[4]/input')).click()
        });
    });
    describe('用例2：发布问答话题', function () {
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
        it('点击发布话题按钮', async function () {
            await driver.findElement(By.id('create_topic_btn')).click();
        });
        it('选择板块', async function () {
            await driver.findElement(By.id('tab-value')).click();
        });
        it('选择问答', async function () {
            await driver.findElement(By.xpath('//*[@id="tab-value"]/option[3]')).click();
        });
        it('输入标题', async function () {
            await driver.findElement(By.id('title')).sendKeys('走在冷风中')
        });
        it('点击输入框输入内容', async function () {
            await driver.findElement(By.className('CodeMirror-scroll')).click();
            await driver.actions().mouseMove(driver.findElement(By.className('CodeMirror-scroll'))).sendKeys('寻寻觅觅').perform();
        });
        it('点击提交', async function () {
            await driver.findElement(By.xpath('//*[@id="create_topic_form"]/fieldset/div/div/div[4]/input')).click()
        });
    });   
});
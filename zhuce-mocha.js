require('chromedriver')
var webdriver = require('selenium-webdriver');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
//const url = 'mongodb://192.168.238.128:27017/node_club_dev';
let By = webdriver.By;
let path = require('path')
let driver = new webdriver.Builder().forBrowser('chrome').build();
let fs = require('fs');
let sunny = new Date().valueOf()
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

describe('注册', function () {
    this.timeout(60000);

    describe('注册账号', function () {
        before(function () {
          
            console.log("before")
        })
        
        after(async function () {
            let user = new Date().valueOf();
            await driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(rootPath + "/screenshots/" + user + '.png', imagedata, 'base64')
            })
            await driver.quit();
        });
        it('进入页面', async function () {
            await driver.get("http://192.168.238.128:3000")
        });
        it('点击注册按钮', async function () {
            await driver.findElement(By.xpath('/html/body/div[1]/div/div/ul/li[5]/a')).click();
        });
         it('输入用户名', async function () {
             await driver.findElement(By.id('loginname')).sendKeys(sunny)
         });
         it('输入密码', async function () {
             await driver.findElement(By.id('pass')).sendKeys('123456')
         });
         it('输入确认密码', async function () {
             await driver.findElement(By.id('re_pass')).sendKeys('123456')
         });
         it('输入电子邮箱', async function () {
             await driver.findElement(By.id('email')).sendKeys(`${sunny}@163.com`)  // user+"@domain.com"
         });
         it('点击注册按钮', async function () {
             await driver.findElement(By.xpath('//*[@id="signup_form"]/div[5]/input')).click() 
         });
    });
    
});


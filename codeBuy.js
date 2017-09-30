var request = require('request');
var robot = require("robotjs");
var fs = require("fs");
var tgManipulator = require('./tg_manipulator');

var telephone = "errstandart", vereficationCode = "errstandart";

var conf = fs.readFileSync("web-int/config.cfg", "utf8");
var apikey = conf;

var idtele, vereID, laterCode;

var names = ["Dima" , "Kolya", "Abarm", "August", "Agey", "Bazhen", "Borey", "Vadim", "Vlas", "Gleb", "Georgy", "Demid", "Denis", "Efim", "David", "Nikita"];
var surnames = ["Onegin", "Karelin", "Bunin", "Tolstoy", "Pushkin", "Gavr", "Chehov", "Lopin", "Repin", "Donatello"];

var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

robot.setMouseDelay(2);

/* --------------------------------------
            Set help functions
 -------------------------------------- */

function getApiKey() {
    var defg = fs.readFileSync("web-int/config.cfg", "utf8");
    console.log(typeof defg);
    return fs.readFileSync("web-int/config.cfg", "utf8");
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNowTime() {
    var now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

/* --------------------------------------
                Work alcohol
 -------------------------------------- */
var getIdTele = function () { // функция для взятия id сервиса (telegram)
    if(apikey != ""){
        var URL = 'https://sms-acktiwator.ru/api/getservices/' + apikey;
        request(URL, function (err, res, body) {
            if (err) throw err;
            var contents = JSON.parse(body);
            for(var i = 0; i < contents.length; i++){
                if(contents[i].name == "telegram"){
                    idtele = contents[i].id;
                    break;
                }
            }
            robot.moveMouse(width/2, height+120);
            robot.mouseClick();
            orderNum(idtele);
        });
    }
    else{
        console.log(getNowTime() + " Нет API ключа");
    }
};

var orderNum = function (idx) { // заказывает номер
    var URL = 'https://sms-acktiwator.ru/api/getnumber/' + apikey + '?id=' + idx;
    request(URL, function (errs, ress, bodyb) {
        if (errs) throw err;
        console.log(getNowTime() + " Ответ заказа номера: " + bodyb);
        var contentss = JSON.parse(bodyb);

            telephone = contentss.number;
            console.log(getNowTime() + " tel " + telephone);

            robot.moveMouse(width/2, height);
            robot.mouseClick();
            robot.typeString(telephone.replace('+7', ''));
            robot.moveMouse(width/2, height+100);
            robot.mouseClick();

            setTimeout(function () {
                console.log(getNowTime() + " id " + contentss.id);
                robot.moveMouse(width/2+100, height-140);
                robot.mouseClick();
                vereID = contentss.id;
                getCode(contentss.id);
            }, 2000);

    });
};

var getCode = function (idact) { // получает код
    var URL = 'https://sms-acktiwator.ru/api/getlatestcode/' + apikey + '?id=' + idact;
    console.log(getNowTime() + " " + URL);
    var rte = setInterval(function () {
        request(URL, function (errk, resk, bodymdn) {
            if (errk) throw err;
            if(bodymdn != ""){
                setetCode(bodymdn);
                clearInterval(rte);
            }
            else {
                console.log(getNowTime() + " no code");
            }
        });
    }, 5000);
};

var setetCode = function (bdy) {
    vereficationCode = bdy;
    console.log(getNowTime() + " code " + bdy);

    setTimeout(function () {
        setTimeout(function () {
            robot.moveMouse(width/2, height-70);
            robot.mouseClick();
            robot.typeString(bdy);
            laterCode = bdy;
            robot.moveMouse(width/2, height+100);
            robot.mouseClick();
            var namess = getRandom(0, names.length-2);
            var surnamess = getRandom(0, surnames.length-2);
            setTimeout(function () {
                robot.moveMouse(width/2, height-70);
                robot.mouseClick();
                robot.typeString(names[namess]);

                robot.moveMouse(width/2, height);
                robot.mouseClick();
                robot.typeString(surnames[surnamess]);

                robot.moveMouse(width/2, height+100);
                robot.mouseClick();

                setTimeout(function () {
                    robot.moveMouse(width/50, height/8);
                    robot.mouseClick();
                    setTimeout(function () {
                        robot.moveMouse(width/30, height);
                        robot.mouseClick();
                    },500);
                    setTimeout(function () {
                        var hegmeg = 1.001;
                        vv = height/2;
                        for(var i = 0; i == 0; ){
                            // console.log(hegmeg+=0.001);
                            robot.moveMouse(width/hegmeg, vv);
                            if(robot.getPixelColor(width/hegmeg, vv) == "a2a5a7"){
                                i = 1;
                                console.log(width/hegmeg + " " + vv);
                                robot.mouseToggle("down");
                                robot.dragMouse(0, 1000);
                                robot.mouseToggle("up");

                                vk = height*1.77;
                                hegmeg = 1.001;
                                setTimeout(function () {
                                    for(var i = 0; i == 0; ){
                                        robot.moveMouse(width/hegmeg, vk);
                                        if(robot.getPixelColor(width/hegmeg, vk) == "3ac6c3"){
                                            i = 1;
                                            console.log(width/hegmeg + " " + vk);
                                            robot.moveMouse(width/hegmeg, vk);
                                            robot.mouseClick();
                                            vk = height+40;
                                            hegmeg = 1.001;
                                            setTimeout(function () {
                                                for(var i = 0; i == 0; ){
                                                    robot.moveMouse(width/hegmeg, vk);
                                                    if(robot.getPixelColor(width/hegmeg, vk) == "3e3336"){
                                                        i = 1;
                                                        console.log(width/hegmeg + " " + vk);
                                                        robot.moveMouse(width/hegmeg, vk);
                                                        robot.mouseClick();
                                                    }
                                                    else{
                                                        //console.log(hegmeg + " " + robot.getPixelColor(width/hegmeg, vk));
                                                        hegmeg+=0.05;
                                                    }
                                                }
                                            },1500);
                                        }
                                        else{
                                            //console.log(hegmeg + " " + robot.getPixelColor(width/hegmeg, vk));
                                            hegmeg+=0.05;
                                        }
                                    }
                                },1500);
                            }
                            else{
                                //console.log(hegmeg + " " + robot.getPixelColor(width/hegmeg, vv));
                                hegmeg+=0.001;
                            }
                        }
                    }, 1000);
                }, 2000);
            }, 2000);
        }, 1000);
    }, 1000);
};

/* --------------------------------------
             Outer alcohol
 -------------------------------------- */
var getActiveCode = function (vereff) {
    var URL = 'https://sms-acktiwator.ru/api/getlatestcode/' + apikey + '?id=' + vereff;
    var rts = setInterval(function () {
        request(URL, function (errk, resk, bodymdn) {
            if (errk) throw err;
            if(bodymdn != "" && bodymdn != laterCode){
                console.log(getNowTime() + " new code " + bodymdn);
                clearInterval(rts);
                return bodymdn;
            }
            else {
                console.log(getNowTime() + " no code; getActiveCode function;");
            }
        });
    }, 1000);
};

/* --------------------------------------
     Export functions and variable
 -------------------------------------- */
module.exports.tel = telephone;
module.exports.vereID = vereID;
module.exports.getIdTele = getIdTele;
module.exports.getActiveCode = getActiveCode;
module.exports.getApiKey = getApiKey;
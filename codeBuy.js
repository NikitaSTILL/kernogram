var request = require('request');
var robot = require("robotjs");
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
        if(typeof contentss.name != "undefined" && contentss.name != "error"){
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
        }
        else{
            console.log(getNowTime() + " Возникла ошибка: " + contentss.message);
        }
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
                        robot.moveMouse(width/1.46, height/2);
                        robot.mouseToggle("down");
                        robot.dragMouse(0, 1000);
                        robot.mouseToggle("up");
                    }, 1000);

                    setTimeout(function () {
                        robot.moveMouse(width/2.7, height*1.77);
                        robot.mouseClick();
                    },1500);

                    setTimeout(function () {
                        robot.moveMouse(width/1.7, height+40);
                        robot.mouseClick();
                        setTimeout(function () {
                            tgManipulator.main(telephone.replace('+7', ''), vereID);
                            getActiveCode(vereID);
                        },1000);
                    },2000);
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
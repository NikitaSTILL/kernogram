var request = require('request');
var robot = require("robotjs");

var telephone = "errstandart";
var vereficationCode = "errstandart";
var apikey = "8a5c7acd85e37a86a40247c9650c17c25a52da81";
var idtele;

var names = ["Dima" , "Kolya", "Abarm", "August", "Agey", "Bazhen", "Borey", "Vadim", "Vlas", "Gleb", "Georgy", "Demid", "Denis", "Efim"];
var surnames = ["Onegin", "Karelin", "Bunin", "Tolstoy", "Pushkin", "Gavr", "Chehov", "Lopin", "Repin", "Donatello"];

var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

robot.setMouseDelay(2);

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getIdTele = function () { // функция для взятия id сервиса (telegram)
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
        //console.log(idtele);
        robot.moveMouse(width/2, height+120);
        robot.mouseClick();
        orderNum(idtele);
    });
};

var orderNum = function (idx) { // заказывает номер
    var URL = 'https://sms-acktiwator.ru/api/getnumber/' + apikey + '?id=' + idx;
    request(URL, function (errs, ress, bodyb) {
        if (errs) throw err;
        console.log("1" + bodyb);
        var contentss = JSON.parse(bodyb);
        if(typeof contentss.name !== "undefined" && contentss.name != "error"){


        telephone = contentss.number;
        console.log("tel " + telephone);

        robot.moveMouse(width/2, height);
        robot.mouseClick();
        robot.typeString(telephone.replace('+7', ''));
        robot.moveMouse(width/2, height+100);
        robot.mouseClick();

        setTimeout(function () {
            console.log("id " + contentss.id);
            robot.moveMouse(width/2+100, height-140);
            robot.mouseClick();
            getCode(contentss.id);
        }, 2000);
        }
        else{
            console.log(contentss.message);
        }
        // for(var j = 0; j == 0; ){
        //     if(parseInt(contentss.send) > 0){
        //
        //         j = 1;
        //     }
        // }
    });
};

var getCode = function (idact) { // получает код
    var URL = 'https://sms-acktiwator.ru/api/getlatestcode/' + apikey + '?id=' + idact;
    // request(URL, function (errk, resk, body) {
    // if (errk) throw err;
    //     console.log("2" + body);
    //     console.log("url " + URL);
    //     // var contentsk = JSON.parse(bodyk);
    //     vereficationCode = body;
    //     console.log("code " + body);
    //     setTimeout(function () {
    //         robot.moveMouse(width/2+100, height-140);
    //         robot.mouseClick();
    //         setTimeout(function () {
    //             robot.moveMouse(width/2, height-70);
    //             robot.mouseClick();
    //             robot.typeString(vereficationCode);
    //             robot.moveMouse(width/2, height+100);
    //             robot.mouseClick();
    //         }, 4000)
    //     }, 1000);
    // });
    console.log(URL);
    var rte = setInterval(function () {
        request(URL, function (errk, resk, bodymdn) {
            if (errk) throw err;
            if(bodymdn != ""){
                setetCode(bodymdn);
                clearInterval(rte);
            }
            else {
                console.log("none");
            }
        });
    }, 5000);
};

var setetCode = function (bdy) {
    vereficationCode = bdy;
    console.log("code " + bdy);

    setTimeout(function () {
        setTimeout(function () {
            robot.moveMouse(width/2, height-70);
            robot.mouseClick();
            robot.typeString(bdy);
            robot.moveMouse(width/2, height+100);
            robot.mouseClick();
            setTimeout(function () {
                robot.moveMouse(width/2, height-70);
                robot.mouseClick();
                robot.typeString(names[getRandom(0, names.length-1)]);

                robot.moveMouse(width/2, height);
                robot.mouseClick();
                robot.typeString(surnames[getRandom(0, surnames.length-1)]);

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
                    },2000);
                }, 2000);
            }, 1000)
        }, 1000)
    }, 1000);
};

getIdTele();

/*
 1{"id":267017,"number":"+79771020453","send":0}
 tel +79771020453
 id 267017
 2{"name":"error","message":"Сервис не найден","code":400,"status":200,"type":"app\\helpers\\apiException"}
 codeundefined
*/

module.exports.tel = telephone;
module.exports.verefi = vereficationCode;
// module.exports.buyNum = buyNum;
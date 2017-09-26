var buyTel = require('./codeBuy');
var tgManipulator = require('/.tg_manipulator');
buyTel.getIdTele();

/*
    buyTel.tel - телефон
    buyTel.vereID - id автивации
*/

var sqrID = buyTel.vereID;

var endcode = buyTel.getActiveCode(sqrID);
console.log(endcode);// код для авторизации, для реги - ДРУГОЙ!!!(он приватный)
tgManipulator.main(telephone, code); //для одного телефонного номера - 10 приглашений

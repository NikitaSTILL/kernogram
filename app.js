var buyTel = require('./codeBuy');
var tgManipulator = require('/.tg_manipulator');
buyTel.getIdTele();

/*
    buyTel.tel - телефон
    buyTel.vereID - id автивации
*/

var sqrID = buyTel.vereID;

var endcode = buyTel.getActiveCode(sqrID);
tgManipulator.main(buyTel.tel, endcode); //для одного телефонного номера - 10 приглашений

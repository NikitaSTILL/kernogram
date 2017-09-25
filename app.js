var buyTel = require('./codeBuy');

buyTel.getIdTele();

/*
    buyTel.tel - телефон
    buyTel.vereID - id автивации
*/

var sqrID = buyTel.vereID;

var endcode = buyTel.getActiveCode(sqrID); // код для авторизации, для реги - ДРУГОЙ!!!(он приватный)


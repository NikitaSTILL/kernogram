var request = require('request');

var telephone = "errstandart";
var vereficationCode = "errstandart";
var apikey = "ccfdaf232192d74b41ae3c9a2a09850a2fe6707b";
var idtele;
// https://sms-acktiwator.ru/api/getnumber/$api_key?id=$service
var getIdTele = function () {
    var URL = 'https://sms-acktiwator.ru/api/getservices/' + apikey;
    request(URL, function (err, res, body) {
        if (err) throw err;
        // contents = JSON.parse(body);
        var contents = JSON.parse(body);
        // console.log(contents);
        for(var i = 0; i < contents.length; i++){
            if(contents[i].name == "telegram"){
                idtele = contents[i].id;
                break;
            }
        }
        console.log(idtele);
        orderNum(idtele);
    });
};

var orderNum = function (idx) {
    var URL = 'https://sms-acktiwator.ru/api/getnumber/' + apikey + '?id=' + idx;
    request(URL, function (errs, ress, bodyb) {
        if (errs) throw err;

        var contentss = JSON.parse(bodyb);

        telephone = contentss.number;

        console.log(telephone);

        for(var j = 0; j == 0; ){
            if(parseInt(contentss.send) > 0){
                getCode(contentss.id);
                j = 1;
            }
        }
    });
};

var getCode = function (idact) {
    var URL = 'https://sms-acktiwator.ru/api/getnumber/' + apikey + '?id=' + idact;
    request(URL, function (errk, resk, bodyk) {
        if (errk) throw err;

        var contentsk = JSON.parse(bodyk);

        vereficationCode = contentsk.small;

        console.log(vereficationCode);
    });
};

getIdTele();


module.exports.tel = telephone;
module.exports.verefi = vereficationCode;
// module.exports.buyNum = buyNum;
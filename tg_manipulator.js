var express = require('express');
var app = express();
var q = express('q');
var fs = require('fs');
var cB = require('codeBuy');
var Horseman = require('node-horseman');
var horseman = new Horseman();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var array = fs.readFileSync('file.txt').toString().split("\n");

var login;
var id = '';
var code;

const screen_path = 'screen.png';

const agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) ' +
    'Gecko/20100101 Firefox/27.0';
const site = 'https://web.telegram.org/#/login';
const site_group = 'https://web.telegram.org/#/im?p=g229561679';

const form_login = 'form [name="phone_number"]';
const form_code = 'form [name="phone_code"]';
const next_btn = 'button.btn.btn-md.btn-md-primary';

const search_field = 'input';

const options_span = 'body > div.page_wrap > div:nth-child(1) > div > div > div > a.navbar-peer-wrap.peer_photo_init > span';
const add_member_a = 'a.mobile_modal_action';
const select_li = 'i.icon.icon-contact-tick';
const next_li = 'body > div.modal.fade.contacts_modal_window.mobile_modal.in > div.modal-dialog > div > div > div.tg_page_head.tg_modal_head > div > div > div > ul > li.navbar-quick-right > a';

const joinchat_btn = 'a.btn.btn-primary.im_start_btn';

const menu_span = 'span.icon-bar';
const logout_a = 'body > div.page_wrap > div:nth-child(1) > div > div > div > div.navbar-toggle-wrap.dropdown.open > ul > li:nth-child(5) > a';
const logout_confirm_span = 'body > div.modal.fade.confirm_modal_window.in > div.modal-dialog > div > div > div.md_simple_modal_footer > button.btn.btn-md.btn-md-primary > span';

const invite_url = 'https://web.telegram.org/#/im?p=@kukisiii';
var counter = 0;

function loginToTg() {
    console.log('logging with login ' + login + ' and code ' + code + ': ');
    return horseman.userAgent(agent)
        .open(site).log().wait(4000).type(form_login, login)
        .select('body > div.page_wrap > div > div.login_page > div.login_form_wrap > form > div.login_phone_groups_wrap.clearfix > div.md-input-group.login_phone_code_input_group.md-input-has-value.md-input-animated > input', '+7')
        .wait(1000).screenshot('screen.png').click('i').wait(2000).click(next_btn)
        .catch(function (error) {console.log('err: suppose ' + login + ' has been logged'); type2(); throw error;} )
        .wait(3000).screenshot('screen2.png').log('logging in...').wait(1000).log('1').then(
            function (value) {return q.fcall( function () {var code = cB.getActiveCode(id);})}, function (reason) {throw reason})
        .type(form_code, code).screenshot('screen7.png').log('2').wait(1000).log('3')
        .then(function (value) {console.log('4'); return type2();},
            function (reason) {console.log('err while login');});
}

function enterChat() {
    console.log('entering chat: ')
    return horseman.open(invite_url).log().wait(3000).screenshot('big.png').click(joinchat_btn).log('entered').wait(2000).then(function (value) {type3()}, function (reason) {console.log('err in entering chat: suppose ' + login + ' has entered chat'); type3()});
}

function getUser() {
    const lenght = array.length;
    if(lenght === 0) return undefined;
    var user = array[0];
    array.splice(0, 1);
    console.log(user);
    return user;
}

function invitePeople() {
    var user = getUser();
    if (user === undefined) return type1();
    else if (counter === 10){
        console.log('users is out for this account');
        return type1();
    }
    else {
        console.log('inviting ' + user + ' (' + counter++ + ' invitation(s) by ' + login + ' number)');
        horseman
            .open(invite_url).log().wait(1000).screenshot('screen3.png')
            .click(options_span).wait(1000).screenshot('screen4.png')
            .click(add_member_a).wait(1000).screenshot('screen5.png')
            .type(search_field, user).wait(1000).screenshot('screen6.png').log('search login')
            .click(select_li).screenshot('screen7.png')
            .click(next_li).wait(1000).screenshot('screen8.png').log('add login').then(function (value) {
            return invitePeople();
        }, function (reason) {
            console.log('err invite, trying again');
            return invitePeople();
        });
    }
}

function end() {
    console.log('ended with err')
    return horseman.close();
}

function type1() {
     horseman.open('https://www.google.com/').then(function (value) {
        return logout();
    }, function (reason) {
        return logout();
    });
}

function type2(){
    console.log('5');
    horseman.open('https://www.google.com/').then(function (value) {
        console.log('6');
        return enterChat();
    }, function (reason) {
        console.log('7');
        return enterChat();
    });
}

function type3() {
    horseman.open('https://www.google.com/').then(function (value) {
        return invitePeople();
    }, function (reason) {
        return invitePeople();
    });
}

function setAccountDate(t, i) {
    login = t;
    id = i;
}

function logout() {
    console.log('logout from login ' + login);
    horseman
        .open(site).log().wait(1000).screenshot('screen.png')
        .click(menu_span).log('step 1')
        .wait(1000).click(logout_a)
        .log('step 2').screenshot('screen1.png').wait(1000).click(logout_confirm_span)
        .log('logot is end').wait(1000).screenshot('big.png').close();
}

function main(t, c) {
    setAccountDate(t,c);
    loginToTg();
}

module.exports.main = main;
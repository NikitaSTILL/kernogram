var express = require('express');
var fs = require('fs');
var Horseman = require('node-horseman');
var horseman = new Horseman();
const readline = require('readline');

var login = '9525718096';
var code = '60068';

const agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) ' +
    'Gecko/20100101 Firefox/27.0';
const site = 'https://web.telegram.org/#/login';
const site_group = 'https://web.telegram.org/#/im?p=g229561679';

const form_login = 'form [name="phone_number"]';
const form_code = 'form [name="phone_code"]';
const next_btn = 'button.btn.btn-md.btn-md-primary';

const search_field = 'input';

const options_span = 'span.peer_initials.nocopy.user_bgcolor_8';
const add_member_a = 'a.mobile_modal_action';
const select_li = 'i.icon.icon-contact-tick';
const next_li = 'body > div.modal.fade.contacts_modal_window.mobile_modal.in > div.modal-dialog > div > div > div.tg_page_head.tg_modal_head > div > div > div > ul > li.navbar-quick-right > a';

const menu_span = 'span.icon-bar';
const logout_a = 'body > div.page_wrap > div:nth-child(1) > div > div > div > div.navbar-toggle-wrap.dropdown.open > ul > li:nth-child(5) > a';
const logout_confirm_span = 'body > div.modal.fade.confirm_modal_window.in > div.modal-dialog > div > div > div.md_simple_modal_footer > button.btn.btn-md.btn-md-primary > span';

const invite_url = 'https://web.telegram.org/#/im?p=@topchat';
var counter = 0;

function loginToTg(){
    return horseman.userAgent(agent)
        .open(site).log('logging with login ' + login + ' and code ' + code).wait(3000).screenshot('screen.png').type(form_login, login)
        .click('i').wait(1000).click(next_btn)
        .catch(function (error) {console.log('err: suppose ' + login + 'has been logged'); return enterChat();} )
        .wait(3000).screenshot('screen2.png').log('screen2.png store result').wait(1000)
        .type(form_code, code).wait(2000)
        .then(function (value) {return enterChat();},
            function (reason) {console.log('err while login: ' + reason); return end();});
}

function enterChat() {
    return horseman.open(invite_url).wait(1000).screenshot('big.png')
        .click('a.btn.btn-primary.im_start_btn')
        .then(function (value) {invitePeople()},
            function (reason) {console.log('err in entering chat' + reason); horseman.close();});
}

function getUser() {
    var array = fs.readFileSync('file.txt').toString().split("\n");
    const lenght = array.length;
    if(lenght == 0) return undefined;
    var user = array[0];
    array.splice(0, 1);
    fs.writeFileSync('file.txt', array);
    return user;
}

function invitePeople() {
    var user = getUser();
    if (user === undefined) return end();
    if (counter === 10) return type1();
    console.log('inviting ' + user + ' (' + counter++ + ' invitation(s) by ' + login + ' number)');
    horseman
        .open(site_group).log('successful connection to ' + site_group).wait(2000).screenshot('screen3.png')
        .click(options_span).wait(1000).screenshot('screen4.png')
        .click(add_member_a).wait(1000).screenshot('screen5.png').log('screen5.png store result')
        .type(search_field, user).wait(1000).screenshot('screen6.png').log('screen6.png store result')
        .click(select_li).screenshot('screen7.png').log('screen7.png store result')
        .click(next_li).wait(1000).screenshot('screen8.png').log('screen8.png store result').then(function (value) {
        return invitePeople();
    }, function (reason) {
        console.log('err invite, trying again');
        return invitePeople();
    });
}

function end() {
    console.log('ended with err')
    return horseman.close();
}

function type1() {
    horseman.open('https://www.google.com/').log('type1').then(function (value) {
        return logout();
    }, function (reason) {
        return logout();
    });
}

function setAccountDate(t, c) {
    login = t;
    code = c;
}

function logout() {
    console.log('logout from login ' + login);
    horseman
        .open(site).log().wait(1000).screenshot('screen.png')
        .click(menu_span).log('step 1')
        .wait(1000).click(logout_a)
        .log('step 2').screenshot('screen1.png').wait(1000).click(logout_confirm_span)
        .log('logout end').wait(1000).screenshot('big.png').close();
}

function main(t, c) {
    setAccountDate(t,c);
    loginToTg();
}
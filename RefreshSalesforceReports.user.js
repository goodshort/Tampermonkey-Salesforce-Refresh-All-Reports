// ==UserScript==
// @name         RefreshSalesforceReports
// @namespace    https://github.com/goodshort/Tampermonkey-Salesforce-Refresh-All-Reports
// @version      0.8
// @updateURL    https://github.com/goodshort/Tampermonkey-Salesforce-Refresh-All-Reports/raw/main/RefreshSalesforceReports.user.js
// @downloadURL  https://github.com/goodshort/Tampermonkey-Salesforce-Refresh-All-Reports/raw/main/RefreshSalesforceReports.user.js
// @description  Refresh all reports on the Salesforce Homepage
// @author       Adrien Biencourt
// @match        https://*.lightning.force.com/lightning/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        addButton('Refresh All');
    },false);

    function addButton(text, cssObj) {
        cssObj = cssObj || {position: 'fixed', top: '5px', left:'260px', 'z-index': 3, fontWeight: '600', fontSize: '14px', backgroundColor: '#00cccc', color: 'white', border: 'none', padding: '10px 20px', 'border-radius': '15px' }
        let button = document.createElement('button'), btnStyle = button.style
        document.body.appendChild(button)
        button.innerHTML = text
        button.addEventListener('click', function(){
            refreshAll();
        });
        Object.keys(cssObj).forEach(key => {btnStyle[key] = cssObj[key]})
        return button
    }

    function refreshAll() {
        clickButton();
        clickButtonTasks();
    }

    function clickButton() {
        let allButtons = document.getElementsByTagName('button');
        for (var i = 0; allButtons.length > i; i++){
            if (allButtons[i].classList.contains("refreshButton")) {
                console.log("Pressing refresh on report view: " + i);
                allButtons[i].click();
            }
        }
    }

    function clickButtonTasks() {
        let groupButtons = document.getElementsByTagName('force-list-view-manager-button-bar');
        for (var i = 0; groupButtons.length > i; i++){
            groupButtons[i].getElementsByTagName("button")[0].click();
            console.log("Pressing refresh on task view: " + i);
        }
    }

})();

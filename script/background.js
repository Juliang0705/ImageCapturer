/**
 * Created by Juliang on 3/14/16.
 */

chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    chrome.tabs.executeScript(tab.ib, {file: 'script/jquery-2.2.1.min.js'},function(){
        chrome.tabs.executeScript(tab.ib, {file: 'script/jquery-ui.min.js'},function(){
            chrome.tabs.executeScript(tab.ib,{file: 'script/popup.js'});
        });
    });
});
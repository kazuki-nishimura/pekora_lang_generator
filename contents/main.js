'use strict';

const HOST = 'http://127.0.0.1:8080';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    const action = request.action;
    const flag = request.flag;
    let response = [];

    console.log("Arrive in content.js for " + action);

    addStylesheet();

    switch (action) {
        case "translation":
            readPekora(flag); break;
        case "cursor":
            usePekora(flag); break;
        case "image":
            seePekora(flag); break;
        case "almond":
            getAlmondStatus(sendResponse); break;
        default:
            ;
    }

    return true;
});

//
const readPekora = (flag) => {
    Promise.all([
        import("./modules/loading.js"),
        import("./modules/translation.js")
    ]).then( (modules) => {
        // A greeting from Pekora
        console.log("こんぺこ！こんぺこ！こんぺこー！ホロライブ3期生の兎田ぺこらぺこ～！");
        // Display the loading gif
        modules[0].displayLoading();
        // Translate
        (flag) ? modules[1].translate() : modules[1].detranslate();
    });
    console.log("こんぺこ");
}

const usePekora = (flag) => {
    Promise.all([
        import("./modules/loading.js"),
        import("./modules/cursor.js")
    ]).then( (modules) => {
        modules[0].displayLoading();
        (flag) ? modules[1].usePekoraCursor() : modules[1].removePekoraCursor();
    });
}

const seePekora = (flag) => {
    Promise.all([
        import("./modules/loading.js"),
        import("./modules/switch.js")
    ]).then( (modules) => {
        modules[0].displayLoading();
        (flag) ? modules[1].switchImgs() : modules[1].returnOriginalImgs();
    });
}

// 機能の使用状況を把握
const getAlmondStatus = (sendResponse) => {
    import("./modules/almond_status.js").then( module => {
        const almond_status = module.checkAlmondStatus();
        console.log(almond_status);
        sendResponse(almond_status);
    });
}

const addStylesheet = () => {

    // 既に追加済みの場合は戻る;
    if (document.getElementById("loading-css") !== null) { return };

    const stylesheets = ["loading", "image"];

    stylesheets.map( css_name => {
        const link_tag = document.createElement('link');
        link_tag.rel = "stylesheet";
        link_tag.href = chrome.extension.getURL("contents/css/"+css_name+".css");
        link_tag.id = css_name + "-css";
        document.getElementsByTagName('head')[0].appendChild(link_tag);
    })


}

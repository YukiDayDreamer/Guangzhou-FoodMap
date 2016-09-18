function imgCatch(text) {
    text = text.replace(',', ' '); // replace comma to space
    text = text.replace(/\s+/g, " "); // replace mutiple space to one
    
    // attach html elements with img tag
    text = text.replace(/(https?:\/\/[^\s]+)/g, function (url) {
        return '<img src="' + url + '">';
    });

    return text;
}

function loadingText () {
    var text = ["大厨卖力着...", "就要上菜啦...", "食材准备中..."];
    var index = parseInt(Math.random() * text.length);
    return text[index];
}
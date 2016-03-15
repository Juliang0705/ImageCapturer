
function createPopUp(){
    var popup = $('<div></div>')
        .css({
            zIndex : 2147483647,
            position: 'fixed',
            backgroundColor : '#fff',
            width: '400px',
            height : '400px',
            top: '20px',
            right : '20px',
            borderRadius : '10px',
            border : '1px solid #888'})
        .appendTo(document.body);
    return popup;
}

function addCloseButton(parent){
    var imgUrl = chrome.extension.getURL("image/close.png");
    var closeButton = $('<img />',{src: imgUrl, alt: "X"})
        .css({
            position: 'absolute',
            right: '0px'
        })
        .on('click',function(){
            parent.remove();
        })
        .appendTo(parent);
}

(function() {
    var popup = createPopUp();
    addCloseButton(popup);
})();
/*
    set up the pop up panel
 */
function createPanel(){
    var panel = $('<div id="ImageCapturer-Panel"></div>')
        .css({
            zIndex : 2147483647,
            position: 'fixed',
            backgroundColor : '#718C98',
            width: '400px',
            height : '400px',
            top: '20px',
            right : '20px',
            borderRadius : '10px',
            border : '3px solid #FDFCFC'})
        .appendTo(document.body);
}
/*
    set up the close button on the upper right
 */
function addCloseButton(){
    var parent = $('#ImageCapturer-Panel');
    var imgUrl = chrome.extension.getURL("image/close.png");
    var closeButton = $('<img />',{src: imgUrl, alt: "X"})
        .css({
            position: 'absolute',
            right: '0px'
        })
        .on('click',function(){
            parent.remove();
        })
        .on('dragstart',function(event){event.preventDefault();})
        .appendTo(parent);
}
/*
    add the frame for image at the top
 */
function addImageFrame(){
    var parent = $('#ImageCapturer-Panel');
    var imageFrame = $('<div id="ImageCapturer-ImageFrame"></div>')
        .css({
            width: '30%',
            height: '30%',
            borderRadius: '5px',
            margin: '40px auto 0px auto'
        })
        .appendTo(parent);
}
/*
    the container for image info and the current URL page
 */
function addImageDescriptionFrame(){
    var parent = $('#ImageCapturer-Panel');
    $('<div id="ImageCapturer-ImageDescription"></div>')
        .css({
            width: 'auto',
            'word-wrap': 'break-word'
        })
        .appendTo(parent);
}
/*
    @param - image a JQuery img object
 */
String.prototype.filename=function(extension){
    var s= this.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
}
function getImageDescription(image){
    //must be JQuery object and is an image
    if (!(image instanceof jQuery && image.is('img') === true)){
        return null;
    }
    var altText = image.attr('alt');
    var filename = image.attr('src').filename();
    return (altText && altText.length > 0) ? altText : filename;
}

function addImageTextToPanel(text){
    $('<p>'+text+'</p>')
        .css({
            margin: '10px auto',
            'text-align': 'center',
            padding : '0px 5px'
        })
        .appendTo($('#ImageCapturer-ImageDescription'));
}

function addCurrentURL(){
    var url = window.location.href;
    $('<a><p>'+ url +'</p></a>')
        .attr('href',url)
        .css({
            margin: '10px auto',
            'text-align': 'center',
            padding : '0px 5px'
        })
        .appendTo($('#ImageCapturer-ImageDescription'));
}
/*
    animation to prompt the user to drop stuff in it
 */
function promptDropAnimation(){
    function animation (){
        var newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        $('#ImageCapturer-Animation').animate({
            'font-size': '40px',
            'color': newColor
        },2000,reverseAnimation);
    }
    function reverseAnimation(){
        $('#ImageCapturer-Animation').animate({
            'font-size': '20px'
        },2000,animation);
    }
    var parent = $('#ImageCapturer-ImageDescription');
    $('<div id="ImageCapturer-Animation"></div>')
        .append($('<p>' + 'Drop an image here!'+ '</p>'))
        .css({
            'text-align': 'center',
            'font-size': '20px',
        })
        .appendTo(parent);
    animation();
}

/*
    enable drag and drop ability of the panel
 */
function addDragAndDrop(){
    var panel = $('#ImageCapturer-Panel')[0];
    panel.addEventListener('dragover',function(event){
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    },false);
    //JQuery doesn't work on this
    panel.addEventListener('drop',function(event){
        event.stopPropagation();
        event.preventDefault();
        var frame = $('#ImageCapturer-ImageFrame');
        var data = $(event.dataTransfer.getData('text/html'));
        var imageClone = $(data[1]);
        console.debug(data[1]);
        //check if the element is image
        if (imageClone.is('img') === false){
            return;
        }else{
            //empty the current one
            frame.empty();
            $('#ImageCapturer-ImageDescription').empty();
        }
        frame.append(imageClone);
        imageClone.css({
            width : '100%',
            height : '100%'
        });
        var imageText = getImageDescription(imageClone);
        console.debug("Text: "+imageText);
        addImageTextToPanel(imageText);
        addCurrentURL();
    },false);
}


(function() {
    var panel = createPanel();
    addCloseButton();
    addImageFrame();
    addImageDescriptionFrame();
    addDragAndDrop();
    promptDropAnimation();
})();
/*
    set up the pop up panel
 */
function createPopUp(){
    var popup = $('<div id="ImageCapturer-Panel"></div>')
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
/*
    set up the close button on the upper right
 */
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

function addImageFrame(parent){
    var imageFrame = $('<div id="ImageCapturer-ImageFrame"></div>')
        .css({
            width: '30%',
            height: '30%',
            position: 'absolute',
            borderRadius: '5px',
            border : '1px solid #888'
        })
        .appendTo(parent);
    imageFrame.css("left", (parent.width()-imageFrame.width())/2);
    imageFrame.css("top", (parent.height()-imageFrame.height())/2);

    return imageFrame;
}

function getImgSrc(mObj)
{
    var ret = '';
    if( mObj.length > 1 )
    {
        $(mObj).each(function(idx,obj){
            ret = getImgSrc(obj);
            if( ret != '') { return; }
        });
    }
    else if( $(mObj).children().length > 0 )
    {
        $(mObj).children().each(function(idx,obj){
            ret = getImgSrc(obj);
            if( ret != '') { return; }
        });
    }
    else if( $(mObj).prop('tagName').toUpperCase() == 'IMG' )
    {
        ret =  $(mObj).attr('src');
    }
    return ret;
}


function addDragAndDrop(){
    $('#ImageCapturer-Panel')[0].addEventListener('dragover',function(event){
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    },false);
    //JQuery doesn't work on this
    $('#ImageCapturer-Panel')[0].addEventListener('drop',function(event){
        event.stopPropagation();
        event.preventDefault();
        var imageUrl = event.dataTransfer.getData('text/html');
        var $iu = $(imageUrl);
       // var url = getImgSrc($iu);
        console.debug($iu[1]);
        var imageClone = $iu[1];
        //var capturedImage = $('<img src='+ url +'/>').css({
        //    'position' :'absolute',
        //    'max-width': '10%',
        //    'max-height': '10%',
        //    'transform': 'scale(10)',
        //    'top' : '55px',
        //    'left' : '55px'
        //});
        $('#ImageCapturer-ImageFrame').append(imageClone);
    },false);
}
(function() {
    var popup = createPopUp();
    addCloseButton(popup);
    addImageFrame(popup);
    addDragAndDrop();
})();
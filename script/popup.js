/*
    set up the pop up panel
 */
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
    var imageFrame = $('<div id="ImageCapture-ImageFrame"></div>')
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


function addDragAndDrop(widget){
    widget.on('dragover',function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    //JQuery doesn't work on this
    widget[0].addEventListener('drop',function(event){
        event.stopPropagation();
        event.preventDefault();
        var imageUrl = event.dataTransfer.getData('text/html');
        var $iu = $(imageUrl);
        var url = getImgSrc($iu);
        $('#ImageCapture-ImageFrame').append($('<img src='+ url +'/>'));
    },false);
}
(function() {
    var popup = createPopUp();
    addCloseButton(popup);
    addImageFrame(popup);
    addDragAndDrop(popup);
})();
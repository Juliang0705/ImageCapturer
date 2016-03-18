/*
    set up the pop up panel
 */
function createPanel(){
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
    imageFrame.css("top", (parent.height()-imageFrame.height())/6);

    return imageFrame;
}
//
//function getImgSrc(mObj)
//{
//    var ret = '';
//    if( mObj.length > 1 )
//    {
//        $(mObj).each(function(idx,obj){
//            ret = getImgSrc(obj);
//            if( ret != '') { return; }
//        });
//    }
//    else if( $(mObj).children().length > 0 )
//    {
//        $(mObj).children().each(function(idx,obj){
//            ret = getImgSrc(obj);
//            if( ret != '') { return; }
//        });
//    }
//    else if( $(mObj).prop('tagName').toUpperCase() == 'IMG' )
//    {
//        ret =  $(mObj).attr('src');
//    }
//    return ret;
//}


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
        var frame = $('#ImageCapturer-ImageFrame');
        var imageUrl = event.dataTransfer.getData('text/html');
        var $iu = $(imageUrl);
        var imageClone = $iu[1];
        console.debug(imageClone);
        //check if the element is image
        if ($(imageClone).is('img') === false){
            return;
        }else{
            //empty the current one
            frame.empty();
        }
        var cloneContainer = $('<div></div>').append(imageClone);
        frame.append(cloneContainer);
        cloneContainer.css({
            position: 'absolute',
            width: '100%',
            height: '100%'
        });
        cloneContainer.css("left", (frame.width()-cloneContainer.width())/2);
        cloneContainer.css("top", (frame.height()-cloneContainer.height())/2);
        cloneContainer.css("top", (frame.height()-cloneContainer.height())/2);
        $(imageClone).css({
            position: 'absolute',
            width : '100%',
            height : '100%'
        });
    },false);
}


(function() {
    var popup = createPanel();
    addCloseButton(popup);
    addImageFrame(popup);
    addDragAndDrop();
})();
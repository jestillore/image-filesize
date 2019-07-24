chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		title: 'Get image filesize',
		contexts: ['image'],
		id: 'image-filesize'
	});
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === 'image-filesize') {
		var xhr = new XMLHttpRequest();
		xhr.open('HEAD', info.srcUrl, true);
		xhr.onreadystatechange = function(){
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					var bytes = xhr.getResponseHeader('Content-Length');
					alert('Image filesize: ' + getReadableSize(bytes));
				} else {
					alert('ERROR');
				}
			}
		};
		xhr.send(null);
	}
});

function getReadableSize(bytes) {
	var thresh = 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

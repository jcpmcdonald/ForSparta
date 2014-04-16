

/**
 * Determine whether the file loaded from PhoneGap or not
 */
function isPhoneGap() {
	return (typeof cordova === 'undefined' ||
			typeof PhoneGap === 'undefined' ||
			typeof phonegap === 'undefined') 
	&& /^file:\/{3}[^\/]/i.test(window.location.href) 
	&& /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}


function visitExternalPage(page)
{
	if(isPhoneGap())
	{
		navigator.app.loadUrl(page, { openExternal:true });
	}else{
		window.open(page, '_blank');
	}
}


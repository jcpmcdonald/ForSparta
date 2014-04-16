
var _gaq;

function onDeviceReady()
{
	if(isPhoneGap())
	{
		gaPlugin = window.plugins.gaPlugin;
		gaPlugin.init(successHandler, errorHandler, "UA-49961926-1", 10);
	}
	else
	{
		// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		// })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		// 
		// ga('create', 'UA-24238711-6', 'jcpmcdonald.com');
		// ga('send', 'pageview');
		
		_gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-24238711-6']);
		_gaq.push(['_setDomainName', 'jcpmcdonald.com']);
		_gaq.push(['_trackPageview']);
		
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();

	}
	
	Game.start();
	
	Track("Game", "New Game");
}


function Track(category, action, opt_label, opt_value, opt_noninteraction)
{
	//var temp = {"category": category, "action": action, "opt_label": opt_label, "opt_value": opt_value, "opt_noninteraction": opt_noninteraction}
	//log("Analytics", temp);
	if(isPhoneGap())
	{
		if(typeof opt_value === "undefined")
		{
			opt_value = 1;
		}
		gaPlugin.trackEvent( successHandler, errorHandler, category, action, opt_label, opt_value);
	}
	else
	{
		_gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
	}
}




function successHandler(result)
{
	//log("Analytics", "success: " + result);
	//alert("success: " + result);
}

function errorHandler(result)
{
	//log("Analytics", "fail: " + result);
	//alert("fail: "+ result);
}

function onOffline()
{
	//alert("offline!");
}



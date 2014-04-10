

function GameLog($scope)
{
	$scope.logLines = [{name: "System", text: "Game Started"}];
	
	$scope.log = function(name, text)
	{
		$scope.logLines.unshift({name: name, text: text});
	}
}

function log(name, text)
{
	scopeOf("GameLog").log(name, text);
	scopeOf("GameLog").$apply();
}

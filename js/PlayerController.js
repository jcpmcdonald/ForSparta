
function PlayerController($scope)
{
	$scope.players = [{
		name: "You",
		gold: Game.startingGold,
		bid: 0,
		deck: [],
		human: true,
		status: ""
	}, {
		name: "Bob (AI)",
		gold: Game.startingGold,
		bid: 0,
		deck: [],
		human: false,
		status: ""
	}, {
		name: "Sally (AI)",
		gold: Game.startingGold,
		bid: 0,
		deck: [],
		human: false,
		status: ""
	}, {
		name: "Charlie (AI)",
		gold: Game.startingGold,
		bid: 0,
		deck: [],
		human: false,
		status: ""
	}, {
		name: "Leah (AI)",
		gold: Game.startingGold,
		bid: 0,
		deck: [],
		human: false,
		status: ""
	}];
	
	$scope.activePlayers = [];
	$scope.passedPlayers = [];
}

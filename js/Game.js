
var gaPlugin;


window.scopeOf = function(selector){
	return angular.element('[ng-controller=' + selector + ']').scope();
};


// Taken from http://stackoverflow.com/a/6274398/536974
function shuffle(array) {
	var counter = array.length;
	var temp;
	var index;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

var Game = {
	startingGold: 50,
	gameLog: null,
	startingPlayer: 0,
	currentBidder: 0,
	
	currentBid: 0,
	
	deck: [
		{ name: "Pollux",		str: 6, 	dex: 5, 	intel: 0, img: 'TCP Armored 6.jpg' },
		{ name: "Actaeon",		str: 7, 	dex: 4, 	intel: 1, img: 'TCP Armored 5.jpg' },
		{ name: "Tros",			str: 5, 	dex: 5, 	intel: 2, img: 'TCP Dwarf 3.jpg' },
		{ name: "Timanthes",	str: 6, 	dex: 4, 	intel: 3, img: 'TCP Armored 2.jpg' },
		{ name: "Lucius",		str: 9, 	dex: 3, 	intel: 0, img: 'TCP Armored 1.jpg' },
		{ name: "Adelphos",		str: 8, 	dex: 3, 	intel: 1, img: 'TCP Armored 4.jpg' },
		{ name: "Perucles",		str: 9, 	dex: 2, 	intel: 1, img: 'TCP Hero 3.jpg' },
		{ name: "Dienekes",		str: 8, 	dex: 2, 	intel: 2, img: 'TCP Hero 1.jpg' },
		{ name: "Leonidas",		str: 0, 	dex: 6, 	intel: 5, img: 'TCP Scary 7.jpg' },
		{ name: "Melanippos",	str: 1, 	dex: 7, 	intel: 4, img: 'TCP Manimal 8.jpg' },
		{ name: "Heirax",		str: 2, 	dex: 5, 	intel: 5, img: 'TCP Manimal 6.jpg' },
		{ name: "Athos",		str: 3, 	dex: 6, 	intel: 4, img: 'TCP Manimal 1.jpg' },
		{ name: "Octavio",		str: 0, 	dex: 9, 	intel: 3, img: 'TCP Manimal 7.jpg' },
		{ name: "Marcus",		str: 1, 	dex: 8, 	intel: 3, img: 'TCP Armored 3.jpg' },
		{ name: "Azeus",		str: 1, 	dex: 9, 	intel: 2, img: 'TCP Manimal 3.jpg' },
		{ name: "Doris",		str: 2, 	dex: 8, 	intel: 2, img: 'TCP Manimal 2.jpg' },
		{ name: "Cilix",		str: 5, 	dex: 0, 	intel: 6, img: 'TCP Troll 4.jpg' },
		{ name: "Telekles",		str: 4, 	dex: 1, 	intel: 7, img: 'TCP Troll 5.jpg' },
		{ name: "Myrsinus",		str: 5, 	dex: 2, 	intel: 5, img: 'TCP Pirate 4.jpg' },
		{ name: "Issa",			str: 4, 	dex: 3, 	intel: 6, img: 'TCP Pirate 5.jpg' },
		{ name: "Rizon",		str: 3, 	dex: 0, 	intel: 9, img: 'TCP Troll 3.jpg' },
		{ name: "Geleon",		str: 3, 	dex: 1, 	intel: 8, img: 'TCP Troll 2.jpg' },
		{ name: "Eneus",		str: 2, 	dex: 1, 	intel: 9, img: 'TCP Troll 9.jpg' },
		{ name: "Eumelus",		str: 2, 	dex: 2, 	intel: 8, img: 'TCP Human 2.jpg' },
		{ name: "Alcides",		str: 4, 	dex: 5, 	intel: 4, img: 'TCP Zombie 3.jpg' },
		{ name: "Tyndareus",	str: 5, 	dex: 4, 	intel: 4, img: 'TCP Scary 1.jpg' },
		{ name: "Lydus",		str: 4, 	dex: 4, 	intel: 5, img: 'TCP Dwarf 6.jpg' },
		{ name: "Pasiphae",		str: 4, 	dex: 2, 	intel: 1, img: 'TCP Troll 8.jpg' },
		{ name: "Thisbe",		str: 2, 	dex: 4, 	intel: 1, img: 'TCP Troll 1.jpg' },
		{ name: "Anysia",		str: 1, 	dex: 2, 	intel: 4, img: 'TCP Troll 7.jpg' },
	],
	
	combatType: [
		{ name: "Hand to Hand", description: "Str * Dex", combatants: 1, expression: "str*dex" },
		{ name: "Close Quarters", description: "Str * Int", combatants: 1, expression: "str*int" },
		{ name: "Chariots", description: "Dex * Int", combatants: 1, expression: "dex*int" },
		{ name: "Ranged", description: "Str + Dex", combatants: 1, expression: "str+dex" },
		{ name: "Polearms", description: "Str + Int", combatants: 1, expression: "str+int" },
		{ name: "Horseback", description: "Dex + Int", combatants: 1, expression: "dex+int" },
	],
	
	contracts: [
		{ gold: 20 },
		{ gold: 19 },
		{ gold: 18 },
		{ gold: 17 },
		{ gold: 16 },
		
		{ gold: 15 },
		{ gold: 14 },
		{ gold: 13 },
		{ gold: 12 },
		{ gold: 11 },
		
		{ gold: 10 },
		{ gold: 10 },
		{ gold: 9 },
		{ gold: 9 },
		{ gold: 8 },
		
		{ gold: 8 },
		{ gold: 7 },
		{ gold: 7 },
		{ gold: 6 },
		{ gold: 6 },
		
		{ gold: 5 },
		{ gold: 5 },
		{ gold: 4 },
		{ gold: 4 },
		{ gold: 3 },
		
		{ gold: 3 },
		{ gold: 2 },
		{ gold: 2 },
		{ gold: 0 },
		{ gold: 0 },
	],
	
	
	getPlayers: function()
	{
		return scopeOf("PlayerController").players;
	},
	
	getPlayer: function(idx)
	{
		return this.getPlayers()[idx];
	},
	
	start: function()
	{
		this.gameLog = scopeOf("GameLog").log;
		
		this.startingPlayer = this.getPlayer(Math.floor(Math.random() * this.getPlayers().length));
		this.deck = shuffle(this.deck);
		this.combatType = shuffle(this.combatType);
		this.contracts = shuffle(this.contracts);
		
		this.currentBidder = this.startingPlayer;
		scopeOf("PlayerController").activePlayers = shuffle(scopeOf("PlayerController").players.slice(0));
		
		this.startBidding();
		
	},
	
	dealSlaveMarket: function()
	{
		var slaveMarket = [];
		for(var i = 0; i < this.getPlayers().length; i++)
		{
			slaveMarket.push(this.deck.pop());
		}
		scopeOf("TableController").cards = slaveMarket;
		scopeOf("TableController").$apply();
	},
	
	nextPlayer: function(player, players, wrap)
	{
		if(typeof players === 'undefined')
		{
			players = this.getPlayers();
		}
		
		if(typeof wrap === 'undefined')
		{
			wrap = true;
		}
		
		var current = $.inArray(player, players);
		var result;
		
		if(wrap)
		{
			result = players[(current + 1) % players.length];
		}
		else
		{
			result = players[current + 1];
		}
		return result;
	},
	
	startBidding: function()
	{
		this.dealSlaveMarket();
		
		this.currentBid = 0;
		this.currentBidder = scopeOf("PlayerController").activePlayers[0];
		scopeOf("PlayerController").passedPlayers = [];
		
		this.bid();
	},
	
	
	bid: function()
	{
		// Players that have passed can not bit again
		if($.inArray(this.currentBidder, scopeOf("PlayerController").passedPlayers) == -1)
		{
			if(!this.currentBidder.human)
			{
				// Do some kind of calculation to figure out if it's worth voting or not
				if(this.currentBid < 4 || Math.random() < (0.5 - (this.currentBid / 100)))
				{
					// BID
					this.currentBid ++;
					this.currentBidder.bid = this.currentBid;
					this.currentBidder.status = "Bid " + this.currentBidder.bid;
					log(this.currentBidder.name, this.currentBidder.status);
				}
				else
				{
					// PASS
					this.pass(this.currentBidder);
					this.currentBidder.status = "Pass";
					
					// If there's only 1 active player remaining, this bid is over and players select their soldiers
					if(scopeOf("PlayerController").activePlayers.length == 1)
					{
						this.bidWon();
						return;
					}
				}
				this.currentBidder = this.nextPlayer(this.currentBidder, scopeOf("PlayerController").activePlayers, true);
				this.bid(this.currentBidder);
			}
			else
			{
				// Do nothing until the player bids
				scopeOf("PlayerController").$apply();
				var minBid = this.currentBid + 1;
				
				var options = "";
				for(var i = minBid; i < this.currentBidder.gold && i < minBid + 10; i++)
				{
					options += '<li><a href="#" onClick="Game.playerBid(' + i +');">' + i + '</a></li>';
				}
				
				$("#playerAction").append('\
					<div class="btn-group dropup">\
						<button type="button" class="btn btn-danger"  onClick="Game.playerPass();">Pass</button> \
						<button type="button" class="btn btn-primary" onClick="Game.playerBid(' + minBid +');">Bid ' + minBid + '</span></button> \
						<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button> \
						<ul class="dropdown-menu" role="menu">' + options + '</ul> \
					</div> \
					');
			}
		}
		else
		{
			this.currentBidder = this.nextPlayer(this.currentBidder, scopeOf("PlayerController").activePlayers, true);
			this.bid(this.currentBidder);
		}
	},
	
	
	pass: function(player)
	{
		var cost = Math.ceil(this.currentBidder.bid / 2);
		this.currentBidder.gold -= cost;
		log(this.currentBidder.name, "Passed, paying half their bid: " + cost);
		
		// Remove them from the active players
		scopeOf("PlayerController").activePlayers.splice( $.inArray(player, scopeOf("PlayerController").activePlayers), 1);
		
		// Add them to the passed players
		scopeOf("PlayerController").passedPlayers.unshift(player);
	},
	
	playerBid: function(bid)
	{
		$("#playerAction").html("");
		this.currentBid = bid;
		this.currentBidder.bid = this.currentBid;
		
		this.currentBidder.status = "Bid " + this.currentBidder.bid;
		log(this.currentBidder.name, this.currentBidder.status);
		
		this.currentBidder = this.nextPlayer(this.currentBidder, scopeOf("PlayerController").activePlayers, true);
		this.bid(this.currentBidder);
	},
	
	playerPass: function()
	{
		$("#playerAction").html("");
		
		this.pass(this.currentBidder);
		this.currentBidder.status = "Pass";
		log(this.currentBidder.name, this.currentBidder.status);
		
		// If there's only 1 active player remaining, this bid is over and players select their soldiers
		if(scopeOf("PlayerController").activePlayers.length == 1)
		{
			this.bidWon();
			return;
		}
		else
		{
			this.currentBidder = this.nextPlayer(this.currentBidder, scopeOf("PlayerController").activePlayers, true);
			this.bid(this.currentBidder);
		}
	},
	
	
	bidWon: function()
	{
		scopeOf("PlayerController").activePlayers[0].gold -= scopeOf("PlayerController").activePlayers[0].bid;
		scopeOf("PlayerController").activePlayers[0].status = "Won for " + scopeOf("PlayerController").activePlayers[0].bid;
		log(scopeOf("PlayerController").activePlayers[0].name, "Won the bid for " + scopeOf("PlayerController").activePlayers[0].bid + "gp and gets their first pick of the slaves");
		
		// Move the players over to the active list
		for(var iPlayer = 0; iPlayer < scopeOf("PlayerController").passedPlayers.length; iPlayer++)
		{
			scopeOf("PlayerController").activePlayers.push(scopeOf("PlayerController").passedPlayers[iPlayer]);
		}
		scopeOf("PlayerController").passedPlayers = [];
		
		scopeOf("PlayerController").$apply();
		$("#action").text("Select your slave");
		$("#action").fadeIn(200).fadeOut(100).fadeIn(200).fadeOut(100).fadeIn(200).fadeOut(100).fadeIn(200);
		
		this.currentBidder = scopeOf("PlayerController").activePlayers[0];
		
		for(var iCard = 0; iCard < scopeOf("TableController").cards.length; iCard++)
		{
			scopeOf("TableController").cards[iCard].owner = null;
		}
		
		this.selectSlave();
	},
	
	
	selectSlave: function()
	{
		var cardsOnTable = scopeOf("TableController").cards;
		if(!this.currentBidder.human)
		{
			// look for a high-value card and take it
			var cardTaken = null;
			while(cardTaken == null || cardTaken.owner != null)
			{
				cardTaken = cardsOnTable[Math.floor(Math.random() * cardsOnTable.length)];
			}
			
			cardTaken.owner = this.currentBidder;
			cardTaken.status = this.currentBidder.name + " Owns";
			this.currentBidder.deck.push(cardTaken);
			log(this.currentBidder.name, "Has selected " + cardTaken.name);
			
			this.currentBidder = this.nextPlayer(this.currentBidder, scopeOf("PlayerController").activePlayers, false);
			
			if(this.currentBidder == null)
			{
				// Next round!
				if(this.deck.length > 0)
				{
					// More bidding rounds
					var onClick = "$('#playerAction').html(''); Game.startBidding();";
					$("#playerAction").html('<button type="button" class="btn btn-primary" onClick="' + onClick + '">Next Round</button>');
				}
				else
				{
					// Start fighting!
					$("#playerAction").html('<button type="button" class="btn btn-primary" onClick="Game.startFight();">Start the Tournament!</button>');
				}
			}
			else
			{
				this.selectSlave(this.currentBidder);
			}
		}
		else
		{
			//scopeOf("TableController").$apply();
			for(var iCard = 0; iCard < cardsOnTable.length; iCard++)
			{
				if(cardsOnTable[iCard].owner == null)
				{
					// Inject a BUY button
					$(".buy:eq(" + iCard + ")").html('<button type="button" class="btn btn-primary btn-xs btn-block" onClick="Game.playerSelectSlave(' + iCard + ');">Select</button>');
				}
			}
			
			// Wait for the player to reply
			return;
		}
	},
	
	
	playerSelectSlave: function(iCard)
	{
		var cardsOnTable = scopeOf("TableController").cards;
		
		$(".buy").html("");
		
		var cardTaken = cardsOnTable[iCard];
		cardTaken.owner = this.currentBidder;
		cardTaken.status = "Taken by " + this.currentBidder.name;
		this.currentBidder.deck.push(cardTaken);
		log(this.currentBidder.name, "Has selected " + cardTaken.name);
		
		this.currentBidder = this.nextPlayer(this.currentBidder, scopeOf("PlayerController").activePlayers, false);
		
		if(this.currentBidder == null)
		{
			// Next round!
			if(this.deck.length > 0)
			{
				// More bidding rounds
				var onClick = "$('#playerAction').html(''); Game.startBidding();";
				$("#playerAction").html('<button type="button" class="btn btn-primary" onClick="' + onClick + '">Next Round</button>');
			}
			else
			{
				// Start fighting!
				$("#playerAction").html('<button type="button" class="btn btn-primary" onClick="Game.startFight();">Start the Tournament!</button>');
			}
		}
		else
		{
			this.selectSlave(this.currentBidder);
		}
	},
	
	
	startFight: function()
	{
		$("#action").html("Select a soldier to fight in the tournament");
		$("#playerAction").html("");
		
		for(var i = 0; i < this.getPlayers().length; i++)
		{
			this.getPlayers()[i].status = "";
		}
		$("#playerOrder").hide();
		$("#passedPlayers").hide();
		$("#playerAction").hide();
		
		
		log("System", "TOURNAMENT STARTED");
		
		scopeOf("TableController").cards = [];
		
		this.dealContracts();
		
		scopeOf("PlayerController").$apply();
	},
	
	
	dealContracts: function()
	{
		var contractsAvail = [];
		for(var i = 0; i < this.getPlayers().length; i++)
		{
			contractsAvail.push(this.contracts.pop());
		}
		contractsAvail = contractsAvail.sort(function(a, b){ return a.gold < b.gold; });
		scopeOf("TableController").contracts = contractsAvail;
		
		for(var iCard = 0; iCard < scopeOf("PlayerController").players[0].deck.length; iCard++)
		{
			$(".fight:eq(" + iCard + ")").html('<button type="button" class="btn btn-danger" onClick="Game.playerFightForContract(' + iCard + ');">Fight!</button>');
		}
		
		scopeOf("TableController").combatType = this.combatType.pop();
		
		
		scopeOf("TableController").$apply();
	},
	
	
	playerFightForContract: function(playerCard)
	{
		var contractsAvail = scopeOf("TableController").contracts;
		
		var selectedCards = [{ card: this.getPlayers()[0].deck[playerCard], player: this.getPlayers()[0] }];
		var combatType = scopeOf("TableController").combatType;
		
		log(this.getPlayers()[0].name, "Has selected " + this.getPlayers()[0].deck[playerCard].name + " to fight for him");
		
		for(var iPlayer = 0; iPlayer < this.getPlayers().length; iPlayer++)
		{
			// Select cards for the AI to use
			if(!this.getPlayers()[iPlayer].human)
			{
				this.getPlayers()[iPlayer].deck.sort(function(a, b){ return Game.calcCardValueInFight(a, combatType) < Game.calcCardValueInFight(b, combatType); });
				
				var selectedCard = null;
				for(var iCard = 0; iCard < this.getPlayers()[iPlayer].deck.length && selectedCard == null; iCard++)
				{
					if(Math.random() > 0.9)
					{
						selectedCard = this.getPlayers()[iPlayer].deck[iCard];
					}
				}
				
				if(selectedCard == null)
				{
					selectedCard = this.getPlayers()[iPlayer].deck[0];
				}
				
				selectedCards.push({card: selectedCard, player: this.getPlayers()[iPlayer]});
			}
		}
		
		selectedCards = selectedCards.sort(function(a, b){ return Game.calcCardValueInFight(a.card, combatType) < Game.calcCardValueInFight(b.card, combatType); });
		
		for(var iCard = 0; iCard < this.getPlayers().length; iCard++)
		{
			selectedCards[iCard].player.gold += contractsAvail[iCard].gold;
			selectedCards[iCard].player.deck.splice( $.inArray(selectedCards[iCard].card, selectedCards[iCard].player.deck), 1);
			
			log(selectedCards[iCard].player.name, "Has taken the " + contractsAvail[iCard].gold + " prize with " + selectedCards[iCard].card.name + " (value of " + this.calcCardValueInFight(selectedCards[iCard].card, combatType) + ")");
		}
		
		
		if(this.contracts.length > 0)
		{
			this.dealContracts();
		}
		else
		{
			// Game over!
			scopeOf("TableController").contracts = [];
			scopeOf("TableController").$apply();
			$(".combatType").hide();
			$("#deck").hide();
			
			var players = this.getPlayers();
			players.sort(function(a, b){ return a.gold < b.gold });
			
			scopeOf("PlayerController").activePlayers = players;
			$("#playerOrder").show();
			scopeOf("PlayerController").$apply();
			
			$("#action").html(players[0].name + " Wins!");
		}
	},
	
	
	
	calcCardValueInFight: function(card, combatType)
	{
		var expr = combatType.expression;
		expr = expr.replace('str', card.str);
		expr = expr.replace('dex', card.dex);
		expr = expr.replace('int', card.intel);
		var result = eval(expr);
		return result;
	},
	
	
}


$(document).ready(function() {
	// are we running in native app or in a browser?
	window.isphone = false;
	if(document.URL.indexOf("http://") === -1 
		&& document.URL.indexOf("https://") === -1
		&& document.URL.indexOf("file://") === -1) {
		window.isphone = true;
	}
	
	if( window.isphone ) {
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		//onDeviceReady();
	}
});

function onDeviceReady() {
	log("System", "onDeviceReady");
	
	Game.start();
	
	if(window.isphone)
	{
		gaPlugin = window.plugins.gaPlugin;
		gaPlugin.init(successHandler, errorHandler, "UA-49961926-1", 10);
	}
}

function successHandler()
{
	alert("success");
}

function errorHandler()
{
	alert("success");
}


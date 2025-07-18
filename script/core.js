function writeHTML(rootDir, fileName){
	$.ajax({
		url: rootDir + "src/html/" + fileName + ".html",
		cache: false,
		async: false,
		success: function(html){
			html = html.replace(/\{\$root\}/g, rootDir);
			for(var i = 0; i < arguments.length - 2; i++){
				html = html.replace(new RegExp("/{$fileName0}/g"), arguments[2+i]);
			}
			document.getElementById(fileName + "-html").innerHTML += html;
		}
	});
}

function writeMember(file, el, model, next){
	$.getJSON(file, function(data){
		for(var i in data){
			var roleUndefFlag = false;
			var html = model;
			html = html.replace(/\{\$generation\}/g, data[i].generation);
			html = html.replace(/\{\$image\}/g, data[i].image);
			html = html.replace(/\{\$name\}/g, data[i].name);
			if(data[i].role == undefined){
				html = html.replace(/\{\$role\}/g, "無し");
				roleUndefFlag = true;
			}else{
				html = html.replace(/\{\$role\}/g, data[i].role);
			}
			html = html.replace(/\{\$study\}/g, data[i].study);
			html = html.replace(/\{\$from\}/g, data[i].from);
			html = html.replace(/\{\$former\}/g, data[i].former);
			html = html.replace(/\{\$attraction\}/g, data[i].attraction);
			html = html.replace(/\{\$motto\}/g, data[i].motto);
			html = html.replace(/\{\$comment\}/g, data[i].comment);
			el.innerHTML += html;
			if(roleUndefFlag){
				$(".now").find(".member-role-head").remove();
				$(".now").find(".member-role").remove();
			}
			$(".now").removeClass("now");
		}
		next();
	});
}

function writeObOg(file, el, model, next){
	$.getJSON(file, function(data){
		for(var i in data){
			html = model;
			html = html.replace(/\{\$generation\}/g, data[i].generation);
			html = html.replace(/\{\$name\}/g, data[i].name);
			el.innerHTML += html;
		}
		next();
	});
}

function setPullButton(){
	$(".pull-up-button").on("click", function(){
		pullUp($(this).parent());
	});
	$(".pull-down-button").on("click", function(){
		pullDown($(this).parent());
	});
}

function pullUp(el){
	el.find(".member-pull").css("display", "none");
	el.find(".pull-up-button").css("display", "none");
	el.find(".pull-down-button").css("display", "flex");
}

function pullDown(el){
	el.find(".member-pull").css("display", "flex");
	el.find(".pull-up-button").css("display", "flex");
	el.find(".pull-down-button").css("display", "none");
}

function writeResult(file, el, model, next){
	$.getJSON(file, function(data){
		var html = model;
		html = html.replace(/\{\$year\}/g, data.year);
		html = html.replace(/\{\$yearName\}/g, data.yearName);
		el.innerHTML += html;
		var game = $("#game");
		var gameModel = game.get(0).innerHTML;
		game.get(0).innerHTML = "";
		for(var i in data.game){
			gameHtml = gameModel;
			gameHtml = gameHtml.replace(/\{\$gameName\}/g, data.game[i].gameName);
			game.get(0).innerHTML += gameHtml;
			var individual = $("#individual");
			if(data.game[i].individual == undefined){
				individual.get(0).outerHTML="";
			}else{
				var individualModel = individual.get(0).innerHTML;
				individual.get(0).innerHTML = "";
				for(var j in data.game[i].individual){
					individualHtml = individualModel;
					individualHtml = individualHtml.replace(/\{\$indiPart\}/g, data.game[i].individual[j].part);
					individual.get(0).innerHTML += individualHtml;
					var result = $("#result");
					var resultModel = result.get(0).innerHTML;
					result.get(0).innerHTML = "";
					for(var k in data.game[i].individual[j].result){
						resultHtml = resultModel;
						resultHtml = resultHtml.replace(/\{\$rank\}/g, data.game[i].individual[j].result[k].rank);
						resultHtml = resultHtml.replace(/\{\$name\}/g, data.game[i].individual[j].result[k].name);
						result.get(0).innerHTML += resultHtml;
					}
					result.removeAttr("id");
				}
				individual.removeAttr("id");
			}
			var team = $("#team");
			if(data.game[i].team == undefined){
				team.get(0).outerHTML="";
			}else{
				var teamModel = team.get(0).innerHTML;
				team.get(0).innerHTML = "";
				for(var j in data.game[i].team){
					teamHtml = teamModel;
					teamHtml = teamHtml.replace(/\{\$teamPart\}/g, data.game[i].team[j].part);
					teamHtml = teamHtml.replace(/\{\$result\}/g, data.game[i].team[j].result);
					team.get(0).innerHTML += teamHtml;
					var match = $("#match");
					var matchModel = match.get(0).innerHTML;
					match.get(0).innerHTML = "";
					for(var k in data.game[i].team[j].match){
						matchHtml = matchModel;
						matchHtml = matchHtml.replace(/\{\$round\}/g, data.game[i].team[j].match[k].round);
						matchHtml = matchHtml.replace(/\{\$opponent\}/g, data.game[i].team[j].match[k].opponent);
						matchHtml = matchHtml.replace(/\{\$ourPoints\}/g, data.game[i].team[j].match[k].ourPoints);
						matchHtml = matchHtml.replace(/\{\$opponentPoints\}/g, data.game[i].team[j].match[k].opponentPoints);
						match.get(0).innerHTML += matchHtml;
					}
					match.removeAttr("id");
					var member = $("#member");
					var memberModel = member.get(0).innerHTML;
					member.get(0).innerHTML = "";
					for(var k in data.game[i].team[j].member){
						memberHtml = memberModel;
						memberHtml = memberHtml.replace(/\{\$member\}/g, data.game[i].team[j].member[k]);
						member.get(0).innerHTML += memberHtml;
					}
					member.removeAttr("id");
				}
				team.removeAttr("id");
			}
		}
		game.removeAttr("id");
		next();
	});
}

function writeHistory(file, el, model, next){
	$.getJSON(file, function(data){
		var html = model;
		html = html.replace(/\{\$year\}/g, data.year);
		el.innerHTML += html;
		var historyBody = $("#history-body");
		var historyBodyModel = historyBody.get(0).innerHTML;
		historyBody.get(0).innerHTML = "";
		for(var i in data.historyBody){
			historyBodyHtml = historyBodyModel;
			historyBodyHtml = historyBodyHtml.replace(/\{\$month\}/g, data.historyBody[i].month);
			historyBodyHtml = historyBodyHtml.replace(/\{\$date\}/g, data.historyBody[i].date);
			historyBody.get(0).innerHTML += historyBodyHtml;
			var text = $("#history-text");
			var textModel = text.get(0).innerHTML;
			text.get(0).innerHTML = "";
			for(var j in data.historyBody[i].text){
				textHtml = textModel;
				textHtml = textHtml.replace(/\{\$text\}/g, data.historyBody[i].text[j]);
				text.get(0).innerHTML += textHtml;
			}
			text.removeAttr("id");
		}
		historyBody.removeAttr("id");
		next();
	});
}

function writeLatest(file, el, model){
	$.getJSON(file, function(data){
		var html = model;
		html = html.replace(/\{\$year\}/g, data.year);
		html = html.replace(/\{\$month\}/g, data.historyBody[0].month);
		html = html.replace(/\{\$date\}/g, data.historyBody[0].date);
		el.innerHTML += html;
	});
}
// ==UserScript==
// @name           TrophyManager - Super Squad
// @version 	   2.0.0
// @description	   Show a super detayled TrophyManager player page.
// @namespace      http://trophymanager.com
// @include        http://static.trophymanager.com/players/*
// @include        http://www.trophymanager.com/players/*
// @include        http://trophymanager.com/players/*
// @include        https://static.trophymanager.com/players/*
// @include        https://www.trophymanager.com/players/*
// @include        https://trophymanager.com/players/*
// @author    	  Joao Manuel Ferreira Fernandes
// @github		  http://github.com/etnepres/trophymanager.git	
// @grant			none
// ==/UserScript==


function embed() {

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function isNaNVer(xnum)
{
if(isNaN(xnum)){ return 0; } else { return xnum;}
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
	
   var oldFunc = makeTable;

   var show_non_pro_graphs = false;
   var filtersAnterior = "";
	
   if(getCookie("show_setpieces") === "true"){
		 document.show_setpieces = true;
   } else {
		 document.show_setpieces = false;
   }
   
   if(getCookie("show_teamA_det") === "true"){
		 document.show_teamA_det = true;
   } else {
		 document.show_teamA_det = false;
   }
   
   if(getCookie("show_teamB_det") === "true"){
		 document.show_teamB_det = true;
   } else {
		 document.show_teamB_det = false;
   }
   
   
	if(getCookie("show_fieldperformance") === "true"){
		 document.show_fieldperformance = true;
   } else {
		 document.show_fieldperformance = false;
   }
   
   
	if(getCookie("show_convocados") === "true"){
		 document.show_convocados = true;
   } else {
		 document.show_convocados = false;
   }

	if(getCookie("show_convocados") == undefined){
		document.show_convocados = true;
	}
   
		//document.show_training = false;


	if(getCookie("show_scoutskills") === "true"){
	document.show_scoutskills = true;
	}else {
	document.show_scoutskills = false;
	}
	
	if(getCookie("show_last_data") === "true"){
	document.show_last_data = true;
	}else {
	document.show_last_data = false;
	}	
	
	if(getCookie("show_total_data") === "true"){
	document.show_total_data = true;
	}else {
	document.show_total_data = false;
	}		
	
   if(getCookie("show_posicoes") === "true"){
	document.show_posicoes = true;
	}else {
	document.show_posicoes = false;
	}
   //			   [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
var positions = [[  1,  3,  1,  1,  1,  3,  3,  2,  2,  2,  1,  3,  3,  3], // D C
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // D L
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // D R
		 [  1,  2,  2,  1,  1,  1,  1,  1,  2,  2,  1,  3,  3,  3], // DM C
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DM L
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DM R
		 [  2,  2,  3,  1,  1,  1,  1,  1,  3,  1,  2,  3,  3,  3], // M C 
		 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M L
		 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M R
		 [  2,  3,  3,  2,  2,  1,  1,  1,  3,  1,  2,  1,  1,  3], // OM C
		 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OM L
		 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OM R
		 [  1,  2,  2,  3,  3,  2,  2,  3,  3,  2,  1,  1,  1,  3], // F
		 [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]]; // GK


// [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]
// Weights need to total 100
var weights = [ [85,12, 3],  // D C
		[70,25, 5],  // D L
		[70,25, 5],  // D R
		[90,10, 0],  // DM C
		[50,40,10],  // DM L
		[50,40,10],  // DM R
		[85,12, 3],  // M C			   
		[90, 7, 3],  // M L
		[90, 7, 3],  // M R
		[90,10, 0],  // OM C
		[60,35, 5],  // OM  L
		[60,35, 5],  // OMR
		[80,18, 2], // F
		[50,42, 8]]; // GK

				  //D C  L  R DMC L  R MC L  R OMC L  R  F  GR                                 
var positionsLost = [[0,20,20,10,30,30,20,40,40,40,40,40,40,40], // D C
					 [20,0,10,30,10,20,40,20,30,40,40,40,40,40], // D L
					 [20,10,0,30,20,10,40,30,20,40,40,40,40,40], // D R
					 [10,30,30,0,20,20,10,30,30,30,40,40,40,40], // DM C
					 [20,10,20,20,0,10,30,10,20,40,20,30,40,40], // DM L
					 [20,20,10,20,10,0,30,20,10,40,30,20,40,40], // DM R
					 [20,40,40,10,30,30,0,20,20,10,30,30,20,40], // M C 
					 [40,20,30,30,10,20,20,0,10,30,10,20,40,40], // M L //rever
					 [40,30,20,30,20,10,20,10,0,30,20,10,40,40], // M R
					 [40,40,40,30,40,40,10,30,30,0,20,20,10,40], // OM C
					 [40,40,40,40,20,30,30,10,20,20,0,10,30,40], // OM L
					 [40,40,40,40,30,20,30,20,10,20,10,0,30,40], // OM R
					 [40,40,40,40,40,40,20,40,40,10,30,30,0,40], // F
					 [100,100,100,100,100,100,100,100,100,100,100,100,100,0]]; // GK
		 
var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F", "GK"];
var positionFullNames = ["Defender Center", "Defender Left", "Defender Right", "Defensive Midfielder Center", "Defensive Midfielder Left", "Defensive Midfielder Right", "Midfielder Center", "Midfielder Left", "Midfielder Right", "Offensive Midfielder Center", "Offensive Midfielder Left", "Offensive Midfielder Right", "Forward", "Goalkeeper"];
var defendingPositionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R"];
document.calculateSkill = function(positionIndex, skills) {
		
		var totSkill = 0;
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				totSkill += skills[i]*document.calculateSkillWeight(positions[positionIndex], weights[positionIndex], i);
			}
		}
		
		totSkill = totSkill / 200; 
		totSkill = Math.round(totSkill*1000)/1000;
		
		return totSkill;
	};
	
	document.calculateSkillWeight = function(positionWeightLevels, weights, index) {
		var weight = 0;
		weight = weights[positionWeightLevels[index]-1] / document.numberAtWeight(positionWeightLevels, positionWeightLevels[index]) * 10;
		return weight;
	};
	
		document.numberAtWeight = function(positionWeightLevels, value) {
		var count = 0;
		for (var i=0; i< positionWeightLevels.length; i++) {
			if (positionWeightLevels[i] == value) {
				count++;
			}
		}
		return count;
	};
	
		document.findPositionIndex = function(position) {
		var index = -1;
		for (var k=0; k< positionNames.length; k++) {
			if (position.indexOf(positionNames[k]) == 0) {
				index = k;
				k = positionNames.length;
			}
		}
		return index;
	};
	
	document.getSkills = function(indicePlayer) {
		var skillArray = [];
		if (players_ar[indicePlayer]["fp"] == "GK"){
		
		skillArray.push(players_ar[indicePlayer]["str"]);
		skillArray.push(players_ar[indicePlayer]["sta"]);
		skillArray.push(players_ar[indicePlayer]["pac"]);
		skillArray.push(players_ar[indicePlayer]["han"]);
		skillArray.push(players_ar[indicePlayer]["one"]);
		skillArray.push(players_ar[indicePlayer]["ref"]);
		skillArray.push(players_ar[indicePlayer]["ari"]);
		skillArray.push(players_ar[indicePlayer]["jum"]);
		skillArray.push(players_ar[indicePlayer]["com"]);
		skillArray.push(players_ar[indicePlayer]["kic"]);
		skillArray.push(players_ar[indicePlayer]["thr"]);
		
		
		} else {
		
		skillArray.push(players_ar[indicePlayer]["str"]);
		skillArray.push(players_ar[indicePlayer]["sta"]);
		skillArray.push(players_ar[indicePlayer]["pac"]);
		skillArray.push(players_ar[indicePlayer]["mar"]);
		skillArray.push(players_ar[indicePlayer]["tac"]);
		skillArray.push(players_ar[indicePlayer]["wor"]);
		skillArray.push(players_ar[indicePlayer]["pos"]);
		skillArray.push(players_ar[indicePlayer]["pas"]);
		skillArray.push(players_ar[indicePlayer]["cro"]);
		skillArray.push(players_ar[indicePlayer]["tec"]);
		skillArray.push(players_ar[indicePlayer]["hea"]);
		skillArray.push(players_ar[indicePlayer]["fin"]);
		skillArray.push(players_ar[indicePlayer]["lon"]);
		skillArray.push(players_ar[indicePlayer]["set"]);
		}
		players_ar[indicePlayer].totalSkill = 0;
		for (var i = 0; i < skillArray.length; i++){
		players_ar[indicePlayer].totalSkill = players_ar[indicePlayer].totalSkill + skillArray[i];
		}
		return skillArray;
	};

		function checkIdPos(positionX) {
		var idPos;
		for (var k=0; k< positionNames.length; k++) {
			if (positionNames[k] == positionX) {
				idPos = k;
			}
		}
		return idPos;
	}
	
	function checkIfDefender(positionX, positionY) {
		var isPositionDefender =  false;
		for (var k=0; k< defendingPositionNames.length; k++) {
			if (defendingPositionNames[k] == positionX || defendingPositionNames[k] == positionY) {
				isPositionDefender = true;
			}
		}
		return isPositionDefender;
	}
	
	function computeSKdefenida(SK,skills){
		var SKs = 0;
		var positionIndex = document.findPositionIndex(SK);
		if (positionIndex > -1) {
			SKs = document.calculateSkill(positionIndex, skills);
		}

		return [[SK],[SKs]];
	}
	function computeSK(idJogador,skills){
	var SKs = [0, 0];

	var positionArray = [];
	var posicoesAntes = players_ar[idJogador]["fp"].split(", ");
	var outraPos = [];	
	if (posicoesAntes.length == 1){
	
		var posicoes = players_ar[idJogador]["fp"].split("\/"); 
		if (posicoes.length == 1){
			outraPos = players_ar[idJogador]["fp"].split(" ");
			if(outraPos.length == 2){
				if(outraPos[1].length >= 2){
				 	positionArray[0] = outraPos[0] + " " + outraPos[1].substring(0,1);
					positionArray[1] = outraPos[0] + " " + outraPos[1].substring(1,2);
				} else {
					positionArray[0] = players_ar[idJogador]["fp"];
				} 
			}
		} else if (posicoes.length == 2){
			var outraPos = posicoes[1].split(" ");
			positionArray[0] = posicoes[0] + " " + outraPos[1];
				positionArray[1] = outraPos[0] + " " + outraPos[1];  

		}
	} else if(posicoesAntes.length == 2){
		positionArray[0] = posicoesAntes[0];
		positionArray[1] = posicoesAntes[1];		
	}
	
	if(players_ar[idJogador]["fp"] =="F"){
		positionArray[0] = "F";
	}
	
	if(players_ar[idJogador]["fp"] =="GK"){
		positionArray[0] = "GK";
	}
	
	for (var i = 0; i < positionArray.length; i++){
			var positionIndex = document.findPositionIndex(positionArray[i]);
			if (positionIndex > -1) {
				SKs[i] = document.calculateSkill(positionIndex, skills);
			}
	}
	return [positionArray,SKs];
	}
	
document.potential = 0;
document.charisma = 0;
document.professionalism = 0;
document.aggression = 0;


function get_potential(){
return document.potential;
}
function get_charisma(){
return document.charisma;
}
function get_professionalism(){
return document.professionalism;
}
function get_aggression(){
return document.aggression;
}

function get_ti_level(){
return document.ti_level;
}
function get_skillsEvoluidas(){
return document.skillsEvoluidas;
}


var national = 1;
var reserves = 1;

document.isPlaying = [];
document.isOnField = [];
document.fieldSpot = [];
document.isOnSub = [];
document.subSpot = [];


function tactics_init_national(idPlayer){
return [document.isPlaying[idPlayer],document.isOnField[idPlayer]];
}
function tactics_init_national_aux()
{
	
	$.ajaxSetup({async: false});
	
	$.post("/ajax/tactics_get.ajax.php",{"reserves":0,"national":1},function(data){

		if(data != null)
		{
			document.players = data["players"];
			document.on_field = data["formation"];
			document.formation_by_pos = data["formation_by_pos"];
			document.on_subs = data["formation_subs"];
			document.on_field_assoc = data["formation_assoc"];
			document.positions = data["positions"];
			
			for(var i_Player in document.players){

			
					if(document.on_field[document.players[i_Player]["player_id"]] != undefined){
						document.isOnField[document.players[i_Player]["player_id"]] = true;
						document.fieldSpot[document.players[i_Player]["player_id"]] = document.on_field[document.players[i_Player]["player_id"]][document.players[i_Player]["player_id"]];
					} else {
						document.isOnField[document.players[i_Player]["player_id"]] = false;
						document.fieldSpot[document.players[i_Player]["player_id"]] = "";
					}
		
					if(document.on_subs[document.players[i_Player]["player_id"]] != undefined){
						document.isOnSub[document.players[i_Player]["player_id"]] = true;
						document.subSpot[document.players[i_Player]["player_id"]] = document.on_subs[document.players[i_Player]["player_id"]];
					} else {
						document.isOnSub[document.players[i_Player]["player_id"]] = false;
						document.subSpot[document.players[i_Player]["player_id"]] = "";
					}
	
					document.isPlaying[document.players[i_Player]["player_id"]] = document.isOnField[document.players[i_Player]["player_id"]] || document.isOnSub[document.players[i_Player]["player_id"]];
	
				
			}
		}
	},"json");
	$.ajaxSetup({async: true});
	

	return [document.isPlaying,document.isOnField,document.fieldSpot,document.isOnSub,document.subSpot];//[info, document.isOnField];

}
var arrayRespostaEquipa = tactics_init_national_aux();
document.isPlaying = arrayRespostaEquipa[0];
document.isOnField = arrayRespostaEquipa[1];
document.fieldSpot = arrayRespostaEquipa[2];
document.isOnSub = arrayRespostaEquipa[3];
document.subSpot = arrayRespostaEquipa[4];

function tactics_init_reserves(idPlayer){
return [document.isPlaying[idPlayer],document.isOnField[idPlayer]];
}
function tactics_init_reserves_aux(idPlayer)
{
	
	$.ajaxSetup({async: false});
	
	$.post("/ajax/tactics_get.ajax.php",{"reserves":1,"national":0},function(data){

	if(data != null)
		{
			document.players = data["players"];
			document.on_field = data["formation"];
			document.formation_by_pos = data["formation_by_pos"];
			document.on_subs = data["formation_subs"];
			document.on_field_assoc = data["formation_assoc"];
			document.positions = data["positions"];
			
			for(var i_Player in document.players){

			
					if(document.on_field[document.players[i_Player]["player_id"]] != undefined){
						document.isOnField[document.players[i_Player]["player_id"]] = true;
						document.fieldSpot[document.players[i_Player]["player_id"]] = document.on_field[document.players[i_Player]["player_id"]][document.players[i_Player]["player_id"]];
					} else {
						document.isOnField[document.players[i_Player]["player_id"]] = false;
						document.fieldSpot[document.players[i_Player]["player_id"]] = "";
					}
		
					if(document.on_subs[document.players[i_Player]["player_id"]] != undefined){
						document.isOnSub[document.players[i_Player]["player_id"]] = true;
						document.subSpot[document.players[i_Player]["player_id"]] = document.on_subs[document.players[i_Player]["player_id"]];
					} else {
						document.isOnSub[document.players[i_Player]["player_id"]] = false;
						document.subSpot[document.players[i_Player]["player_id"]] = "";
					}
	
					document.isPlaying[document.players[i_Player]["player_id"]] = document.isOnField[document.players[i_Player]["player_id"]] || document.isOnSub[document.players[i_Player]["player_id"]];
	
				
			}
		}
	},"json");
	$.ajaxSetup({async: true});
	

	return [document.isPlaying,document.isOnField,document.fieldSpot,document.isOnSub,document.subSpot];//[info, document.isOnField];


}
var arrayRespostaEquipaR = tactics_init_reserves_aux();
document.isPlaying = arrayRespostaEquipaR[0];
document.isOnField = arrayRespostaEquipaR[1];
document.fieldSpot = arrayRespostaEquipaR[2];
document.isOnSub = arrayRespostaEquipaR[3];
document.subSpot = arrayRespostaEquipaR[4];

function get_player_info_history(player_id,show_non_pro_graphs){
	$.ajaxSetup({async: false});
	$.post("http://trophymanager.com/ajax/players_get_info.ajax.php",{"player_id":player_id, "type":"history","show_non_pro_graphs":show_non_pro_graphs},function(data){
		if(data != null){	
			document.thisSeasonData = data["table"]["nat"][0];
			document.allTimeData = data["table"]["nat"][data["table"]["nat"].length-1];
		}		
				
	},"json").error(function(){ });//json
	$.ajaxSetup({async: true});
	
	thisSeasonData = document.thisSeasonData;
	allTimeData = document.allTimeData;
	document.thisSeasonData = [];
	document.allTimeData = [];
	return [thisSeasonData,allTimeData];
}
document.isitreallydata = "";
document.isitreallydataAux = "";

document.hiddenAdapt = 0;
document.hiddenProf = 0;
document.hiddenInj = 0;
document.hiddenAgr = 0;
document.foundHidden = false;
function get_player_info_hidden_skills(player_id){
	$.ajaxSetup({async: false});
	$.get(
    "http://trophymanager.com/players/"+player_id+"/",
    {paramOne : 1, paramX : 'abc'},
    function(data) {
       if(data != null){	
			document.isitreallydata = data.split("class=\"skill_table zebra\" id=\"hidden_skill_table\">")[1].split("</table>")[0];
			document.isitreallydataAux = document.isitreallydata;
			if(document.isitreallydata.split("/20")[1]!=undefined){
				document.foundHidden = true;
				document.isitreallydata= document.isitreallydataAux.split("/20")[1].split("<strong>")[1];
				document.hiddenInj = document.isitreallydata * 1;
				document.isitreallydata= document.isitreallydataAux.split("/20")[3].split("<strong>")[1];
				document.hiddenAgr=document.isitreallydata * 1;
				document.isitreallydata= document.isitreallydataAux.split("/20")[5].split("<strong>")[1];
				document.hiddenProf=document.isitreallydata * 1;
				document.isitreallydata= document.isitreallydataAux.split("/20")[7].split("<strong>")[1];
				document.hiddenAdapt=document.isitreallydata * 1;
				
			} else {
				document.foundHidden = false;
			}
		}		
    }
);
	$.ajaxSetup({async: true});

	isitreallydata = document.isitreallydata;
	foundHidden = document.foundHidden;
		
	hiddenInj=document.hiddenInj;
	hiddenAgr=document.hiddenAgr;
	hiddenProf=document.hiddenProf;
	hiddenAdapt=document.hiddenAdapt;
	
	document.isitreallydata = "";
	document.isitreallydataAux = "";
	
	document.foundHidden = false;
	document.hiddenAdapt = 0;
	document.hiddenProf = 0;
	document.hiddenInj = 0;
	document.hiddenAgr = 0;

	return [foundHidden,hiddenInj,hiddenAgr,hiddenProf,hiddenAdapt];
}

function get_player_info_scout(player_id, player_fp,show_non_pro_graphs){

		
				$.ajaxSetup({async: false});
			$.post("http://trophymanager.com/ajax/players_get_info.ajax.php",{"player_id":player_id, "type":"scout","show_non_pro_graphs":show_non_pro_graphs},function(data){
				
				if(data != null)
				{
					if (data["error"])
					{
						var report_error = data["error"];
					}

					if (data["reports"].length>-1)
					{
						
						for(var eachReport in data["reports"])
						{
							report = data["reports"][eachReport];
							if(report && !report_error)
							{

								//////////////////////////// BLOOM INFO ////////////////////////////////
								bloom_status = "";
								dev_status = "";
								report_age = parseInt(report["report_age"]);
								bloom_age = parseInt(report["bloom_age"]);
								rem_pot = parseFloat(report["remaining_pot"]);
								//var skill_names = ["",global_content["strength"],global_content["stamina"],global_content["pace"],global_content["marking"],global_content["tackling"],global_content["workrate"],global_content["positioning"],global_content["passing"],global_content["crossing"],global_content["technique"],global_content["heading"],global_content["finishing"],global_content["longshots"],global_content["set_pieces"]];
								//var skill_names_gk = ["",global_content["strength"],global_content["stamina"],global_content["pace"],global_content["handling"],global_content["one_on_ones"],global_content["reflexes"],global_content["aerial_ability"],global_content["jumping"],global_content["communication"],global_content["kicking"],global_content["throwing"],data['scout_content'][80]];
								if (report["bloom_status_txt"]!="") {
									bloom_status = report["bloom_status_txt"];
									dev_status = report["dev_status"];
								}
								
								if(report["potential"] > 0){
									if(get_potential() >0){
									document.potential =  (get_potential()*1  +  (report["potential"]*1/2))/2;
									} else {
									document.potential = (report["potential"]*1/2);
									}
								}
								
								if (report["specialist"]>0)//data['scout_content'][67]
								{
									if(player_fp=="GK")
									{
										
										if (report["specialist"]>12) report["specialist"] = 12;
										specialist = report["specialist"];//skill_names_gk[report["specialist"]];
									}
									else
									{
										specialist = report["specialist"];//skill_names[report["specialist"]];
									}
								} else {
									specialist = "N/D";
								}
								
								if (report['peak_phy_txt']!="" || report['peak_tac_txt']!="" || report['peak_tec_txt']!="" || report['charisma']>0 || report['professionalism']>0 || report['aggression']>0)
								{
									//if (report['peak_phy_txt']!="") $div.append(report['peak_phy_txt'],"<br />");
									//if (report['peak_tac_txt']!="") $div.append(report['peak_tac_txt'],"<br />");
									//if (report['peak_tec_txt']!="") $div.append(report['peak_tec_txt'],"<br />");
									if (report['charisma']>0)
									{
										if(get_charisma() >0){
											document.charisma =  (get_charisma()*1  +  report["charisma"]*1)/2;
										} else {
											document.charisma = report["charisma"]*1;
										}
									} 
									
									if (report['professionalism']>0)
									{
										if(get_professionalism() >0){
											document.professionalism =  (get_professionalism()*1  +  report["professionalism"]*1)/2;
										} else {
											document.professionalism = report["professionalism"]*1;
										}
									}
									
									if (report['aggression']>0)
									{
										if(get_aggression() >0){
											document.aggression =  (get_aggression()*1  +  report["aggression"]*1)/2;
										} else {
											document.aggression = report["aggression"]*1;
										}
									}
								}
							}
						} 
					} 
				}
			},"json").error(function(){ });//json
	$.ajaxSetup({async: true});
	potential = document.potential;
	charisma = document.charisma;
	professionalism = document.professionalism;
	aggression = document.aggression;
	
	document.potential = 0;
	document.charisma = 0;
	document.professionalism = 0;
	document.aggression = 0;
	return [potential,charisma,professionalism,aggression];//[aggression] ;


	}


document.ti_level = [];
document.skillsEvoluidas = [];
document.skillsDEvoluidas = [];
function get_player_info_graphs(player_id,show_non_pro_graphs){

		
				$.ajaxSetup({async: false});
			$.post("http://trophymanager.com/ajax/players_get_info.ajax.php",{"player_id":player_id, "type":"graphs","show_non_pro_graphs":show_non_pro_graphs},function(data){
				if(data != null)
				{
						//var ti = parseInt(data.graphs.ti[data.graphs.ti.length-1]);
						document.ti_level = data.graphs.ti;
						if(data.skillpoints.up.length)
						{
							for(var i in data.skillpoints.up)
							{
								document.skillsEvoluidas[i] = data.skillpoints.up[i];//global_content[data.skillpoints.up[i]]
								
							}

						}
						if(data.skillpoints.down.length)
						{
							for(var i in data.skillpoints.down)
							{
								document.skillsDEvoluidas[i] = data.skillpoints.down[i];//global_content[data.skillpoints.up[i]]
								
							}

						}						
				}
			},"json").error(function(){ });//json
	$.ajaxSetup({async: true});
	ti_level = document.ti_level;
	skillsEvoluidas = document.skillsEvoluidas;
	skillsDEvoluidas = document.skillsDEvoluidas;
	document.ti_level = [];
	document.skillsEvoluidas = [];
	document.skillsDEvoluidas = [];
	return [ti_level,skillsEvoluidas,skillsDEvoluidas];//[aggression] ;


	}	
	
	
	document.calculateSkillDefPlay = function(positionX, skills) {
		
		var totSkill = [0,0,[0, 0, 0],[0,0,0,0,0],[0,0,0,0,0]];
		var finReg;
		var finCab;
		var finRem;
		var positionIndex;
		for (var k=0; k< positionNames.length; k++) {
			if (positionNames[k] == positionX) {
				positionIndex = k;
			} 
		}
		/* if(positionIndex==undefined){
			positionIndex= 13;
		} */
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				totSkill[0] += skills[i]*document.calculateSkillWeight(positions[positionIndex], weights[positionIndex], i);
				//totSkill[1] += skills[i];
			}
		}
		for (var i=0; i< skills.length; i++) {
			totSkill[1] = totSkill[1]*1 + skills[i]*1;
		}
		totSkill[0] = totSkill[0] / 200; 
		if(positionIndex == 13){
		totSkill[1] = totSkill[1]*100/220;
		} else {
		totSkill[1] = totSkill[1]*100/280;
		}
		totSkill[1] = (totSkill[0] - totSkill[1]);
		totSkill[0] = Math.round(totSkill[0]*1000)/1000;
		totSkill[1] = Math.round(totSkill[1]*1000)/1000;	
		
		//set pieces
		totSkill[2][0] = ((skills[8]*2+skills[13]*2)+skills[9]*1)/5;// corner
		totSkill[2][1] = ((skills[12]*2+skills[13]*2)+skills[9]*1)/5;// Frk
		totSkill[2][2] = ((skills[11]*2+skills[13]*2)+skills[9]*1)/5;// pen
		
		if(positionIndex != 13){ // is not goalkeeper is defender
			totSkill[3][0] =(skills[3]*3+skills[6]*3+skills[5]*3+skills[4]*2+skills[2]*2+skills[1]*1)/280;
			totSkill[3][1] =(skills[2]*3+skills[4]*3+skills[3]*3+skills[6]*2+skills[5]*2+skills[1]*1+skills[0]*1)/300;
			totSkill[3][2] =(skills[3]*3+skills[6]*3+skills[5]*3+skills[4]*2+skills[2]*2+skills[1]*1)/280;
			totSkill[3][3] =(skills[3]*3+skills[2]*3+skills[6]*3+skills[5]*3+skills[0]*2+skills[10]*2+skills[4]*2+skills[1]*1)/380;
			totSkill[3][4] =(skills[2]*3+skills[3]*2+skills[4]*2+skills[6]*1+skills[5]*1+skills[1]*1)/200;
			
			totSkill[3][0] = Math.round(totSkill[3][0]*10000)/100;
			totSkill[3][1] = Math.round(totSkill[3][1]*10000)/100;
			totSkill[3][2] = Math.round(totSkill[3][2]*10000)/100;
			totSkill[3][3] = Math.round(totSkill[3][3]*10000)/100;
			totSkill[3][4] = Math.round(totSkill[3][4]*10000)/100;
			
			//calculo de potencial para estilo de jogo
			
			totSkill[4][0] = (skills[2]*3+skills[1]*3+skills[7]*3+skills[6]*2+skills[5]*2)/260;
			totSkill[4][1] = (skills[2]*3+skills[9]*3+skills[8]*3+skills[5]*2+skills[1]*2+skills[0]*1)/280;
			totSkill[4][2] = (skills[7]*3+skills[9]*3+skills[5]*2+skills[2]*2+skills[6]*2+skills[1]*2)/280;
			totSkill[4][3] = (skills[7]*3+skills[8]*2+skills[9]*2+skills[6]*1+skills[5]*1+skills[1]*1)/200;
			totSkill[4][4] = (skills[7]*3+skills[9]*3+skills[8]*3+skills[6]*2+skills[5]*2+skills[7]*2+skills[1]*2)/340;
		
			totSkill[4][0] = Math.round(totSkill[4][0]*100);
			totSkill[4][1] = Math.round(totSkill[4][1]*100);
			totSkill[4][2] = Math.round(totSkill[4][2]*100);
			totSkill[4][3] = Math.round(totSkill[4][3]*100);
			totSkill[4][4] = Math.round(totSkill[4][4]*100);
			
			finReg = Math.round((skills[11]*3+skills[9]*3+skills[6]*2+skills[5]*2+skills[0]*1+skills[1]*1+skills[2]*1)/260*100);
			finCab = Math.round((skills[10]*3+skills[0]*2+skills[6]*2+skills[5]*1+skills[2]*1)/180*100);
			finRem = Math.round((skills[13]*3+skills[9]*3+skills[11]*2+skills[6]*1+skills[1]*1)/200*100);
		
			//calculo de potencial para estilo de finalização
			
			if(positionIndex  == 12){//F
			totSkill[4][0] = totSkill[4][0]*0.2 + ((finReg*3+finCab*2+finRem*1)/6)*0.8;
			totSkill[4][1] = totSkill[4][1]*0.2 + ((finReg*2+finCab*3+finRem*1)/6)*0.8;
			totSkill[4][2] = totSkill[4][2]*0.2 + ((finReg*3+finCab*1+finRem*2)/6)*0.8;
			totSkill[4][3] = totSkill[4][3]*0.2 + ((finReg*1+finCab*4+finRem*1)/6)*0.8;
			totSkill[4][4] = totSkill[4][4]*0.2 + ((finReg*4+finCab*1+finRem*1)/6)*0.8; 
			}
			if(positionIndex >= 9 && positionIndex <= 11){//MO
			totSkill[4][0] = totSkill[4][0]*0.45 + ((finReg*3+finCab*2+finRem*1)/6)*0.55;
			totSkill[4][1] = totSkill[4][1]*0.45 + ((finReg*2+finCab*3+finRem*1)/6)*0.55;
			totSkill[4][2] = totSkill[4][2]*0.45 + ((finReg*3+finCab*1+finRem*2)/6)*0.55;
			totSkill[4][3] = totSkill[4][3]*0.45 + ((finReg*1+finCab*4+finRem*1)/6)*0.55;
			totSkill[4][4] = totSkill[4][4]*0.45 + ((finReg*4+finCab*1+finRem*1)/6)*0.55; 			
			}
			if(positionIndex >= 6 && positionIndex <= 8){//M
			totSkill[4][0] = totSkill[4][0]*0.55 + ((finReg*3+finCab*2+finRem*1)/6)*0.45;
			totSkill[4][1] = totSkill[4][1]*0.55 + ((finReg*2+finCab*3+finRem*1)/6)*0.45;
			totSkill[4][2] = totSkill[4][2]*0.55 + ((finReg*3+finCab*1+finRem*2)/6)*0.45;
			totSkill[4][3] = totSkill[4][3]*0.55 + ((finReg*1+finCab*4+finRem*1)/6)*0.45;
			totSkill[4][4] = totSkill[4][4]*0.55 + ((finReg*4+finCab*1+finRem*1)/6)*0.45; 
			}
			if(positionIndex >= 3 && positionIndex <= 5){//DM
			totSkill[4][0] = totSkill[4][0]*0.65 + ((finReg*3+finCab*2+finRem*1)/6)*0.35;
			totSkill[4][1] = totSkill[4][1]*0.65 + ((finReg*2+finCab*3+finRem*1)/6)*0.35;
			totSkill[4][2] = totSkill[4][2]*0.65 + ((finReg*3+finCab*1+finRem*2)/6)*0.35;
			totSkill[4][3] = totSkill[4][3]*0.65 + ((finReg*1+finCab*4+finRem*1)/6)*0.35;
			totSkill[4][4] = totSkill[4][4]*0.65 + ((finReg*4+finCab*1+finRem*1)/6)*0.35; 	
			}
			if(positionIndex <= 2){//D
			totSkill[4][0] = totSkill[4][0]*0.90 + ((finReg*3+finCab*2+finRem*1)/6)*0.10;
			totSkill[4][1] = totSkill[4][1]*0.90 + ((finReg*2+finCab*3+finRem*1)/6)*0.10;
			totSkill[4][2] = totSkill[4][2]*0.90 + ((finReg*3+finCab*1+finRem*2)/6)*0.10;
			totSkill[4][3] = totSkill[4][3]*0.90 + ((finReg*1+finCab*4+finRem*1)/6)*0.10;
			totSkill[4][4] = totSkill[4][4]*0.90 + ((finReg*4+finCab*1+finRem*1)/6)*0.10; 			
			//para diferentes posições diferentes pesos
			}
			
			totSkill[4][0] = Math.round(totSkill[4][0]*100)/100;
			totSkill[4][1] = Math.round(totSkill[4][1]*100)/100;
			totSkill[4][2] = Math.round(totSkill[4][2]*100)/100;
			totSkill[4][3] = Math.round(totSkill[4][3]*100)/100;
			totSkill[4][4] = Math.round(totSkill[4][4]*100)/100;
		}
		return totSkill;
	};
	
	var skillArray = [];
	var SKs = [];
	var sk1 = "";
	var sk2 = "";
	var idJogador;
	var skillArrayAnterior = [];
	var isDefender ;
	var strSkill1; 
	var strSkill2;
	var finReg;
	var finCab;
	var finRem;
	var potencialFuturo;
	var potencialFuturoAnterior;
	var skillMaior;
	var skillMaiorAnterior;
	var TotalSkillAnterior;
	var resultadoScouts;
	var totalSkillP = [];
	var stringTeste = "";
	var global_content_FS = [];
	var var_DDi_a = 0;
	var var_DWi_a = 0;
	var var_DSh_a = 0;
	var var_DLB_a = 0;
	var var_DTB_a = 0;
	var var_PDi_a = 0;
	var var_PWi_a = 0;
	var var_PSh_a = 0;
	var var_PLB_a = 0;
	var var_PTB_a = 0;
	
	var var_DDi_b = 0;
	var var_DWi_b = 0;
	var var_DSh_b = 0;
	var var_DLB_b = 0;
	var var_DTB_b = 0;
	var var_PDi_b = 0;
	var var_PWi_b = 0;
	var var_PSh_b = 0;
	var var_PLB_b = 0;
	var var_PTB_b = 0;
	
/* 	if(!is_pro){		
	var arrows = [{}];
	} */
		
	for (z=0; z<players_ar.length; z++) {

		try {
			resultadoScouts = get_player_info_scout(players_ar[z]["id"], players_ar[z]["fp"],show_non_pro_graphs);
			if(resultadoScouts != undefined){
			
				if(resultadoScouts[0] !=0){
					players_ar[z].potential = Math.round(resultadoScouts[0]*10)/10;
				} else {
					players_ar[z].potential = "";
				}
				
				if(resultadoScouts[1] !=0){
					players_ar[z].charisma = Math.round(resultadoScouts[1]*10)/10;
				} else {
					players_ar[z].charisma = "";
				}
			
				if(resultadoScouts[2] !=0){
					players_ar[z].professionalism = Math.round(resultadoScouts[2]*10)/10;
				} else {
					players_ar[z].professionalism = "";
				}
				
				if(resultadoScouts[3] !=0){
					players_ar[z].aggression = Math.round(resultadoScouts[3]*10)/10;			
				}else{
					players_ar[z].aggression = "";
				}
				
				players_ar[z].injury = "";
				//Capitao de equipa
				if(players_ar[z].charisma != "" && players_ar[z].professionalism != "" && players_ar[z].aggression != ""){ //39
					players_ar[z].captain = (((players_ar[z].charisma + players_ar[z].professionalism - players_ar[z].aggression)*100)/39)*(players_ar[z]["routine"]/100);
					players_ar[z].captain = Math.round(players_ar[z].captain*10)/10;
				
				}else {
					players_ar[z].captain = "";
				}
			
			}
		}catch (e) {
			
		}
	
	}
//	players_ar.push({"id":"9999999999","club":"545003","no":"99","ban":"0","ban_points":"0","inj":null,"name":"Total","routine":"0","retire":"0","nat":null,"age":null,"months":null,"fp":"GK","asi":0,"country":"pt","str":17,"sta":20,"pac":15,"mar":0,"tac":0,"wor":0,"pos":0,"pas":0,"cro":0,"tec":0,"hea":0,"fin":0,"lon":0,"set":0,"han":16,"one":16,"ref":16,"ari":15,"jum":15,"com":15,"kic":13,"thr":16,"trans":0,"wage":"3449691","rec":9,"gp":10,"goals":0,"assists":0,"productivity":0,"rat":"5.00","mom":0,"cards":0,"ga":12,"scout":"4","txt":"","plot":["3"],"status":"","js_name":"Total","ti":null,"ti_dif":null});
   for (i=0; i<players_ar.length; i++) {
   
		var info_hidden_player = get_player_info_hidden_skills(players_ar[i]["id"]);
		var info_hidden_foundHidden = info_hidden_player[0];
		var info_hidden_hiddenInj = info_hidden_player[1];
		var info_hidden_hiddenAgr = info_hidden_player[2];
		var info_hidden_hiddenProf = info_hidden_player[3];
		var info_hidden_hiddenAdapt = info_hidden_player[4];
		
		if(info_hidden_foundHidden){
			players_ar[i].professionalism = info_hidden_hiddenProf;
			players_ar[i].aggression = info_hidden_hiddenAgr;
			players_ar[i].injury = info_hidden_hiddenInj;
			if(players_ar[i].charisma != "" && players_ar[i].professionalism != "" && players_ar[i].aggression != ""){ //39
				players_ar[i].captain = (((players_ar[i].charisma + players_ar[i].professionalism - players_ar[i].aggression)*100)/39)*(players_ar[i]["routine"]/100);
				players_ar[i].captain = Math.round(players_ar[i].captain*10)/10;
				
			}else {
				players_ar[i].captain = "";
			}
		
		}
		
		//info_hidden_foundHidden,info_hidden_hiddenInj ,info_hidden_hiddenAgr,info_hidden_hiddenProf,info_hidden_hiddenAdapt
		strSkill1 = computeSK(i,skillArray)[0][0];
		strSkill2 = computeSK(i,skillArray)[0][1];
		isDefender = checkIfDefender(strSkill1,strSkill2);
		skillArray = document.getSkills(i);
		SKs = computeSK(i,skillArray)[1];

		
//skillArray // computeSK(i,skillArray)[1];
		if (SKs[0] == 0){
			sk1 = 0;
		} else {
			sk1 = SKs[0];
		}
		if (SKs[1] == 0){
			sk2 = sk1;
		} else {
			sk2 = SKs[1];
		}
		
		
		players_ar[i].SK1 = Math.round(sk1*10)/10;
		players_ar[i].SK2 = Math.round(sk2*10)/10;
		
		skillAuxPos1 = [];
		skillAuxPos2 = [];
		
		
		
		//####################################################################
		if (SKs[0] != 0){
			for (var k=0; k< positionNames.length; k++) {
				skillAuxPos1[k] = Math.round(computeSKdefenida(positionNames[k] ,skillArray)[1]*10)/10;
			}
		}	
		if (SKs[1] != 0){
			for (var k=0; k< positionNames.length; k++) {
				skillAuxPos2[k] = Math.round(computeSKdefenida(positionNames[k] ,skillArray)[1]*10)/10;
			}
		}
		
		//players_ar[i]["Adp"] //Adaptabilidade
		//info_hidden_foundHidden,info_hidden_hiddenInj ,info_hidden_hiddenAgr,info_hidden_hiddenProf,info_hidden_hiddenAdapt
		
		if(info_hidden_foundHidden){
			players_ar[i]["Adp"] = info_hidden_hiddenAdapt;
		}
		if(players_ar[i]["Adp"] != undefined){
			adaptabilidade = 1-(((players_ar[i]["Adp"]*100)/20)/100);
		} else {
			adaptabilidade = 1; //1 representa 0... valores opostos de adaptabilidade para simplificar calculos
			players_ar[i]["Adp"] = "";
		}
		var bestSKill = 0;
		for (var k=0; k< positionNames.length; k++) {
			if(skillAuxPos2[k] == undefined){
				players_ar[i][positionNames[k]] = skillAuxPos1[k] * ((100-(positionsLost[document.findPositionIndex(strSkill1)][k])*adaptabilidade)/100);
			} else {
			 skse1 = skillAuxPos1[k] * ((100-(positionsLost[document.findPositionIndex(strSkill1)][k])*adaptabilidade)/100);
			 skse2 = skillAuxPos2[k] * ((100-(positionsLost[document.findPositionIndex(strSkill2)][k])*adaptabilidade)/100);
			 
			 if(skse1 > skse2){
				players_ar[i][positionNames[k]] = skse1;
			 } else {
				players_ar[i][positionNames[k]] = skse2;
			 }
			}
			
			players_ar[i][positionNames[k]] = Math.round(players_ar[i][positionNames[k]]*10)/10;
			
			if(players_ar[i][positionNames[k]] > bestSKill){
				bestSKill = players_ar[i][positionNames[k]];
				players_ar[i]["bestSkill"] = bestSKill;
			}
		}
		

		
		
		//####################################################################
		
		var dadosDeJogador = get_player_info_history(players_ar[i]["id"],show_non_pro_graphs);
		var dadosActuaisJogador =  dadosDeJogador[0];
		var dadosTotaisJogador =  dadosDeJogador[1];

		
		players_ar[i]["last_games"] = isNaNVer(dadosActuaisJogador["games"]);
		players_ar[i]["last_goals"] = isNaNVer(dadosActuaisJogador["goals"]);
		players_ar[i]["last_goals_per_games"] = isNaNVer(Math.round(players_ar[i]["last_goals"] / players_ar[i]["last_games"]*100)/100);
		players_ar[i]["last_conceded"] = isNaNVer(dadosActuaisJogador["conceded"]);
		players_ar[i]["last_conceded_per_games"] = isNaNVer(Math.round(players_ar[i]["last_conceded"] / players_ar[i]["last_games"]*100)/100);
		players_ar[i]["last_assists"] = isNaNVer(dadosActuaisJogador["assists"]);
		players_ar[i]["last_assists_per_games"] = isNaNVer(Math.round(players_ar[i]["last_assists"] / players_ar[i]["last_games"]*100)/100);
		players_ar[i]["last_cards"] = isNaNVer(dadosActuaisJogador["cards"]);
		players_ar[i]["last_cards_per_games"] = isNaNVer(Math.round(players_ar[i]["last_cards"] / players_ar[i]["last_games"]*100)/100);
		players_ar[i]["last_rating"] = isNaNVer(dadosActuaisJogador["rating"]);
		players_ar[i]["last_productivity"] = isNaNVer(dadosActuaisJogador["productivity"]);
		players_ar[i]["last_productivity_per_games"] =  isNaNVer(Math.round(players_ar[i]["last_productivity"] / players_ar[i]["last_games"]*100)/100);
		players_ar[i]["last_rating_avg"] = isNaNVer(dadosActuaisJogador["rating_avg"]);
		
		//DADOS TOTAIS
		players_ar[i]["total_games"] = isNaNVer(dadosTotaisJogador["games"]);
		players_ar[i]["total_goals"] = isNaNVer(dadosTotaisJogador["goals"]);
		players_ar[i]["total_goals_per_games"] = isNaNVer(Math.round(players_ar[i]["total_goals"] / players_ar[i]["total_games"]*100)/100);
		players_ar[i]["total_assists"] = isNaNVer(dadosTotaisJogador["assists"]);
		players_ar[i]["total_assists_per_games"] = isNaNVer(Math.round(players_ar[i]["total_assists"] / players_ar[i]["total_games"]*100)/100);
		players_ar[i]["total_productivity"] = isNaNVer(dadosTotaisJogador["productivity"]);
		players_ar[i]["total_productivity_per_games"] =  isNaNVer(Math.round(players_ar[i]["total_productivity"] / players_ar[i]["total_games"]*100)/100);
		players_ar[i]["total_conceded"] = isNaNVer(dadosTotaisJogador["conceded"]);
		players_ar[i]["total_conceded_per_games"] = isNaNVer(Math.round(players_ar[i]["total_conceded"] / players_ar[i]["total_games"]*100)/100);
		players_ar[i]["total_cards"] = isNaNVer(dadosTotaisJogador["cards"]);
		players_ar[i]["total_cards_per_games"] = isNaNVer(Math.round(players_ar[i]["total_cards"] / players_ar[i]["total_games"]*100)/100);
		players_ar[i]["total_rating"] = isNaNVer(dadosTotaisJogador["rating"]);
		players_ar[i]["total_rating_avg"] = isNaNVer(dadosTotaisJogador["rating_avg"]);
		
		players_ar[i]["name"] =players_ar[i]["name"] + dadosTotaisJogador["transfer"]; 
		//####################################################################		
		if(players_ar[i].SK1 >= players_ar[i].SK2){
			skillMaior = players_ar[i].SK1;
			} else {
			skillMaior = players_ar[i].SK2;
			}
		if(players_ar[i]["fp"] !="GK"){
			potencialFuturo = skillMaior - ((players_ar[i].totalSkill*100)/280);
		} else {
			potencialFuturo = skillMaior - ((players_ar[i].totalSkill*100)/220);
		}
		
		if(potencialFuturo != 0){
		players_ar[i].growOK = Math.round(potencialFuturo*10)/10; 

		} else {
		players_ar[i].growOK = 0;
		}
		if(players_ar[i].potential != ""){
		players_ar[i].potGok = Math.round((((players_ar[i].potential)+(players_ar[i].growOK/4))/2)*10)/10; 
		
		} else {
		players_ar[i].potGok = "";
		}
		idJogador = players_ar[i]["id"];
		
		
		var tactics_init_reserves_var = tactics_init_reserves(idJogador);
		var tactics_init_national_var = tactics_init_national(idJogador);
		if(SESSION["b_team"] == players_ar[i]["club"]){ //equipa reservas
			players_ar[i]["on_field"] = tactics_init_reserves_var[0];
			players_ar[i]["on_field_playing_b"] = tactics_init_reserves_var[1];
		
		} else {// equipa principal
			players_ar[i]["on_field"] = tactics_init_national_var[0];
			players_ar[i]["on_field_playing_a"] = tactics_init_national_var[1];
		}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	if(!is_pro){	
	players_ar[i]["plot"] = get_player_info_graphs(idJogador,show_non_pro_graphs)[0];
	players_ar[i]["ti"] = isNaNVer(players_ar[i]["plot"][players_ar[i]["plot"].length-1]);
	players_ar[i]["ti_dif"] = isNaNVer(players_ar[i]["ti"]-players_ar[i]["plot"][players_ar[i]["plot"].length-2]);

	/* if(!players_by_id[players_ar[i]["id"]]) players_by_id[players_ar[i]["id"]] = {};
		players_by_id[players_ar[i]["id"]]["plot"] = players_ar[i]["plot"]; */
		
		if(players_ar[i]["fp"] !="GK"){
		arrows[idJogador]= {"raise":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}else {
		arrows[idJogador] = {"raise":[0,0,0,0,0,0,0,0,0,0,0]};
		}
		arrows[idJogador].ti=players_ar[i]["ti"] ;
		arrows[idJogador].ti_shift=players_ar[i]["ti_dif"] ;
		var get_player_info_graphs_var = get_player_info_graphs(idJogador,show_non_pro_graphs)[1];
		var get_player_info_graphs_varD = get_player_info_graphs(idJogador,show_non_pro_graphs)[2];
		
		for (var lu=0; lu< get_player_info_graphs_var.length || lu <get_player_info_graphs_varD.length; lu++) {
			var melhorouEm = get_player_info_graphs_var[lu];
			var piorouEm = get_player_info_graphs_varD[lu];
			
			if(players_ar[i]["fp"] !="GK"){
				if(melhorouEm == "strength"){
					arrows[idJogador]["raise"][0] = 2;
				} 
				if (piorouEm == "strength"){
					arrows[idJogador]["raise"][0] = -2;
				}
				if(melhorouEm == "stamina"){
					arrows[idJogador]["raise"][1] = 2;
				}
				if (piorouEm == "stamina"){
					arrows[idJogador]["raise"][1] = -2;
				} 
				if(melhorouEm == "pace"){
					arrows[idJogador]["raise"][2] = 2;
				}
				if (piorouEm == "pace"){
					arrows[idJogador]["raise"][2] = -2;
				} 
				if(melhorouEm == "marking"){
					arrows[idJogador]["raise"][3] = 2;
				} 
				if (piorouEm == "marking"){
					arrows[idJogador]["raise"][3] = -2;
				} 
				if(melhorouEm == "tackling"){
					arrows[idJogador]["raise"][4] = 2;
				}
				if (piorouEm == "tackling"){
					arrows[idJogador]["raise"][4] = -2;
				} 
				if(melhorouEm == "workrate"){
					arrows[idJogador]["raise"][5] = 2;
				} 
				if (piorouEm == "workrate"){
					arrows[idJogador]["raise"][5] = -2;
				} 
				if(melhorouEm == "positioning"){
					arrows[idJogador]["raise"][6] = 2;
				} 
				if (piorouEm == "positioning"){
					arrows[idJogador]["raise"][6] = -2;
				} 
				if(melhorouEm == "passing"){
					arrows[idJogador]["raise"][7] = 2;
				} 
				if (piorouEm == "passing"){
					arrows[idJogador]["raise"][7] = -2;
				} 
				if(melhorouEm == "crossing"){
					arrows[idJogador]["raise"][8] = 2;
				}
				if (piorouEm == "crossing"){
					arrows[idJogador]["raise"][8] = -2;
				} 
				if(melhorouEm == "technique"){
					arrows[idJogador]["raise"][9] = 2;
				} 
				if (piorouEm == "technique"){
					arrows[idJogador]["raise"][9] = -2;
				} 
				if(melhorouEm == "heading"){
					arrows[idJogador]["raise"][10] = 2;
				} 
				if (piorouEm == "heading"){
					arrows[idJogador]["raise"][10] = -2;
				} 
				if(melhorouEm == "finishing"){
					arrows[idJogador]["raise"][11] = 2;
				} 
				if (piorouEm == "finishing"){
					arrows[idJogador]["raise"][11] = -2;
				} 
				if(melhorouEm == "longshots"){
					arrows[idJogador]["raise"][12] = 2;
				} 
				if (piorouEm == "longshots"){
					arrows[idJogador]["raise"][12] = -2;
				} 
				if(melhorouEm == "set_pieces"){
					arrows[idJogador]["raise"][13] = 2;
				} 
				if (piorouEm == "set_pieces"){
					arrows[idJogador]["raise"][13] = -2;
				} 				
			} else {
				if(melhorouEm == "strength"){
					arrows[idJogador]["raise"][0] = 2;
				} 
				if (piorouEm == "strength"){
					arrows[idJogador]["raise"][0] = -2;
				} 
				if(melhorouEm == "stamina"){
					arrows[idJogador]["raise"][1] = 2;
				} 
				if (piorouEm == "stamina"){
					arrows[idJogador]["raise"][1] = -2;
				}
				if(melhorouEm == "pace"){
					arrows[idJogador]["raise"][2] = 2;
				} 
				if (piorouEm == "pace"){
					arrows[idJogador]["raise"][2] = -2;
				} 
				if(melhorouEm == "handling"){
					arrows[idJogador]["raise"][3] = 2;
				} 
				if (piorouEm == "handling"){
					arrows[idJogador]["raise"][3] = -2;
				} 
				if(melhorouEm == "one_on_ones"){
					arrows[idJogador]["raise"][4] = 2;
				} 
				if (piorouEm == "one_on_ones"){
					arrows[idJogador]["raise"][4] = -2;
				} 
				if(melhorouEm == "reflexes"){
					arrows[idJogador]["raise"][5] = 2;
				} 
				if (piorouEm == "reflexes"){
					arrows[idJogador]["raise"][5] = -2;
				} 
				if(melhorouEm == "aerial_ability"){
					arrows[idJogador]["raise"][6] = 2;
				} 
				if (piorouEm == "aerial_ability"){
					arrows[idJogador]["raise"][6] = -2;
				} 
				if(melhorouEm == "jumping"){
					arrows[idJogador]["raise"][7] = 2;
				} 
				if (piorouEm == "jumping"){
					arrows[idJogador]["raise"][7] = -2;
				} 
				if(melhorouEm == "communication"){
					arrows[idJogador]["raise"][8] = 2;
				} 
				if (piorouEm == "communication"){
					arrows[idJogador]["raise"][8] = -2;
				} 
				if(melhorouEm == "kicking"){
					arrows[idJogador]["raise"][9] = 2;
				} 
				if (piorouEm == "kicking"){
					arrows[idJogador]["raise"][9] = -2;
				} 
				if(melhorouEm == "throwing"){
					arrows[idJogador]["raise"][10] = 2;
				} 
				if (piorouEm == "throwing"){
					arrows[idJogador]["raise"][10] = -2;
				} 
			}
	
		}
	}
		//###############$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
		if(players_ar[i].SK1 >= players_ar[i].SK2){
		
		totalSkillP = document.calculateSkillDefPlay(strSkill1, skillArray);
		} else if (players_ar[i].SK1 < players_ar[i].SK2){
		
		totalSkillP = document.calculateSkillDefPlay(strSkill2, skillArray);
		}
		
		players_ar[i].cantos = totalSkillP[2][0];//(players_ar[i]["set"] * 2 + players_ar[i]["cro"] * 2 + players_ar[i]["tec"]) / 5;  
		players_ar[i].livres = totalSkillP[2][1];//(players_ar[i]["set"] * 2 + players_ar[i]["lon"] * 2 + players_ar[i]["tec"]) / 5; 
		players_ar[i].penaltis = totalSkillP[2][2];//(players_ar[i]["set"] * 2 + players_ar[i]["fin"] * 2 + players_ar[i]["tec"]) / 5; 
		
		players_ar[i].DDi = totalSkillP[3][0];
		players_ar[i].DWi = totalSkillP[3][1];
		players_ar[i].DSh = totalSkillP[3][2];
		players_ar[i].DLB = totalSkillP[3][3];
		players_ar[i].DTB = totalSkillP[3][4];
		
		players_ar[i].PDi = totalSkillP[4][0];
		players_ar[i].PWi = totalSkillP[4][1];
		players_ar[i].PSh = totalSkillP[4][2];
		players_ar[i].PLB = totalSkillP[4][3];
		players_ar[i].PTB = totalSkillP[4][4];
		
		//###############$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

		if(players_ar[i]["on_field_playing_a"] == true && players_ar[i]["fp"] !="GK"){		
	var_DDi_a = var_DDi_a + players_ar[i].DDi;
	var_DWi_a = var_DWi_a + players_ar[i].DWi;
	var_DSh_a = var_DSh_a + players_ar[i].DSh;
	var_DLB_a = var_DLB_a + players_ar[i].DLB;
	var_DTB_a = var_DTB_a + players_ar[i].DTB;
	var_PDi_a = var_PDi_a + players_ar[i].PDi;
	var_PWi_a = var_PWi_a + players_ar[i].PWi;
	var_PSh_a = var_PSh_a + players_ar[i].PSh;
	var_PLB_a = var_PLB_a + players_ar[i].PLB;
	var_PTB_a = var_PTB_a + players_ar[i].PTB;
	}

		if(players_ar[i]["on_field_playing_b"] == true && players_ar[i]["fp"] !="GK"){		
	var_DDi_b = var_DDi_b + players_ar[i].DDi;
	var_DWi_b = var_DWi_b + players_ar[i].DWi;
	var_DSh_b = var_DSh_b + players_ar[i].DSh;
	var_DLB_b = var_DLB_b + players_ar[i].DLB;
	var_DTB_b = var_DTB_b + players_ar[i].DTB;
	var_PDi_b = var_PDi_b + players_ar[i].PDi;
	var_PWi_b = var_PWi_b + players_ar[i].PWi;
	var_PSh_b = var_PSh_b + players_ar[i].PSh;
	var_PLB_b = var_PLB_b + players_ar[i].PLB;
	var_PTB_b = var_PTB_b + players_ar[i].PTB;
	}		
	
	
if(is_pro || true){		//is_pro

		if(undefined == arrows[idJogador]){
			players_ar[i].SK1ant = 0;
			players_ar[i].SK2ant = 0;
			players_ar[i].growOfGok = 0;
			
		} else {
		skillArrayAnterior = arrows[idJogador]["raise"].slice();
		skillArrayAnteriorPerda = arrows[idJogador]["raise"].slice();
		
		TotalSkillAnterior = 0;
		for (entry=0; entry<skillArrayAnterior.length; entry++) {

			if(skillArrayAnterior[entry]==1){
			skillArrayAnterior[entry] = 0
			skillArrayAnteriorPerda[entry] = 0;

			} else if (skillArrayAnterior[entry]==2){
			skillArrayAnterior[entry] = 1;
			skillArrayAnteriorPerda[entry] =0;
			TotalSkillAnterior = TotalSkillAnterior + 1;

			} else if(skillArrayAnterior[entry]==-2){
			skillArrayAnteriorPerda[entry] = 1;
			skillArrayAnterior[entry] = 0;
			TotalSkillAnterior = TotalSkillAnterior + 1;
			
			}
	}

	SKsAux1 = computeSK(i,skillArrayAnterior)[1];
	SKsAux2 = computeSK(i,skillArrayAnteriorPerda)[1];
	
SKs =  [SKsAux1[0]-SKsAux2[0],SKsAux1[1]-SKsAux2[1]];


		if (SKs[0] == 0){
			sk1 = 0;
		} else {
			sk1 = SKs[0];
		}
		if (SKs[1] == 0){
			sk2 = sk1;
		} else {
			sk2 = SKs[1];
		}
		players_ar[i].SK1ant = Math.round(sk1*10)/10;
		players_ar[i].SK2ant = Math.round(sk2*10)/10;
			
		
		if(players_ar[i].SK1 - players_ar[i].SK1ant >= players_ar[i].SK2 - players_ar[i].SK2ant){
			skillMaiorAnterior = players_ar[i].SK1 - players_ar[i].SK1ant;
		} else {
			skillMaiorAnterior = players_ar[i].SK2 - players_ar[i].SK2ant;
		}
			
		if(players_ar[i]["fp"] !="GK"){
			potencialFuturoAnterior = skillMaiorAnterior - (((players_ar[i].totalSkill-TotalSkillAnterior)*100)/280);
		} else {
			potencialFuturoAnterior = skillMaiorAnterior - (((players_ar[i].totalSkill-TotalSkillAnterior)*100)/220);
		}
		
		if(potencialFuturoAnterior != 0){
		players_ar[i].growOKAnterior = potencialFuturoAnterior;
		
		players_ar[i].growOfGok = Math.round((players_ar[i].growOK - players_ar[i].growOKAnterior)*10)/10; //
		} else {
		players_ar[i].growOfGok = players_ar[i].growOK - 0;

		} 
	  }
	  /* if(arrows[idJogador].ti < 0){
		players_ar[i].SK1ant = players_ar[i].SK1ant * -1;
		players_ar[i].SK2ant = players_ar[i].SK2ant * -1;
		players_ar[i].growOfGok = players_ar[i].growOfGok * -1;
	  } */
	}

		
} //show_scoutskills


	var_DDi_a = Math.round(var_DDi_a  / 11*100)/100;
	var_DWi_a = Math.round(var_DWi_a  / 11*100)/100;
	var_DSh_a = Math.round(var_DSh_a  / 11*100)/100;
	var_DLB_a = Math.round(var_DLB_a  / 11*100)/100;
	var_DTB_a = Math.round(var_DTB_a  / 11*100)/100;
	var_PDi_a = Math.round(var_PDi_a  / 11*100)/100;
	var_PWi_a = Math.round(var_PWi_a  / 11*100)/100;
	var_PSh_a = Math.round(var_PSh_a  / 11*100)/100;
	var_PLB_a = Math.round(var_PLB_a  / 11*100)/100;
	var_PTB_a = Math.round(var_PTB_a  / 11*100)/100;
	
	
	var_DDi_b = Math.round(var_DDi_b / 11*100)/100;
	var_DWi_b = Math.round(var_DWi_b / 11*100)/100;
	var_DSh_b = Math.round(var_DSh_b / 11*100)/100;
	var_DLB_b = Math.round(var_DLB_b / 11*100)/100;
	var_DTB_b = Math.round(var_DTB_b / 11*100)/100;
	var_PDi_b = Math.round(var_PDi_b / 11*100)/100;
	var_PWi_b = Math.round(var_PWi_b / 11*100)/100;
	var_PSh_b = Math.round(var_PSh_b / 11*100)/100;
	var_PLB_b = Math.round(var_PLB_b / 11*100)/100;
	var_PTB_b = Math.round(var_PTB_b / 11*100)/100;
	


function construct_tr(ply_ar, count, mode) {
	var myRow = myTable.insertRow(-1);
	var training_count=0;
	function construct_cell(assoc) {
		var myCell = myRow.insertCell(-1);
		if (assoc != undefined) {
			var assocs_to_star = ["str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","han","one","ref","ari","jum","com","kic","thr"];
			if (headers_ar[assoc]["style"]) {
				myCell.className = headers_ar[assoc]["style"];
			}
			if (assoc == "name") {

/*				var ban = "";
				if (ply_ar["ban"].indexOf("r") == 0) {
					ban += "<img src=\"/pics/icons/red_card.gif\" />"+ply_ar["ban"].substr(1);
				} else if (ply_ar["ban"] == "g") {
					ban += "<img src=\"/pics/icons/yellow_card.gif\" tooltip='"+global_content["ban_risk"]+"'/>";
				}
				if(ply_ar["inj"]) {
					ban += "<img src=\"/pics/icons/injury.gif\" />"+ply_ar["inj"];
				} */
				var tmp = "<div class='name'>";
				tmp += " "+get_player_link({"player":{"id":ply_ar["id"],"name":ply_ar["name"]},"auto_tooltip":true,"class":"normal"});
//				tmp += " "+ban;
				if(ply_ar["status"]) tmp += " "+ply_ar["status"];
				if (ply_ar["retire"] == true) {
					tmp += "<img src='/pics/icons/retire.gif' title='This player is retiring after this season' />";
				}
				if (ply_ar["banned_club"])
				{
					tmp += " <img src='/pics/icons/lg_ina.gif' title='Club Banned' />";
				}
				if(ply_ar["country"] != SESSION["country"] && this_page != "shortlist" && this_page != "nt_shortlist")
				{
					tmp += " "+get_flag(ply_ar["country"]);
				}
				if(ply_ar["reserve_team"]){
					tmp += ' <span class="b_team_icon">B</span>';
				}
				tmp +="</div>";
				myCell.innerHTML = tmp;
				$(myCell).addClass("text_fade");
				if (ply_ar['txt'] != "") {
					var tmp = $(" <img src='/pics/icons/transfer_speechbubble.gif' style='cursor:pointer;margin-bottom: 2px;' onclick='player_note("+ply_ar['id']+")'/>").tooltip(global_content[450]+"<br />"+ply_ar['txt']);
				} else {
					var tmp = " <img src='/pics/icons/transfer_speechbubble_empty.gif' style='cursor:pointer;margin-bottom: 2px;' onclick='player_note("+ply_ar['id']+")'/>";
				}
				$(myCell).find(".name").prepend(tmp);
			} else if (assoc == "country") {
				$(myCell).html(get_flag(ply_ar["nat"]));
			} else if (assoc == "fp") {
				myCell.innerHTML = "<div class='position'>"+retColorPos(ply_ar["fp"])+"</div>";
			}  else if (assoc == "scout") {
				var url = get_player_link({"player":{"id":ply_ar["id"],"name":ply_ar["name"]},"only_url":true});
				$(myCell).html(make_button("<img src='/pics/binoc.png' />", "href:"+url+"#scout","small_button"));
			} else if (assoc == "rec") {
				$(myCell).addClass("align_center").html("<div class='rec'>"+rec_format(ply_ar["rec"])+"</div>");
			} else if (assocs_to_star.indexOf(assoc) >= 0) {
				if (ply_ar[assoc] == 20) {
					myCell.innerHTML = "<img src='/pics/star.png' />";
				} else if (ply_ar[assoc] == 19) {
					myCell.innerHTML = "<img src='/pics/star_silver.png' />";
				} else if (ply_ar[assoc] == 0 && !show_training) {
					myCell.style.color = "#AAAAAA";
					myCell.innerHTML = "-";
				} else if (ply_ar[assoc] < 6 && !show_training) {
					myCell.style.color = "#AAAAAA";
					myCell.innerHTML = ply_ar[assoc];
				} else {
					myCell.innerHTML = ply_ar[assoc];
				}
				$(myCell).html("<div class='skill'>"+$(myCell).html()+"</div>").addClass("skill");
				if(show_training)
				{
					var $skill = $(myCell).find(".skill").addClass("training subtle");
					if(arrows[ply_ar.id])
					{
						var t = arrows[ply_ar.id].raise[training_count];
						if(t == 2) $skill.addClass("one_up").removeClass("subtle");
						else if(t == 1) $skill.addClass("part_up").removeClass("subtle");
						else if(t == -1) $skill.addClass("part_down").removeClass("subtle");
						else if(t == -2) $skill.addClass("one_down").removeClass("subtle");
						training_count++;
//						if(ply_ar["fp"] == "GK" && training_count==3) training_count=14;
					}
				}
			} else if (assoc == "asi" || assoc == "wage") {
				myCell.innerHTML = "<div class='wage'>"+addCommas(ply_ar[assoc])+"</div>";
			} else if (assoc == "rat") {
				myCell.innerHTML = ply_ar[assoc].toFixed(2);
			} else if (assoc == "no") {
				$(myCell).addClass("minishirt small").html("<span class='faux_link normal' onclick='pop_player_number("+ply_ar["id"]+","+ply_ar["no"]+",\""+ply_ar["js_name"]+"\","+(ply_ar["reserve_team"]?1:0)+")'>"+ply_ar[assoc]+"</span>");
			} else if (assoc == "timeleft"){
				ply_ar["timeleft_string"] = ply_ar["timeleft_string"] || "";
				$(myCell).html("<div class='time_left'>"+ply_ar["timeleft_string"].replace("d",global_content["days_abbr"]).replace("h",global_content["hours_abbr"]).replace("m",global_content["minutes_abbr"])+"</div>").attr("sort",ply_ar["timeleft"]);
			}  else if (assoc == "delete"){
				$(myCell).html(make_button("<img src='/pics/icons/recyclebin.gif' style='position:relative;top: 2px;'>","remove_short_list_player("+ply_ar["id"]+",remove_player_from_list)","small_button"));

			} else if (assoc == "bid"){
				if(ply_ar["bid"] == 0)
				{
					$(myCell).html(make_button("<img src='/pics/auction_hammer_small.png' style='position:relative;top: 2px;'>","pop_transfer_bid('"+number_format(ply_ar["next_bid"])+"',"+isPro+",'"+ply_ar["id"]+"','"+ply_ar["name_js"]+"')","small_button"));
				}
				else if(ply_ar["bid"] == 1)
				{ // green
					$(myCell).html('<img src="/pics/icons/button_green.gif">');
				}
				else if(ply_ar["bid"] == 2)
				{ // yellow
					$(myCell).html('<img src="/pics/icons/button_yellow.gif">');
				}
				else if(ply_ar["bid"] == 3)
				{ // red
					$(myCell).html('<img src="/pics/small_red_x.png">');
				}
			}
			else if(assoc== "bteam"){
				if(SESSION["b_team"] > 0)
				{
					if(ply_ar["reserve_team"])
					{
						$(myCell).html(make_button("<img src='/pics/icons/squad_up.png' style='position: relative; top: -2px;' tooltip='"+pagecontent[114]+"'/>","promote_player("+ply_ar["id"]+")","small_button"));
					}
					else
					{
						$(myCell).html(make_button("<img src='/pics/icons/squad_down.png' style='position: relative; top: -2px;' tooltip='"+pagecontent[115]+"'/>","demote_player("+ply_ar["id"]+")","small_button"));
					}
				}
			}
			else if(assoc=="ti")
			{
				if(arrows[ply_ar.id])
				{
					$(myCell).html(arrows[ply_ar.id].ti);
				}
				else $(myCell).html("-");
			}
			else if(assoc=="ti_dif")
			{
				if(arrows[ply_ar.id])
				{
					$(myCell).html(arrows[ply_ar.id].ti_shift);
				}
				else $(myCell).html("-");
			} 
			else if(assoc=="age")
			{
				if(show_training) myCell.innerHTML = ply_ar[assoc];
				else myCell.innerHTML = ply_ar[assoc].split(".")[0];
			}
			else {
				myCell.innerHTML = ply_ar[assoc];
			}
		} else {
			myCell.innerHTML = "-";
		}
	}
	for (var i=0; i<ths.length; i++) {
		if (mode) {
			construct_cell(gk_ths[i]);
		} else {
			construct_cell(ths[i]);
		}
	}
}


document.toggle_scoutskills = function() {
	document.show_scoutskills = !document.show_scoutskills;

	setCookie("show_scoutskills",document.show_scoutskills,365);
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	
	document.show_fieldperformance = false;
	document.show_posicoes = false;
	setCookie("show_posicoes",document.show_posicoes,365);
	setCookie("show_fieldperformance",document.show_fieldperformance,365);
	
			document.show_last_data = false;	
	document.show_total_data = false;	
	setCookie("show_last_data",document.show_last_data,365);
	setCookie("show_total_data",document.show_total_data,365);
	
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");	
	
		document.show_setpieces = false;
	setCookie("show_setpieces",document.show_setpieces,365);
	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	
	makeTable();
}

document.toggle_last_data = function() {
	document.show_last_data = !document.show_last_data;
		setCookie("show_last_data",document.show_last_data,365);

	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	
	document.show_fieldperformance = false;
	document.show_posicoes = false;
	setCookie("show_posicoes",document.show_posicoes,365);
	setCookie("show_fieldperformance",document.show_fieldperformance,365);
	document.show_scoutskills = false;
		setCookie("show_scoutskills",document.show_scoutskills,365);
		document.show_setpieces  = false;	
	document.show_total_data = false;	
	setCookie("show_setpieces",document.show_setpieces,365);
	setCookie("show_total_data",document.show_total_data,365);
	
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");
	makeTable();
}

document.toggle_total_data = function() {
	document.show_total_data = !document.show_total_data;
		setCookie("show_total_data",document.show_total_data,365);

	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");
	
	document.show_fieldperformance = false;
	document.show_posicoes = false;
	setCookie("show_posicoes",document.show_posicoes,365);
	setCookie("show_fieldperformance",document.show_fieldperformance,365);
	document.show_scoutskills = false;
		setCookie("show_scoutskills",document.show_scoutskills,365);
		document.show_setpieces  = false;	
	document.show_last_data = false;	
	setCookie("show_setpieces",document.show_setpieces,365);
	setCookie("show_last_data",document.show_last_data,365);
	
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	makeTable();
}

document.toggle_setpieces = function() {
	document.show_setpieces = !document.show_setpieces;
		setCookie("show_setpieces",document.show_setpieces,365);

	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	
	document.show_fieldperformance = false;
	document.show_posicoes = false;
	setCookie("show_posicoes",document.show_posicoes,365);
	setCookie("show_fieldperformance",document.show_fieldperformance,365);
	
		document.show_last_data = false;	
	document.show_total_data = false;	
	setCookie("show_last_data",document.show_last_data,365);
	setCookie("show_total_data",document.show_total_data,365);
	
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");	
	
		document.show_scoutskills = false;
	setCookie("show_scoutskills",document.show_scoutskills,365);
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	
	makeTable();
}
//document.show_teamB_det
document.toggle_teamB_det = function() {
	document.show_teamB_det = !document.show_teamB_det;
		setCookie("show_teamB_det",document.show_teamB_det,365);

	if(document.show_teamB_det) $("img.toggle_teamB_det").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_teamB_det").attr("src","/pics/sort_btn_gray_off.gif");
	makeTable();
}

document.toggle_teamA_det = function() {
	document.show_teamA_det = !document.show_teamA_det;
		setCookie("show_teamA_det",document.show_teamA_det,365);

	if(document.show_teamA_det) $("img.toggle_teamA_det").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_teamA_det").attr("src","/pics/sort_btn_gray_off.gif");
	makeTable();
}

document.toggle_convocados = function() {
	document.show_convocados = !document.show_convocados;
		setCookie("show_convocados",document.show_convocados,365);

	if(document.show_convocados) $("img.toggle_convocados").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_convocados").attr("src","/pics/sort_btn_gray_off.gif");
	makeTable();
}

document.toggle_fieldperformance = function() {
	document.show_fieldperformance = !document.show_fieldperformance;
	setCookie("show_fieldperformance",document.show_fieldperformance,365);
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	
	document.show_setpieces = false;
	
	document.show_posicoes =  false;
		setCookie("show_setpieces",document.show_setpieces,365);	
		document.show_scoutskills = false;
		setCookie("show_scoutskills",document.show_scoutskills,365);
		setCookie("show_posicoes",document.show_posicoes,365);
		
	document.show_last_data = false;	
	document.show_total_data = false;	
	setCookie("show_last_data",document.show_last_data,365);
	setCookie("show_total_data",document.show_total_data,365);
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");	
	makeTable();
}

document.toggle_posicoes = function() {
	document.show_posicoes = !document.show_posicoes;
	setCookie("show_posicoes",document.show_posicoes,365);
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	
	document.show_setpieces = false;
	document.show_scoutskills = false;
	document.show_fieldperformance = false;
		setCookie("show_setpieces",document.show_setpieces,365);	
		setCookie("show_scoutskills",document.show_scoutskills,365);
		setCookie("show_fieldperformance",document.show_fieldperformance,365);
	document.show_last_data = false;	
	document.show_total_data = false;	
	setCookie("show_last_data",document.show_last_data,365);
	setCookie("show_total_data",document.show_total_data,365);
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");
	


	makeTable();
}

$e("filters").innerHTML = $e("filters").innerHTML + "<div>Super Squad Toogle:   ";


var togscoutskills = new_toogle_button("toggle_scoutskills", "Scout-Skills");
$e("filters").innerHTML = $e("filters").innerHTML + togscoutskills;



var togSetPie = new_toogle_button("toggle_setpieces", "Set-Pieces");
$e("filters").innerHTML = $e("filters").innerHTML + togSetPie;



var togConvocados = new_toogle_button("toggle_convocados", "On-Squad");
$e("filters").innerHTML = $e("filters").innerHTML + togConvocados;

var togPosicoes = new_toogle_button("toggle_posicoes", "Skills in Positions");
$e("filters").innerHTML = $e("filters").innerHTML + togPosicoes;

var togFieldperformance = new_toogle_button("toggle_fieldperformance", "Field Play Skills");
$e("filters").innerHTML = $e("filters").innerHTML + togFieldperformance;

var toglast_data = new_toogle_button("toggle_last_data", "Season Player Data");
$e("filters").innerHTML = $e("filters").innerHTML + toglast_data;

var togtotal_data = new_toogle_button("toggle_total_data", "Total Player Data");
$e("filters").innerHTML = $e("filters").innerHTML + togtotal_data;

$e("filters").innerHTML = $e("filters").innerHTML + "</div>";


//#######ACTUAL FORMATION DETAILS A###################
var togteamA_det = new_toogle_button("toggle_teamA_det", "(Show Team A formation details - OnRefresh)");
$e("filters").innerHTML = $e("filters").innerHTML + "<hr><div>Formation details Team-A:"+togteamA_det+"<br>";
if(document.show_teamA_det){
$e("filters").innerHTML = $e("filters").innerHTML + "<b>Defensive:</b>";
$e("filters").innerHTML = $e("filters").innerHTML + "&nbsp;<b>DDi:</b>"+ var_DDi_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DWi:</b>"+ var_DWi_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DSh:</b>"+ var_DSh_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DLB:</b>"+ var_DLB_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DTB:</b>"+ var_DTB_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<br><b>Playing:&nbsp;&nbsp;&nbsp;&nbsp; </b>";
$e("filters").innerHTML = $e("filters").innerHTML + "&nbsp;<b>PDi:</b>"+ var_PDi_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PWi:</b>"+ var_PWi_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PSh:</b>"+ var_PSh_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PLB:</b>"+ var_PLB_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PTB:</b>"+ var_PTB_a +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "</div>";
} else {
$e("filters").innerHTML = $e("filters").innerHTML + "</div>";
}

//#######ACTUAL FORMATION DETAILS B###################
var togteamB_det = new_toogle_button("toggle_teamB_det", "(Show Team B formation details - OnRefresh)");
$e("filters").innerHTML = $e("filters").innerHTML + "<hr><div>Formation details Team-B:"+togteamB_det +"<br>";
if(document.show_teamB_det){
$e("filters").innerHTML = $e("filters").innerHTML + "<b>Defensive:</b>";
$e("filters").innerHTML = $e("filters").innerHTML + "&nbsp;<b>DDi:</b>"+ var_DDi_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DWi:</b>"+ var_DWi_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DSh:</b>"+ var_DSh_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DLB:</b>"+ var_DLB_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>DTB:</b>"+ var_DTB_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<br><b>Playing:&nbsp;&nbsp;&nbsp;&nbsp; </b>";
$e("filters").innerHTML = $e("filters").innerHTML + "&nbsp;<b>PDi:</b>"+ var_PDi_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PWi:</b>"+ var_PWi_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PSh:</b>"+ var_PSh_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PLB:</b>"+ var_PLB_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "<b>PTB:</b>"+ var_PTB_b +"&nbsp;";
$e("filters").innerHTML = $e("filters").innerHTML + "</div>";
} else {
$e("filters").innerHTML = $e("filters").innerHTML + "</div>";
}
//$e("filters").innerHTML = $e("filters").innerHTML + stringTeste;



function new_toogle_button(classButton, textButton){

return "<span class=\"padding\" style=\"cursor:pointer;\" onclick=\""+classButton+"()\" >&nbsp;&nbsp;&nbsp;&nbsp;"+textButton+"&nbsp;<img src=\"/pics/sort_btn_gray_on.gif\" class=\""+classButton+"\"/></span>";
}
$('#select_age_max').attr('disabled', false);
$('#select_age_min').attr('disabled', false);
$('#filters').attr('tooltip', '');
$('#filters').attr('onclick', '#');
//$('.training_toggle').attr('onclick', 'toggle_training()');
 
 if(!is_pro){
 $(".training_toggle").click(function(){ 
 toggle_training();
 });
 }
 
 function filter_available(i)
{
	if(!document.show_convocados && players_ar[i]["on_field"]) return false;
	return true;
}
/* 
	 headers_ar = {
		"no" :	{ "header":"#", "title":"Numero", "style": "border", "width": "30px"},
		"name" : { "header":"Nome", "title":"", "style": "left name", "width": "50px"},
		"fp" : { "header":"Pf", "title":"Posicao Favorita", "style": "position", "width": "56px"},
		"age" : { "header":"Idade", "title":"", "style": "", "width": "30px"},
		"rec" : { "header":"Ava", "title":"Avaliacao", "style": "rec", "width": "100px"},
		"asi" : { "header":"ASI", "title":"ASI", "style": "asi", "width": "82px"},
		"wage" : { "header":"Salary", "title":"Weekly Salary", "style": "asi", "width": "82px"},
		"SK1" : { "header":"SK1", "title":"SK1", "style": "sk", "width": "82px"},
		"SK2" : { "header":"SK2", "title":"SK2", "style": "sk", "width": "82px"},
		"SK1ant" : { "header":"+SK1", "title":"Incresed SK1", "style": "sk", "width": "82px"},
		"SK2ant" : { "header":"+SK2", "title":"Incresed SK2", "style": "sk", "width": "82px"},
		"routine" : { "header":"Rou", "title":"Routine", "style": "sk", "width": "82px"},
		"str" : { "header":"For", "title":"Forca", "style": "skill"},
		"sta" : { "header":"Res", "title":"Resistencia", "style": "skill"},
		"pac" : { "header":"Vel", "title":"Velocidade", "style": "border skill"},
		"mar" : { "header":"Mar", "title":"Marcacao", "style": "skill"},
		"tac" : { "header":"Des", "title":"Desarme", "style": "border skill"},
		"wor" : { "header":"TrE", "title":"Trabalho de Equipa", "style": "skill"},
		"pos" : { "header":"Pos", "title":"Posicionamento", "style": "skill"},
		"pas" : { "header":"Pas", "title":"Passe", "style": "skill"},
		"cro" : { "header":"Cru", "title":"Cruzamentos", "style": "skill"},
		"tec" : { "header":"Tec", "title":"Tecnica", "style": "border skill"},
		"hea" : { "header":"Cab", "title":"Cabeceamento", "style": "skill"},
		"fin" : { "header":"Fin", "title":"Finalizacao", "style": "skill"},
		"lon" : { "header":"RmL", "title":"Remates de Longe", "style": "border skill"},
		"set" : { "header":"BP", "title":"Bolas Paradas", "style": "border skill"},
		"cantos" : { "header":"Cor", "title":"Corner Kicks", "style": "skill"},
		"livres" : { "header":"FrK", "title":"Free Kicks", "style": "skill"},
		"penaltis" : { "header":"Pen", "title":"Penalty Kicks", "style": "skill"},
		"han" : { "header":"Enc", "title":"Encaixe", "style": "skill"},
		"one" : { "header":"Um", "title":"Saidas de Baliza", "style": "skill"},
		"ref" : { "header":"Ref", "title":"Reflexos", "style": "skill"},
		"ari" : { "header":"Aer", "title":"Capacidade A?a", "style": "skill"},
		"jum" : { "header":"Sal", "title":"Salto", "style": "skill"},
		"com" : { "header":"Com", "title":"Comunicacao", "style": "skill"},
		"kic" : { "header":"Pon", "title":"Pontape", "style": "skill"},
		"thr" : { "header":"Rep", "title":"Reposicao", "style": "skill"},
		"ti" : { "header":"Intensidade", "title":"A intensidade com que o jogador treinou com um TI de 10 equivale a um total de 1 ponto ganho em determinada habilidade", "style": "skill"},
		"ti_dif" : { "header":"+/-", "title":"A mudanca na intensidade de treino comparativamente com a semana anterior", "style": "skill"},
		"bteam" : { "header":"", "title":"Promote/Demote", "style": ""}
	};  */
	headers_ar.wage = { "header":"Salary", "title":"Weekly Salary", "style": "asi", "width": "82px"};
	headers_ar.SK1 = { "header":"SK1", "title":"SK1", "style": "skill", "width": "82px"};
	headers_ar.SK2 = { "header":"SK2", "title":"SK2", "style": "skill", "width": "82px"};
	headers_ar.SK1ant = { "header":"+SK1", "title":"Incresed SK1", "style": "sk", "width": "82px"};
	headers_ar.SK2ant = { "header":"+SK2", "title":"Incresed SK2", "style": "sk", "width": "82px"};
	headers_ar.routine = { "header":"Rou", "title":"Routine", "style": "border skill", "width": "82px"};
	headers_ar.cantos = { "header":"Cor", "title":"Corner Kicks", "style": "skill"};
	headers_ar.livres = { "header":"FrK", "title":"Free Kicks", "style": "skill"};
	headers_ar.penaltis = { "header":"Pen", "title":"Penalty Kicks", "style": "border skill"};
	
	headers_ar.DDi = { "header":"DDir", "title":"Direct - Defending against (0-100%)", "style": "skillspat"};
	headers_ar.DWi = { "header":"DWin", "title":"Wings - Defending against (0-100%)", "style": "skillspat"};
	headers_ar.DSh = { "header":"DSho", "title":"Shortpassing - Defending against (0-100%)", "style": "skillspat"};
	headers_ar.DLB = { "header":"DLoB", "title":"Long Balls - Defending against (0-100%)", "style": "skillspat"};
	headers_ar.DTB = { "header":"DThB", "title":"Through Balls - Defending against (0-100%)", "style": "border skillspat"};
	
	headers_ar.PDi = { "header":"PDir", "title":"Direct - Playing in (0-100%)", "style": "skillspat"};
	headers_ar.PWi = { "header":"PWin", "title":"Wings - Playing in (0-100%)", "style": "skillspat"};
	headers_ar.PSh = { "header":"PSho", "title":"Shortpassing - Playing in (0-100%)", "style": "skillspat"};
	headers_ar.PLB = { "header":"PLoB", "title":"Long Balls - Playing in (0-100%)", "style": "skillspat"};
	headers_ar.PTB = { "header":"PThB", "title":"Through Balls - Playing in (0-100%)", "style": "border skillspat"};
		
	headers_ar.growOK = { "header":"Gok", "title":"How good is the skills placement for development!", "style": "skill"};
	
	headers_ar.growOfGok = { "header":"+Gok", "title":"Increse of Gok in last training!", "style": "sk"};
	
	headers_ar.potential = { "header":"Pot", "title":"Player Potential. (0-5) [Send Scout]", "style": "skill"};
	headers_ar.charisma = { "header":"Cha", "title":"Player Charisma. (0-20) [Send Scout]", "style": "skill"};
	headers_ar.professionalism = { "header":"Pro", "title":"Player Professionalism. (0-20) [Send Scout OR use PRO]", "style": "skill"};
	headers_ar.aggression = { "header":"Agg", "title":"Player Aggression. (0-20) [Send Scout OR use PRO]", "style": "skill"};
	headers_ar.injury = { "header":"Inj", "title":"Player Injury Capacity. (0-20) [Only using PRO]", "style": "skill"};
	headers_ar.Adp = { "header":"Adp", "title":"Player Adaptability Capacity. (0-20) [Only using PRO]", "style": "skill"};
	headers_ar.captain = { "header":"Cap", "title":"Game Captain. >+[Send Scout]", "style": "skill"};
	headers_ar.potGok = { "header":"PoG", "title":"Player potencial taking in acount Pot&Gok! (0-5) [Send Scout]", "style": "skill"};
	
	
	headers_ar.last_games = { "header":"Games", "title":"This season amount of games played", "style": "asi"};
	headers_ar.last_goals = { "header":"Goals", "title":"This season amount of goals scored", "style": "asi"};
	headers_ar.last_goals_per_games = { "header":"Goa/Ga", "title":"This season amount of goals scored per game", "style": "asi"};
	headers_ar.last_conceded = { "header":"Conc", "title":"This season amount of goals conceded", "style": "asi"};
	headers_ar.last_conceded_per_games = { "header":"Con/Ga", "title":"This season amount of goals conceded per game", "style": "asi"};
	headers_ar.last_assists = { "header":"Assists", "title":"This season amount of assists", "style": "asi"};
	headers_ar.last_assists_per_games = { "header":"Ass/Ga", "title":"This season amount of assists per game", "style": "asi"};
	headers_ar.last_cards = { "header":"Cards", "title":"This season amount of cards received", "style": "asi"};
	headers_ar.last_cards_per_games = { "header":"Car/Ga", "title":"This season amount of cards received per game", "style": "asi"};
	headers_ar.last_productivity = { "header":"Prod", "title":"This season productivity", "style": "asi"};
	headers_ar.last_productivity_per_games = { "header":"Pro/Ga", "title":"This season productivity per game", "style": "asi"};
	headers_ar.last_rating_avg = { "header":"Rating", "title":"This season Rating", "style": "asi"};

	headers_ar.total_games = { "header":"Games", "title":"Total amount of games played", "style": "asi"};
	headers_ar.total_goals = { "header":"Goals", "title":"Total amount of goals scored", "style": "asi"};
	headers_ar.total_goals_per_games = { "header":"Goa/Ga", "title":"Total amount of goals scored per game", "style": "asi"};
	headers_ar.total_conceded = { "header":"Conc", "title":"Total amount of goals conceded", "style": "asi"};
	headers_ar.total_conceded_per_games = { "header":"Con/Ga", "title":"Total  amount of goals conceded per game", "style": "asi"};
	headers_ar.total_assists = { "header":"Assists", "title":"Total amount of assists", "style": "asi"};
	headers_ar.total_assists_per_games = { "header":"Ass/Ga", "title":"Total amount of assists per game", "style": "asi"};
	headers_ar.total_cards = { "header":"Cards", "title":"Total amount of cards received", "style": "asi"};
	headers_ar.total_cards_per_games = { "header":"Car/Ga", "title":"Total amount of cards received per game", "style": "asi"};
	headers_ar.total_productivity = { "header":"Prod", "title":"Total productivity", "style": "asi"};
	headers_ar.total_productivity_per_games = { "header":"Pro/Ga", "title":"Total productivity per game", "style": "asi"};
	headers_ar.total_rating_avg = { "header":"Rating", "title":"Total Career Rating", "style": "asi"};
	
	headers_ar.bestSkill = { "header":"B/sk", "title":"Best skill value", "style": "asi"};
	//"last_games","last_conceded","last_conceded_per_games","last_goals","last_goals_per_games","last_assists","last_assists_per_games","last_cards","last_cards_per_games","last_productivity","last_productivity_per_games","last_rating_avg",
	//"total_games","total_conceded","total_conceded_per_games","total_goals","total_goals_per_games","total_assists","total_assists_per_games","total_cards","total_cards_per_games","total_productivity","total_productivity_per_games","total_rating_avg",
	
	
	for (var k=0; k< positionNames.length; k++) {
		headers_ar[positionNames[k]]= { "header":positionNames[k], "title":"Skill in " + positionNames[k], "style": "killspat"};
	}
	
	
	function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle('.name {width:150px !important;}');
addNewStyle('.rec {width:70px !important;}');
addNewStyle('.position {width:45px !important;}');
addNewStyle('.skill {width:19px !important;}');
addNewStyle('.sk {width:30px !important;}');
addNewStyle('.asi {width:45px !important;}');
addNewStyle('.skillspat {width:35px !important;}');

    makeTable = function() {

	if(document.show_teamA_det) $("img.toggle_teamA_det").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_teamA_det").attr("src","/pics/sort_btn_gray_off.gif");
	if(document.show_teamB_det) $("img.toggle_teamB_det").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_teamB_det").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(show_training) $("img.training_toggle").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.training_toggle").attr("src","/pics/sort_btn_gray_off.gif");
		
	if(document.show_setpieces) $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_setpieces").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(document.show_scoutskills) $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_scoutskills").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(document.show_convocados) $("img.toggle_convocados").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_convocados").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(document.show_posicoes) $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_posicoes").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(document.show_fieldperformance) $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_fieldperformance").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(document.show_last_data) $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_last_data").attr("src","/pics/sort_btn_gray_off.gif");
	
	if(document.show_total_data) $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_on.gif");
	else $("img.toggle_total_data").attr("src","/pics/sort_btn_gray_off.gif");	
	
	
		if(show_training){
		ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","ti","ti_dif","growOK","growOfGok","SK1","SK1ant","SK2","SK2ant","asi","wage","bteam"]; 
        gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"ti","ti_dif","growOK","growOfGok","SK1","SK1ant","SK2","SK2ant","asi","wage","bteam"]; 
		
		} else if(document.show_last_data){
		//"last_games","last_conceded","last_conceded_per_games","last_goals","last_goals_per_games","last_assists","last_assists_per_games","last_cards","last_cards_per_games","last_productivity","last_productivity_per_games","last_rating_avg",
		ths = ["no","name","age","fp","last_games","last_conceded","last_conceded_per_games","last_goals","last_goals_per_games","last_assists","last_assists_per_games","last_cards","last_cards_per_games","last_productivity","last_productivity_per_games","last_rating_avg","routine","SK1","SK2","bteam"]; 
        gk_ths = ["no","name","age","fp","last_games","last_conceded","last_conceded_per_games","last_goals","last_goals_per_games","last_assists","last_assists_per_games","last_cards","last_cards_per_games","last_productivity","last_productivity_per_games","last_rating_avg","routine","SK1","SK2","bteam"]; 

		} else if(document.show_total_data){
		//"total_games","total_conceded","total_conceded_per_games","total_goals","total_goals_per_games","total_assists","total_assists_per_games","total_cards","total_cards_per_games","total_productivity","total_productivity_per_games","total_rating_avg",
		ths = ["no","name","age","fp","total_games","total_conceded","total_conceded_per_games","total_goals","total_goals_per_games","total_assists","total_assists_per_games","total_cards","total_cards_per_games","total_productivity","total_productivity_per_games","total_rating_avg","routine","SK1","SK2","bteam"]; 
        gk_ths = ["no","name","age","fp","total_games","total_conceded","total_conceded_per_games","total_goals","total_goals_per_games","total_assists","total_assists_per_games","total_cards","total_cards_per_games","total_productivity","total_productivity_per_games","total_rating_avg","routine","SK1","SK2","bteam"]; 
		
		} else if(document.show_posicoes){
		ths = ["no","name","age","fp","D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F","bestSkill","asi","rec","bteam"]; 
        gk_ths = ["no","name","age","fp",, , , , , , , , , , , , , "GK","asi","rec","bteam"]; 

		} else if(document.show_fieldperformance){
		ths = ["no","name","age","fp","DDi","DWi","DSh","DLB","DTB","PDi","PWi","PSh","PLB","PTB","routine","SK1","SK2","asi","rec","bteam"]; 
        gk_ths = ["no","name","age","fp",,,,,,,,,,,"routine","SK1","SK2","asi","rec","bteam"]; 
		
		}else {
			if(!document.show_setpieces){
				if(document.show_scoutskills){
					ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","potential","Adp","injury","charisma","professionalism","aggression","routine","captain","growOK","potGok","SK1","SK2","bteam"];  //,"wage" |||||
					gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"potential","Adp","injury","charisma","professionalism","aggression","routine","captain","growOK","potGok","SK1","SK2","bteam"]; //,"wage"|||||
				} else {
					ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","routine","growOK","SK1","SK2","wage","asi","rec","bteam"];  // |||||
					gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"routine","growOK","SK1","SK2","wage","asi","rec","bteam"]; //|||||				
				}
			} else {
				if(document.show_scoutskills){
					ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","cantos","livres","penaltis","potential","Adp","injury","charisma","professionalism","aggression","routine","captain","growOK","potGok","SK1","SK2","bteam"];  //,"wage","rec","asi"|||||
					gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,,,,"potential","Adp","injury","charisma","professionalism","aggression","routine","captain","growOK","potGok","SK1","SK2","bteam"]; //,"wage","rec","asi"|||||
				}else{
					ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","cantos","livres","penaltis","routine","growOK","SK1","SK2","asi","rec","bteam"];  //,"wage","rec","asi"|||||
					gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,,,,"routine","growOK","SK1","SK2","asi","rec","bteam"]; //,"wage","rec","asi"|||||				
				}
			
			}
		}
		
		//SESSION["is_pro"] = 1;
		
		
//,"DDi", "DWi", "DSh", "DLB", "DTB"
		
    myTable = document.createElement('table');
    myTable.className = "hover zebra";

	
    construct_th();
    var z=0;
	var player_count = 0;
    for (i=0; i<players_ar.length; i++) {
        if (players_ar[i]["fp"] != "GK" && add_me(players_ar[i]) && filter_squads() && filter_available(i)) {
            construct_tr(players_ar[i], z);
            z++;
			player_count++;
        }
    }
    if (z == 0) {
		var myRow = myTable.insertRow(-1);
		var myCell = myRow.insertCell(-1);
		myCell.colSpan = 24;
//		myCell.innerHTML = other_header;
		$(myCell).addClass("bold").css("padding","10px");
    }
    if (filters_ar[1] == 1) {
        var myRow = myTable.insertRow(-1);
        var myCell = myRow.insertCell(-1);
        myCell.className = "splitter";
        myCell.colSpan = "50";
        myCell.innerHTML = gk_header;
        construct_th(true);
        z=0;
        for (i=0; i<players_ar.length; i++) {
            if (players_ar[i]["fp"] == "GK" && filter_squads() && filter_available(i)) {
                if (!(players_ar[i]["age"] < age_min || players_ar[i]["age"] > age_max)) {
                    construct_tr(players_ar[i], z, true);
                    z++;
                }
            }
        }
    }
	
	var $player_count = $("#player_count");
	if($player_count.length ==0) $player_count = $("<span/>").attr("id","player_count").addClass("float_right").prependTo("#filters");
	$player_count.text(pc_replace(pagecontent[116],{"[number]":player_count}));
	

    $e("sq").innerHTML = "";
    $e("sq").appendChild(myTable);
	    
		

		
    activate_player_links($(myTable).find("[player_link]"));
    init_tooltip_by_elems($(myTable).find("[tooltip]"))
	
	

		
		 

	
	
	//###########################################################################################################
	//###########################################################################################################	
	//###########################################################################################################	
	
    zebra();

    };
}

var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));

document.body.appendChild(inject);

$(document).ready(function(){
	sort_it("no");
	make_radio("main_squad");
});

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

    $.noConflict();
    jQuery(document).ready(function($) {
        $('table.zebra th:eq(1)').click();
  });
});






        
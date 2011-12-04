
var resources = new Array("meat","farm","metal","fur","stone","wood");
resources["meat"] = 20;
resources["farm"] = 20;
resources["metal"] = 20;
resources["fur"] = 20;
resources["stone"] = 20;
resources["wood"] = 20;

var outPostsOwned = new Array();
var i = 0;
while(i<15){
	outPostsOwned[i]= "n";
	i++;
}
////////////////////////////////////////////////////////////
// set what resources resources each oupost is next too.
var outPost1 = new Array("metal","wood","farm","metal");
var outPost2 = new Array("metal","wood","meat","stone");
var outPost3 = new Array("meat","stone","farm","fur");
var outPost4 = new Array("farm","fur","fur","wood");
var outPost5 = new Array("fur","wood","stone","metal");
var outPost6 = new Array("fur","stone","farm","metal");
var outPost7 = new Array("stone","wood","stone","metal");
var outPost8 = new Array("metal","wood","stone","fur");
var outPost9 = new Array("fur","wood","meat","metal");
var outPost10 = new Array("wood","stone","farm","meat");
var outPost11 = new Array("fur","stone","stone","meat");
var outPost12 = new Array("stone","wood","meat","fur");
var outPost13 = new Array("fur","wood","farm","metal");
var outPost14 = new Array("meat","wood","farm","metal");
var outPost15 = new Array("meat","wood","farm","meat");

// Update Resources every 5 seconds.
setInterval(updateResources, 5000);  
 
 function updateResources(){
 	var i = 0;
 	while(outPostsOwned[i]){
 		if(outPostsOwned[i] == true){
 			switch (i){
			case 1: var owned = outPost1;break;
			case 2: var owned = outPost2;break;
			case 3: var owned = outPost3;break;
			case 4: var owned = outPost4;break;
			case 5: var owned = outPost5;break;
			case 6: var owned = outPost6;break;
			case 7: var owned = outPost7;break;
			case 8: var owned = outPost8;break;
			case 9: var owned = outPost9;break;
			case 10: var owned = outPost10;break;
			case 11: var owned = outPost11;break;
			case 12: var owned = outPost12;break;
			case 13: var owned = outPost13;break;
			case 14: var owned = outPost14;break;
			case 15: var owned = outPost15;break;
			}
 			for(var j = 0;j<4;j++){
 				console.log(owned[j]);
 				resources[owned[j]]++;
 			}
 		}
 		i++;
 	}
 	// Update the increments to your resources.
	showResourceIncrement();
	
 }
 function showResourceIncrement(){
 	$("#Farm div").empty(); $("#Farm div").append(resources["farm"]);
 	$("#Metal div").empty(); $("#Metal div").append(resources["metal"]);
 	$("#Stone div").empty(); $("#Stone div").append(resources["stone"]);
 	$("#Fur div").empty(); $("#Fur div").append(resources["fur"]);
 	$("#Meat div").empty(); $("#Meat div").append(resources["meat"]);
 	$("#Wood div").empty(); $("#Wood div").append(resources["wood"]);
 }
 
 	
 
////////////////////////////////////////////////////////////
/* Orbiter Micro Code */
//==============================================================================

// VARIABLES

//==============================================================================
var orbiter;
var msgManager;
var UPC = net.user1.orbiter.UPC;
var roomID = "iLandGame";

//==============================================================================
// INITIALIZATION


  
//==============================================================================

// ORBITER EVENT LISTENERS
//==============================================================================

// Triggered when the connection is ready
function readyListener (e) {
  displayChatMessage("Connected.");
  displayChatMessage("Waiting for login...");
  // Create the chat room
  msgManager.sendUPC(UPC.CREATE_ROOM, roomID);
  // Join the chat room
  msgManager.sendUPC(UPC.JOIN_ROOM, roomID);
}

// Triggered when the connection is closed

function closeListener (e) {

  displayChatMessage("Orbiter connection closed.");

}
//==============================================================================
// CHAT ROOM EVENT LISTENER
//==============================================================================
// Triggered when a JOINED_ROOM message is received
function joinedRoomListener () {
  displayChatMessage("Welcome to iLand!");
}
// Triggered when another client joins the chat room
function clientAddedListener (roomID, clientID) {
  displayChatMessage("User" + clientID + " joined the lobby.");

  //****************************************************Michael stopped message
  //window.alert(clientID);
}
// Triggered when another client leaves the chat room
function clientRemovedListener (roomID, clientID) {
  displayChatMessage("User" + clientID + " left the lobby.");
}

function clientSnapshotMessageListener(requestID, clients){
	window.alert(clients);
}
//==============================================================================
// CHAT SENDING AND RECEIVING
//==============================================================================
// Sends a chat message to everyone in the chat room
function sendMessage () {
  var outgoing = document.getElementById("outgoing");
  if (outgoing.value.length > 0) {
    msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", outgoing.value);
    outgoing.value = "";
    // Focus text field again after submission (required for IE8 only)
    setTimeout(function () {outgoing.focus();}, 10);
  }
}

function sendGameMessage(message){
	 msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "GAME_ACTION", roomID, "true", "", message);
}

// Triggered when a chat message is received
function chatMessageListener (fromClientID, message) {
	if(message == "/help")
	{
		displayHelp();
	}
	else if(message == "/whisper" || message == "/w")
	{
		//Need to pase who it is to first, second you need to pass who it is from
		whisper(message, fromClientID,len)
	}
	else
		displayChatMessage("User" +fromClientID+ ": " + message);
}
// Displays a single chat message
function displayChatMessage (message) {
  // Make the new chat message element
  var msg = document.createElement("span");
  msg.appendChild(document.createTextNode(message));
  msg.appendChild(document.createElement("br"));
  // Append the new message to the chat
  var chatPane = document.getElementById("chatPane");
  chatPane.appendChild(msg);
  // Trim the chat to 500 messages
  if (chatPane.childNodes.length > 500) {
    chatPane.removeChild(chatPane.firstChild);
  }
  chatPane.scrollTop = chatPane.scrollHeight;
}


// useful for finding elements
var element = function(id) { return document.getElementById(id); }
var errorMessage = undefined;
var elStatus;


function statusMessage(s) {
    if(!elStatus) elStatus = element('statusMessage');
    if(!elStatus) return;
    if(s) elStatus.innerHTML = s;
    else elStatus.innerHTML = '&nbsp;';
}


	statusMessage("Welcome to iLand");
///////////////////////////////////////////////////////
//Click a nav item, run this function
	 $("#myResources ul li").click(function () {

        $("#resourceInfo").empty();
		$("#resourceInfo").css({"display":"block"});
		$("#resourceInfo").append("<div id='exit_nav'>X</div>");	
		$("#exit_nav").click(function()
		{
			$("#resourceInfo").fadeOut(400);
		});
        var curr = $(this).attr('id');
		
        if (curr == "Farm") 
		{
            $("#resourceInfo").append("'a'");
        }
		else if (curr == "Fur")
		{
            $("#resourceInfo").append("'b'");
        }
		else if (curr == "Metal")
		{
            $("#resourceInfo").append("'c'");
        }
		else if (curr == "Wood")
		{
            $("#resourceInfo").append("'d'");
        }
		else if (curr == "Stone")
		{
            $("#resourceInfo").append("'e'");
        }
		else if (curr == "Meat")
		{
            $("#resourceInfo").append("'f'");
        }
	});
	
///////////////////////////////////////////////////////	




  var buyables = new Array();
        var outposts = new Array();
        var draggingElement;

        function handleOutpostDragStart(e) {
        e.dataTransfer.setDragImage(element('outpostPic'), 49, 48);
        	statusMessage("Place an Outpost in a Drop Zone to purchase");
        	for(var i = 0; i<16; i++){
        	$("#out"+i).css({"display":"block"});
        }
        	
            
            draggingElement = this;
            draggingElement.className = 'moving';
            
            draggingElement.style.opacity = '0.4';
        }

        function handleOutpostDragEnd(e) {
            this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
           
		for(var i = 0; i<16; i++){
			var bgImg = $("#out"+i).css("background-image");
			if( bgImg == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        	$("#out"+i).css({"display":"none"});
        }
        }
          if(!(($('#statusMessage').text() === "Successfully purchased Outpost!") || ($('#statusMessage').text() === "You can't afford that!!!!"))){
          	statusMessage("Welcome to iLand");
          }
        }


		function handleDragOver(e){
			if(e.preventDefault) return e.preventDefault();
			return false;
		}

        function handleOutpostDrop(e) {
        
        if (typeof(e)=='string'){
        var curr = element(e);
        if( $(curr).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        $(curr).css("height","52px");
         $(curr).css("background-size","30px 52px");
         $(curr).css({
      		"margin-top": function(index, value) {
    		    return parseFloat(value) -20;
    			  }});
			$(curr).css("background-image","url(images/outposttmb.png)");
			$(curr).fadeIn();
			}	
		}else if((resources["metal"] >= 5) && (resources["stone"] >= 10) && (resources["meat"] >= 5) && (resources["wood"] >= 5) && (resources["farm"] >= 10)){
        if( $(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        	resources["metal"] = resources["metal"]-5;
			resources["meat"] = resources["meat"]-5;
			resources["wood"] = resources["wood"]-5;
			resources["stone"] = resources["stone"]-10;
			resources["farm"] = resources["farm"]-10;
			showResourceIncrement();
			sendGameMessage($(this).attr("id"));
        	$(this).css("height","52px");
         	$(this).css("background-size","30px 52px");
         	$(this).css({
      		"margin-top": function(index, value) {
    		    return parseFloat(value) -20;
    			  }});
          $(this).css("background-image","url(images/outposttmb.png)");
          var outPostBought = $(this).attr('id').substring(3);
          outPostsOwned[outPostBought] = true;
          statusMessage("Successfully purchased Outpost!");
        	  }
        	}
        	else{
        		 statusMessage("You can't afford that!!!!");
        	}
        }
		
  
		function handleRoadVDragStart(e){
		e.dataTransfer.setDragImage(element('roadVPic'), 49, 48);
			statusMessage("Place a Road in a Drop Zone to purchase");
			for(var i = 0; i<21; i++){
        	$("#roadV"+i).css({"display":"block"});
        }
        	
            
            draggingElement = this;
            draggingElement.className = 'moving';
            
            draggingElement.style.opacity = '0.4';
		}
		
		function handleRoadVDragEnd(e){
			statusMessage("Drag Road Vertical Ended");
			 this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
			for(var i = 0; i<21; i++){
			var bgImg = $("#roadV"+i).css("background-image");
			if( !(bgImg == "url(https://iland.grid.csun.edu/game/images/roadVtmb.png)")){
        	$("#roadV"+i).css({"display":"none"});
				}
			}
          if(!(($('#statusMessage').text() === "Successfully purchased Outpost!") || ($('#statusMessage').text() === "You can't afford that!!!!"))){
          	statusMessage("Welcome to iLand");
          }
		}
		function handleRoadVDrop(e){
	if (typeof(e)=='string'){
			$(element(e)).css("background-image","url(images/roadVtmb.png)");
			$(element(e)).fadeIn();
		}else if(resources["wood"]>=10 && resources["metal"]>=1 && resources["stone"]>=5){
			if($(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
				resources["metal"] = resources["metal"]-1;
				resources["wood"] = resources["wood"]-10;
				resources["stone"] = resources["stone"]-5;
				showResourceIncrement();
				sendGameMessage($(this).attr("id"));
				$(this).css("background-image","url(images/roadVtmb.png)");
        		statusMessage("Successfully purchased Road!");
         	 }
          }else{
          	statusMessage("You can't afford that!!!!");
          }
		}
		
		
		function handleRoadHDragStart(e){
		e.dataTransfer.setDragImage(element('roadHPic'), 49, 48);
			statusMessage("Place a Road in a Drop Zone to purchase");
			for(var i = 0; i<19; i++){
        	$("#roadH"+i).css({"display":"block"});
        }
            draggingElement = this;
            draggingElement.className = 'moving';
            draggingElement.style.opacity = '0.4';
		}
		function handleRoadHDragEnd(e){
			statusMessage("Drag Road Horizontal Ended");
			 this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
			for(var i = 0; i<19; i++){
			var bgImg = $("#roadH"+i).css("background-image");
			if( !(bgImg == "url(https://iland.grid.csun.edu/game/images/roadHtmb.png)")){
        	$("#roadH"+i).css({"display":"none"});
				}
			}
			if(!($('#statusMessage').text() === "Successfully purchased Road!")){
          	statusMessage("Welcome to iLand");
          }
		}
		function handleRoadHDrop(e){
		if (typeof(e)=='string'){
			$(element(e)).css("background-image","url(images/roadHtmb.png)");
			$(element(e)).fadeIn();
		}else if(resources["wood"]>=10 && resources["metal"]>=1 && resources["stone"]>=5){
			if($(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
				resources["metal"] = resources["metal"]-1;
				resources["wood"] = resources["wood"]-10;
				resources["stone"] = resources["stone"]-5;
				showResourceIncrement();
				sendGameMessage($(this).attr("id"));
				$(this).css("background-image","url(images/roadHtmb.png)");
        		statusMessage("Successfully purchased Road!");
         	 }
          }else{
          	statusMessage("You can't afford that!!!!");
          }
		}
		function gameActionListener(fromClientID, message){
			if(message.substring(0,5) == "roadV"){
			handleRoadVDrop(message);
			}else if(message.substring(0,5) == "roadH"){
			handleRoadHDrop(message);
			}else if(message.substring(0,3) == "out"){
			handleOutpostDrop(message);
			}
			
		}

        function init() {
  				//Handlers for dropping in Outpost
                element('outpost').addEventListener('dragstart', handleOutpostDragStart, false);
                element('outpost').addEventListener('dragend', handleOutpostDragEnd, false);               
    	    	//Handlers for dropping in roads
    	    	
    	       element('roadHorz').addEventListener('dragstart', handleRoadHDragStart, false);
                element('roadHorz').addEventListener('dragend', handleRoadHDragEnd, false);               
    	    	element('roadVert').addEventListener('dragstart', handleRoadVDragStart, false);
                element('roadVert').addEventListener('dragend', handleRoadVDragEnd, false);   
                
             //Set listener for drop zones           
    	     for(var i=1; i<16; i++){    	    
    	     element('out'+i).addEventListener('drop', handleOutpostDrop, false);
    	     element('out'+i).addEventListener('dragover', handleDragOver, false);
    	     }
    	     for(var i=1; i<21; i++){  
    	     element('roadV'+i).addEventListener('drop', handleRoadVDrop, false);
    	     element('roadV'+i).addEventListener('dragover', handleDragOver, false);
    	     }  
    	      for(var i=1; i<19; i++){  
    	     element('roadH'+i).addEventListener('drop', handleRoadHDrop, false);
    	     element('roadH'+i).addEventListener('dragover', handleDragOver, false);   
    	     }
    	      // Create the Orbiter instance, used to connect to and communicate with Union
 			 orbiter = new net.user1.orbiter.Orbiter();
 			 // If required JavaScript capabilities are missing, abort
  			if (!orbiter.getSystem().isJavaScriptCompatible()) {
   			 displayChatMessage("Your browser is not supported.");
   			 return;
   			}
   			// Register for Orbiter's connection events

  			orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
  			orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);
  			// Register for incoming messages from Union

  			msgManager = orbiter.getMessageManager();
  			msgManager.addMessageListener(UPC.JOINED_ROOM, joinedRoomListener, this);
  			msgManager.addMessageListener(UPC.CLIENT_ADDED_TO_ROOM, clientAddedListener, this);
  			msgManager.addMessageListener(UPC.CLIENT_REMOVED_FROM_ROOM, clientRemovedListener, this);
  			msgManager.addMessageListener("CHAT_MESSAGE", chatMessageListener, this, [roomID]);
  			msgManager.addMessageListener(UPC.CLIENT_SNAPSHOT, clientSnapshotMessageListener, this);
  			msgManager.addMessageListener("GAME_ACTION", gameActionListener, this, [roomID]);
  			// Connect to chat
  			orbiter.connect("tsar190.grid.csun.edu", 9100);
  			displayChatMessage("Connecting to chat server...");
		}   
            window.onload = function() {
            init();
            $("#chat").css({"margin-top":(window.innerHeight-180)+"px"});
        }
        

$(document).ready(function(){
	$('#upgradeTab, #tradingTab').click(function(){
		if($(this).attr("id") == "upgradeTab"){
			$("#tradingContent").fadeOut(400,function(){
				$("#upgradeContent").fadeIn(400);
			});
		}else{
			$("#upgradeContent").fadeOut(400,function(){
				$("#tradingContent").fadeIn(400);
			});
		}
	});
});



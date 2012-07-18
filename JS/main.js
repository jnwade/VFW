	// Activity 2
	// Visual Frameworks (VFW)
	// Mobile Development
	// Full Sail University
	// Jonathan Wade
	// Displays Tempo slider value
	function showValue(newValue) {
		document.getElementById("range").innerHTML=newValue;
	}
	
	function toggleMe(obj, a){
		var e=document.getElementById(a);
			if(!e)return true;
			e.style.display="block"
			return true;
	}
 
	function toggleMe2(obj, a){
		var e=document.getElementById(a);
			if(!e)return true;
			e.style.display="none"
			return true;
	}
 	

    //Wait until the DOM has loaded
window.addEventListener("DOMContentLoaded", function(){
	 	
 	//getElementByID Funtion
 	function $(x){
 		var theElement = document.getElementById(x);
 		return theElement;
 	}

 	//Create select field element and populate with options
 	function createGenres() {
	 	var formTag = $("mainForm"),
		 	selectLi = $("select"),
		 	makeSelect = document.createElement("select");
		 	makeSelect.setAttribute("id", "genres");
		 for(var i=0, j=songGenre.length; i<j; i++){
			 var makeOption = document.createElement("option");
			 var optText = songGenre[i];
			 makeOption.setAttribute("value", optText);
			 makeOption.innerHTML = optText;
			 makeSelect.appendChild(makeOption);
		 }
		 selectLi.appendChild(makeSelect);
	}
	
	//Find Value of selected radio button
	function getRadioValue(){
		var radio = document.forms[3].learn;
			for(var i=0; i<radio.length; i++){
				if(radio[i].checked){
					learnValue = radio[i].value;
			}
		}
	}
	
	//Find Value of Checkbox
	function getCheckValue(){
		if($("sing").checked){
			singValue = $("sing").value;
		}else{
			singValue = "No";
		}
	}
	

 	
 	function toggleControls(n) {
	 	switch(n){
		 	case "on":
		 		$("mainForm").style.display = "none";
		 		$("clearList").style.display = "inline";
		 		$("viewList").style.display = "none";
		 		$("addNew").style.display = "inline";
		 		break;
		 	case "off":
		 		$("mainForm").style.display = "block";
		 		$("clearList").style.display = "inline";
		 		$("viewList").style.display = "inline";
		 		$("addNew").style.display = "none";
		 		$("item").style.display = "none";
		 		break;
		 	default:
		 		return false;
		 		
	 	}
 	}
 	
 	
	function storeData(){
		var id 					= Math.floor(Math.random()*1000001);
		// Gather up all of our form field values and store them in an object.
		//Object properties contain array with the form label and input value which will allow us to label the data.
		getRadioValue();
		getCheckValue();
		var item 				= {};
			item.genres			= ["Genre:", $("genres").value];
			item.title			= ["Title:", $("title").value];
			item.artist			= ["Artist:", $("artist").value];
			item.tempo			= ["Tempo:", $("tempo").value];
			item.needToLearn	= ["Need to learn:", learnValue];
			item.sing			= ["Sing:", singValue];
			item.key			= ["Key:", $("key").value];
			item.notes			= ["Notes:", $("notes").value];
		//Save data into Local Storage: Use "Stringify" to convert our objects to strings (Local storage can only store strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Song Saved!"); 		
 	}
 	
 	function getData(){
 		toggleControls("on");
 		if(localStorage.length === 0) {
	 		alert("Nothing has been saved yet!");
 		}
	 	//Write data from localStorage to the Browser
	 	var makeDiv = document.createElement("div");
	 	makeDiv.setAttribute("id", "item"); //temp changed "items" to "item" for debugging
	 	var makeList = document.createElement("ul");
	 	makeDiv.appendChild(makeList);
	 	document.body.appendChild(makeDiv);
	 	$("item").style.display = "block";
	 	for(var i = 0, j = localStorage.length; i<j; i++){
		 	var makeLi = document.createElement("li");
		 	makeList.appendChild(makeLi);
		 	var key = localStorage.key(i);
		 	var value = localStorage.getItem(key);
		 	// Here we are converting our localStorage string value back into an object using JSON.parse().
		 	var jsonObject = JSON.parse(value);
		 	var makeSubList = document.createElement("ul");
		 	makeLi.appendChild(makeSubList);
		 	for(var n in jsonObject){
			 	var makeSubLi = document.createElement("li");
			 	makeSubList.appendChild(makeSubLi);
			 	var dataInfo = jsonObject[n][0]+" "+jsonObject[n][1];
			 	makeSubLi.innerHTML = dataInfo;
		 	}	
	 	}	
 	}
 	
 	function clearLocal() {
 		if(localStorage.length === 0) {
	 		alert("There is nothing to clear!")
 		}else{
	 		localStorage.clear();
	 		alert("All songs have been deleted.");
	 		window.location.reload();
	 		return false;
 		}
 	 }

 	//Variable Defaults
 	var songGenre = ["Pick A Genre!", "Disco", "Funk", "Classic Rock", "80s alt", "Hair Metal", "90s Rock" ],
 		learnValue,
 		singValue = "No"
 	;
 		
 	createGenres();
 	
 	// Set Link & Submit Click Events
 	var viewList = $("viewList");
 	viewList.addEventListener("click", getData);
 	var clearList = $("clearList");
 	clearList.addEventListener("click", clearLocal);
 	var addSong = $("submitButton");
 	addSong.addEventListener("click", storeData);

}); 	
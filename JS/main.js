	// Activity 3
	// Visual Frameworks (VFW)
	// Mobile Development
	// Full Sail University
	// Jonathan Wade
	// Displays Tempo slider value
	

   

 	
    //Wait until the DOM has loaded
    window.addEventListener("DOMContentLoaded", function(){
	 	
 	
 	//Displays the value of the Range Slider for Tempo
 	function showValue() {
 		var newValue = $("tempo").value;
 		$("range").innerHTML=newValue;
	}

	//Toggles the date field depending on the "Need to Learn" radio button selection
	function toggleMe(){
		$("learnByDate").style.display="block";		
	}
	
 
	function toggleMe2(){
			$("learnByDate").style.display="none";	
	}

	  
 	//getElementByID Function
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
		var radio = document.forms[0].learn;
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
	

 	//Toggles between data input mode and data view mode
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
 	
 	//Stores form data into Local Storage
	function storeData(key){
	//If there is no key, this means this is a brand new item and we need a new key
	if(!key){
		var id 					= Math.floor(Math.random()*1000001);
	}else{
		//Set the id to the existing key we're editing so that it will save over the existing data.
		//This is key is the same key that has been passed along from the editSubmit event handler
		//to the validate function, and then passed here, into the storeData function.
		id = key;
	}
		// Gather up all of our form field values and store them in an object.
		//Object properties contain array with the form label and input value which will allow us to label the data.
		getRadioValue();
		getCheckValue();
		var item 				= {};
			item.genres			= ["Genre:", $("genres").value];
			item.songName		= ["Title:", $("songName").value];
			item.artist			= ["Artist:", $("artist").value];
			item.tempo			= ["Tempo:", $("tempo").value];
			item.needToLearn	= ["Need to learn:", learnValue];
			item.learnBy		= ["Learn By:", $("learnBy").value];
			item.sing			= ["Sing:", singValue];
			item.key			= ["Key:", $("key").value];
			item.notes			= ["Notes:", $("notes").value];
		//Save data into Local Storage: Use "Stringify" to convert our objects to strings (Local storage can only store strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Song Saved!"); 		
 	}
 	
 	
 	
 	//Retreives data from local storage
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
		 	var linksLi = document.createElement('li');
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
			 	makeSubList.appendChild(linksLi);
		 	}
		 	//Creates edit and delete links for each item submitted to local storage
		 	makeItemLinks(localStorage.key(i), linksLi); 	
	 	}	
 	}
 	//Make Item Links
 	//Creates the edit and delete links for each stored item when displayed
 	function makeItemLinks(key, linksLi) {
 		//Add edit single item link
	 	var editLink = document.createElement('a');
	 	editLink.href = "#";
	 	editLink.key = key;
	 	var editText = " Edit Song";
	 	editLink.addEventListener("click", editItem);
	 	editLink.innerHTML = editText;
	 	linksLi.appendChild(editLink);
	 	
	 	//Add line break
	 	var breakTag = document.createElement('br');
	 	linksLi.appendChild(breakTag);
	 	
	 	//Add delete single item link
	 	var deleteLink = document.createElement('a');
	 	deleteLink.href = "#";
	 	deleteLink.key = key;
	 	var deleteText = "Delete Song";
	 	deleteLink.addEventListener("click", deleteItem);
	 	deleteLink.innerHTML = deleteText;
	 	linksLi.appendChild(deleteLink);
 	}
 	
 	function editItem() {
		//Grab the data for our items in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show Form Field
		toggleControls("off");
		
		//Populate the form fields with current localStorage values.
		$("genres").value = item.genres[1];
		$("songName").value = item.songName[1];
		$("artist").value = item.artist[1];
		$("tempo").value = item.tempo[1];
		//For Radio buttons
		var radio = document.forms[0].learn;
		for(var i = 0; i< radio.length; i++){
			if(radio[i].value == "yes" && item.needToLearn[1] == "yes") {
				radio[i].setAttribute("checked", "checked");
			}else if(radio[i].value == "no" && item.needToLearn[1] == "no") {
				radio[i].setAttribute("checked", "checked");
			}
		}
		$("learnBy").value = item.learnBy[1];
		//For Check Box
		if(item.sing[1] == "on") {
			$("sing").setAttribute("checked", "checked");
		}
		$("key").value = item.key[1];
		$("notes").value = item.notes[1];
		
		//Remove the initial listener form the input 'save contact' button
		addSong.removeEventListener("click", storeData);
		//Change submit button value to say edit edit
		$("submitButton").value = "Edit Song Info";
		var editSubmit = $("submitButton");
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
 	}
 	
 	function deleteItem() {
	 	var ask = confirm("Delete Song?");
	 	if(ask) {
		 	localStorage.removeItem(this.key);
		 	window.location.reload();
	 	}else{
		 	alert("Whew, that was a close one!");
		 	
	 	}
 	}
 	
 	//Validate our form fields
 	function validate(e){
 		//Define the elements we want to check
 		var getGenres = $("genres");
 		var getSongName = $("songName");
 		var getArtist = $("artist");
 		
 		//Reset error messages
 		errMsg.innerHTML = "";
		getGenres.style.border = "1px solid black";
		getSongName.style.border = "1px solid black";
		getArtist.style.border = "1px solid black";
 			
 		//Get error messages
 		var messageErrorArray = [];
 		//Genres validation
 		if(getGenres.value === "Pick A Genre!") {
	 		var genreError = "Please select a Genre."
	 		getGenres.style.border = "1px solid #1e69de";
	 		messageErrorArray.push(genreError);
 		}
 		
 		//Song Title validation
 		if(getSongName.value === ""){
	 		var songNameError = "Please enter a Song Title.";
	 		getSongName.style.border = "1px solid #1e69de";
	 		messageErrorArray.push(songNameError);
 		}
 		//Artist name validation
 		if(getArtist.value === ""){
	 		var artistNameError = "Please enter the Artists name.";
	 		getArtist.style.border = "1px solid #1e69de";
	 		messageErrorArray.push(artistNameError);
 		}
 		
 		//If errors exist, display them on the screen.
 		if(messageErrorArray.length >= 1) {
	 		for(var i = 0, j = messageErrorArray.length; i < j; i++) {
		 		var txt = document.createElement('li');
		 		txt.innerHTML = messageErrorArray[i];
		 		errMsg.appendChild(txt);
	 		}
	 		//Stop Default actions
	 		e.preventDefault();
	 		return false;
 		}else{
	 		//If all is ok, save the data. Send the key value from the edit data function.
	 		//This key value was passed through the editSubmit event listener as a property.
	 		storeData(this.key);
 		}
 		
 		
 	}
 	
 	
 	//Clears local storage
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
 		singValue = "No",
 		errMsg = $("errors");
 	;
 		
 	createGenres();
 	
 	// Set Link & Submit Click Events
 	var viewList = $("viewList");
 	viewList.addEventListener("click", getData);
 	var clearList = $("clearList");
 	clearList.addEventListener("click", clearLocal);
 	var addSong = $("submitButton");
 	addSong.addEventListener("click", validate);
 	var showRange = $("tempo");
 	showRange.addEventListener("change", showValue);
 	var learnByDate = $("yes");
 	learnByDate.addEventListener("click", toggleMe);
 	var learnByDate2 = $("no");
 	learnByDate2.addEventListener("click", toggleMe2);
 	
}); 	
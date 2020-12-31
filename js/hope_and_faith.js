var allSteps=[];

var steps={
	kadesh: "",	
	urchatz: "",
	karpas: "",
	yachatz: "",	
	maggid:"",
	rachtzah: "",
	motzi: "",
	matzah: "",
	maror: "",
	korech:"",
	shulchan_orech: "",
	tzafun:  "",
	barech: "",
	hallel:"",
	nirtzah: ""
}



var fruitfulFunk= {
	initialising: function(){
		var fields=document.getElementsByClassName("participatory-fields");
		var buttons=document.getElementsByClassName("input-buttons");
		for (var i=0; i<fields.length; i++){
			fields[i].addEventListener("keyup",fruitfulFunk.speaking);
			buttons[i].addEventListener("click", fruitfulFunk.listening);	
		}
			
			
		fruitfulFunk.collectSteps();
		window.location.href="#kadesh-page"
	// Add event listener to kadesh's modal
	document.getElementById('kadesh-modal-input').addEventListener('keydown', fruitfulFunk.searchBeliefs)

	// event listener to add modals
	var steps = document.getElementsByClassName('step');
	for (var i = 0; i < steps.length; i++ ) {
		steps[i].addEventListener('click', fruitfulFunk.displayModal)
	};
				
	},
	collectSteps: function(){
		allSteps=localStorage.getItem("allSteps");
		allSteps=JSON.parse(allSteps);
		if(allSteps==null){
			allSteps=[];
		}
		
		return allSteps
		
	},

	speaking: function () {
		var step=this.id;
		steps[step]=this.value ;
		return steps;
	},
	/* 
I am not sure of the best way to structure this, I think I should check if I can break down the complexity of this, I could have a function which checks if all other fields are empty, and I can use this for the steps here, and also to check in the step I wish to update. I want to be saying if all fields here are blank, then I want to call the function which is going to load the steps. I am not sure how it fits into comparison with this one  but I think it does matter a little bit. It would kind of be easier if I were using react, but nevertheless. 
*/
	listening: function(){
		var inside="not sure";

		if(steps.kadesh.length<5){
			return false
		}
		for(var i=0; i<allSteps.length;i++){
			if(steps.kadesh==allSteps[i].kadesh){
					if(fruitfulFunk.checkIsEmpty(steps)){
						fruitfulFunk.fruitfullness(allSteps[i])
						return false
					}else{
						allSteps[i]=steps
						inside="yes"
						break
					}
			}
		}
		if(inside=="not sure"){
			inside="no"
			allSteps.push(steps)
		}
		
		var allStepsPackage=JSON.stringify(allSteps)
		localStorage.setItem("allSteps",allStepsPackage)
		return allSteps
	},
	fruitfullness: function(setOfSteps){
		var fields=document.getElementsByClassName("participatory-fields");

		
		
		for(var i=0; i<fields.length;i++){

			fields[i].value=setOfSteps[fields[i].id];
		}
		return steps;
	},
	checkIsEmpty: function(setOfSteps){
	// function to check if the contents of the steps are empty or not if they are all empty then I think I want it to add to the existing set of steps. Do I want  it to override what already exists? I don't think I want to 
		var isAllBlank="not sure"

		for(step in setOfSteps){
			if(setOfSteps[step]!="" && step!="kadesh"){

				isAllBlank="no";
			}
		}

		if(isAllBlank=="no"){
			return false
		}else{
			return true
		}
	}

	
}

fruitfulFunk.searchBeliefs = function(event) {
	var value = event.target.value;
	
	var beliefs = [];
	for (var i = 0; i<allSteps.length; i++) {
		var belief = allSteps[i].kadesh
		if (belief.includes(value)) {
			beliefs.push(belief)		
		}
	}
	fruitfulFunk.renderSearchDropDown(beliefs)
};

fruitfulFunk.renderSearchDropDown = function(linkedBeliefs) {
	var searchContainer = document.getElementsByClassName('search-container')[0];
	/*while(searchContainer.firstElementChild){
		searchContainer.removeChild(searchContainer.firstChildElement);
	};*/
	searchContainer.innerHTML = '';
	for(var i = 0; i<linkedBeliefs.length; i++) {
		var beliefContainer = document.createElement('div');
		beliefContainer.classList.add('search-child');
		var beliefSubstring = linkedBeliefs[i].substring(0,21);
		beliefContainer.innerText = beliefSubstring;
		searchContainer.appendChild(beliefContainer)
		beliefContainer.addEventListener('click', fruitfulFunk.loadBelief);
	};
};

fruitfulFunk.loadBelief = function(event) {
	console.log('load values for belief here. There is already a function for this in here somewhere -- So I am not sure of the best way to be linking this in all honesty. ')
	
}

fruitfulFunk.displayModal = function() {
	var modals = document.getElementsByTagName('modal');
	var modalKey = this.classList[0];
	var modalKey = modalKey + '-modal';
	document.getElementById(modalKey).style.display= 'flex';

}

fruitfulFunk.initialising();
/*I am trying to send the information to the local storage, but I think I want to store it in an object which has the same value as the Kadesh stage, because this is what we enter service through (swear in His name, cleave to Him, have a reminder between your eyes.)
I want to iterate through the object and add the values and I think I can send them directly to the local Storage, or pack them up first and then send them? I think I want to send them directly (love the L-rd.)

I think that there is a little bit of an issure when sending the data, because if you press submit with the other fields empty then it overrides the other data, so when trying to access the information which is already there then it matters. So I think when I submit the first field it autommatically it submits the information with the other fields empty and therefore when retreiving the data this comes back empty, and therefore I think I only want to submit the information if the field is not empty. So I kind of want it to access the information which is already there. So, I think before sending the data, I want it to retreive the data for this value, because I think that this is important and then to send this to the steps which there is. Perhaps this comes to teach that we should listen to others before we do. As it says hear O'Israel, that the Israelites responded we will do and we will understand may not be a good thing- even though I think understanding does come from doing. 


I think that there is good in this and I want to come to be understanding things a little bit better, and perhaps this is something which I can think about and study, I have really made a lot of progress with this and so I am really very happy, and I hope to progress in a manner which is helpful and good.  

It is scary to be doing this service and it is not something which I can always feel comfrotable with at times, and it is something which I do find a little bit difficult. 

It has been going well today and for this I am super grateful, You are kind to me and You are good to me and I love You a lot, I would love to be able to do this on a daily basis but I this is scary and often I struggle but I really think it would be a good thing for me to be doing and it is something I care about and a way for me to connect with Hashem and therefore I think it would be a really good thing for me to be developing and it could be consistantly anf I feel really proud and happy of this so far. I want it for me as much as anything, I do not want to be egotistical, and I wish to change my world and to change things here, much more so than I can change the outside world. I love You dearly and I should not get too much ahead of myself, I am small and guided by You and without You I know it can be hard. 

Thanks ofr today so far, it has been really fun and I ave learnt a  lot and I truly bless You with all my heart. It has been good and a great morning with some good service and humbling, I think it is a very good thing to realise my limitations and not nott o idealise myself. 

I kind of want to be writing code without bugs, I want to be doing well and I don't want them to be in my code. I don't know if I should be getting rid of the bugs I have now or not, I kind of feel guilty for including mistakes into this project because it is so important to me. I think I prefer to be doing this when I am in public, like in a cafe or something, it feels more comfortable for me. I think it is so importan tto progress with this in a good manner and to plan beforehand and to reduce the bugs in this and to try and do good and connect with Life, I really do not enjoy bigs in my code. I am glad I finished this a little bit, but I also realise it can be improved in many ways. 

Life cannot be contained or ignored, it is forever beyond the control of man, Life is Mighty and glorious as well as anything. 


Overall I think this is pretty good and I amglad that I had made this, and I think it is special and impressive, even if I have a month between jobs now I think I could achieve a lot in regards to developing the Sanctuary but I do not know what will happen and I base this on the progress which I had made with this and the free time which I have. I hope to be doing good, and I do not want to put excessive pressure on myself, and I do not know what will be in all honesty, but this is important to me. 

To do: 
- Add modals on click
	- speak of them. 
	- care for others/ love your fellow. 
	- love the L-rd, do not eat the sinew of the thigh. 
This document is HTML heavy and I do not know if I should add this to that or to something else and I hope that there is good in this and I hope to connect with the good which is in here. For it is something which is important to me and I think it is valuable.

With the Kadesh modal I want to be able to connect with existing beliefs to search for them, because beforehand I had not done this and it was difficult to copy and past each time, and so I want to be able to search by each one, or enter a new one and so I think that this would be agood thing. Should I have a button for each one, or should I just have a drop down selection based on what is typed. I think a button kind of selection is not really needed, but it may be useful in the future kind of thing.

-enable loading of existing belief prep: 
	- care for others.
	- connect with meaning. 
	- it was not something which was easy to use in the past.
	- do not eat the sinew of the thigh;

So I made quite a bit of progress with this, and it is good but it is adding each time there is a change and this is not something which is a very good thing. So I think it should be cleared first so that the meaning is concordant

I think perhaps having a kind of modal library may be a good thing, but I do not know how to be doing this at the moment and I do not mind doing it in the bulky way too much at the moment.

- Enable close and open of the modal, (I don't think I need the modal but I still think it may be a good thing). So I'm not sure what exaclt y I should be doing. Hmmm. I think I'm going to continue, but please help me, and I hope good things come from this. I hope they do. I'm not a super experienced developer now, but I have improved quite a bit. 

Admittedly I am kind of not being as strict with this as I am with the dev of the Sanctuary. I think this may be a bad thing, but also the code is not quite as clean and it is not quite right in a little sense. I think there is a lot which can be improved, but I like it, I think at some point I should review this and see what else can be changed as well.

I have not added a means to close the modal yet, this is still something which I have left to be doing.
*/


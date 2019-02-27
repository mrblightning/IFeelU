import React from 'react';
/*To enable Pan and Zoom that are defined in chartjs-plugin-zoom*/
import * as zoom from 'chartjs-plugin-zoom';
// import { finished } from 'stream';

var Chart = require("chart.js");

class Graph extends React.Component {
    constructor(props) {
        super(props);
		this.state = {extraText:''};
		
		//this binding is needed to make 'this' work in the callback 
		this.renderExtraText = this.renderExtraText.bind(this);
    }
    
    //this will redraw the page WITH the added text at the bottom
    renderExtraText = (array, index, adedText) =>{
        this.setState({ extraText: adedText + array[index]});
    }
    
    componentDidMount() {
        let currentComponent = this;
		//This is where we define local variables that will be familiar to all functions
		//inside the componentDidMount functions
		//We start by defining 'listners' that will later tell us if a certain dataset was marked or not	
        let GeneralFeelingIsMarked = false;
        let AppetiteIsMarked = false;
        let NauseaIsMarked = false;
        let BowelMovementsIsMarked = false;
        let MotivationIsMarked = false;			
        let PainIsMarked = false;	
        let DizzinessIsMarked = false;
        let ExhaustionIsMarked = false;				
						
        let GeneralFeelingLastValue = 0;
        let AppetiteLastValue = 0;
        let NauseaLastValue = 0;
        let BowelMovementsLastValue = 0;
        let MotivationLastValue = 0;			
        let PainLastValue = 0; 
        let DizzinessLastValue = 0;
        let ExhaustionLastValue = 0;	
		//let conditionsLastValue = 0;
		//let treatmentsLastValue = 0;
			
        let currDateCombo = "";
        let currDate = "";
			
        //this will be the list of labels for the X Axis of the graph
        let myLabels = [];

		//these are the various data sets. 
		//Each set has the data on it's state and the text written at that time.
		let myDataGeneralFeeling = [];
		let GeneralFeelingTexts = [];
        let myDataAppetite = [];
		let AppetiteTexts = [];
		let myDataNausea = [];
        let NauseaTexts = [];
		let myDataBowelMovements = [];
        let BowelMovementsTexts = [];
		let myDataMotivation = [];
        let MotivationTexts = [];
		let myDataPain = [];		
        let PainTexts = [];
		let myDataDizziness	= [];	
        let DizzinessTexts = [];
		let myDataExhaustion = [];
        let ExhaustionTexts = [];

        //let conditionsTexts = [];
		//let treatmentsTexts = [];	
		
		let GeneralFeelingToggle = true;
        let AppetiteToggle = false;
        let NauseaToggle = false;
        let BowelMovementsToggle = false;
        let MotivationToggle = false;			
        let PainToggle = true;	
        let DizzinessToggle = false;
        let ExhaustionToggle = false;				

        const node = this.node;
		
		//Here are a bunch of Functions that I'll be using:
        //function to convert string in the format of yyyy-mm-dd into a valid date object
        function toDate(dateStr) {
            return new Date(dateStr)
        }
        //function to get the number of days differentiating two dates given as strings of format dd/mm/yyyy
        function daysdifference(date1, date2) {
            // The number of milliseconds in one day
            var ONEDAY = 1000 * 60 * 60 * 24;
            // Convert both dates to milliseconds
            var date1_ms = toDate(date1).getTime();
            var date2_ms = toDate(date2).getTime();
            // Calculate the difference in milliseconds
            var difference_ms = Math.abs(date1_ms - date2_ms);

            // Convert back to days and return
            return Math.round(difference_ms/ONEDAY);
        }

		//function to fetch the information about the user from the DB
		async function fetchUserData(userId){
            let URL = "http://localhost:4000/fetch/" + userId;
			//let URL = "fetch/" + userId;
            await fetch(URL).then(response => {
            return response.json();
			}).then(data => {
				//This is where we start to break down the data we got about the user from the DB 
				//into seperate data sets (like 'pain', 'general feeling' etc')

				//This loop goes over every document in the DB that belongs to this user 
				//and seperates each document to it's proper data set
				let lng = data.length;
				//this makes sure we have some value here even if we didn't get back any record from the DB
				//if(lng === undefined) {lng = 0}; 
                for (var i = 0; i < lng; i++) {
					let dateTimeCombo = toDate(data[i].date).toLocaleString(undefined, {
						day: 'numeric',
						month: 'short',
						year: '2-digit',
					}) + "." + data[i].check;
					if (myLabels.includes(dateTimeCombo) === false) {
						while(daysdifference(data[i].date , currDate) > 1){
							let tempDate = new Date(toDate(currDate));
							tempDate.setDate(tempDate.getDate() + 1);
							//this currDate works with a date string of yyyy-mm-dd
							currDate =  tempDate.toLocaleString(undefined, {
								day: 'numeric',
								month: 'short',
								year: '2-digit',
							});   
							myLabels.push(currDate);
							if (GeneralFeelingIsMarked === false) {
								myDataGeneralFeeling.push(GeneralFeelingLastValue);
								GeneralFeelingTexts.push(" ");
							}
	                        if (AppetiteIsMarked === false) {
    	                        myDataAppetite.push(AppetiteLastValue);
        	                    AppetiteTexts.push(" ");
            	            }
                	        if (NauseaIsMarked === false) {
                    	        myDataNausea.push(NauseaLastValue);
                        	    NauseaTexts.push(" ");
	                        }	
    	                    if (BowelMovementsIsMarked === false) {
       		                    myDataBowelMovements.push(BowelMovementsLastValue);
       	                     	BowelMovementsTexts.push(" ");
       	                 	}	
                        	if (MotivationIsMarked === false) {
                            	myDataMotivation.push(MotivationLastValue);
                            	MotivationTexts.push(" ");
                        	}						
                        	if (PainIsMarked === false) {
                            	myDataPain.push(PainLastValue);
                            	PainTexts.push(" ");
                        	}
                        	if (DizzinessIsMarked === false) {
                            	myDataDizziness.push(DizzinessLastValue);
                            	DizzinessTexts.push(" ");
                        	}
                        	if (ExhaustionIsMarked === false) {
                            	myDataExhaustion.push(ExhaustionLastValue);
                            	ExhaustionTexts.push(" ");
                        	}						
                        	GeneralFeelingIsMarked = false;
                	        AppetiteIsMarked = false;
                    	    NauseaIsMarked = false;
                        	BowelMovementsIsMarked = false;
          	              	MotivationIsMarked = false;			
                        	PainIsMarked = false;	
                        	DizzinessIsMarked = false;
                        	ExhaustionIsMarked = false;				
                    	}
                    	myLabels.push(dateTimeCombo);
                    	if(currDateCombo !== dateTimeCombo && currDateCombo !== ""){
                        	if (GeneralFeelingIsMarked === false) {
                            	myDataGeneralFeeling.push(GeneralFeelingLastValue);
                            	GeneralFeelingTexts.push(" ");
                        	}
	                        if (AppetiteIsMarked === false) {
    	                        myDataAppetite.push(AppetiteLastValue);
        	                    AppetiteTexts.push(" ");
            	            }
                	        if (NauseaIsMarked === false) {
                    	        myDataNausea.push(NauseaLastValue);
                        	    NauseaTexts.push(" ");
	                        }	
    	                    if (BowelMovementsIsMarked === false) {
        	                    myDataBowelMovements.push(BowelMovementsLastValue);
            	                BowelMovementsTexts.push(" ");
                	        }	
                    	    if (MotivationIsMarked === false) {
                        	    myDataMotivation.push(MotivationLastValue);
                            	MotivationTexts.push(" ");
                        	}						
	                        if (PainIsMarked === false) {
    	                        myDataPain.push(PainLastValue);
        	                    PainTexts.push(" ");
            	            }
                	        if (DizzinessIsMarked === false) {
                    	        myDataDizziness.push(DizzinessLastValue);
                        	    DizzinessTexts.push(" ");
                        	}	
                        	if (ExhaustionIsMarked === false) {
                           	 	myDataExhaustion.push(ExhaustionLastValue);
                            	ExhaustionTexts.push(" ");
                        	}
                    	}
                    	currDate = data[i].date;
                    	currDateCombo = dateTimeCombo;
                    	GeneralFeelingIsMarked = false;
                    	AppetiteIsMarked = false;
                    	NauseaIsMarked = false;
                    	BowelMovementsIsMarked = false;
                    	MotivationIsMarked = false;			
                    	PainIsMarked = false;	
                    	DizzinessIsMarked = false;
                    	ExhaustionIsMarked = false;				
                	}
                	if(data[i].RecordTracking === 'GeneralFeeling'){
                    	myDataGeneralFeeling.push(data[i].state);
                    	GeneralFeelingTexts.push(data[i].ExtraText);
                    	GeneralFeelingLastValue = data[i].state;
                    	GeneralFeelingIsMarked = true;
                	} 
                	if(data[i].RecordTracking === 'Appetite'){
                    	myDataAppetite.push(data[i].state);
                    	AppetiteTexts.push(data[i].ExtraText);
                    	AppetiteLastValue = data[i].state;
                    	AppetiteIsMarked = true;
                	} 	
                	if(data[i].RecordTracking === 'Nausea'){
                    	myDataNausea.push(data[i].state);
                    	NauseaTexts.push(data[i].ExtraText);
                    	NauseaLastValue = data[i].state;
                    	NauseaIsMarked = true;
                	} 		
                	if(data[i].RecordTracking === 'BowelMovements'){
                    	myDataBowelMovements.push(data[i].state);
                    	BowelMovementsTexts.push(data[i].ExtraText);
                    	BowelMovementsLastValue = data[i].state;
                    	BowelMovementsIsMarked = true;
                	} 	
                	if(data[i].RecordTracking === 'Motivation'){
                    	myDataMotivation.push(data[i].state);
                    	MotivationTexts.push(data[i].ExtraText);
                    	MotivationLastValue = data[i].state;
                    	MotivationIsMarked = true;
                	} 				
                	if(data[i].RecordTracking === 'Pain'){
                    	myDataPain.push(data[i].state);
                    	PainTexts.push(data[i].ExtraText);
                    	PainLastValue = data[i].state;
                    	PainIsMarked = true;
                	}    
                	if(data[i].RecordTracking === 'Dizziness'){
                    	myDataDizziness.push(data[i].state);
                    	DizzinessTexts.push(data[i].ExtraText);
                    	DizzinessLastValue = data[i].state;
                    	DizzinessIsMarked = true;
                	} 
                	if(data[i].RecordTracking === 'Exhaustion'){
                    	myDataExhaustion.push(data[i].state);
                    	ExhaustionTexts.push(data[i].ExtraText);
                    	ExhaustionLastValue = data[i].state;
                    	ExhaustionIsMarked = true;
                	} 				
                }
                if (GeneralFeelingIsMarked === false) {
                    myDataGeneralFeeling.push(GeneralFeelingLastValue);
                    GeneralFeelingTexts.push(" ");
                }
                if (AppetiteIsMarked === false) {
                    myDataAppetite.push(AppetiteLastValue);
                    AppetiteTexts.push(" ");
                }
                if (NauseaIsMarked === false) {
                    myDataNausea.push(NauseaLastValue);
                    NauseaTexts.push(" ");
                }	
                if (BowelMovementsIsMarked === false) {
                    myDataBowelMovements.push(BowelMovementsLastValue);
                    BowelMovementsTexts.push(" ");
                }	
                if (MotivationIsMarked === false) {
                    myDataMotivation.push(MotivationLastValue);
                    MotivationTexts.push(" ");
                }						
                if (PainIsMarked === false) {
                    myDataPain.push(PainLastValue);
                    PainTexts.push(" ");
                }
                if (DizzinessIsMarked === false) {
                    myDataDizziness.push(DizzinessLastValue);
                    DizzinessTexts.push(" ");
                }
                if (ExhaustionIsMarked === false) {
                    myDataExhaustion.push(ExhaustionLastValue);
                    ExhaustionTexts.push(" ");
                }
            })
		}
        
		//This function uses the variables defined in function fetchUserData 
		//to fill out the data sets in the Graph component
		function fillChartData(){
			//Here is where we fill in the datasets based on what the user has
			//currently defined
			let datasetsData = [];
			let datasetsText = "";

			console.log(myLabels);
			console.log(myDataGeneralFeeling);
			console.log(myDataPain);
			console.log(PainTexts);

			if (GeneralFeelingToggle){
                datasetsText = {label: 'General Feeling', data: myDataGeneralFeeling, backgroundColor: ['#3e95cd'], 
                                borderColor: '#3e95cd', borderWidth: 7, fill: false, pointRadius: 7, pointHoverRadius: 7,
                                pointHitRadius: 7}; 
                datasetsData.push(datasetsText);
            }
			if (PainToggle){
                datasetsText = {label: 'Pain', data: myDataPain, backgroundColor: ['#c45850'], 
                                borderColor: '#c45850', borderWidth: 7, fill: false, pointRadius: 7, pointHoverRadius: 7,
                                pointHitRadius: 7}; 
				datasetsData.push(datasetsText);
			}			
						
			let myChart = new Chart(node, {
				type: "line",
				data: {
					labels: myLabels,
					datasets: datasetsData
					},
				options: {
					legend: {position:"top", labels:{boxWidth: 10}},
					'onClick' : (evt, item) => { 
						var thisPoint = myChart.getElementAtEvent(evt)[0];
						if(thisPoint !== undefined){
							if(thisPoint._chart.legend.legendItems[thisPoint._datasetIndex].text === "General Feeling"){
                                let addedText = "On " + myLabels[thisPoint._index] + ", concerning your General Feeling you wrote: ";
                                currentComponent.renderExtraText(GeneralFeelingTexts, thisPoint._index, addedText);
							}
							if(thisPoint._chart.legend.legendItems[thisPoint._datasetIndex].text === "Pain"){
                                let addedText = "On " + myLabels[thisPoint._index] + ", concerning your Pain you wrote: ";
                                currentComponent.renderExtraText(PainTexts, thisPoint._index, addedText);
							}
						} 
					},
					scales: {
						scaleOverride : true,
						scaleSteps : 1,
						scaleStepWidth : 1,
						scaleStartValue : 0,
						yAxes: [{
							ticks: {
								beginAtZero: true,
								max: 5,
								min: 1,
								stepSize: 1 
							}
                        }],
                        xAxes: [{
							ticks: {
								minRotation: 0,
								maxRotation: 0 
							}
						}]
					},
					// Container for pan options
					pan: {
						// Boolean to enable panning
						enabled: true,

						// Panning directions. Remove the appropriate direction to disable 
						// Eg. 'y' would only allow panning in the y direction
						mode: 'x'
					},

					// Container for zoom options
					zoom: {
						// Boolean to enable zooming
                        enabled: true,
                        
						// Zooming directions. Remove the appropriate direction to disable 
						// Eg. 'y' would only allow zooming in the y direction
						mode: 'x',
					}
				}
			});
		}	

		//This is where it all comes together.
        //We run the functions one after the other in order:
        async function commitGraph(UserId){
            await fetchUserData(UserId);
            fillChartData();
        }

		console.log("call data for 5c6459230611ee0d144ac78b");
        commitGraph("5c6459230611ee0d144ac78b");
        
        //Now that the Chart is full of Data we can move on to the rendering
    }

    render() {
        return (
            <div className="pageContent" id="pageContent">
                <canvas className="graphContent"
                    // style={{ width: 300, height: 300 }}
                    ref={node => (this.node = node)}
                />
                <div className="extraText">
                    {this.state.extraText}
                </div>
            </div>
        );
    }
}

export default Graph;
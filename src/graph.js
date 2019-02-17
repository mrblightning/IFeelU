import React from 'react';
/*To enable Pan and Zoom that are defined in chartjs-plugin-zoom*/
import * as zoom from 'chartjs-plugin-zoom';
import { finished } from 'stream';

var Chart = require("chart.js");

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {myLabels:[], myDataPain:[], myDataGeneralFeeling:[], GeneralFeelingTexts:[], PainTexts:[], extraText:''};
    }
    
    renderExtraText = (array, index, adedText) => {
        this.setState({ extraText: adedText + array[index]});
    }

    componentDidMount() {
        //function to convert string in the format of dd/mm/yyyy into a valid date object
        function slashToDate(dateStr) {
            var parts = dateStr.split("/")
            return new Date(parts[2], parts[1] - 1, parts[0])
        }
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
        const node = this.node;
        fetch('http://localhost:4000/fetch/Ilana').then(response => {
            return response.json();
        }).then(data => {
            //console.log(data);
            let GeneralFeelingIsMarked = false;
            let PainIsMarked = false;
            let GeneralFeelingLastValue = 0;
            let PainLastValue = 0; 
            let currDateCombo = "";
            let currDate = "";
            for (var i = 0; i < data.length; i++) {
                //console.dir(data[i]);
                let dateTimeCombo = toDate(data[i].date).toLocaleString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                }) + "." + data[i].check;
                if (this.state.myLabels.includes(dateTimeCombo) === false) {
                    while(daysdifference(data[i].date , currDate) > 1){
                        //console.log("D1: " + data[i].date + " D2: " + currDate + " " + daysdifference(data[i].date , currDate));
                        let tempDate = new Date(toDate(currDate));
                        tempDate.setDate(tempDate.getDate() + 1);
                        //this currDate worked with the old date string of dd/mm/yyyy
                        //currDate =  ("0" + (tempDate.getDate())).slice(-2) + "/" + ("0" + (tempDate.getMonth() + 1)).slice(-2) + "/" + tempDate.getFullYear();  
                        //this currDate works with the new date string of yyyy-mm-dd
                        currDate =  tempDate.toLocaleString(undefined, {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit',
                        });   
                        this.state.myLabels.push(currDate);
                        if (GeneralFeelingIsMarked === false) {
                            this.state.myDataGeneralFeeling.push(GeneralFeelingLastValue);
                            this.state.GeneralFeelingTexts.push(" ");
                        }
                        if (PainIsMarked === false) {
                            this.state.myDataPain.push(PainLastValue);
                            this.state.PainTexts.push(" ");
                        }
                        GeneralFeelingIsMarked = false;
                        PainIsMarked = false;
                    }
                    this.state.myLabels.push(dateTimeCombo);
                    if(currDateCombo !== dateTimeCombo && currDateCombo !== ""){
                        if (GeneralFeelingIsMarked === false) {
                            this.state.myDataGeneralFeeling.push(GeneralFeelingLastValue);
                            this.state.GeneralFeelingTexts.push(" ");
                        }
                        if (PainIsMarked === false) {
                            this.state.myDataPain.push(PainLastValue);
                            this.state.PainTexts.push(" ");
                        }
                    }
                    currDate = data[i].date;
                    currDateCombo = dateTimeCombo;
                    GeneralFeelingIsMarked = false;
                    PainIsMarked = false;
                }
                if(data[i].RecordTracking === 'GeneralFeeling'){
                    this.state.myDataGeneralFeeling.push(data[i].state);
                    this.state.GeneralFeelingTexts.push(data[i].ExtraText);
                    GeneralFeelingLastValue = data[i].state;
                    GeneralFeelingIsMarked = true;
                } 
                if(data[i].RecordTracking === 'Pain'){
                    this.state.myDataPain.push(data[i].state);
                    this.state.PainTexts.push(data[i].ExtraText);
                    PainLastValue = data[i].state;
                    PainIsMarked = true;
                }             
            }
            if (GeneralFeelingIsMarked === false) {
                this.state.myDataGeneralFeeling.push(GeneralFeelingLastValue);
                this.state.GeneralFeelingTexts.push(" ");
            }
            if (PainIsMarked === false) {
                this.state.myDataPain.push(PainLastValue);
                this.state.PainTexts.push(" ");
            }
            //console.log(this.state.myLabels);
            //console.log(this.state.myDataPain);
            //console.log(this.state.myDataGeneralFeeling);
            //console.log(this.state.GeneralFeelingTexts);
            //console.log(this.state.PainTexts);
            //this.setState(data)
        })

        var myChart = new Chart(node, {
            type: "line",
            data: {
                labels: this.state.myLabels,
                // ["1/1/19 10:00", "2/1/19 19:00", "3/1/19", "4/1/19", "5/1/19", "6/1/19",
                //          "7/1/19","8/1/19", "9/1/19", "10/1/19", "11/1/19", "12/1/19", 
                //          "13/1/19", "14/1/19"],
                datasets: [
                    {
                        label: "Pain",
                        data: this.state.myDataPain,
                        //[5, 5, 4, 3, 1, 2, 3, 4, 3, 1, 2, 3, 4, 3],
                        backgroundColor: [
                            "#c45850"
                        ],
                        borderColor: "#c45850",
                        fill: false
                    },
                    {
                        label: "General Feeling",
                        data: this.state.myDataGeneralFeeling,
                        //[4, 4, 3, 3, 3, 2, 1, 5, 4, 3, 1, 2, 3, 4],
                        backgroundColor: [
                            "#3e95cd"
                        ],
                        borderColor: "#3e95cd",
                        fill: false
                    },
                    {
                        label: "Test1",
                        data: [5, 5, 4, 3, 1, 2, 3, 4, 3, 1, 2, 3, 4, 3, 3, 1, 2, 3, 4, 3],
                        backgroundColor: [
                            "#7f22e8"
                        ],
                        borderColor: "#7f22e8",
                        fill: false
                    },
                    {
                        label: "Test2",
                        data: [4, 4, 3, 3, 3, 2, 1, 5, 4, 3, 1, 2, 3, 4, 3, 2, 1, 5, 4,],
                        backgroundColor: [
                            "#eb94db"
                        ],
                        borderColor: "#eb94db",
                        fill: false
                    }                    
                ]
            },
            options: {
                // title: {
                //     display: true,
                //     text: 'Symptoms Over Time'
                //   },
                'onClick' : (evt, item) => { 
                    var thisPoint = myChart.getElementAtEvent(evt)[0];
                    //var day = item[0]['_model'].label this.selectedDay = day this.renderHourlyBarChart();
                    if(thisPoint !== undefined){
                        //console.log(thisPoint);
                        //console.log(thisPoint._chart.legend.legendItems[thisPoint._datasetIndex].text);
                        //console.log(thisPoint._index);
                        if(thisPoint._chart.legend.legendItems[thisPoint._datasetIndex].text === "General Feeling"){
                            let addedText = "On " + this.state.myLabels[thisPoint._index] + ", concerning your General Feeling you wrote: ";
                            this.renderExtraText(this.state.GeneralFeelingTexts, thisPoint._index, addedText);
                        }
                        if(thisPoint._chart.legend.legendItems[thisPoint._datasetIndex].text === "Pain"){
                            let addedText = "On " + this.state.myLabels[thisPoint._index] + ", concerning your Pain you wrote: ";
                            this.renderExtraText(this.state.PainTexts, thisPoint._index, addedText);
                        }
                    } 
                },
                scales: {
                    scaleOverride : true,
                    scaleSteps : 1,
                    scaleStepWidth : 1,
                    scaleStartValue : 0,
                    // xAxes: [{
                    //     type: "time",
                    //     time: {
                    //       unit: 'hour',
                    //       unitStepSize: 12,
                    //       round: 'hour',
                    //       tooltipFormat: "h:mm:ss a",
                    //       displayFormats: {
                    //         hour: 'MMM D, h:mm A'
                    //       }
                    //     }
                    //   }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 5,
                            min: 1,
                            stepSize: 1 
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
import React,{ useState } from "react";
import Question from './Questions';
import Advance from './Advance';
import Gauge from './Gauge';

const SurveyComponent = (props) => {

    const [question,setquestion] = useState([
        {id: 0,
        qq: "What is your age?",
        an:["Under 35 years old","35 to 55 years old","56 to 65 years old","Greater than 65 years old"],
        values: [10,7,5,2],
        value:0},
        {id: 1,
        qq: "I plan on withdrawing money from my investment in:",
        an:["Less than 2 years","2 to 5 years","6 to 10 years","11 to 15 years","More than 15 years"],
        values: [0,2,5,8,10],
        value:0},
        {id: 2,
        qq: "How would you characterize your future annual income expectations?",
        an:["Decrease in the future","Stay roughly the same","Increase moderately over time","Increase substantially"],
        values: [0,3,7,10],
        value:0},
        {id: 3,
        qq: "What level of investable assets do you currently have?",
        an:["None - just starting out","Under $50,000","$50,000 to $99,999","$100,000 to $250,000","Greater than $250,000"],
        values: [0,2,4,6,10],
        value:0},
        {id: 4,
        qq: "How would you describe your investment knowledge?",
        an:["None","Limited","Good","Extensive"],    
        values: [1,3,6,10],
        value:0},    
        {id: 5,
        qq: "Which of the following investments do you currently own or have owned in the past?",
        an:["Money Market or CDs","Diversified Mutual Funds and/or ETFs","Individual Stocks","Commodities, Sector, and/or Alternative Investments"],
        values: [2,6,8,10],
        value:0},    
        {id: 6,
        qq: "When the market goes down, I tend to sell riskier investments and move money into safer investments.",
        an:["I strongly agree","I agree","I disagree","I strongly disagree"],
        values: [1,3,8,10],
        value:0},    
        {id: 7,
        qq: "I prefer an investment with little to no ups-and-downs and am willing to accept lower investment returns as a result.",
        an:["I strongly agree","I agree","I disagree","I strongly disagree"],
        values: [1,3,8,10],
        value:0},    
        {id: 8,
        qq: "Which investment return scenario below are you most comfortable with?",
        an:["Best Case: $200 Gain; Worst Case: $0 Loss","Best Case: $800 Gain; Worst Case: $200 Loss","Best Case: $2,400 Gain; Worst Case: $800 Loss","Best Case: $4,800 Gain; Worst Case: $2,400 Loss"],
        values: [1,3,6,10],
        value:0},    
        {id: 9,
        qq: "If you were on a TV game show, which of the following outcomes would you choose?",
        an:["$2,500 in cash","A 50% chance at winning $10,000","A 25% chance as winning $25,000","A 5% chance at winning $250,000"],
        values: [1,3,6,10],
        value:0}
    ]);

    var flipButton =  'false';

    const [count,setcount] = useState(0);
    const [score,setscore] = useState(0);
    const [risk,setrisk] = useState("DEFENSIVE");

    function increment() {
        if (count + 2 < question.length - 1) {
            setcount(count + 2);
        } else {
            setcount(count + 1);
        }
    }

    const record = (data) => {
        setquestion(question.map((ques) => ques.id === data[0] ? {...ques,value:ques.values[data[1]]} : {...ques})); 
    }

    const scoringAlgorithm = () => {
//        const completedSurvey = question.map((ques)=>ques.value);
//        const target = completedSurvey.reduce((a,v) =>  a = a + v);
//        const target = completedSurvey.reduce((a,v) =>  console.log(a,v));
//        setscore(target);

        const scoring = [
            {section: 'horizon', inputs: [5,8,12,16],points:[1,15,30,45,59]},
            {section: 'situation', inputs: [2,4,7,13],points:[0,5,10,15,20]},
            {section: 'experience', inputs: [5,9,13,17],points:[0,2.5,5,7.5,10]},
            {section: 'tolerance', inputs: [2,4,6,8],points:[0,2.5,5,7.5,10]},
        ]

        var horizon_total = question[0].value+question[1].value;
        var situation_total = question[2].value+question[3].value;
        var experience_total = question[4].value+question[5].value;
        var tolerance_total = (question[6].value+question[7].value+question[8].value+question[9].value)/4;
        var sections = [horizon_total,situation_total,experience_total,tolerance_total];
        setscore(0);
        var total_points = 0;

        for(let i=0;i<4;i++){
            if (sections[i] <= scoring[i].inputs[0] ) {
                total_points = total_points+scoring[i].points[0];
            } else if (sections[i] <= scoring[i].inputs[1]) {
                total_points = total_points+scoring[i].points[1];
            } else if (sections[i] <= scoring[i].inputs[2]) {
                total_points = total_points+scoring[i].points[2];          
            } else if (sections[i] <= scoring[i].inputs[3]) {
                total_points = total_points+scoring[i].points[3];
            } else {
                total_points = total_points+scoring[i].points[4];
            }
            
        }

        if (question[1].value===0 && total_points>10) {total_points=total_points-10;}
        setscore(total_points);

        if (total_points>80) {
            setrisk("VERY AGGRESSIVE")
        } else if (total_points>60){
            setrisk("AGGRESSIVE")
        } else if (total_points>40){
            setrisk("MODERATE")
        } else if (total_points>20){
            setrisk("CONSERVATIVE")
        } else {
            setrisk("DEFENSIVE")
        }
    }
        
    if (count+1>=question.length-1){
        flipButton = 'true';
    }

    if (count%2===0 && score===0) {
        return (
            <div>
                <Question numrows={[...Array(question[count].an.length).keys()]} parentCallBack={record} qq={question[count].qq} qn={count} val={question[count].values} an={question[count].an} />
                <Question numrows={[...Array(question[count+1].an.length).keys()]} parentCallBack={record} qq={question[count+1].qq} qn={count+1} val={question[count+1].values} an={question[count+1].an} />
                <Advance kickoffScoring={scoringAlgorithm} nextHandler={increment} finalQuestion={flipButton} />
            </div>
        )
    } else if (score===0) {
        return (
            <div>
                <Question numrows={[...Array(question[count+1].an.length).keys()]} parentCallBack={record} qq={question[count+1].qq} qn={count+1} val={question[count+1].values} an={question[count+1].an} />
                <Advance kickoffScoring={scoringAlgorithm} nextHandler={increment} finalQuestion={flipButton} />
            </div>
        )
    } else {
        return (
            <div>
                <Gauge value={score} risk={risk} />
            </div>
        )
    }

}

export default SurveyComponent;

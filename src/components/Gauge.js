import "./Gauge.css";
import ReactSpeedometer from "react-d3-speedometer"

const Gauge = (p) => {


    return (
        <div className="position">
            <ReactSpeedometer
                width={500}
                height={500}
                maxValue={100}
                minValue={0}
                value={p.value} 
                segments={5} 
                segmentColors={["firebrick", "tomato", "gold", "limegreen","green"]}
                currentValueText={"Your risk profile: "+p.risk}
                valueTextFontSize="22px"
                needleTransitionDuration={4000}
                needleTransition="easeElastic" 
                customSegmentLabels={[
                    {
                      text: "Defensive",
                      position: "OUTSIDE",
                      color: "#262626",
                      fontSize: "14px",
                    },
                    {
                      text: "Conservative",
                      position: "OUTSIDE",
                      color: "#262626",
                      fontSize: "14px",
                    },
                    {
                      text: "Moderate",
                      position: "OUTSIDE",
                      color: "#262626",
                      fontSize: "14px",
                    },
                    {
                      text: "Aggressive",
                      position: "OUTSIDE",
                      color: "#262626",
                      fontSize: "14px",
                    },
                    {
                      text: "Very aggressive",
                      position: "OUTSIDE",
                      color: "#262626",
                      fontSize: "14px",
                    },
                  ]}
            />
        </div>
    )   
}


export default Gauge;
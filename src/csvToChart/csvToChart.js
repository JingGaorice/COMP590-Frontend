import React, { Component } from "react";
import {
    attributeList,
    attributeValueList,
    getJSONFromUrl, isEmptyObject, isURL,
    processCSV,
    processData,
    returnDropDownOption
} from "./csvUtil";
import {Button, Checkbox, Dropdown, Form, Grid, Label, Segment} from 'semantic-ui-react';
import {dropDownStateFullNameList, generateSVGMap} from "../usaCounties/usCountiesUtils";
import './csvToChartCSS/csvToChart.css'
import {centeredTitleLogo} from "./csvToChartWidgets";
import { SegmentedControl } from 'segmented-control'
import {returnOption, searchBarAllInOneFunction, searchBarManyChartsFunction} from "../CountyView/countyViewUtil";
export default class CsvToChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            csvURL:'',
            csvFile:'',
            csvArray:[],
            dataInRow:false,
            attributeList:[],
            attributeValue:"",
            attributeValueOption:[],
            attributeDropDownList:[],
            optionDropDownList:[],
        }
        this.inputFileRef = React.createRef();
        this.onBtnClick = this.handleBtnClick.bind( this );
    }

    handleBtnClick() {
        /*Collecting node-element and performing click*/
        this.inputFileRef.current.click();
    }

    submit(){
        const reader = new FileReader();

        reader.onload = (e)=>{
            const text = e.target.result;
            let processedArray = processCSV(text);

            this.setState({csvArray: processCSV(text), attributeList: attributeList(text), attributeDropDownList: returnDropDownOption(attributeList(text)) });
            console.log(processedArray)
        }
        reader.readAsText(this.state.csvFile);
    }


    disabledButton(){

        if(this.state.csvFile){

            return false;
        } else if(isURL(this.state.csvURL)){

            return false;
        }
        return true;
    }






    selectAttributeValue(e, {value}){
        let dropDownList = returnDropDownOption(attributeValueList(this.state.csvArray, value));
        this.state.optionDropDownList = [];
        this.state.optionDropDownList = dropDownList;
        this.setState({
            attributeValue: value,
            optionDropDownList: this.state.optionDropDownList,
            attributeDropDownList: returnDropDownOption(this.state.attributeList),
            attributeValueOption:[],
        });
    }

    selectAttributeValueOption(e, {value}){
        this.setState({attributeValueOption:value})
    }


    clearInput(){
        this.setState({
            attributeValue: "",
            optionDropDownList: [],
            attributeValueOption:[],
        });
    }

    graphWidget(){
       if(this.state.csvArray.length === 0){
            return (
                <div>
                    <Label pointing>Please click "Show The Chart" button after uploading</Label>
                </div>)

        } else if(!this.state.attributeValue){
            return (
                <div>
                    <Label pointing>
                        Please select the attribute.
                    </Label>

                </div>
            )
        }else if(this.state.attributeValueOption.length === 0){
            return (
                <div>
                    <Label pointing>
                        Please select the options.
                    </Label>
                </div>
            )
        }else{
            let dataObject =  processData(this.state.csvArray, this.state.attributeList, this.state.attributeValue);
            let data2020 = dataObject["2020"], data2021 = dataObject["2021"];
            let selectedList = [];
            for(let i = 0; i < this.state.attributeValueOption.length; i += 1){
                selectedList.push({"name": this.state.attributeValueOption[i]});
            }
           return(
               <div>
                   {
                       searchBarManyChartsFunction(
                           data2020,
                           data2021,
                           selectedList,
                           "2020",
                       )
                   }
               </div>
           );
        }
    }

    render(){
        return (
            <div>
                {centeredTitleLogo()}
                <div>
                    {/*<Button basic color='blue' as="label" htmlFor="file" type="button">*/}
                    {/*    Upload The CSV*/}
                    {/*</Button>*/}
                    {/*<input type="file" id = "file" accept=".csv"  ref={this.inputFileRef} style={{display:"none"}} onChange={(e)=>{this.setState({csvFile: e.target.files[0]})}}/>*/}
                    {/*<Checkbox label='Attribute "Date" in Row' value = {this.state.dataInRow} onChange = {(event, data)=>{*/}
                    {/*    this.setState({dataInRow: data.checked});*/}
                    {/*}}/>*/}
                </div>
                <br/><br/><br/>
                <div>
                    <Grid columns='equal' centered columns={2}>
                        <Segment style={{"width":900}}>
                            <p className={"LargeBoldCenterP"} >Paste the URL to be visualized</p>
                            <div className={"displayInRowCenter"}>
                                <Form style={{"width":500}}>
                                    <Form.Field>
                                        <input value = {this.state.csvURL} onChange={(e)=>{
                                            this.setState({csvURL: e.target.value, csvFile: null})}
                                        }/>
                                    </Form.Field>
                                </Form>
                                <Button basic color='blue' type="button" disabled={this.disabledButton()} onClick={async (e) => {
                                    e.preventDefault();
                                    let result;
                                    let getJSONFromURL = false;
                                    if (this.state.csvURL) {
                                        result = await getJSONFromUrl(this.state.csvURL);
                                        if(result !== "error"){
                                            getJSONFromURL = true;
                                            this.setState({
                                                csvFile: null,
                                                attributeList: result[0][0],
                                                attributeDropDownList: returnDropDownOption(result[0][0]),
                                                csvArray: result[0][1],
                                                attributeValue: "",
                                                optionDropDownList: [],
                                                attributeValueOption:[],
                                            })

                                        }
                                    }

                                    if (getJSONFromURL === false && this.state.csvFile) {
                                        console.log(123);
                                        this.submit();
                                    }
                                }}> Show The Chart</Button>

                            </div>
                            <div>
                                <br/>
                                <div className={"centerDiv"}>
                                    <p className={"regularNoBoldCenterClickP"} onClick={this.onBtnClick}>Upload the CSV</p>
                                    <input type="file" id = "file" accept=".csv"  ref={this.inputFileRef} style={{display:"none"}} onChange={(e)=>{
                                        this.setState({
                                            csvFile: e.target.files[0],
                                            csvURL: "",
                                            csvArray:[],
                                            attributeValue: "",
                                            optionDropDownList: [],
                                            attributeValueOption:[],
                                            attributeDropDownList:[],
                                        });

                                    }

                                    }/>
                                </div>
                            </div>

                        </Segment>
                    </Grid>
                </div>

                <br/>

                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Dropdown}
                                label='Attribute'
                                search selection
                                value = {this.state.attributeValue}
                                options={this.state.attributeDropDownList}
                                placeholder='Attribute value...'
                                onChange = {this.selectAttributeValue.bind(this)}
                            />
                            <Form.Field
                                control={Dropdown}
                                label='Options'
                                fluid multiple search selection
                                value = {this.state.attributeValueOption}
                                options={this.state.optionDropDownList}
                                placeholder=''
                                onChange = {this.selectAttributeValueOption.bind(this)}
                            />

                        </Form.Group>
                    </Form>
                </Segment>
                <div>
                    {this.graphWidget()}
                </div>
            </div>
        )
    }
}
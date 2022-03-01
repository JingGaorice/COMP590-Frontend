import {abbrState} from "../CountyView/countyViewUtil";
import {USACounties} from "./usaCounties";

export function returnFullNameList(){
    let stateFullNameList = []
    for(let i = 0; i < stateFullInitList.length; i += 1){

        stateFullNameList.push(stateFullInitList[i][0]);
    }
    return stateFullNameList;
}

export function dropDownStateFullNameList(){
    let list = returnFullNameList();
    let option = [];
    for(let i = 0; i < list.length; i += 1){
        let object = {};
        object["text"] = list[i];
        object["key"] = i;
        object["value"] = abbrState(list[i], 'abbr');
        option.push(object)
    }
    return option;
}


export function generateSVGMap(stateName){
    let usaMap = USACounties();
    let locationList = usaMap["locations"];
    let object = {};
    object["locations"] = [];
    for(let i = 0; i < locationList.length; i += 1){
        let stateInRow = locationList[i].name.split(",")[1].replace(/\s/g, "");
        if(stateName === stateInRow){
            object["locations"].push(locationList[i]);
        }

    }
    object.labels = usaMap.label;
    object.viewBox = usaMap.viewBox

    console.log(usaMap);
    console.log(object);
    return object;
}

export function returnInitNameList(){
    let stateInitNameList = []

    for(let i = 0; i < stateInitNameList.length; i += 1){
        stateInitNameList.push(stateFullInitList[i][1]);
    }
    return stateFullInitList;
}

export const stateFullInitList = [
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
];
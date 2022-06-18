import { ColorSet } from "./ColorSet.js";

export class ColorProject {
    static projectName = "ColorPoject";

    static themeColor = "#fac05e"; // #F28500
    static periwinkle = "#6869ac";
    static backgroundColor = "#a6e8fa"
    static defaultTwoColors = new ColorSet(Array.of("#8282F1", "#BEBEE6"));
    static defaultFourColors = new ColorSet(Array.of("#192efa", "#00Fa46", "#fa191b", "#fac60a",));
    static defaultEightColors = new ColorSet(Array.of(
    "#192efa", "#00Fa46", "#fa191b", "#fac60a", 
    "#19e0fa", "#b1fa00", "#bb19fa", "#fa730c"));
}
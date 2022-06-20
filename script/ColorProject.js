import { ColorSet } from "./ColorSet.js";

export class ColorProject {
    static projectName = "ColorMixer";
    static fullProjectName = "Windmill-Color-Mixer";
    static author = "cocoNUTTree";
    static githubLink = "https://github.com/NUTT1101/Windmill-Color-Mixer";
    static startYear = 2022;
    static copyright = `
        ${ColorProject.fullProjectName} &copy; ${
        ColorProject.startYear  
        } ${
            new Date().getFullYear() > ColorProject.startYear ? 
                `~${new Date().getFullYear()}` : 
                ""
            } 
        `;

    static themeColor = "#fac05e";
    static periwinkle = "#6869ac";
    
    static defaultTwoColors = new ColorSet(
        Array.of(
            "#CC5057", "#007EFF",
        )
    );
    
    static defaultFourColors = new ColorSet(
        Array.of(
            "#192efa", "#00Fa46", "#fa191b", "#fac60a",
        )
    );

    static defaultEightColors = new ColorSet(
        Array.of(
            "#192efa", "#00Fa46", "#fa191b", "#fac60a", 
            "#19e0fa", "#b1fa00", "#bb19fa", "#fa730c",
        )
    );
}
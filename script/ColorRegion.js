import { ColorProject } from "./ColorProject.js";
import { ColorSet } from "./ColorSet.js";
import { Page } from "./Page.js"

export class ColorRegion {

    static currentStatus;

    static init() {
        ColorProject.currentStatus = 2;
        this.update(2);
    }
    
    /**
     * 
     * @param {Integer} index 
     */
    static update(index) {
        switch (index) {
            case 2:
                this.spawnColorRegion(index);
                break;
            case 4:
                this.spawnColorRegion(index);
                break;
            case 8:
                this.spawnColorRegion(index);
                break;
            default:
                this.spawnColorRegion(2);
                break;
        };

        ColorRegion.currentStatus = index;
        Page.updateWindmill();
    }

    /**
     * 
     * @param {Integer} index 
     */
    static spawnColorRegion(index) {
        let region = this.getColorRegion();
        region.innerHTML = "";

        if (Page.windmill.getColorSet.colors.length != index) {
            Page.windmill.setColors= this.getDefaultColors(index);
        }

        let color = Page.windmill.getColorSet.colors;

        for (let i=0; i < index; i++) {
            let node = document.createElement("a");

            node.setAttribute("class", "col");

            node.style = "background: " + color[i];
            region.appendChild(node);    
        }
                
    }

    /**
     * 
     * @param {Integer} index 
     * @returns {ColorSet}
     */
    static getDefaultColors(index) {
        switch (index) {
            case 2:
                return ColorProject.defaulTwoColors;
            case 4:
                return ColorProject.defaulFourColors;
            case 8:
                return ColorProject.defaulEightColors;
        }                
        return ColorProject.defaulTwoColors;
    }
    
    /**
     * 
     * @returns {Element}
     */
    static getColorRegion() {
        return document.querySelector("#color-region");
    }
    
}
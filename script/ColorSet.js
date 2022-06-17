export class ColorSet {
    
    /**
     * @param {Array} colors
     */
    constructor(colors) {
        this.colors = (colors.length == 0 || colors == undefined || colors == null) ?
            Array.of(ColorProject.themeColor, ColorProject.periwinkle) : 
            colors ;
    }
}
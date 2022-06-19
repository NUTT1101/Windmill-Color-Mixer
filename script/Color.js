export class Color {

    /**
     * 
     * @param {String} rgbString 
     */
    static splitRGBString(rgbString) {
        let rgb = rgbString.replace(" ", "").replace("rgb", "").replace("(", "").replace(")", "").split(",");

        return {
            r: parseInt(rgb[0]),
            g: parseInt(rgb[1]),
            b: parseInt(rgb[2]),
        };
    }

    /**
     * 
     * @param {number} c 
     * @returns {String}
     */
    static componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
    
    /**
     * 
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     * @returns {String} 
     */
    static rgbToHex(r, g, b) {
        return "#" + Color.componentToHex(r) + Color.componentToHex(g) + Color.componentToHex(b);
    }

    static hexToRGB(hex) {
        return {
            r: parseInt(hex[1] + hex[2], 16),
            g: parseInt(hex[3] + hex[4], 16),
            b: parseInt(hex[5] + hex[6], 16)
          };
    }

    /**
     * 
     * @param {Array} colors 
     */
    static colorMix(c) {
        let colorsCopy = c;
        let rgb = {r: 0, g: 0, b: 0};
        
        for (let i = 0; i < colorsCopy.length; i++) {

            let colorRGB = colorsCopy[i].includes("#") ? 
                Color.hexToRGB(colorsCopy[i]) :
                Color.splitRGBString(colorsCopy[i]) ;

            rgb.r += colorRGB.r;
            rgb.g += colorRGB.g;
            rgb.b += colorRGB.b;
        }

        rgb.r /= colorsCopy.length;  
        rgb.g /= colorsCopy.length;  
        rgb.b /= colorsCopy.length;
        
        return Color.rgbToHex(
            Math.round(rgb.r), 
            Math.round(rgb.g), 
            Math.round(rgb.b),
        );
    }
}
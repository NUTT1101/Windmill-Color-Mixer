export class Windmill {
    
    /**
     * 
     * @param {ColorSet} colorSet 
     * @param {bool} scrollAble 
     */
    constructor(colorSet, scrollAble) {
        this.windmill = this.createWindmill();
        this.setColors = colorSet;
        
        if (scrollAble) {
            this.windmill.firstElementChild.setAttribute("class", "scrollable");
        }
    }

    createWindmill() {
        let _windmill = document.createElement("div");
        
        _windmill.innerHTML = `
        <svg 
            width="300px"
            height="300px"
            viewBox="0 0 846.62714 843.4928"
            version="1.1"
            id="svg37"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg">
            <defs id="defs34" />
            <g
                id="layer1"
                transform="translate(-466.37014,-58.228615)">
                <circle
                style="fill:#fff"
                id="path498"
                cx="891.87592"
                cy="477.67914"
                r="14.561605" />
                <path
                style=""
                id="path662"
                d="M 561.43082,407.72496 331.66964,407.70523 101.90846,407.6855 216.80614,208.71635 331.70382,9.7471934 446.56732,208.73608 Z"
                transform="matrix(0,0.91198213,-0.4938447,0,1093.6637,-34.710077)" />
                <path
                style=""
                id="path662-5"
                d="M 561.43082,407.72496 331.66964,407.70523 101.90846,407.6855 216.80614,208.71635 331.70382,9.7471934 446.56732,208.73608 Z"
                transform="matrix(-0.00446024,-0.91197123,0.4938388,-0.00241526,690.4145,995.64368)" />
                <path
                style=""
                id="path662-8"
                d="M 561.43082,407.72496 331.66964,407.70523 101.90846,407.6855 216.80614,208.71635 331.70382,9.7471934 446.56732,208.73608 Z"
                transform="matrix(0.91198213,-5.3635084e-5,2.9043046e-5,0.4938447,373.41961,275.1558)" />
                <path
                style=""
                id="path662-8-5"
                d="M 561.43082,407.72496 331.66964,407.70523 101.90846,407.6855 216.80614,208.71635 331.70382,9.7471934 446.56732,208.73608 Z"
                transform="matrix(-0.91198213,5.3635084e-5,-2.9043046e-5,-0.4938447,1405.9478,683.07914)" />
                <path
                style=""
                id="path754-9"
                d="m 1596.9228,441.70205 -524.8754,-1.13885 263.424,-453.985949 z"
                transform="matrix(-0.65833587,-0.61352309,0.37813506,-0.42123922,1777.728,1653.5124)" />
                <path
                style=""
                id="path754-2"
                d="m 1596.9228,441.70205 -524.8754,-1.13885 263.424,-453.985949 z"
                transform="matrix(0.61172165,-0.66001008,0.42227103,0.37698245,-276.58728,1367.8947)" />
                <path
                style="fill:"
                id="path754-2-2"
                d="m 1596.9228,441.70205 -524.8754,-1.13885 263.424,-453.985949 z"
                transform="matrix(-0.61172165,0.66001008,-0.42227103,-0.37698245,2058.4953,-408.47893)" />
                <path
                style="fill:"
                id="path754-4"
                d="m 1596.9228,441.70205 -524.8754,-1.13885 263.424,-453.985949 z"
                transform="matrix(0.65926903,0.61252023,-0.37749338,0.42181435,3.2079358,-689.92279)" />
            </g>
        </svg>`;
        return _windmill;
    }


    /**
     * 
     * @param {ColorSet} colorSet 
     */
    set setColors(colorSet) {
        this.colorSet = colorSet;
        
        let colors = colorSet.colors;

        let paths = this.windmill.getElementsByTagName("path");

        switch (colors.length) {
            case 2:
                for (let i=0; i < paths.length; i++) {
                    paths[i].style.fill = 
                        i <= 3 ? 
                        this.colorSet.colors[0] : 
                        this.colorSet.colors[1] ;
                }

                break;
            case 4:
                for (let i=0; i < paths.length; i++) {
                    if (i <= 3) {
                        paths[i].style.fill = colors[i];        
                    } else if (i == 7) {
                        paths[i].style.fill = colors[0];
                    } else {
                        paths[i].style.fill = colors[i - 3];
                    }
                }
                break;
            case 8:
                for (let i=0; i < paths.length; i++) {
                    paths[i].style.fill = this.colorSet.colors[i];
                }
            default:
                break;
        }
    }

    get getColorSet() {
        return this.colorSet;
    }

    get getWindmill() {
        return this.windmill;
    }
}

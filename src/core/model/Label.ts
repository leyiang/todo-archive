export interface rawLabel {
    id: number,
    name: string;
    textColor: string;
    bgColor: string;
}

export function isRawLabel( raw : any ): raw is rawLabel {
    const keys = ["name", "textColor", "bgColor"];

    for(let key of keys) {
        if( ! raw.hasOwnProperty(key) ) {
            return false;
        }
    }

    return true;
}

export default class Label {
    constructor(
        public id: number,
        public name: string,
        public textColor: string,
        public bgColor: string
    ) {

    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawLabel(raw) ) {
            return new Label(
                raw.id,
                raw.name,
                raw.textColor,
                raw.bgColor
            );
        } else {
            console.log( raw );
            throw "Wrong Properties for Label.Load";
        }
    }

    static hexToRgb( hex: string ) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );

        return result ? {
            r: parseInt( result[1], 16 ),
            g: parseInt( result[2], 16 ),
            b: parseInt( result[3], 16 ),
        } : null;
    }

    /**
     * Hex String Color
     * @param color
     */
    static getTextColor( color:string ) {
        const rgb = Label.hexToRgb( color );
        if( rgb === null ) {
            return null;
        } else {
            const luminance = (.299 * rgb.r + .587 * rgb.g + .144 * rgb.b ) / 255;
            return luminance > .5 ? "#000000" : "#FFFFFF";
        }
    }
}
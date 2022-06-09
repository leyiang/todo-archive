export default class LocalStoreManager {
    constructor() {

    }

    encrypt( key : string ) : string {
        return btoa( key );
    }

    get( key : string, defaultValue : object | [] | null = null ) : object | null | [] {
        return this.#rawGet( key, defaultValue ) || defaultValue;
    }

    #rawGet( key : string, defaultValue : object | [] | null = null ) : object | null | [] {
        key = this.encrypt( key );

        try {
            const raw = localStorage.getItem( key ) || "";
            return JSON.parse( raw ) || defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }

    set( key : string, value : object | null ) : void {
        return localStorage.setItem(
            this.encrypt( key ),
            JSON.stringify( value )
        );
    }
}
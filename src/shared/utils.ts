export function isNameEmpty( name: string | null | undefined ) : boolean {
    if( ! name ) return true;
    return name.trim().length === 0;
}

export function splice<T>( arr: T[], item: T) {
    const index = arr.indexOf( item );
    if( index < 0 ) return;
    arr.splice( index, 1 );
}

export function getTodayString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate()).toString().padStart(2, "0");

    return `${ year }-${ month }-${ day }`;
}

export function getTomorrowString() {
    const date = new Date();
    date.setDate( date.getDate() + 1 );

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate()).toString().padStart(2, "0");

    return `${ year }-${ month }-${ day }`;
}

export function last( arr: any[] ) {
    return arr[ arr.length - 1 ];
}
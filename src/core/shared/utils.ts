export function toSnakeCase( str : string ) : string {
    const result = str.replace( /([A-Z])/g, " $1" );
    return result.split(' ').join('_').toLowerCase();
}

export function splice( arr:any[], item:any ) {
    const index = arr.indexOf( item );
    if( index < 0 ) return;
    arr.splice(index, 1);
}
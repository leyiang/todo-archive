export function toSnakeCase( str : string ) : string {
    const result = str.replace( /([A-Z])/g, " $1" );
    return result.split(' ').join('_').toLowerCase();
}
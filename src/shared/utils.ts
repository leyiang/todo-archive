export function isNameEmpty( name: string | null | undefined ) : boolean {
    if( ! name ) return true;
    return name.trim().length === 0;
}
export function splice<T>( arr: T[], item: T) {
    const index = arr.indexOf( item );
    if( index < 0 ) return;
    arr.splice( index, 1 );
}
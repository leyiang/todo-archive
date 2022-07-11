export function isNameEmpty( name: string | null | undefined ) : boolean {
    if( ! name ) return true;
    return name.trim().length === 0;
}
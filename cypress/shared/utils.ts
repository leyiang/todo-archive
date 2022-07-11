export function get( name: string ) {
    //@ts-ignore, cy will be injected
    return cy.get(`[data-test='${ name }']`);
}
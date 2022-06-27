import {options} from "../options";

export function createList(name: string) {
    cy
        .get("aside input")
        .type( name )
        .type("{enter}");
}

export function checkHasList(name: string, len=1, from=".userList") {
    const chainable = cy.get("aside " + from)
        .find( options.id.taskListItem )
        .should("have.length", len);

    if( len > 0 ) {
        chainable.should("have.text", name );
    }
}

export function clear() {
    indexedDB.deleteDatabase(options.id.db);
    cy.visit('/')
}

export function randomName( prefix:string ) {
    return prefix + "_" + Math.random().toFixed(4);
}

export function focusFirstList() {
    cy.get("aside")
        .find( options.id.taskListItem )
        .first()
        .click();
}

/**
 * Check immediate and after reload
 */
export function checkTwice( check: Function ) {
    check();
    cy.reload();
    check();
}
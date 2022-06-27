import {createMemoryHistory} from "vue-router";

export function createList(name: string) {
    cy
        .get("aside input")
        .type( name )
        .type("{enter}");
}

export function checkHasList(name: string, len=1, from=".userList") {
    const chainable = cy.get("aside " + from)
        .find(".sidebar-item")
        .should("have.length", len);

    if( len > 0 ) {
        chainable.should("have.text", name );
    }
}

export function clear() {
    indexedDB.deleteDatabase("TodoDatabase");
}
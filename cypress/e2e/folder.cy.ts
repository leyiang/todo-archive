import {options} from "../shared/globals";

function get( name: string ) {
    return cy.get(`[data-test='${ name }']`);
}

describe('Folder List', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase( options.db.name );
        cy.visit('/')
    });

    it('able to add a new folder', () => {
        const options = {
            name: "folder name",
        }

        get("folder-add-new")
            .click()
            .type( options.name )
            .type("{enter}")

        get("folder-item")
            .should("have.length", 1)
            .should("contain.text", options.name );
    });
});
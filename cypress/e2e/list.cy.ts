import {checkHasList, checkTwice, clear, createList, randomName} from "./utils";

const spec = {
    name: randomName("list")
}

describe('List basic tests', () => {
    it("Able to add new List", () => {
        clear();
        createList(spec.name);

        checkTwice(() => {
            checkHasList( spec.name );
        });
    });

    it("Able to focus a list", () => {
        clear();
        createList(spec.name );

        cy.get("aside .userList .sidebar-item")
            .click()
            .should("have.class", "active");

        cy.get(".task-list-wrap .list-name-input")
            .should("have.value", spec.name);
    });

    it("Able to remove a list", () => {
        clear();
        createList(spec.name );

        /**
         * Open Menu
         */
        cy.get("aside .userList .sidebar-item")
            /* Click to focus the list */
            /* Test the de-focus action, not required to open menu */
            .click()
            /* Open Menu */
            .rightclick();

        /**
         * Perform Remove Action
         */
        cy.get(".context-menu")
            .contains("Remove List")
            .click();

        /**
         * Make Sure list removed
         */
        checkHasList( spec.name, 0 );

        /**
         * List should be de-focused
         */
        cy.get(".task-list-wrap .list-name-input")
            .should("not.exist");

        cy.get(".task-list-wrap")
            .contains("Let's choose a list")
    });
});

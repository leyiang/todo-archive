import {checkHasList, checkList, clear, createList} from "./utils";

const options = {
    name: "list_" + Math.random().toFixed(4)
}

describe('Basic', () => {
    it("Able to add new List", () => {
        clear();
        cy.visit('/')

        createList(options.name);

        checkHasList( options.name );

        cy.reload();

        checkHasList( options.name );
    });

    it("Able to focus a list", () => {
        clear();
        cy.visit('/')

        createList(options.name );

        cy.get("aside .userList .sidebar-item")
            .click()
            .should("have.class", "active");

        cy.get(".task-list-wrap .list-name-input")
            .should("have.value", options.name);
    });

    it("Able to remove a list", () => {
        clear();
        cy.visit('/')

        createList(options.name );

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
        checkHasList( options.name, 0 );

        /**
         * List should be de-focused
         */
        cy.get(".task-list-wrap .list-name-input")
            .should("not.exist");

        cy.get(".task-list-wrap")
            .contains("Let's choose a list")
    });
});

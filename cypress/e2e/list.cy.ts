import {checkTwice, clear, randomName} from "../shared/utils";
import {options} from "../shared/options";
import {ListUtils} from "../shared/ListUtils";

const spec = {
    name: randomName("list")
}

describe('List basic tests', () => {
    beforeEach(() => {
        clear();
    });

    it("able to add new List", () => {
        ListUtils.Create( spec.name );

        checkTwice(() => {
            ListUtils
                .LengthIs(1)
                .should("have.text", spec.name );
        });
    });

    it("empty list name will not be added", () => {
        ListUtils.Create( " " );

        checkTwice(() => {
            ListUtils.LengthIs(0)
        });
    });

    it("Able to focus a list", () => {
        ListUtils
            .Create( spec.name )
            .FocusFirst()
            .should("have.class", "active");

        cy.get(`${ options.id.tasksContainer } .list-name-input`)
            .should("have.value", spec.name);
    });

    it("Able to remove a list", () => {
        ListUtils.Create( spec.name );

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
        ListUtils.LengthIs( 0 );

        /**
         * List should be de-focused
         */
        cy.get(".task-list-wrap .list-name-input")
            .should("not.exist");

        cy.get(".task-list-wrap")
            .contains("Let's choose a list")
    });
});

import {checkTwice, clear, createList, focusFirstList, randomName} from "./utils";
import {options} from "../options";

const spec = {
    name: randomName("task"),
    list_name: randomName("list")
}

describe('Task basic tests', () => {
    beforeEach(() => {
        clear();
    });

    it("Able to add new Task", () => {
        createList(spec.list_name);
        focusFirstList();

        /**
         * Be sure No Tasks
         */
        cy.get( options.id.tasksContainer )
            .should("contain.text", "Let's add some task")
            .get(options.id.taskItem )
            .should("have.length", 0)

        /**
         * Add New task
         */
        cy.get( options.id.tasksContainer )
            .get( ".add-new-input" )
            .type( spec.name )
            .type("{enter}")

        /**
         * Make new task Sure Exists
         */
        checkTwice(() => {
            cy.get( options.id.tasksContainer )
                .should("not.contain.text", "Let's add some task")
                .get(options.id.taskItem )
                .should("have.length", 1)
                .first()
                .should("contain.text", spec.name );
        });
    });
});

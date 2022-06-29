import {checkTwice, clear, randomName} from "../../shared/utils";
import {TaskUtils} from "../../shared/TaskUtils";
import {options} from "../../shared/options";

const spec = {
    name: randomName("task"),
    list_name: randomName("list")
}

describe('Task basic tests', () => {
    beforeEach(() => {
        clear();
    });

    it("able to add new Task", () => {
        TaskUtils.Create( spec.name, spec.list_name, () => {
            TaskUtils.LengthIs( 0 );

            cy
                .get( options.id.tasksContainer )
                .should("contain.text", "Let's add some task")
        });

        /**
         * Make new task Sure Exists
         */
        checkTwice(() => {
            TaskUtils
                .LengthIs( 1 )
                .should("contain.text", spec.name );

            cy.get( options.id.tasksContainer )
                .should("not.contain.text", "Let's add some task");
        });
    });

    it("empty name will not be added", () => {
        TaskUtils.Create( " ", spec.list_name );

        checkTwice(() => {
            TaskUtils.LengthIs( 0 )

            cy.get( options.id.tasksContainer )
                .should("contain.text", "Let's add some task");
        });
    });

    it('able to remove a task', function () {
        TaskUtils
            .Create( spec.name, spec.list_name )
            .LengthIs( 1 );

        /**
         * Right Click task to open Menu
         */
        TaskUtils
            .GetFirst()
            .rightclick();

        cy.get( options.id.menu )
            .contains("Remove Task")
            .click();

        checkTwice(() => {
            TaskUtils.LengthIs( 0 );
        });
    });
});

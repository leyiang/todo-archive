import {clear, placeholder, randomName} from "../../shared/utils";
import {TaskUtils} from "../../shared/TaskUtils";
import {options} from "../../shared/options";

const spec = {
    name: randomName("task"),
    list_name: randomName("list")
}

describe("Set Task Important Status", () => {
    beforeEach(() => {
        clear();
    });

    it('able to finish a task', function () {
        TaskUtils.Create( spec.name, spec.list_name );

        /**
         * Before Finish,
         * icon is normal
         */
        TaskUtils
            .GetFirst()
            .should("not.have.class", "finished")
            .find( options.id.finishButton )
            .find("svg")
            .should("have.attr", "data-icon")
            .should("equal", "ic:outline-circle");

        /**
         * Finish A Task
         */
        TaskUtils
            .GetFirst()
            .find( options.id.finishButton )
            .click();

        /**
         * After Task,
         * icon is checked-circle
         */
        TaskUtils
            .GetFirst()
            .should("have.class", "finished")
            .find( options.id.finishButton )
            .find("svg")
            .should("have.attr", "data-icon")
            .should("equal", "ic:outline-check-circle");
    });

    it("able to un-finish a task", () => {
        TaskUtils.Create( spec.name, spec.list_name );

        /**
         * Finish A Task
         */
        TaskUtils
            .GetFirst()
            .find( options.id.finishButton )
            .click()

        /**
         * Un-Finish a Task
         */
        TaskUtils
            .GetFirst()
            .find( options.id.finishButton )
            .click()

        TaskUtils
            .GetFirst()
            .should("not.have.class", "finished")
            .find( options.id.finishButton )
            .find("svg")
            .should("have.attr", "data-icon")
            .should("equal", "ic:outline-circle");
    });

    it('able to expand completed tasks', function () {
        placeholder();
    });
});
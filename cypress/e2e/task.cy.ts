import {clickMenu, resetEnv} from "../shared/utils";
import {taskHelpers} from "../shared/helpers/TaskHelper";

describe('Task List', () => {
    beforeEach(() => {
        resetEnv();
    });

    // it('able to add a new task', () => {
    //     const options = {
    //         name: "task name",
    //     }
    //
    //     taskHelpers.create( options.name );
    //
    //     taskHelpers
    //         .getAll()
    //         .should("have.length", 1)
    //         .should("contain.text", options.name );
    // });
    //
    // it("empty name will not be added", () => {
    //     taskHelpers.create('');
    //     taskHelpers.create('    ');
    //
    //     taskHelpers
    //         .getAll()
    //         .should("have.length", 0)
    // });

    it('able to add a remove task', () => {
        taskHelpers.create("task");

        taskHelpers
            .getFirst()
            .rightclick();

        clickMenu("Remove Task");

        taskHelpers
            .getAll()
            .should("have.length", 0);
    });
});

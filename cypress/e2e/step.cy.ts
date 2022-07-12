import {resetEnv} from "../shared/utils";
import {taskHelpers} from "../shared/helpers/TaskHelper";

describe('Step List', () => {
    beforeEach(() => {
        resetEnv();
    });

    it('able to add a new step', () => {
        const options = {
            name: "step name",
        }

        taskHelpers.create( options.name );

        taskHelpers
            .getAll()
            .should("have.length", 1)
            .should("contain.text", options.name );
    });

    it("empty name will not be added", () => {
        taskHelpers.create('');
        taskHelpers.create('    ');

        taskHelpers
            .getAll()
            .should("have.length", 0)
    });
});

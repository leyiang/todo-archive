import {resetEnv} from "../shared/utils";
import {stepHelpers} from "../shared/helpers/StepHelper";

describe('Step List', () => {
    beforeEach(() => {
        resetEnv();
    });

    it('able to add a new step', () => {
        const options = {
            name: "step name",
        }

        stepHelpers.create( options.name );

        stepHelpers
            .getAll()
            .should("have.length", 1)
            .find("input")
            .should("contain.value", options.name );
    });

    it("empty name will not be added", () => {
        stepHelpers.create('');
        stepHelpers.create('    ');

        stepHelpers
            .getAll()
            .should("have.length", 0)
    });
});
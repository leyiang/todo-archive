import {clickMenu, get, resetEnv} from "../shared/utils";
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

    it('step can be removed', () => {
        stepHelpers.create("step");

        stepHelpers
            .getFirst()
            .rightclick();

        clickMenu("Remove Step");

        stepHelpers
            .getAll()
            .should("have.length", 0);
    });

    it("able to finish a step", () => {
        stepHelpers.create("step");

        get("step-finish-button")
            .first()
            .click();

        stepHelpers
            .getFirst()
            .should("have.class", "line-through")
            .should("have.class", "text-gray-500");
    });
});
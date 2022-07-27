import {clickMenu, get, resetEnv, testID} from "../shared/utils";
import {stepHelpers} from "../shared/helpers/StepHelper";
import {folderHelpers} from "../shared/helpers/FolderHelper";
import {taskHelpers} from "../shared/helpers/TaskHelper";

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

        cy.get( testID("finished-step-toggle-btn")).click();

        stepHelpers
            .getFirst()
            .should("have.class", "line-through")
            .should("have.class", "text-gray-500");
    });

    it("able to set step as today", () => {
        folderHelpers.create("folder");
        folderHelpers.create("Today");

        taskHelpers.create("task", folderHelpers.getFirst() );
        stepHelpers.create("step", taskHelpers.getFirst());
        stepHelpers
            .getFirst()
            .rightclick();

        clickMenu("Set as Today");

        folderHelpers
            .getAll()
            .last()
            .find( testID("unfinished-task-number") )
            .should("contain.text", 1);
    });

    it("able to rename a step", () => {
        const newName = "New Step Name";
        stepHelpers.create("step");

        stepHelpers
            .getFirst()
            .find( testID("step-item-input") )
            .clear()
            .type( newName )
            .type("{enter}")
            .should("have.value", newName );

        cy.reload();

        stepHelpers
            .getFirst()
            .find( testID("step-item-input") )
            .should("have.value", newName );
    });

    it("able to remove step from today inside detail", () => {
        folderHelpers.create("folder");
        folderHelpers.create("Today");

        taskHelpers.create("task", folderHelpers.getFirst() );
        stepHelpers.create("step", taskHelpers.getFirst());
        stepHelpers
            .getFirst()
            .rightclick();

        clickMenu("Set as Today");

        folderHelpers
            .getAll()
            .last()
            .find( testID("unfinished-task-number") )
            .should("contain.text", 1);

        stepHelpers
            .getFirst()
            .rightclick();

        clickMenu("Today's Part is done");

        folderHelpers
            .getAll()
            .last()
            .find( testID("unfinished-task-number") )
            .should("not.exist");
    });

    it("able to remove step from today inside task list", () => {
        folderHelpers.create("folder");
        folderHelpers.create("Today");

        taskHelpers.create("task", folderHelpers.getFirst() );
        stepHelpers.create("step", taskHelpers.getFirst());
        stepHelpers
            .getFirst()
            .rightclick();

        clickMenu("Set as Today");

        folderHelpers
            .getAll()
            .last()
            .click();

        cy
            .get( testID("step-item-in-task-list") )
            .rightclick();

        clickMenu("Today's Part is done");

        folderHelpers
            .getAll()
            .last()
            .find( testID("unfinished-task-number") )
            .should("not.exist");


        // Test Reactivity
        // Remove in today, so in detail step should able to add it back

        stepHelpers
            .getFirst()
            .rightclick();

        clickMenu("Set as Today");

        folderHelpers
            .getAll()
            .last()
            .find( testID("unfinished-task-number") )
            .should("have.text", 1);
    });
});
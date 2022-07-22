import {clickMenu, get, resetEnv, testID} from "../shared/utils";
import {taskHelpers} from "../shared/helpers/TaskHelper";
import {folderHelpers} from "../shared/helpers/FolderHelper";

describe('Task List', () => {
    beforeEach(() => {
        resetEnv();
    });

    it('able to add a new task', () => {
        const options = {
            name: "task name",
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

    it("able to finish a task", () => {
        taskHelpers.create("123");

        taskHelpers
            .finishFirst();

        // No need to expand
        // Program will auto expand it
        // cy.get( testID("finished-plan-toggle-btn") ).click();

        taskHelpers
            .getFirst()
            .should("have.class", "line-through")
            .should("have.class", "text-gray-500");
    });

    it("task list placeholder should not show if all tasks are completed", () => {
        taskHelpers.create("123");

        taskHelpers
            .finishFirst();

        cy
            .get( testID("empty-task-list-placeholder") )
            .should("not.exist");
    });

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

    it("able to toggle detail", () => {
        taskHelpers.create("task");
        taskHelpers.getFirst().click();
        get("task-detail").should("exist");

        taskHelpers.getFirst().click();
        get("task-detail").should("not.exist");
    });

    it('remove task will de-focus it', () => {
        taskHelpers.create("task");

        taskHelpers
            .getFirst()
            .click()
            .rightclick();

        clickMenu("Remove Task");

        get("task-detail").should("not.exist");
    });

    it("finish task will not expand detail", () => {
        taskHelpers.create("task");
        taskHelpers.finishFirst();

        get("task-detail").should("not.exist");
    });

    it('able to use keyboard to toggle detail', function () {
        taskHelpers.create("task");
        taskHelpers.getFirst().focus().type("{enter}");
        get("task-detail").should("exist");
    });

    it("able to set task today", function() {
        folderHelpers.create("normal");
        folderHelpers.create("Today");
        taskHelpers.create("today task", folderHelpers.getFirst());

        taskHelpers
            .getFirst()
            .rightclick();

        clickMenu("Set as Today");

        folderHelpers
            .getAll()
            .eq(1)
            .find( testID("unfinished-task-number") )
            .should("exist")
            .should("contain.text", "1");
    });

    it('large quantity of tasks will not break layout', function () {
        for (let i = 0; i < 8; i++) {
            taskHelpers.create("123_" + i);
        }
        cy.window().then(win => {
            const htmlWidth = Cypress.$('html')[0].scrollWidth;
            const scrollBarWidth = win.innerWidth - htmlWidth;
            expect(scrollBarWidth).to.be.eq(0);
        })
    });

    it("hold activeTask state after refresh", function() {
        const name = "123";

        taskHelpers.create( name );
        taskHelpers.create("abc");

        taskHelpers.getFirst().click();
        cy.reload();

        cy
            .get( testID("task-detail") )
            .should("exist")
            .find( testID("task-name-input") )
            .should("have.value", name);
    });

    it("able to remove task from today", function() {
        folderHelpers.create("normal");
        folderHelpers.create("Today");
        taskHelpers.create("today task", folderHelpers.getFirst());

        const step = () => {
            folderHelpers.getFirst().click();

            taskHelpers
                .getFirst()
                .rightclick();

            clickMenu("Set as Today");

            taskHelpers.getFirst().rightclick();
            clickMenu("Today's Part is done");

            folderHelpers
                .getAll()
                .last()
                .click();

            taskHelpers.getAll().should("have.length", 0);
        };

        step();
        step();
    });

    it("able to set task description", () => {
        taskHelpers.create("task");
        taskHelpers.getFirst().click();

        const content = "Random_" + Math.random();

        get("task-description")
            .should("exist")
            .should("contain.text", '')
            .should("not.contain.text", content )
            .click()
            .type( content );

        /**
         * Trigger Change Event
         */
        get("task-list").click();

        cy.reload();

        get("task-description")
            .should("contain.text", content );
    });
});


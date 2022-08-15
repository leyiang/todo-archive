import {clickMenu, get, resetEnv, testID} from "../shared/utils";
import {folderHelpers} from "../shared/helpers/FolderHelper";
import {taskHelpers} from "../shared/helpers/TaskHelper";

describe('Labels', () => {
    beforeEach(() => {
        resetEnv();
    });

    it("able to add new Label", function() {
        cy.get( testID("setting-btn") )
            .click()
            .get( testID("new-label-input") )
            .type("label")
            .type("{enter}")
            .get( testID("label-item") )
            .should("have.length", 1)
            .get( testID("new-label-input") )
            .should("have.value", "");
    });

    it("able to rename Label", function() {
        const newName = "new label name";

        cy.get( testID("setting-btn") )
            .click()
            .get( testID("new-label-input") )
            .type("label")
            .type("{enter}")
            .get( testID("edit-label-name") )
            .clear()
            .type(newName)
            .type("{enter}");

        cy.reload();

        cy.get( testID("setting-btn") )
            .click()
            .get( testID("edit-label-name") )
            .should("have.value", newName );
    });

    it("able to reset color", function() {
        const color = "#ff0000";

        cy.get( testID("setting-btn") )
            .click()
            .get( testID("new-label-input") )
            .type("label")
            .type("{enter}")
            .get( testID("edit-label-color") )
            .invoke("val", color)
            .trigger("change");

        cy.reload();

        cy.get( testID("setting-btn") )
            .click()
            .get( testID("edit-label-color") )
            .should("have.value", color);
    });

    it("add label for task", () => {
        const labelName = "Hello";

        taskHelpers.create("Hello");
        taskHelpers.getFirst().rightclick();
        clickMenu("Edit Label");

        cy.get( testID("label-editor-input") )
            .click()
            .type(labelName)
            .type("{enter}");

        cy.get( testID("label-editor") )
            .find("small")
            .should("have.length", 1)
            .should("have.text", labelName)
            .get( testID("close-modal-button") )
            .click();

        taskHelpers
            .getFirst()
            .find("small")
            .should("have.length", 1)
            .should("have.text", labelName );

        cy.reload();

        taskHelpers
            .getFirst()
            .find("small")
            .should("have.length", 1)
            .should("have.text", labelName );
    });

    it("backspace and remove prev label", () => {
        const labelName = "Hello";

        taskHelpers.create("Hello");
        taskHelpers.getFirst().rightclick();
        clickMenu("Edit Label");

        cy.get( testID("label-editor-input") )
            .click()
            .type(labelName)
            .type("{enter}")
            .type("{backspace}");

        cy.get( testID("label-editor") )
            .find("small")
            .should("have.length", 0)
    });

    it("repeat label won't be added", () => {
        const labelName = "Hello";

        taskHelpers.create("Hello");
        taskHelpers.getFirst().rightclick();
        clickMenu("Edit Label");

        cy.get( testID("label-editor-input") )
            .click()
            .type(labelName)
            .type("{enter}")
            .type(labelName)
            .type("{enter}");

        cy.get( testID("label-editor") )
            .find("small")
            .should("have.length", 1)
    });
});
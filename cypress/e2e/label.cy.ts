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
            .should("have.length", 1);
    });
});
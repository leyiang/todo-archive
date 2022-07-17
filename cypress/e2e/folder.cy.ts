import {clickMenu, get, resetEnv, testID} from "../shared/utils";
import {folderHelpers} from "../shared/helpers/FolderHelper";
import {taskHelpers} from "../shared/helpers/TaskHelper";

describe('Folder List', () => {
    beforeEach(() => {
        resetEnv();
    });

    it('able to add a new folder', () => {
        const options = {
            name: "folder name",
        }

        folderHelpers.create( options.name );

        folderHelpers
            .getAll()
            .should("have.length", 1)
            .should("contain.text", options.name );
    });

    it("empty name will not be added", () => {
        folderHelpers.create( '' );

        folderHelpers
            .getAll()
            .should("have.length", 0);
    });

    it("able to remove folder", () => {
        folderHelpers.create("folder");

        folderHelpers
            .getFirst()
            .rightclick();

        get("context-menu")
            .contains("Remove Folder")
            .click();

        folderHelpers
            .getAll()
            .should("have.length", 0);
    })

    it("remove folder will de-active it", () => {
        folderHelpers.create("folder");

        folderHelpers
            .getFirst()
            .click()
            .rightclick();

        clickMenu("Remove Folder");

        folderHelpers
            .getAll()
            .should("have.length", 0);

        get("task-list")
            .should("contain", "Let's select a folder")
    });

    it("remove folder will de-active its task", () => {
        taskHelpers.create("task");
        taskHelpers.getFirst().click();

        folderHelpers
            .getFirst()
            .click()
            .rightclick();

        clickMenu("Remove Folder");

        get("task-detail")
            .should("not.exist");
    });

    it('unfinished plan number show correctly', () => {
        folderHelpers.create("folder");

        get("unfinished-task-number")
            .should("not.exist");

        taskHelpers.create("task", folderHelpers.getFirst() );

        get("unfinished-task-number")
            .should("have.text", "1");

        taskHelpers.create("task", folderHelpers.getFirst() );

        get("unfinished-task-number")
            .should("have.text", "2");

        taskHelpers.finishFirst();

        get("unfinished-task-number")
            .should("have.text", "1");
    });

    it("able to rename folder", () => {
        const newName = "new Folder Name";

        folderHelpers.create("folder");
        folderHelpers.getFirst().click();

        get("folder-rename-input")
            .first()
            .clear()
            .type( newName )
            .type("{enter}");

        folderHelpers
            .getFirst()
            .should("contain.text", newName);
    });

    it("able to open folder settings", () => {
        const name = "folder";
        folderHelpers.create( name  );
        folderHelpers.getFirst().rightclick();

        clickMenu("Folder Settings");

        cy
            .get( testID("folder-setting-modal") )
            .should("exist")
            .find( testID("folder-setting-current-folder") )
            .should("contain.text", name );
    });

    it("hode activeFolder state after refresh", () => {
        const name = "folder";

        folderHelpers.create( name );
        folderHelpers.create("random");

        folderHelpers.getFirst().click();

        cy.reload()

        cy
            .get( testID("task-list") )
            .should("exist")
            .find( testID("folder-rename-input") )
            .should("contain.value", name );
    });
});
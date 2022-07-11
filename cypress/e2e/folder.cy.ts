import {options} from "../shared/globals";
import FolderHelpers from "../shared/FolderHelpers";

describe('Folder List', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase( options.db.name );
        cy.visit('/')
    });

    it('able to add a new folder', () => {
        const options = {
            name: "folder name",
        }

        FolderHelpers.CreateFolder( options.name );

        FolderHelpers
            .GetAll()
            .should("have.length", 1)
            .should("contain.text", options.name );
    });

    it("empty name will not be added", () => {
        FolderHelpers.CreateFolder( '' );
        FolderHelpers
            .GetAll()
            .should("have.length", 0);
    });
});
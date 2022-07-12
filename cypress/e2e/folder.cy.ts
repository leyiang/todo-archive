import {resetEnv} from "../shared/utils";
import {folderHelpers} from "../shared/helpers/FolderHelper";

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
});
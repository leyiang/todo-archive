import FolderHelpers from "../shared/FolderHelpers";
import {flushEnv} from "../shared/utils";
import TaskHelpers, {taskHelpers} from "../shared/TaskHelpers";

describe('Task List', () => {
    beforeEach(() => {
        flushEnv();
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
        FolderHelpers.CreateFolder( '' );
        FolderHelpers
            .GetAll()
            .should("have.length", 0);
    });
});

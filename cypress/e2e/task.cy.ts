import {resetEnv} from "../shared/utils";
import {taskHelpers} from "../shared/TaskHelpers";
import {emptyInputAfterEnter} from "../shared/tests";
import {folderHelpers} from "../shared/FolderHelpers";

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

    it("input content will get emptied after press enter", () => {
        emptyInputAfterEnter(
            taskHelpers.getAddNewInput(),
            name => taskHelpers.create( name )
        );
    });
});

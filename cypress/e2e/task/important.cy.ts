import {clear, placeholder, randomName} from "../../shared/utils";
import {TaskUtils} from "../../shared/TaskUtils";

const spec = {
    name: randomName("task"),
    list_name: randomName("list")
}

describe("Set Task Important Status", () => {
    beforeEach(() => {
        clear();
    });

    it('able to set task important', function () {
        TaskUtils.Create(spec.name, spec.list_name );
    });
});

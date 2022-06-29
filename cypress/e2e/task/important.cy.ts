import {clear, placeholder, randomName} from "../../shared/utils";
import {TaskUtils} from "../../shared/TaskUtils";
import {options} from "../../shared/options";

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

        /**
         * Prev Status
         */
        TaskUtils
            .GetFirst()
            .find( options.id.importantButton )
            .find("svg")
            .should("have.attr", "data-icon")
            .and("equal", "ic:round-star-border" );

        /**
         * Set Important
         */
        TaskUtils
            .GetFirst()
            .find( options.id.importantButton )
            .click();

        /**
         * After set Important
         */
        TaskUtils
            .GetFirst()
            .find( options.id.importantButton )
            .find("svg")
            .should("have.attr", "data-icon")
            .and("equal", "ic:round-star" );
    });

    it("able to un-important a task", () => {
        TaskUtils.Create(spec.name, spec.list_name );

        /**
         * Set Important
         */
        TaskUtils
            .GetFirst()
            .find( options.id.importantButton )
            .click();

        /**
         * Un Important
         */
        TaskUtils
            .GetFirst()
            .find( options.id.importantButton )
            .click();

        /**
         * After set Important
         */
        TaskUtils
            .GetFirst()
            .find( options.id.importantButton )
            .find("svg")
            .should("have.attr", "data-icon")
            .and("equal", "ic:round-star-border" );
    });
});

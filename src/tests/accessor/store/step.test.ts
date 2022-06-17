import {test, expect} from "vitest";
import StoreAccessor from "@/core/accessor/store/StoreAccessor";
require("fake-indexeddb/auto");

test("able to add new step", async () => {
    const accessor = new StoreAccessor();
    const task = await accessor.addTask("Task Name", 0);

    const info = {
        name: "New Step",
        task_id: task.id
    };

    await accessor.addStep(info.name, info.task_id);

    await accessor.getStepsForTest().then( steps => {
        expect( steps.length ).toBe( 1 );
        const step = steps[0];

        expect( step.name ).toBe( info.name );
        expect( step.task_id ).toBe( info.task_id );
    });
});

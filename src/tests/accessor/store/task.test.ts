import {test, expect} from "vitest";
import StoreAccessor from "../../../core/accessor/store/StoreAccessor";
require("fake-indexeddb/auto");

/**
 * User Able to add new task
 */
test("able to add new task", async () => {
    const accessor = new StoreAccessor();

    const info = {
        name: "New Task",
        list_id: 3
    };

    await accessor.addTask(info.name, info.list_id);

    await accessor.getTasksForTest().then( tasks => {
        expect( tasks.length ).toBe( 1 );
        const task = tasks[0];

        expect( task.name ).toBe( info.name );
        expect( task.list_id ).toBe( info.list_id );
    });
});

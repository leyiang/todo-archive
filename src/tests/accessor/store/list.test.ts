import {test, expect} from "vitest";
import StoreAccessor from "@/core/accessor/store/StoreAccessor";
require("fake-indexeddb/auto");

test("able to add new list", async () => {
    const accessor = new StoreAccessor();

    const info = {
        name: "New List",
        icon: "icon-here",
        filterOptions : {
            all: true
        }
    };

    await accessor.addTaskList(info.name, info.icon, info.filterOptions);

    await accessor.getTaskLists().then( lists => {
        // Task is added
        expect(lists.length).toBe(1);

        const list = lists[0];

        // Ensure Data is correct
        expect(list.name).toBe( info.name );
        expect(list.icon).toBe( info.icon );
        expect(list.filterOptions).toMatchObject( info.filterOptions );
    });
});

import {test, expect} from "vitest";
import StoreAccessor from "@/core/accessor/store/StoreAccessor";
require("fake-indexeddb/auto");
const FDBFactory = require("fake-indexeddb/lib/FDBFactory");

test("able to add new list", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    const info = {
        name: "New List",
        icon: "icon-here",
        filterOptions : {

        }
    };

    await accessor.addTaskList(info.name, info.icon, info.filterOptions);

    await accessor.getTaskLists().then( lists => {
        // Task is added
        expect(lists.length).toBe(1);

        const list = lists[0];

        // Ensure Data is correct
        expect(list.id).toBeDefined();
        expect(list.name).toBe( info.name );
        expect(list.icon).toBe( info.icon );
        expect(list.filterOptions).toMatchObject( info.filterOptions );
    });
});

test("able to remove list", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();
    await accessor.addTaskList("name", null, null);

    await accessor.getTaskLists().then( async lists => {
        // Task is added
        expect(lists.length).toBe(1);

        await accessor.removeTaskList( lists[0].id );
        await accessor.getTaskLists().then( lists => {
            // Task is added
            expect(lists.length).toBe(0);
        });
    });
});

test("able to set list prop", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    const listInfo = {
        name: "List Name",
        icon: "912312",
        filterOptions: {}
    }

    const updateListInfo = {
        name: "New Name Here",
        icon: "9kljadslkfjalsd",
        filterOptions: {
            all: true
        }
    }

    await accessor.addTaskList( listInfo.name, listInfo.icon, listInfo.filterOptions );

    await accessor.getTaskLists().then( async lists => {
        // Task is added
        expect(lists.length).toBe(1);
        const list = lists[0];
        expect( list ).toMatchObject( listInfo );
        expect(list.settings.hideTags).toBe( false );

        const value = JSON.parse( JSON.stringify(list.settings) );
        value.hideTags = true;

        await accessor.updateTaskListProp( list.id, "settings", value);
        await accessor.updateTaskListProp( list.id, "name", updateListInfo.name);
        await accessor.updateTaskListProp( list.id, "icon", updateListInfo.icon);
        await accessor.updateTaskListProp( list.id, "filterOptions", updateListInfo.filterOptions);

        await accessor.getTaskLists().then( lists => {
            expect(lists.length).toBe(1);
            expect(lists[0].settings.hideTags).toBe( true );
            expect( lists[0] ).toMatchObject( updateListInfo );
        });
    });
});

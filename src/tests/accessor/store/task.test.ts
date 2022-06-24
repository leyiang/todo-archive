import {test, expect} from "vitest";
import StoreAccessor from "@/core/accessor/store/StoreAccessor";
import { format } from "@/core/shared/utils";
require("fake-indexeddb/auto");
const FDBFactory = require("fake-indexeddb/lib/FDBFactory");
/**
 * User Able to add new task
 */
test("able to add new task", async () => {
    indexedDB = new FDBFactory();
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

test("able to set task finish status", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    await accessor.addTask("name", 0);

    await accessor.getTasksForTest().then( async tasks => {
        const task = tasks[0];

        expect( task.finish ).toBe( false );

        await accessor.setTaskSpecialProp( task.id, "finish", true )
        await accessor.getTasksForTest().then( async tasks => {
            expect( tasks.length ).toBe(1);
            const task = tasks[0];
            expect( task.finish ).toBe( true );
        })
    });
});

test("able to remove a task", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    await accessor.addTask("name", 0);
    await accessor.addTask("name1", 0);

    await accessor.getTasksForTest().then( async tasks => {
        expect( tasks.length ).toBe( 2 );
        const task = tasks[1];

        await accessor.removeTask( tasks[0].id );

        await accessor.getTasksForTest().then( async tasks => {
            expect(tasks.length).toBe(1);
            expect( task ).toMatchObject( tasks[0] );
        });
    });
});

test("able to set task special status", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    await accessor.addTask("name", 0);

    await accessor.getTasksForTest().then( async tasks => {
        const task = tasks[0];

        expect( task.important ).toBe( false );

        const date = format("Y-m-d");
        await accessor.setTaskSpecialProp( task.id, "important", true );
        await accessor.setTaskSpecialProp( task.id, "date", date );

        await accessor.getTasksForTest().then( async tasks => {
            expect( tasks.length ).toBe(1);
            const task = tasks[0];
            expect( task.important ).toBe( true );
            expect( task.date ).toBe( date );
        })
    });
});

test("able to set task normal prop", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    const name = "This is the new name";
    const notes = `SOmethinga
    aslkfjallkajf
    afjlaskf Just great`;

    await accessor.addTask("name", 0);

    await accessor.getTasksForTest().then( async tasks => {
        const task = tasks[0];

        expect( task.name ).toBe("name");
        expect( task.notes ).toBe('');

        await accessor.updateTaskProp( task.id, "name", name )
        await accessor.updateTaskProp( task.id, "notes", notes )

        await accessor.getTasksForTest().then( async tasks => {
            expect( tasks.length ).toBe(1);
            const task = tasks[0];

            expect( task.name ).toBe( name );
            expect( task.notes ).toBe( notes );
        })
    });
});

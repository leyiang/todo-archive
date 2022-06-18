import {test, expect} from "vitest";
import StoreAccessor from "../../../core/accessor/store/StoreAccessor";
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

        expect(
            accessor.setTaskFinishStatus( task.id, true )
        ).resolves.not.toThrow();

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

test("able to set task important status", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    await accessor.addTask("name", 0);

    await accessor.getTasksForTest().then( async tasks => {
        const task = tasks[0];

        expect( task.important ).toBe( false );

        expect(
            accessor.setTaskImportantStatus( task.id, true )
        ).resolves.not.toThrow();

        await accessor.getTasksForTest().then( async tasks => {
            expect( tasks.length ).toBe(1);
            const task = tasks[0];
            expect( task.important ).toBe( true );
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

        expect(
            accessor.updateTaskProp( task.id, "name", name )
        ).resolves.not.toThrow();

        expect(
            accessor.updateTaskProp( task.id, "notes", notes )
        ).resolves.not.toThrow();

        await accessor.getTasksForTest().then( async tasks => {
            expect( tasks.length ).toBe(1);
            const task = tasks[0];

            expect( task.name ).toBe( name );
            expect( task.notes ).toBe( notes );
        })
    });
});

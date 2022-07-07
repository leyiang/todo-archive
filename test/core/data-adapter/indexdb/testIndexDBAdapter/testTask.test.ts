import {describe, it, expect, beforeEach} from 'vitest'
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import {isRawTask, type rawTask} from "@/core/model/rawTypes";

let adapter = new IndexDBAdapter();

describe('IndexDB Adapter - Task', () => {
    beforeEach(() => {
        // @ts-ignore, Global Variable
        indexedDB = new IDBFactory();
        adapter = new IndexDBAdapter();
    })

    it("Able to add Task", async () => {
        const name = "Task Naem";

        const rawFolder = await adapter.addFolder("Folder Name");
        await adapter.addTask(name, rawFolder.id );

        await adapter.getTasksForTest().then( tasks => {
            expect( tasks.length ).toBe( 1 );
            expect( tasks[0].name ).toBe( name );
            expect( tasks[0].folder_id ).toBe( rawFolder.id );
        });
    });

    it("Able to set task props", async () => {
        const name = "Task Name";
        const props = {
            name: "New Task Name",
            desc: "This is the description",
            finished: true,
            important: true
        }

        const rawFolder = await adapter.addFolder("Folder Name");
        await adapter.addTask(name, rawFolder.id );

        let task = null as null | rawTask;

        await adapter.getTasksForTest().then( tasks => {
            task = tasks[0];

            expect( task.name ).toBe( name );
            expect( task.description === "" || task.description === undefined  ).toBeTruthy();
            expect( task.finished === false || task.finished === undefined ).toBeTruthy();
            expect( task.important === false || task.important === undefined ).toBeTruthy();
        });

        /**
         * This if branch is every branch we gonna get
         * Add this if branch is to let typescript to be hapy
         */
        if( isRawTask(task) ) {
            await adapter.setTaskProp(task.id, "name", props.name);
            await adapter.setTaskProp(task.id, "description", props.desc);
            await adapter.setTaskProp(task.id, "finished", props.finished);
            await adapter.setTaskProp(task.id, "important", props.important);

            await adapter.getTasksForTest().then( tasks => {
                task = tasks[0];

                expect( task.name ).toBe( props.name );
                expect( task.description ).toBe( props.desc );
                expect( task.finished ).toBe( props.finished );
                expect( task.important ).toBe( props.important );
            });
        }
    });

    it("Set task prop affected is returning correctly", async () => {
        const name = "Task Name";

        const props = {
            name: "New Task Name",
            desc: "This is the description",
            finished: true,
            important: true
        }

        const rawFolder = await adapter.addFolder("Folder Name");
        await adapter.addTask(name, rawFolder.id );

        let task = null as null | rawTask;

        await adapter.getTasksForTest().then( tasks => {
            task = tasks[0];

            expect( task.name ).toBe( name );
            expect( task.description === "" || task.description === undefined  ).toBeTruthy();
            expect( task.finished === false || task.finished === undefined ).toBeTruthy();
            expect( task.important === false || task.important === undefined ).toBeTruthy();
        });

        /**
         * This if branch is every branch we gonna get
         * Add this if branch is to let typescript to be hapy
         */
        if( isRawTask(task) ) {
            await adapter.setTaskProp(task.id, "name", props.name);
            await adapter.setTaskProp(task.id, "description", props.desc);
            await adapter.setTaskProp(task.id, "finished", props.finished);
            await adapter.setTaskProp(task.id, "important", props.important);

            await adapter.getTasksForTest().then( tasks => {
                task = tasks[0];

                expect( task.name ).toBe( props.name );
                expect( task.description ).toBe( props.desc );
                expect( task.finished ).toBe( props.finished );
                expect( task.important ).toBe( props.important );
            });
        }
    });
});

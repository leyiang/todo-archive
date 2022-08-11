// @ts-ignore
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import {describe, it, expect, beforeEach} from 'vitest'
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import {isRawTask, type rawTask} from "@/core/model/rawTypes";
import { getTodayString } from "@/shared/utils.ts";

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

    it("Able to remove Task", async () => {
        const name = "Task Naem";

        const rawFolder = await adapter.addFolder("Folder Name");
        const rawTask = await adapter.addTask(name, rawFolder.id );
        await adapter.removeTask( rawTask.id );

        await adapter.getTasksForTest().then( tasks => {
            expect( tasks.length ).toBe( 0 );
        });
    });

    it("Empty task name will not be added", async () => {
        const rawFolder = await adapter.addFolder("Folder Name");
        await expect( adapter.addTask("  ", rawFolder.id ) ).rejects.toThrow();

        await adapter.getTasksForTest().then( tasks => {
            expect( tasks.length ).toBe( 0 );
        });
    });

    it("Able to set task props", async () => {
        const name = "Task Name";
        const props = {
            name: "New Task Name",
            description: "This is the description",
            finished: true,
            important: true,
            priority: 1,
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
            expect( task.priority === 10 || task.priority === undefined ).toBeTruthy();
            expect( task.labels === undefined || Array.isArray(task.labels) ).toBeTruthy();
        });

        /**
         * This if branch is every branch we gonna get
         * Add this if branch is to let typescript to be hapy
         */
        if( isRawTask(task) ) {
            let key: keyof typeof props;

            for(key in props) {
                await adapter.setTaskProp(task.id, key, props[key]);
            }


            await adapter.getTasksForTest().then( tasks => {
                task = tasks[0];

                for(key in props) {
                    expect( task[key] ).toBe( props[key] );
                }
            });
        }
    });

    it("Set task prop affected is returning correctly", async () => {
        const folderMap = {
            folder: await adapter.addFolder("Folder Name"),
            today: await adapter.addFolder("Today Name"),
            important: await adapter.addFolder("Important Folder")
        }

        const taskMap: {
            [key: string]: rawTask
        } = {
            today: await adapter.addTask("Today Task", folderMap.folder.id ),
            important: await adapter.addTask("Important Task", folderMap.folder.id )
        };

        await adapter.setFolderProp(folderMap.today.id, "filterOptions", {
            today: true
        });
        await adapter.setFolderProp(folderMap.important.id, "filterOptions", {
            important: true
        });

        if( isRawTask( taskMap.today ) ) {
            const task = taskMap.today;

            await adapter.setTaskProp( task.id, "date", getTodayString()).then(affecting => {
                expect( affecting.length ).toBe( 1 );
                expect( affecting[0] ).toBe( folderMap.today.id );
            });
        }

        if( isRawTask( taskMap.important ) ) {
            const task = taskMap.today;

            await adapter.setTaskProp( task.id, "important", true).then(affecting => {
                expect( affecting.length ).toBe( 1 );
                expect( affecting[0] ).toBe( folderMap.important.id );
            });
        }
    });

    it("Able to add Task with labels", async () => {
        const labels = ["book", "test"];
        const name = `:${ labels.join(',') } Task Naem`;
        
        const rawFolder = await adapter.addFolder("Folder Name");
        await adapter.addTask(name, rawFolder.id );

        await adapter.getTasksForTest().then( tasks => {
            const task = tasks[0];
            expect( task.labels ).toMatchObject( labels );
        });
    });

    it("Able to add labels for task", async () => {
        const name = "Task Naem";

        let task_id: null | number = null;
        const rawFolder = await adapter.addFolder("Folder Name");

        await adapter.addTask(name, rawFolder.id );

        await adapter.getTasksForTest().then( tasks => {
            const task = tasks[0];
            task_id = task.id;
            expect( task.labels === undefined || Array.isArray(task.labels) ).toBeTruthy();
        });

        const label = "new label";
        await adapter.addTaskLabel(task_id, label);

        await adapter.getTasksForTest().then( tasks => {
            const task = tasks[0];
            expect( task.labels ).toMatchObject( [ label ] );
        });
    });
});

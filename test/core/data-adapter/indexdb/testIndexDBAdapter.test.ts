import {describe, it, expect, beforeEach} from 'vitest'
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";

let adapter = new IndexDBAdapter();

describe('IndexDB Adapter', () => {
    beforeEach(() => {
        // @ts-ignore, Global Variable
        indexedDB = new IDBFactory();
        adapter = new IndexDBAdapter();
    })

    it("Able to add Folder", async () => {
        const name = "new Folder";

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 0 );
        });

        await adapter.addFolder(name);

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 1 );
            expect( folders[0].name === name );
        })
    });

    it("Able to add Task", async () => {
        const name = "Task Naem";

        const rawFolder = await adapter.addFolder("Folder Name");
        await adapter.addTask(name, rawFolder.id );

        await adapter.getTasksForTest().then( tasks => {
            expect( tasks.length ).toBe( 1 );
            expect( tasks[0].name === name );
            expect( tasks[0].folder_id === rawFolder.id );
        });
    });
});
import {describe, it, expect, beforeEach} from 'vitest'
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";

let adapter = new IndexDBAdapter();

describe('IndexDB Adapter - Step', () => {
    beforeEach(() => {
        // @ts-ignore, Global Variable
        indexedDB = new IDBFactory();
        adapter = new IndexDBAdapter();
    })

    it("Able to add step", async () => {
        const name = "Step Name";

        const rawFolder = await adapter.addFolder("Folder Name");
        const rawTask = await adapter.addTask("Task Name", rawFolder.id );
        await adapter.addStep(name, rawTask.id);

        await adapter.getStepsForTest().then( steps => {
            expect( steps.length ).toBe( 1 );
            expect( steps[0].name ).toBe( name );
            expect( steps[0].task_id ).toBe( rawTask.id );
        });
    });
});

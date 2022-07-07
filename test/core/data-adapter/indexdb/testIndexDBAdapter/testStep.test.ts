import {describe, it, expect, beforeEach} from 'vitest'
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import {isRawStep, rawStep, rawTask} from "../../../../../src/core/model/rawTypes";

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

    it("Able to set step prop", async () => {
        const name = "Step Name";

        const prop = {
            name: "new SteP Name",
            date: "2022-07-05",
            finished: true
        }

        const folderMap = {
            folder: await adapter.addFolder("Folder Name"),
            today: await adapter.addFolder("Today Name"),
        }

        await adapter.setFolderProp(folderMap.today.id, "filterOptions", {
            today: true
        });

        const rawTask = await adapter.addTask("Task Name", folderMap.folder.id );
        await adapter.addStep(name, rawTask.id);

        let step = null as null | rawStep;
        await adapter.getStepsForTest().then( steps => {
            step = steps[0];

            expect( step.name ).toBe( name );
            expect( step.date === undefined || step.date === "" ).toBeTruthy();
            expect( step.finished === undefined || step.finished === false );
        });

        if( isRawStep(step) ) {
            await adapter.setStepProp( step.id, "name", prop.name);
            await adapter.setStepProp( step.id, "date", prop.date);
            await adapter.setStepProp( step.id, "finished", prop.finished);
        }

        await adapter.getStepsForTest().then( steps => {
            step = steps[0];

            expect( step.name ).toBe( prop.name );
            expect( step.date ).toBe( prop.date );
            expect( step.finished ).toBe( true );
        });
    });
});

import {test, expect} from "vitest";
import StoreAccessor from "@/core/accessor/store/StoreAccessor";
require("fake-indexeddb/auto");
const FDBFactory = require("fake-indexeddb/lib/FDBFactory");

test("able to add new step", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    const info = {
        name: "New Step",
        task_id: 0
    };

    await accessor.addStep(info.name, info.task_id);

    await accessor.getStepsForTest().then( steps => {
        expect( steps.length ).toBe( 1 );
        const step = steps[0];

        expect( step.name ).toBe( info.name );
        expect( step.task_id ).toBe( info.task_id );
    });
});

test("able to remove step", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();
    const task = await accessor.addTask("Task Name", 0);

    await accessor.addStep("name", 1);

    await accessor.getStepsForTest().then( async steps => {
        expect( steps.length ).toBe( 1 );

        await accessor.removeStep( steps[0].id );

        await accessor.getStepsForTest().then( async steps => {
            expect(steps.length).toBe(0);
        });
    });
});

test("able to finish step", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    await accessor.addStep("name", 1);

    await accessor.getStepsForTest().then( async steps => {
        expect( steps.length ).toBe( 1 );
        expect( steps[0].finish ).toBe( false );

        await accessor.setStepStatus( steps[0].id, true )

        await accessor.getStepsForTest().then( async steps => {
            expect(steps.length).toBe(1);
            expect( steps[0].finish ).toBe( true );
        });
    });
});

test("able to update step prop", async () => {
    indexedDB = new FDBFactory();
    const accessor = new StoreAccessor();

    const newName = "this is new name";
    const info = {
        name: "New Step",
        task_id: 0
    };

    await accessor.addStep(info.name, info.task_id);

    await accessor.getStepsForTest().then( async steps => {
        expect( steps.length ).toBe( 1 );

        const step = steps[0];
        expect( step.name ).toBe( info.name );
        expect( step.task_id ).toBe( info.task_id );

        await accessor.updateStepProp( step.id, "name", newName);
        await accessor.getStepsForTest().then( async steps => {
            expect( steps.length ).toBe( 1 );
            const step = steps[0];

            expect( step.name ).toBe( newName );
        });
    });
});

import { describe, it, expect } from 'vitest'
//@ts-ignore
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";
//@ts-ignore
import {getRawFolder, getRawTask, getRawStep, isRawTask} from "@/core/model/rawTypes.ts";
import { getTodayString } from "@/shared/utils.ts";

describe('Data Organizer', () => {

    it('Organize Folder Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder( 1, "Today" ),
            getRawFolder( 2, "Foo" ),
            getRawFolder( 3, "Bar" ),
        ];

        const data = organizer.organize( folders, [], [] );

        expect( data.length ).toBe( folders.length );
        expect( folders ).toMatchObject( data );
    });

    it('Organize Tasks Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder( 1, "Today" ),
        ];

        const tasks = [
            getRawTask(1, "Task 1", 1)
        ];

        const data = organizer.organize( folders, tasks, [] );

        expect( data[0].plans.length ).toBe( tasks.length );
        expect( data[0].plans[0] ).toMatchObject( tasks[0] );
    });

    it('Organize Steps Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder( 1, "Today" ),
        ];

        const tasks = [
            getRawTask( 1, "Task 1", 1 )
        ];

        const steps = [
            getRawStep( 1, "Step 1", 1, getTodayString()),
        ];

        const data = organizer.organize( folders, tasks, steps );

        const folder = data[0];
        const task = folder.plans[0];

        if( isRawTask(task) ) {
            expect( task.steps.length ).toBe( steps.length );
            expect( task.steps[0] ).toMatchObject( steps[0] );
        }
    });

    it('Organize Today Task Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder(1, "Today", { today: true } ),
            getRawFolder( 2, "Sample" )
        ];

        const tasks = [
            getRawTask( 1, "Task 1", 2, getTodayString() )
        ];

        const data = organizer.organize( folders, tasks, [] );
        expect( data[0].plans.length ).toBe( 1 );
    });

    it('Organize Important Task Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder(1, "Today", { important: true }),
            getRawFolder( 2, "Sample" )
        ];

        const tasks = [
            getRawTask( 1, "Task 1", 2, null, true )
        ];

        const data = organizer.organize( folders, tasks, [] );
        expect( data[0].plans.length ).toBe( 1 );
        expect( data[0].plans[0] ).toMatchObject( tasks[0] );
    });

    it('Organize Today Step Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder(1, "Today", {today: true}),
        ];

        const tasks = [
            getRawTask( 1, "Task 1", 1 )
        ];

        const steps = [
            getRawStep( 1, "Step 1", 1, getTodayString() )
        ];

        const data = organizer.organize( folders, tasks, steps );
        expect( data[0].plans.length ).toBe( 2 );
        expect( data[0].plans[1] ).toMatchObject( steps[0] );
    });

    it('Organize Task will not duplicate', () => {
        const organizer = new DataOrganizer;

        const folders = [
            getRawFolder(1, "Today", {today: true, important: true} ),
        ];

        const tasks = [
            getRawTask(1, "Task 1", 1, getTodayString(), true )
        ];

        const data = organizer.organize( folders, tasks, [] );

        expect( data[0].plans.length ).toBe( 1 );
    });
});
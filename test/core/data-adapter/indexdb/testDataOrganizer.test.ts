import { describe, it, expect } from 'vitest'
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";

describe('Data Organizer', () => {

    it('Organize Folder Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today" },
            { id: 2, name: "Foo" },
            { id: 3, name: "Bar" },
        ];

        const data = organizer.organize( folders, [], [] );

        expect( data.length ).toBe( folders.length );
        expect( folders ).toMatchObject( data );
    });

    it('Organize Tasks Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today" },
        ];

        const tasks = [
            { id: 1, name: "Task 1", folder_id: 1 },
        ];

        const data = organizer.organize( folders, tasks, [] );

        expect( data[0].plans.length ).toBe( tasks.length );
        expect( data[0].plans[0] ).toMatchObject( tasks[0] );
    });

    it('Organize Steps Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today" },
        ];

        const tasks = [
            { id: 1, name: "Task 1", folder_id: 1 },
        ];

        const steps = [
            { id: 1, name: "Step 1", date: "2022-07-05", task_id: 1, },
        ];

        const data = organizer.organize( folders, tasks, steps );

        const folder = data[0];
        const task = folder.plans[0];

        expect( task.steps.length ).toBe( steps.length );
        expect( task.steps[0] ).toMatchObject( steps[0] );
    });

    it('Organize Today Task Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today", filterOptions: { today: true } },
            { id: 2, name: "Sample" },
        ];

        const tasks = [
            { id: 1, name: "Task 1", date: "2022-07-05", folder_id: 2 },
        ];

        const data = organizer.organize( folders, tasks, [] );
        expect( data[0].plans.length ).toBe( 1 );
    });

    it('Organize Important Task Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today", filterOptions: { important: true } },
            { id: 2, name: "Sample" },
        ];

        const tasks = [
            { id: 1, name: "Task 1", folder_id: 2, important: true },
        ];

        const data = organizer.organize( folders, tasks, [] );
        expect( data[0].plans.length ).toBe( 1 );
        expect( data[0].plans[0] ).toMatchObject( tasks[0] );
    });

    it('Organize Today Step Properly', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today", filterOptions: { today: true } },
        ];

        const tasks = [
            { id: 1, name: "Task 1", date: null, folder_id: 1 },
        ];

        const steps = [
            { id: 1, name: "Step 1", date: "2022-07-05", task_id: 1 },
        ];

        const data = organizer.organize( folders, tasks, steps );
        expect( data[0].plans.length ).toBe( 2 );

        expect( data[0].plans[1] ).toMatchObject( steps[0] );
    });

    it('Organize Task will not duplicate', () => {
        const organizer = new DataOrganizer;

        const folders = [
            { id: 1, name: "Today", filterOptions: { today: true, important: true } },
        ];

        const tasks = [
            { id: 1, name: "Task 1", date: "2022-07-05", folder_id: 1, important: true },
        ];

        const data = organizer.organize( folders, tasks, [] );

        expect( data[0].plans.length ).toBe( 1 );
    });
});
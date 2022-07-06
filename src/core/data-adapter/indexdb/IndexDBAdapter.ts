import IndexDBAccessor from "./IndexDBAccessor";
import type Folder from "@/core/model/folder/Folder";
import type Task from "@/core/model/Task";
import type Step from "@/core/model/Step";
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";

export default class IndexDBAdapter {
    public accessor = new IndexDBAccessor();
    private organizer = new DataOrganizer();

    loadData(): Promise<object[]> {
        return new Promise(resolve => {
            const folders = JSON.parse(JSON.stringify([
                { id: 1, name: "Today", filterOptions: { today: true } },
                { id: 2, name: "Foo" },
                { id: 3, name: "Bar" , filterOptions: { today: true, important: true } },
            ]));

            const tasks = [
                { id: 1, name: "Task 1", date: "2022-07-05", folder_id: 2 },
                { id: 1, name: "Task 1", date: null, folder_id: 1, important: true },
            ];

            const steps = [
                { id: 1, name: "Step 1", date: "2022-07-05", task_id: 1, },
            ];


            const data = this.organizer.organize( folders, tasks, steps );
            console.table( data );

            resolve([]);
        });
    }
}
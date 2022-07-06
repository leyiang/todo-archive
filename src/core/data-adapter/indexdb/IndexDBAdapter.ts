import IndexDBAccessor from "./IndexDBAccessor";
import DataOrganizer from "@/core/data-adapter/indexdb/DataOrganizer";
import type { rawFolder } from "@/core/model/rawTypes";
import {getRawFolder, getRawStep, getRawTask} from "@/core/model/rawTypes";

export default class IndexDBAdapter {
    public accessor = new IndexDBAccessor();
    private organizer = new DataOrganizer();

    loadData(): Promise<rawFolder[]> {
        return new Promise(resolve => {
            const folders = [
                getRawFolder(1, "Today", { today: true }),
                getRawFolder(2, "Foo" ),
                getRawFolder(3, "Important", { important: true } ),
            ];

            const tasks = [
                getRawTask(1, "Base in Foo", 2, "2022-07-05"),
                getRawTask(2, "Important Task", 1, null, true),
            ];

            const steps = [
                getRawStep(1, "Step 1", 1, "2022-07-05")
            ];

            const data = this.organizer.organize( folders, tasks, steps );

            resolve( data );
        });
    }
}
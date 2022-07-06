import type Folder from "@/core/model/folder/Folder";
import type Task from "@/core/model/Task";
import FilterParser, {availableOptions, type filterOptionsType} from "@/core/model/folder/FilterOptions";
import type Step from "@/core/model/Step";
import type {localFolder, localStep, localTask} from "@/core/data-adapter/indexdb/IndexDBAdapter";

interface OrganizerOptionList {
    [key: string]: {
        /**
         * list store all plan(task, step) that satisfies check method
         */
        list: (localTask | localStep)[];

        /**
         * Check Filter Option By Using FilterParser
         */
        check: (...args: any[]) => void
    }
}

export default class DataOrganizer {
    private folderMap: { [index: number]: localFolder } = {}
    private taskMap: { [index: number]: localTask } = {};
    private options: OrganizerOptionList = {};

    constructor() {
        const parser: FilterParser = new FilterParser();

        availableOptions.forEach( (option:string) => {
            this.options[ option ] = {
                list: [],

                check( item ) {
                    if( parser.checkValid(option, item) ) {
                        this.list.push( item );
                    }
                }
            }
        });
    }

    /**
     * Organize data load from local browser( localStorage, indexDB )
     * So that we get the same result as the backend will return
     * This gives us the ability to transform from local and api smoothly
     * @param folders
     * @param tasks
     * @param steps
     */
    organize(folders: localFolder[], tasks: localTask[], steps: localStep[]): localFolder[] {
        folders.forEach(folder => {
            folder.plans = [];
            this.folderMap[folder.id] = folder;
        });

        tasks.forEach(task => {
            task.steps = [];

            const folder = this.folderMap[ task.folder_id ];

            if( folder ) {
                folder.plans.push( task );
                this.taskMap[task.id] = task;

                this.checkPlanForFilter( task );
            }

        });

        steps.forEach(step => {
            this.taskMap[step.task_id].steps.push(step);
            this.checkPlanForFilter( step );
        });

        folders.forEach(folder => {
            if (folder.filterOptions) {
                this.parseFilterOptions( folder, folder.filterOptions );
            }
        });

        return folders;
    }

    checkPlanForFilter( plan: Task | Step ) {
        Object.keys( this.options ).forEach( key => {
            const option = this.options[ key ];
            option.check( plan );
        });
    }

    parseFilterOptions( folder: Folder, filterOptions: filterOptionsType ) {
        for(let option in filterOptions) {
            for( let item of this.options[ option ].list ) {
                if( ! folder.plans.includes( item ) ) {
                    folder.plans.push( item );
                }
            }
        }
    }
}
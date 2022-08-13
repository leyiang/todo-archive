import Step from "@/core/model/Step";
import {isRawTask} from "@/core/model/rawTypes";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import {computed} from "vue";
import {getTodayString, getTomorrowString, splice} from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";

export default class Task {
    public steps: Step[] = [];

    constructor(
        public id: number,
        public folder_id: number,
        public name: string,
        public finished: boolean = false,
        public date: string | null = null,
        public description: string,
        public priority = 10,
        public labels:string[] = []
    ) {
    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawTask(raw) ) {
            const task = new Task(
                raw.id,
                raw.folder_id,
                raw.name,
                raw.finished,
                raw.date,
                raw.description,
                raw.priority,
                raw.labels
            );

            const todoStore = useTodoStore();
            todoStore.taskMap[ raw.id ] = task;

            raw.steps.forEach( step => {
                if( todoStore.stepMap[step.id] instanceof Step ) {
                    task.steps.push( todoStore.stepMap[step.id] );
                } else {
                    task.steps.push( Step.Load(step) );
                }
            });

            return task;
        } else {
            throw "Wrong Properties for Folder.Load";
        }
    }

    registerMenu( el: HTMLElement ) {
        const todoStore = useTodoStore();

        addNewMenu( el, [
            {
                name: computed(() => this.date === getTodayString() ? "Today's Part is done" : "Set as Today"),
                action: () => {
                    if( this.date === getTodayString() ) {
                        adapter.setTaskProp( this.id, "date", null).then( affecting => {
                            this.date = null;

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[id];

                                if( folder instanceof Folder ) {
                                    splice( folder.plans, this );
                                }
                            });
                        });
                    } else {
                        adapter.setTaskProp( this.id, "date", getTodayString()).then( affecting => {
                            this.date = getTodayString();

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[ id ];

                                if( folder instanceof Folder ) {
                                    folder.plans.push(this);
                                }
                            });
                        });
                    }
                }
            },
            {
                name: computed(() => this.date === getTomorrowString() ? "Remove from tomorrow" : "Set as Tomorrow"),
                action: () => {
                    adapter.setTaskProp( this.id, "date", getTomorrowString()).then( affecting => {
                        this.date = getTomorrowString();
                    });
                }
            },
            {
                name: "Move task to",

                children: todoStore.folders.map( folder => ({
                    name: folder.name,
                    action: () => {
                        adapter.setTaskProp( this.id, "folder_id", folder.id ).then( r => {
                            const oldFolder = todoStore.folderMap[ this.folder_id ];
                            splice( oldFolder.plans, this );

                            this.folder_id = folder.id;
                            folder.plans.push( this );
                        });
                    }
                }))
            },

            {
                name: "Remove Task",
                action: () => {
                    adapter.removeTask( this.id ).then(() => {
                        todoStore.removeTask( this );
                    });
                }
            },
        ]);
    }
}
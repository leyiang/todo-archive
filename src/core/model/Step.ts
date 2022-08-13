import {isRawStep} from "@/core/model/rawTypes";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import {computed} from "vue";
import {getTodayString, getTomorrowString, splice} from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";

export default class Step {
    constructor(
        public id: number,
        public task_id: number,
        public name: string,
        public finished: boolean = false,
        public date: string | null = null,
        public priority = 10
    ) {
        
    }

    static Load( raw: any ) {
        if( raw === undefined || raw === null ) {
            throw "Load don't accept undefined or null as parameter";
        }

        if( isRawStep(raw) ) {
            const step = new Step(
                raw.id,
                raw.task_id,
                raw.name,
                raw.finished,
                raw.date,
                raw.priority,
            );

            useTodoStore().stepMap[ raw.id ] = step;

            return step;
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
                        adapter.setStepProp( this.id, "date", null).then( affecting => {
                            this.date = null;

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[id];

                                if( folder instanceof Folder ) {
                                    splice( folder.plans, this );
                                }
                            });
                        });
                    } else {
                        adapter.setStepProp( this.id, "date", getTodayString()).then( affecting => {
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
                    adapter.setStepProp( this.id, "date", getTomorrowString()).then( () => {
                        this.date = getTomorrowString();
                    });
                }
            },
            {
                name: "Remove Step",
                action: () => {
                    adapter.removeStep( this.id ).then( () => {
                        todoStore.removeStep( this );
                    });
                }
            }
        ]);
    }
}
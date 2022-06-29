import {options} from "./options";
import {nullFunc} from "./utils";
import {ListUtils} from "./ListUtils";

export class TaskUtils {
    static Create(name: string, list_name: string, afterFocus: Function = nullFunc) {
        ListUtils
            .Create( list_name )
            .FocusFirst();

        /**
         * After Focus Hook
         */
        afterFocus();

        /**
         * Add New task
         */
        cy.get( options.id.tasksContainer )
            .get( ".add-new-input" )
            .type( name )
            .type("{enter}")

        return TaskUtils;
    }

    static getContainer() {
        return cy.get( options.id.tasksContainer );
    }

    static GetFirst() {
        return TaskUtils
            .getContainer()
            .get(options.id.taskItem )
            .first();
    }

    static LengthIs( len: number ) {
        return cy.get( options.id.tasksContainer )
            .get( options.id.taskItem )
            .should("have.length", len )
    }
}


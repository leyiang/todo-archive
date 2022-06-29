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
    }

    static LengthIs( len: number ) {
        return cy.get( options.id.tasksContainer )
            .get( options.id.taskItem )
            .should("have.length", 0)
    }
}


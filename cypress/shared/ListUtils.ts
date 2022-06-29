import {options} from "./options";

export class ListUtils {
    static Create(name: string) {
        cy
            .get("aside input")
            .type( name )
            .type("{enter}");

        return ListUtils;
    }

    static FocusFirst() {
        return cy.get("aside")
            .find( options.id.taskListItem )
            .first()
            .click();
    }

    static LengthIs( len = 1, from=".userList" ) {
        return cy.get("aside " + from)
            .find(options.id.taskListItem)
            .should("have.length", len);
    }
}

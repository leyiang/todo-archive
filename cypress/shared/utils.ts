import {options} from "./globals";
import {taskHelpers} from "./helpers/TaskHelper";

export function resetEnv() {
    indexedDB.deleteDatabase( options.db.name );
    cy.visit('/')
    taskHelpers.reset();
}

export function get( name: string ) {
    //@ts-ignore, cy will be injected
    return cy.get(`[data-test='${ name }']`);
}
import {options} from "./globals";

export function flushEnv() {
    indexedDB.deleteDatabase( options.db.name );
    cy.visit('/')
}

export function get( name: string ) {
    //@ts-ignore, cy will be injected
    return cy.get(`[data-test='${ name }']`);
}
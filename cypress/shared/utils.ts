import {options} from "./options";

export const nullFunc = () => {}

export function clear() {
    /**
     * Clear IndexDB
     */
    indexedDB.deleteDatabase(options.id.db);

    /**
     * Visit The app
     * to initialize the database
     */
    cy.visit('/')
}

export function randomName( prefix:string ) {
    return prefix + "_" + Math.random().toFixed(4);
}

/**
 * Check immediate and after reload
 */
export function checkTwice( check: Function ) {
    check();
    cy.reload();
    check();
}

/**
 * This will always being rejected
 * Work as a placeholder for future test
 */
export function placeholder() {
    expect("Test placeholder")
        .to
        .be
        .a("You need to complete this");
}
export function emptyInputAfterEnter( inputChain: Cypress.Chainable, triggerEnter: (name: string) => void ) {
    triggerEnter("name");
    inputChain.should("have.value", "");

    triggerEnter("    ");
    inputChain.should("have.value", "");
}

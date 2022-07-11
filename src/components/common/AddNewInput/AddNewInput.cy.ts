import { mount } from 'cypress/vue'
import AddNewInput from './AddNewInput.vue'

describe('<Stepper>', () => {
    it('is visible', () => {
        mount( AddNewInput );

        const action = ( content: string ) => {
            cy.get("input")
                .click()
                .type(content)
                .type("{enter}")
                .should("have.value", "");
        }

        action("Name");
        action("     ");
    });
});
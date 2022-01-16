describe('renders the home page', () => {

    it('renders correclty', () => {
        cy.visit('/');
        cy.get('.home').should('exist');
    });

})

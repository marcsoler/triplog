
export const testUser = {
    firstName: 'Super',
    lastName: 'Tester',
    email: 'super@tester.dev',
    password: 'testing'
}

describe('tests admin powers', () => {

    before(() => {
        cy.login(testUser.email, testUser.password);
        cy.wait(500);
    });

    beforeEach(() => {
        cy.visit('/dashboard');
        cy.wait(500);
    });

    after(() => {
        cy.logout();
        cy.clearLocalStorage();
        cy.wait(2500);
    });

    it('can view the dashboard', () => {
        cy.get('.dashboard').should('exist');
        cy.get('.dashboard > h1:first-of-type').contains('Dashboard');
    });

    it('can use the trip planner', () => {

        cy.get('#createTripButton').click();
        cy.get('#planner-map').should('exist');
        cy.wait(5000); //google maps needs to load
        cy.get('#planner-map').click('center');
        cy.wait(1500);
        cy.get('#planner-map').click(500, 400);
        cy.wait(1500);

    });

    it('should not be allowed to create a route outside land', () => {
        cy.get('#createTripButton').click();
        cy.get('#planner-map').should('exist');
        cy.wait(5000); //google maps needs to load
        cy.get('#planner-map').click('left');
        cy.wait(1500);

        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('.modal > .modal-dialog > .modal-content .modal-body').contains('The location you clicked has no nearby road. Try again.');
        cy.get('.modal').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');

    });


});

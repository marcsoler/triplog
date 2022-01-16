const testText = 'Just a test';

export const testUser = {
    firstName: 'Test',
    lastName: 'Tester',
    email: 'dont@delete.dev',
    password: 'testing'
}


describe('tests the comments module', () => {

    before(() => {
        cy.logout();
        cy.wait(500);
    });

    beforeEach(() => {
        cy.visit('/');
        cy.get('.last-post a.btn.btn-primary').click();
        cy.wait(2500);
    });

    it('writes an anonymous comment', () => {

        cy.get('#text').type(testText);
        cy.get('form > .btn.btn-primary').click();
        cy.intercept({
            method: 'get',
            url: 'https://firestore.googleapis.com*',
        }).as('fetchFirestore');
        cy.get('.comments .comment:last-of-type').should('exist');
        cy.wait(2500);
        cy.get('.comments .comment:last-of-type .comment-name').contains(`Anonymous`);
        cy.get('.comments .comment:last-of-type .comment-text').contains(`This comment hasn't been approved yet. Click to view.`);

    });

    it('anonymous reaction triggers auth modal', () => {


        cy.get('#text').type(testText);
        cy.get('form > .btn.btn-primary').click();
        cy.intercept({
            method: 'get',
            url: 'https://firestore.googleapis.com*',
        }).as('fetchFirestore');
        cy.wait(500);
        cy.get('.comments .comment:last-of-type .reactions > button.btn').click();

        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('.modal').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');

    });

    it('user can comment', () => {
        cy.login(testUser.email, testUser.password);
        cy.wait(2500);

        cy.get('#text').type(testText);
        cy.get('form > .btn.btn-primary').click();
        cy.intercept({
            method: 'get',
            url: 'https://firestore.googleapis.com*',
        }).as('fetchFirestore');
        cy.get('.comments .comment:last-of-type').should('exist');
        cy.wait(500);
        cy.get('.comments .comment:last-of-type .comment-name').contains(testUser.firstName);
        cy.get('.comments .comment:last-of-type .comment-text').contains('Just a test');
    });

})

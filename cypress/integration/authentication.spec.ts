
export const testUser = {
    firstName: 'Test',
    lastName: 'Tester',
    email: 'test@tester.dev',
    password: 'testing'
}


describe('tests the authentication module', () => {

    before(() => {
        //cy.task('delete:account');
        cy.clearLocalStorage();
        cy.logout();
    })
    after(() => {
        cy.deleteTestUser(testUser.email);
    });

    it('allows the auth modal to be opened and closed', () => {
        cy.visit('/');
        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
        cy.get('#navbar-nav .btn.btn-link').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('.modal').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
    });

    it('disallow logging in an inexistent email', () => {
        cy.visit('/');
        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
        cy.get('#navbar-nav .btn.btn-link').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('#auth-tabs-tab-login').click();
        cy.get('#auth-tabs-tab-login').should('have.class', 'active');

        cy.get('#loginEmail').clear();
        cy.get('#loginEmail').type(testUser.email);
        cy.get('#loginPassword').clear();
        cy.get('#loginPassword').type(testUser.password);
        cy.get('.modal > .modal-dialog button[type="submit"]').contains("Login").click();
        cy.get('#auth-tabs-tabpane-login > form > .fade.alert-danger').should('be.visible').contains('The e-mail address or password you have entered is invalid.');
        //cy.get('#auth-tabs-tabpane-login > form > .fade.alert-danger').contains('The e-mail address or password you have entered is invalid.');
    });

    it('should warn that the password confirmation failed', () => {
        cy.visit('/');

        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
        cy.get('#navbar-nav .btn.btn-link').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('#auth-tabs-tab-register').click();
        cy.get('#auth-tabs-tab-register').should('have.class', 'active');

        cy.get('#registerFirstname').clear().type('Test');
        cy.get('#registerLastname').clear().type('Tester');
        cy.get('#registerEmail').clear().type(testUser.email);
        cy.get('#registerPassword').clear().type(testUser.password);
        cy.get('#registerPasswordConfirmation').clear().type('something_different');

        cy.get('.modal > .modal-dialog button[type="submit"]:contains("Sign up")').click();

        cy.get('#registerPasswordConfirmation + .form-validation-failed').should('be.visible').contains('Those passwords didn’t match. Try again.');
    });

    /*
    it('should allow to create a new account', () => {
        cy.visit('/');

        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
        cy.get('#navbar-nav .btn.btn-link').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('#auth-tabs-tab-register').click();
        cy.get('#auth-tabs-tab-register').should('have.class', 'active');

        cy.get('#registerFirstname').clear().type(testUser.firstName);
        cy.get('#registerLastname').clear().type(testUser.lastName);
        cy.get('#registerEmail').clear().type(testUser.email);
        cy.get('#registerPassword').clear().type(testUser.password);
        cy.get('#registerPasswordConfirmation').clear().type(testUser.password);

        cy.get('.modal > .modal-dialog button[type="submit"]:contains("Sign up")').click();

        cy.get('#auth-tabs-tabpane-register > .alert.alert-success').should('be.visible');
        cy.get('#auth-tabs-tabpane-register > .alert.alert-success').contains('Your account has been created!');


        cy.get('.modal').click();

        cy.get('#navbar-nav .navbar-nav a[role="button"]').should('be.visible');
        cy.get('#navbar-nav .navbar-nav a[role="button"]').contains('Test');
    });

    it('allows to logout', () => {
        cy.visit('/');
        cy.get('#navbar-nav .dropdown-toggle').click();
        //cy.get('#navbar-nav .dropdown-toggle a[role="button"]').click();
    });

     */

    /*
    it('allows to login', () => {
        cy.visit('/');
        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
        cy.get('#navbar-nav .btn.btn-link').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('#auth-tabs-tab-login').click();
        cy.get('#auth-tabs-tab-login').should('have.class', 'active');

        cy.get('#loginEmail').clear();
        cy.get('#loginEmail').type(testUser.email);
        cy.get('#loginPassword').clear();
        cy.get('#loginPassword').type(testUser.password);
        cy.get('.modal > .modal-dialog button[type="submit"]').contains("Login").click();

        cy.get('.modal').click();

        cy.get('#navbar-nav .navbar-nav a').should('be.visible');
        cy.get('#navbar-nav .navbar-nav .dropdown-menu.show').contains('Test').click();

        cy.get('#navbar-nav .btn.btn-link').should('exist');
    });

     */

    /*
    Todo:

    - register an user
        - should return success with correct data
    - login in an user
        - navbar icon should show name with dropdown and logout link

    - logout
        - navbar should reset
    - recover
        - should return success message

    - doent allow to register with same email

     */

});

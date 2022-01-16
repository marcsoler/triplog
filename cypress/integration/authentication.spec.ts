describe('uses the authentication module', () => {

    before(() => {
        cy.task('delete:account');
        cy.clearLocalStorage();
    })

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
        cy.get('#loginEmail').type('non_existent_user@non_existent.com');
        cy.get('#loginPassword').clear();
        cy.get('#loginPassword').type('doesnt_matter');
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
        cy.get('#registerEmail').clear().type('doesntMatther@tester.dev');
        cy.get('#registerPassword').clear().type('doesntMatter');
        cy.get('#registerPasswordConfirmation').clear().type('doesntMatterAndDifferent');

        cy.get('.modal > .modal-dialog button[type="submit"]:contains("Sign up")').click();

        cy.get('#registerPasswordConfirmation + .form-validation-failed').should('be.visible').contains('Those passwords didn’t match. Try again.');
    });

    it('should allow to create a new account', () => {
        cy.visit('/');

        cy.get('.modal > .modal-dialog > .modal-content').should('not.exist');
        cy.get('#navbar-nav .btn.btn-link').click();
        cy.get('.modal > .modal-dialog > .modal-content').should('exist');
        cy.get('#auth-tabs-tab-register').click();
        cy.get('#auth-tabs-tab-register').should('have.class', 'active');

        cy.get('#registerFirstname').clear().type('Test');
        cy.get('#registerLastname').clear().type('Tester');
        cy.get('#registerEmail').clear().type('test@tester.dev');
        cy.get('#registerPassword').clear().type('tester1234');
        cy.get('#registerPasswordConfirmation').clear().type('tester1234');

        cy.get('.modal > .modal-dialog button[type="submit"]:contains("Sign up")').click();

        cy.get('#auth-tabs-tabpane-login > form > .fade.alert-success').should('be.visible').contains('Your account has been created!');

    });

    /*
    Todo:

    - register an user
        - should return error with wrong password ("repeat you password")
        - should return success with correct data
    - login in an user
        - navbar icon should show name with dropdown and logout link

    - logout
        - navbar should reset
    - recover
        - should return success message

    - doent allow to register with same email

     */

})

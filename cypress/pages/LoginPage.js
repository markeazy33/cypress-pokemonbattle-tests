class LoginPage {

  elements = {
    emailInput: () => cy.get('#k_email'),
    passwordInput: () => cy.get('#k_password'),
    submitButton: () => cy.get('button[type="submit"]').first(),
  };

  login(email, password) {
    this.elements.emailInput().clear({ force: true }).type(email, { force: true });
    this.elements.passwordInput().clear({ force: true }).type(password, { force: true });
    this.elements.submitButton().click({ force: true });
  }

}

export default new LoginPage();
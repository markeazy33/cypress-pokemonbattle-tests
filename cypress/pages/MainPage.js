class MainPage {

  elements = {
    heading: () => cy.get('h1').first(),
  };

  verifyMainPageLoaded() {
    this.elements.heading().should('contain.text', 'Покемоны');
  }

  goToProfile() {
    cy.visit('/trainer/63551/');
  }

}

export default new MainPage();
class ProfilePage {

  elements = {
    avatar: () => cy.get('.single_page_body_avatar_img').first(),
    changeAvatarButton: () => cy.get('[data-qa="shop"]').first(),
  };

  verifyProfileLoaded() {
    this.elements.avatar().should('be.visible');
  }

  goToShop() {
    this.elements.changeAvatarButton().click();
  }

}

export default new ProfilePage();
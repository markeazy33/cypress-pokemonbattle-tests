class ShopPage {

  elements = {
    heading: () => cy.get('h1').first(),
    availableAvatars: () => cy.get('.shop__item.available'),
    buyButton: () => cy.get('.shop__item.available').first().find('button'),
    avatarImage: () => cy.get('.shop__item.available').first().find('.shop__img'),
    price: () => cy.get('.shop__item.available').first().find('.shop__price'),
  };

  verifyShopLoaded() {
    this.elements.heading().should('contain.text', 'Магазин');
  }

  getFirstAvatarSrc() {
    return this.elements.avatarImage().invoke('attr', 'src');
  }

  clickBuyButton() {
    this.elements.buyButton().click();
  }

}

export default new ShopPage();
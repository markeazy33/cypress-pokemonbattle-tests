class PaymentPage {

  elements = {
    cardNumber: () => cy.get('.card_number').first(),
    cardDate: () => cy.get('.card_date').first(),
    cardCvv: () => cy.get('.card_csv').first(),
    cardName: () => cy.get('.card_name').first(),
    
    payButton: () => cy.contains('button', 'Оплатить'),
    
    successBlock: () => cy.get('.payment_form_card_form.payment_success').first(),
    successMessage: () => cy.contains('Покупка прошла успешно'),
    
    errorBlock: () => cy.get('.payment_form_card_form.payment_mistake').first(),
    errorMessage: () => cy.contains('При оплате произошла ошибка'),
    
    threedsTitle: () => cy.contains('Подтверждение покупки'),
    smsInput: () => cy.get('.threeds_number').first(),
    smsSubmitButton: () => cy.contains('button', 'Оплатить'),
    
    smsError: () => cy.contains('Не совпадает с отправленным кодом'),
    
    backToShopButton: () => cy.contains('Вернуться в магазин'),
  };

  fillCardData(cardNumber, cardDate, cardCvv, cardName) {
    this.elements.cardNumber().clear().type(cardNumber);
    this.elements.cardDate().clear().type(cardDate);
    this.elements.cardCvv().clear().type(cardCvv);
    this.elements.cardName().clear().type(cardName);
  }

  clickPay() {
    this.elements.payButton().click();
  }

  verifySuccess() {
    this.elements.successBlock().should('be.visible');
    this.elements.successMessage().should('be.visible');
  }

  verifyError() {
    this.elements.errorBlock().should('be.visible');
    this.elements.errorMessage().should('be.visible');
  }

  verifyThreedsPage() {
    this.elements.threedsTitle().should('be.visible');
  }

  confirmSms(code) {
    this.elements.smsInput().clear().type(code);
    this.elements.smsSubmitButton().click();
  }

  verifySmsError() {
    this.elements.smsError().should('be.visible');
  }

  backToShop() {
    this.elements.backToShopButton().click();
  }

}

export default new PaymentPage();
import testData from '../fixtures/testData.json';

import loginPage from '../pages/LoginPage';
import mainPage from '../pages/MainPage';
import profilePage from '../pages/ProfilePage';
import shopPage from '../pages/ShopPage';
import paymentPage from '../pages/PaymentPage';

describe('E2E: Покупка аватара для тренера', () => {

 beforeEach(() => {
    cy.log('Подготовка: авторизация и переход в магазин');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/login');
    loginPage.login(testData.email, testData.password);
    mainPage.verifyMainPageLoaded();
    mainPage.goToProfile();
    profilePage.verifyProfileLoaded();
    profilePage.goToShop();
    shopPage.verifyShopLoaded();
});

  it('Успешная покупка первого доступного аватара', () => {
    
    cy.log('Шаг 1: Запоминаем картинку аватара');
    let purchasedAvatarSrc;

    shopPage.getFirstAvatarSrc().then((src) => {
      purchasedAvatarSrc = src;
      cy.log(`Картинка: ${src}`);

      cy.log('Шаг 2: Переход к оплате');
      shopPage.clickBuyButton();
      
      cy.log('Шаг 3: Заполнение карты');
      paymentPage.fillCardData(
        testData.validCard.number,
        testData.validCard.date,
        testData.validCard.cvv,
        testData.cardName
      );
      paymentPage.clickPay();
      
      cy.log('Шаг 4: Подтверждение по SMS');
      paymentPage.verifyThreedsPage();
      paymentPage.confirmSms(testData.smsCode);
      
      cy.log('Шаг 5: Проверка успешной покупки');
      paymentPage.verifySuccess();
      
      cy.log('Шаг 6: Возврат в магазин');
      paymentPage.backToShop();
      shopPage.verifyShopLoaded();
      
      cy.log('Шаг 7: Проверка аватара в профиле');
      mainPage.goToProfile();
      profilePage.verifyProfileLoaded();
      cy.get('.single_page_body_avatar_img')
        .should('have.attr', 'src', purchasedAvatarSrc);
    });
});

  it('Ошибка оплаты: недостаточно средств', () => {
    cy.log('Шаг 1: Переход к оплате');
    shopPage.clickBuyButton();
    
    cy.log('Шаг 2: Заполнение карты с CVV 300');
    paymentPage.fillCardData(
      testData.invalidCard.number,
      testData.invalidCard.date,
      testData.invalidCard.cvv,
      testData.cardName
    );
    paymentPage.clickPay();
    
    cy.log('Шаг 3: Подтверждение по SMS');
    paymentPage.verifyThreedsPage();
    paymentPage.confirmSms(testData.smsCode);
    
    cy.log('Шаг 4: Проверка ошибки');
    paymentPage.verifyError();
  });

  it('Ошибка подтверждения: неверный код из SMS', () => {
    cy.log('Шаг 1: Переход к оплате');
    shopPage.clickBuyButton();
    
    cy.log('Шаг 2: Заполнение карты');
    paymentPage.fillCardData(
      testData.validCard.number,
      testData.validCard.date,
      testData.validCard.cvv,
      testData.cardName
    );
    paymentPage.clickPay();
    
    cy.log('Шаг 3: Проверка 3DS');
    paymentPage.verifyThreedsPage();
    
    cy.log('Шаг 4: Неверный SMS-код');
    paymentPage.confirmSms(testData.invalidSmsCode);
    
    cy.log('Шаг 5: Проверка ошибки');
    paymentPage.verifySmsError();
  });

});
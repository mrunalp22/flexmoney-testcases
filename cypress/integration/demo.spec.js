/// <reference types="cypress" />

const DUMMY_NUM = 454564
const PHONE_NUM = 9988998899
const BASE_URL = "https://staging.instacred.me/simulation/tpsl/e2e-transaction.jsp"
const getElement = (identifier) => cy.get(identifier)


context('flexmoney_testcases', () => {
    beforeEach(() => {
      cy.visit(BASE_URL)
    })
  
    // https://on.cypress.io/interacting-with-elementss
     describe('Screen1To3', () => {

      it("To verify after entering the invalid number, screen 2 will open and able to perform further steps to complete the payment ", () => {
        getElement('#CI').type(DUMMY_NUM)
        getElement('input#CI').should('have.value', DUMMY_NUM)
        getElement('#continueBtn').click()
        cy.url().should('include', '/enter-mobile')
        getElement('#payment-enter-mobile').type(PHONE_NUM)
        getElement('#submitButton').click()
        getElement('#purchase-amount').contains('10,000')
        getElement('#1001010').click()
        getElement('#submitButton').click()
      })

      it("To verify after entering the correct phone number select EMI screen will open", () => {
        getElement('#CI').type(PHONE_NUM)
        getElement('#continueBtn').click()
        cy.url().should('include', '/emi-selection')
      })

      it("To verify radio button selection",() => {
        getElement('#CI').type(PHONE_NUM)
        getElement('#continueBtn').click()
        getElement('#1001010').click()
        getElement('#1001011').click()
        getElement('#1001012').click()
        getElement('#1001013').click()
      })
      it("To verify the cancel subscription functionality", () => {
        getElement('#CI').type(DUMMY_NUM)
        getElement('input#CI').should('have.value', DUMMY_NUM)
        getElement('#continueBtn').click()
        getElement('.font14.text60.text-center.text-underline.cursorPointer.cancelLink__2bfPV').click()
        getElement('#submitButton').contains("Continue with transaction")
        getElement('.font14.text80.text-center.text-underline.cursorPointer').click()
        cy.url().should('include','/transaction-complete-page.jsp')
      })
    })
    
  })
  
/// <reference types="cypress" />

describe('Product Manager App', () => {
  it('executes the whole workflow', () => {
    cy.visit('http://localhost:4200/');
    cy.get('header button').should('be.disabled');
    cy.get('.cdk-overlay-container').should('not.exist');
    cy.get('header .search__input').click().type('First fake search');
    cy.get('header .search').submit();
    cy.location('search').should('include', '?page=1');
    cy.get('mat-spinner').should('be.visible');
    cy.get('.products__list', { timeout: 5000 }).should('be.visible');
    cy.get('main .search__input').click().type('Second fake search');
    cy.get('main .search').submit();
    cy.get('mat-spinner').should('be.visible');
    cy.get('.products__list', { timeout: 5000 }).should('be.visible');
    cy.get('.products__list li').should('have.length', 5);
    cy.get('mat-card-title').first().should('have.text', 'Barbacoa ');
    cy.contains('Sort by').siblings().select('email');
    cy.get('mat-card-title').first().should('have.text', 'Cámara réflex ');
    cy.contains('Sort by').siblings().select('description');
    cy.get('mat-card-title').first().should('have.text', 'Piso en Clot ');
    cy.get('.products__list__item:nth-child(3) .mat-icon').click();
    cy.get('header button').should('be.enabled');
    cy.get('.products__list__item:nth-child(4) .mat-icon').click();
    cy.get('.products__list__pagination__next').click();
    cy.location('search').should('include', '?page=2');
    cy.get('.products__list__item:nth-child(1) .mat-icon').click();
    cy.get('.products__list__item:nth-child(2) .mat-icon').click();
    cy.get('.products__list__pagination__next').click();
    cy.location('search').should('include', '?page=3');
    cy.get('.products__list__item:nth-child(5) .mat-icon').click();
    cy.get('.products__list__pagination__next').click();
    cy.location('search').should('include', '?page=4');
    cy.get('.products__list__item:nth-child(1) .mat-icon').click();
    cy.get('.products__list__item:nth-child(2) .mat-icon').click();
    cy.get('.products__list__item:nth-child(3) .mat-icon').click();
    cy.get('.products__list__pagination__next').should('be.disabled');
    cy.get('header button').click();
    cy.get('.cdk-overlay-container', { timeout: 1000 }).should('be.visible');
    const dialogSelector =
      '.cdk-overlay-container .cdk-global-overlay-wrapper .cdk-overlay-pane .cdk-dialog-container .mdc-dialog__container .mdc-dialog__surface';
    cy.get(`${dialogSelector} .cdk-virtual-scroll-content-wrapper li`).should('have.length', 8);
    cy.get(`${dialogSelector} .cdk-virtual-scroll-content-wrapper li mat-card-title`)
      .first()
      .should('have.contain', 'Cascos ');
    cy.get(`${dialogSelector} .cdk-virtual-scroll-content-wrapper li mat-card-title .remove`)
      .first()
      .click();
    cy.get(`${dialogSelector} .cdk-virtual-scroll-content-wrapper li mat-card-title`)
      .first()
      .should('have.contain', 'Coche antiguo americano ');
    for (let i = 0; i < 7; i++) {
      cy.get(`${dialogSelector} .cdk-virtual-scroll-content-wrapper li mat-card-title .remove`)
        .last()
        .click();
    }
    cy.get('.cdk-overlay-container').should('not.be.visible');
  });
});

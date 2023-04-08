describe('The Auth pages', () => {
  const username = `cypress-${Math.random().toString().slice(2, -11)}`;
  const password = 'password123';

  it('0100:01-register a new user', () => {
    cy.visit('/signup');
    cy.findByRole('textbox', { name: /first name/i }).type('Foo');
    cy.findByRole('textbox', { name: /last name/i }).type('Baz');
    cy.findByRole('textbox', { name: /username/i }).type(username);
    cy.findByRole('textbox', { name: /email address/i }).type(
      `${username}@fakemail.com`,
    );
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole('button', { name: /create my account/i }).click();
    // Check if authenticated user is redirected to profile page
    cy.location('href').should('match', /profile$/);
  });

  it('0100:02-login an existing user', () => {
    cy.visit('/login');
    cy.findByRole('textbox', { name: /username/i }).type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole('button', { name: /log in/i }).click();
    // Check if authenticated user is redirected to profile page
    cy.location('href').should('match', /profile$/);
  });
});

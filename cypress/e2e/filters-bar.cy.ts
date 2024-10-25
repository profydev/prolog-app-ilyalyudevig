describe("FiltersBar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/issues");
  });

  it("applies filters correctly", () => {
    // select status filter
    cy.get(`div[data-testid="dropdown"]`).eq(0).click();
    cy.get(`div[data-testid="dropdown"]`).eq(0).find("ul li:first").click();

    // // select level filter
    cy.get(`div[data-testid="dropdown"]`).eq(1).click();
    cy.get(`div[data-testid="dropdown"]`).eq(1).find("ul li:first").click();

    // // enter project filter
    cy.get(`div[data-testid="input"] > input`).type("backend");

    // check that filters were applied correctly
    cy.url().should("include", "status=resolved");
    cy.url().should("include", "level=info");
    cy.url().should("include", "project=backend");
  });
});

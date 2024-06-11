describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  it("renders the footer", () => {
    cy.get("footer").should("be.visible");
    cy.get("footer").find("a").should("have.length", 4);
    cy.get("footer")
      .find("img")
      .should("have.attr", "src", "/icons/logo-small.svg");
  });
});

import mockProjects from "../fixtures/projects.json";

describe("Alert", () => {
  beforeEach(() => {
    cy.intercept(
      { url: "https://prolog-api.profy.dev/project" },
      {
        statusCode: 500,
      },
    );

    cy.visit("http://localhost:3000/dashboard");
  });

  it("renders alert component when request fails", () => {
    cy.get("main")
      .find("p", { timeout: 15000 })
      .contains("There was a problem while loading the projects data")
      .should("be.visible");
  });

  it("renders project cards after clicking 'Try again' button", () => {
    cy.get("main")
      .find("button", { timeout: 15000 })
      .contains("Try again")
      .click();

    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      statusCode: 200,
      body: mockProjects,
    }).as("successfulRequest");

    cy.wait("@successfulRequest");

    cy.get("main").find("li").should("have.length", "3");
  });
});

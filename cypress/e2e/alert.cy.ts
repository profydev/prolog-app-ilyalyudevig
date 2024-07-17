import mockProjects from "../fixtures/projects.json";

describe("Alert", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");

    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      forceNetworkError: true,
    }).as("failRequest");

    cy.reload();

    cy.wait("@failRequest");
    cy.wait(5000);
  });

  it("renders alert component when request fails", () => {
    cy.get("main")
      .find("p")
      .contains("There was a problem while loading the projects data")
      .should("be.visible");
  });

  it("renders project cards after clicking 'Try again' button", () => {
    cy.get("button").contains("Try again").click();

    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      statusCode: 200,
      body: mockProjects,
    }).as("getProjects");

    cy.wait("@getProjects");

    cy.get("main").find("li").should("have.length", mockProjects.length);
  });
});

import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("should show loader while API request is pending", () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
        req.on("response", (res) => {
          res.setDelay(2000);
        });
      }).as("projectsRequest");

      cy.visit("http://localhost:3000/dashboard");

      cy.get('img[src="/icons/loading-circle.svg"][alt="loading"]').should(
        "be.visible",
      );

      cy.wait("@projectsRequest");

      cy.get('img[src="/icons/loading-circle.svg"][alt="loading"]').should(
        "not.exist",
      );
    });

    it("renders the projects", () => {
      const statusNames = ["Critical", "Warning", "Stable"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(mockProjects[index].language, {
            matchCase: false,
          });
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(statusNames[index]);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href")
            .and(
              "contains",
              "/dashboard/issues?project=".concat(
                mockProjects[index].name.match(/^[^\s]+/)?.[0] as string,
              ),
            );
        });
    });
  });
});

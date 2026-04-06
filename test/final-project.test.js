import { html, fixture, expect } from '@open-wc/testing';
import "../final-project.js";

describe("FinalProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <final-project
        title="title"
      ></final-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

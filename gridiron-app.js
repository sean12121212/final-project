/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./gridiron-header.js";
import "./gridiron-hero.js";
import "./gridiron-program-card.js";
import "./gridiron-stats-counter.js";
import "./gridiron-schedule-band.js";
import "./gridiron-news-card.js";
import "./gridiron-sponsor-bar.js";
import "./gridiron-coach-card.js";
import "./gridiron-footer.js";

/**
 * `gridiron-app`
 * 
 * @demo index.html
 * @element gridiron-app
 */
export class GridironApp extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-app";
  }

  constructor() {
    super();
    this.page = this._getPageFromURL();
    window.addEventListener("popstate", () => {
      this.page = this._getPageFromURL();
    });
    window.addEventListener("gridiron-navigate", (e) => {
      this._navigate(e.detail.path);
    });
  }

  static get properties() {
    return {
      ...super.properties,
      page: { type: String, reflect: true },
    };
  }

  _getPageFromURL() {
    const path = window.location.pathname.replace(/^\//, "") || "home";
    const valid = ["home", "schedule", "programs", "parent-info"];
    return valid.includes(path) ? path : "home";
  }

  _navigate(path) {
    window.history.pushState({}, "", path);
    this.page = this._getPageFromURL();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100vh;
          background-color: var(--ddd-theme-default-white);
          font-family: var(--ddd-font-navigation);
        }
        main {
          min-height: 60vh;
        }
        .band {
          padding: var(--ddd-spacing-10) var(--ddd-spacing-6);
        }
        .band-dark {
          background-color: var(--ddd-theme-default-nittanyNavy);
        }
        .band-title {
          font-size: var(--ddd-font-size-xl);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-nittanyNavy);
          text-align: center;
          margin: 0 0 var(--ddd-spacing-8) 0;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--ddd-spacing-6);
          max-width: 1200px;
          margin: 0 auto;
        }
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--ddd-spacing-8);
          max-width: 1000px;
          margin: 0 auto;
        }
        .page-header {
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-white);
          padding: var(--ddd-spacing-12) var(--ddd-spacing-6);
          text-align: center;
        }
        .page-header h1 {
          font-size: var(--ddd-font-size-3xl);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0 0 var(--ddd-spacing-3) 0;
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 3px;
        }
        .page-header p {
          font-size: var(--ddd-font-size-m);
          margin: 0;
          opacity: 0.85;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--ddd-spacing-6);
          max-width: 1100px;
          margin: 0 auto;
        }
        .info-block {
          background-color: var(--ddd-theme-default-limestoneMaxLight);
          border-left: 4px solid var(--ddd-theme-default-roarGolden);
          border-radius: var(--ddd-radius-sm);
          padding: var(--ddd-spacing-6);
        }
        .info-block h3 {
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-nittanyNavy);
          margin: 0 0 var(--ddd-spacing-3) 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .info-block p {
          font-size: var(--ddd-font-size-s);
          color: var(--ddd-theme-default-coalyGray);
          margin: 0;
          line-height: 1.6;
        }
      `,
    ];
  }

  _renderHome() {
    return html`
      <gridiron-hero></gridiron-hero>

      <section class="band">
        <h2 class="band-title">Our Programs</h2>
        <div class="card-grid">
          <gridiron-program-card programName="Rookie Ridge" ageGroup="6U–8U" type="Flag Football"
            description="Entry-level flag football focused on fundamentals, fun, and building a love of the game.">
          </gridiron-program-card>
          <gridiron-program-card programName="Iron Pups" ageGroup="10U–12U" type="Tackle"
            description="Introductory contact football. Teamwork, positioning, and player development.">
          </gridiron-program-card>
          <gridiron-program-card programName="Ridge Hawks" ageGroup="14U" type="Varsity Prep"
            description="Competitive play, film study, and college pathway awareness for serious athletes.">
          </gridiron-program-card>
          <gridiron-program-card programName="Iron Elite" ageGroup="16U–18U" type="Travel"
            description="Highest level of competition. Tournament schedule and recruiting exposure.">
          </gridiron-program-card>
        </div>
      </section>

      <section class="band band-dark">
        <div class="stats-row">
          <gridiron-stats-counter count="200" label="Youth Athletes"></gridiron-stats-counter>
          <gridiron-stats-counter count="4" label="Programs"></gridiron-stats-counter>
          <gridiron-stats-counter count="12" label="Coaches"></gridiron-stats-counter>
          <gridiron-stats-counter count="2026" label="Est."></gridiron-stats-counter>
        </div>
      </section>

      <gridiron-schedule-band></gridiron-schedule-band>

      <section class="band">
        <h2 class="band-title">Latest News</h2>
        <div class="card-grid">
          <gridiron-news-card
            headline="Iron Elite 16U Wins Regional Opener"
            date="2026-09-14"
            excerpt="The Iron Elite squad dominated their season debut, setting the tone for a strong year.">
          </gridiron-news-card>
          <gridiron-news-card
            headline="Fall Registration Now Open"
            date="2026-08-01"
            excerpt="Sign-ups are open for all four age groups. Spots are limited — register today.">
          </gridiron-news-card>
          <gridiron-news-card
            headline="New Head Coach Announced for Ridge Hawks"
            date="2026-07-20"
            excerpt="GridIron YFBL welcomes Coach Marcus Webb to lead the 14U Ridge Hawks program.">
          </gridiron-news-card>
        </div>
      </section>

      <gridiron-sponsor-bar></gridiron-sponsor-bar>

      <section class="band">
        <h2 class="band-title">Meet the Coaches</h2>
        <div class="card-grid">
          <gridiron-coach-card name="Marcus Webb" role="Head Coach — Ridge Hawks 14U"
            bio="10 years coaching youth football. Former D3 linebacker at Lock Haven University.">
          </gridiron-coach-card>
          <gridiron-coach-card name="Diane Ortega" role="Head Coach — Iron Elite 16U"
            bio="Certified USA Football coach. Led two state championship programs in five years.">
          </gridiron-coach-card>
          <gridiron-coach-card name="Tony Briscoe" role="Head Coach — Iron Pups 10U"
            bio="Former Penn State club player passionate about developing fundamentals in young athletes.">
          </gridiron-coach-card>
        </div>
      </section>
    `;
  }

  _renderSchedule() {
    return html`
      <section class="page-header">
        <h1>Season Schedule</h1>
        <p>Full 2026 season schedule for all GridIron YFBL teams.</p>
      </section>
      <section class="band">
        <gridiron-schedule-band fullview></gridiron-schedule-band>
      </section>
    `;
  }

  _renderPrograms() {
    return html`
      <section class="page-header">
        <h1>Our Programs</h1>
        <p>GridIron YFBL offers four age-group programs for athletes ages 6–18.</p>
      </section>
      <section class="band">
        <div class="card-grid">
          <gridiron-program-card programName="Rookie Ridge" ageGroup="6U–8U" type="Flag Football"
            description="Entry-level flag football focused on fundamentals, fun, and building a love of the game." expanded>
          </gridiron-program-card>
          <gridiron-program-card programName="Iron Pups" ageGroup="10U–12U" type="Tackle"
            description="Introductory contact football. Teamwork, positioning, and player development." expanded>
          </gridiron-program-card>
          <gridiron-program-card programName="Ridge Hawks" ageGroup="14U" type="Varsity Prep"
            description="Competitive play, film study, and college pathway awareness for serious athletes." expanded>
          </gridiron-program-card>
          <gridiron-program-card programName="Iron Elite" ageGroup="16U–18U" type="Travel"
            description="Highest level of competition. Tournament schedule and recruiting exposure." expanded>
          </gridiron-program-card>
        </div>
      </section>
    `;
  }

  _renderParentInfo() {
    return html`
      <section class="page-header">
        <h1>Parent Information</h1>
        <p>Everything you need to get your athlete started with GridIron YFBL.</p>
      </section>
      <section class="band">
        <div class="info-grid">
          <div class="info-block">
            <h3>Getting Started</h3>
            <p>Register through the online portal. Select the appropriate age group and complete required forms before the season begins.</p>
          </div>
          <div class="info-block">
            <h3>Equipment Guide</h3>
            <p>Flag (6U–8U): league-provided flags and jersey. Tackle (10U+): helmet, shoulder pads, cleats, and mouthguard required.</p>
          </div>
          <div class="info-block">
            <h3>Volunteer Opportunities</h3>
            <p>We rely on parent volunteers for game-day operations, team manager roles, and fundraising events. Sign up during registration.</p>
          </div>
          <div class="info-block">
            <h3>SafeSport Training</h3>
            <p>All coaches and volunteers must complete USA Football SafeSport certification before the season begins.</p>
          </div>
          <div class="info-block">
            <h3>Practice Schedule</h3>
            <p>Practices run Tuesday and Thursday evenings. Games are Saturday mornings. Full schedule in the Schedule section.</p>
          </div>
          <div class="info-block">
            <h3>Contact Us</h3>
            <p>Email info@gridironyfbl.org or reach out to your team manager directly through the team roster page.</p>
          </div>
        </div>
      </section>
    `;
  }

  render() {
    return html`
      <gridiron-header .currentPage="${this.page}"></gridiron-header>
      <main>
        ${this.page === "home" ? this._renderHome() : ""}
        ${this.page === "schedule" ? this._renderSchedule() : ""}
        ${this.page === "programs" ? this._renderPrograms() : ""}
        ${this.page === "parent-info" ? this._renderParentInfo() : ""}
      </main>
      <gridiron-footer></gridiron-footer>
    `;
  }
}

globalThis.customElements.define(GridironApp.tag, GridironApp);
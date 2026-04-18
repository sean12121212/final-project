/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-schedule-band`
 * Loads game schedule from /api/schedule and renders upcoming games.
 * Homepage: horizontal scrolling strip of next 5 games.
 * Schedule page: full table view when `fullview` attribute set.
 *
 * Properties:
 *   fullview {Boolean}   - show full schedule table (schedule page)
 *   games {Array}        - fetched schedule data
 *   loading {Boolean}    - loading state
 *
 * @element gridiron-schedule-band
 */
export class GridironScheduleBand extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-schedule-band";
  }

  constructor() {
    super();
    this.fullview = false;
    this.loading = true;
    this.games = [];
  }

  static get properties() {
    return {
      ...super.properties,
      fullview: { type: Boolean, reflect: true },
      loading: { type: Boolean },
      games: { type: Array },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._fetchSchedule();
  }

  async _fetchSchedule() {
    try {
      // import.meta.url resolves correctly after Rollup build on Vercel
      const url = new URL("./schedule.json", import.meta.url).href;
      const res = await fetch(url);
      if (res.ok) {
        this.games = await res.json();
      } else {
        this.games = this._fallbackData();
      }
    } catch {
      this.games = this._fallbackData();
    } finally {
      this.loading = false;
    }
  }

  _fallbackData() {
    return [
      { id: 1, team: "Iron Elite 16U", opponent: "Westside Warriors", date: "2026-09-12", time: "10:00 AM", location: "Ironridge Stadium", home: true },
      { id: 2, team: "Ridge Hawks 14U", opponent: "Central Falcons", date: "2026-09-13", time: "12:00 PM", location: "Central Field", home: false },
      { id: 3, team: "Iron Pups 10U", opponent: "North Lions", date: "2026-09-14", time: "9:00 AM", location: "Ironridge Stadium", home: true },
      { id: 4, team: "Iron Elite 16U", opponent: "South Thunder", date: "2026-09-19", time: "11:00 AM", location: "Thunder Park", home: false },
      { id: 5, team: "Rookie Ridge 8U", opponent: "East Stars", date: "2026-09-20", time: "9:00 AM", location: "Ironridge Stadium", home: true },
      { id: 6, team: "Ridge Hawks 14U", opponent: "Valley Knights", date: "2026-09-21", time: "1:00 PM", location: "Ironridge Stadium", home: true },
      { id: 7, team: "Iron Elite 16U", opponent: "Riverside Rams", date: "2026-09-26", time: "10:00 AM", location: "Ironridge Stadium", home: true },
    ];
  }

  _formatDate(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  _formatDay(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        /* ── Strip mode (homepage) ── */
        .schedule-strip {
          background-color: var(--ddd-theme-default-potentialMidnight);
          padding: var(--ddd-spacing-6) var(--ddd-spacing-6);
        }
        .strip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--ddd-spacing-5);
        }
        .strip-title {
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
        }
        .view-all-btn {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          background: none;
          border: 1px solid var(--ddd-theme-default-navy60);
          padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          font-weight: var(--ddd-font-weight-bold);
          transition: border-color 0.2s, color 0.2s;
        }
        .view-all-btn:hover {
          border-color: var(--ddd-theme-default-roarGolden);
          color: var(--ddd-theme-default-roarGolden);
        }
        .games-scroll {
          display: flex;
          gap: var(--ddd-spacing-4);
          overflow-x: auto;
          padding-bottom: var(--ddd-spacing-2);
          scrollbar-width: thin;
          scrollbar-color: var(--ddd-theme-default-navy60) transparent;
        }
        .game-chip {
          flex-shrink: 0;
          background-color: var(--ddd-theme-default-navy80);
          border: 1px solid var(--ddd-theme-default-navy60);
          border-radius: var(--ddd-radius-md);
          padding: var(--ddd-spacing-4) var(--ddd-spacing-5);
          min-width: 200px;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2);
        }
        .chip-date {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
        }
        .chip-day {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: var(--ddd-font-weight-bold);
        }
        .chip-date-num {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-limestoneLight);
        }
        .chip-team {
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
          line-height: 1.2;
        }
        .chip-vs {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-slateGray);
          text-transform: uppercase;
        }
        .chip-opponent {
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-limestoneLight);
          line-height: 1.2;
        }
        .home-badge {
          display: inline-block;
          background-color: var(--ddd-theme-default-creekTeal);
          color: var(--ddd-theme-default-white);
          font-size: 9px;
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 2px 6px;
          border-radius: var(--ddd-radius-sm);
          margin-top: var(--ddd-spacing-1);
        }
        .away-badge {
          display: inline-block;
          background-color: var(--ddd-theme-default-slateGray);
          color: var(--ddd-theme-default-white);
          font-size: 9px;
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 2px 6px;
          border-radius: var(--ddd-radius-sm);
          margin-top: var(--ddd-spacing-1);
        }
        /* ── Full table mode (schedule page) ── */
        .schedule-table-wrap {
          max-width: 1100px;
          margin: 0 auto;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--ddd-font-size-s);
        }
        thead th {
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: var(--ddd-font-size-3xs);
          font-weight: var(--ddd-font-weight-bold);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          text-align: left;
        }
        tbody tr:nth-child(even) {
          background-color: var(--ddd-theme-default-limestoneMaxLight);
        }
        tbody tr:hover {
          background-color: var(--ddd-theme-default-roarMaxlight);
        }
        tbody td {
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneGray);
          color: var(--ddd-theme-default-coalyGray);
        }
        .td-team {
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-nittanyNavy);
        }
        .loading {
          color: var(--ddd-theme-default-limestoneLight);
          text-align: center;
          padding: var(--ddd-spacing-8);
          font-size: var(--ddd-font-size-s);
        }
      `,
    ];
  }

  _viewAll() {
    window.dispatchEvent(new CustomEvent("gridiron-navigate", {
      detail: { path: "/schedule" },
      bubbles: true,
      composed: true,
    }));
  }

  _renderStrip() {
    const upcoming = this.games.slice(0, 5);
    return html`
      <div class="schedule-strip">
        <div class="strip-header">
          <h2 class="strip-title">Upcoming Games</h2>
          <button class="view-all-btn" @click="${this._viewAll}">View Full Schedule →</button>
        </div>
        ${this.loading
          ? html`<div class="loading">Loading schedule...</div>`
          : html`
            <div class="games-scroll">
              ${upcoming.map((g) => html`
                <div class="game-chip">
                  <div class="chip-date">
                    <span class="chip-day">${this._formatDay(g.date)}</span>
                    <span class="chip-date-num">${this._formatDate(g.date)}</span>
                  </div>
                  <div class="chip-team">${g.team}</div>
                  <div class="chip-vs">vs</div>
                  <div class="chip-opponent">${g.opponent}</div>
                  <span class="${g.home ? "home-badge" : "away-badge"}">${g.home ? "Home" : "Away"}</span>
                </div>
              `)}
            </div>
          `}
      </div>
    `;
  }

  _renderFullTable() {
    return html`
      <div class="schedule-table-wrap">
        ${this.loading
          ? html`<div class="loading">Loading schedule...</div>`
          : html`
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Team</th>
                  <th>Opponent</th>
                  <th>Location</th>
                  <th>H/A</th>
                </tr>
              </thead>
              <tbody>
                ${this.games.map((g) => html`
                  <tr>
                    <td>${this._formatDay(g.date)} ${this._formatDate(g.date)}</td>
                    <td>${g.time}</td>
                    <td class="td-team">${g.team}</td>
                    <td>${g.opponent}</td>
                    <td>${g.location}</td>
                    <td>
                      <span class="${g.home ? "home-badge" : "away-badge"}">
                        ${g.home ? "Home" : "Away"}
                      </span>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          `}
      </div>
    `;
  }

  render() {
    return this.fullview ? this._renderFullTable() : this._renderStrip();
  }
}

globalThis.customElements.define(GridironScheduleBand.tag, GridironScheduleBand);
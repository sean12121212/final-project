/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-sponsor-bar`
 * 
 * @element gridiron-sponsor-bar
 */
export class GridironSponsorBar extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-sponsor-bar";
  }

  constructor() {
    super();
    // Default sponsor data — replace with real logos/links
    this.sponsors = [
      { name: "USA Football", href: "https://usafootball.com" },
      { name: "Happy Valley Sports", href: "#" },
      { name: "Iron Ridge Auto Group", href: "#" },
      { name: "Centre County Parks & Rec", href: "#" },
      { name: "GridIron Gear Shop", href: "#" },
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      sponsors: { type: Array },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .sponsor-section {
          background-color: var(--ddd-theme-default-limestoneMaxLight);
          border-top: 1px solid var(--ddd-theme-default-limestoneGray);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneGray);
          padding: var(--ddd-spacing-6) var(--ddd-spacing-6);
        }
        .sponsor-label {
          text-align: center;
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-slateGray);
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: var(--ddd-font-weight-bold);
          margin-bottom: var(--ddd-spacing-5);
        }
        .sponsors-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: var(--ddd-spacing-6);
        }
        .sponsor-item {
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
        }
        .sponsor-item:hover {
          opacity: 0.7;
          transform: scale(1.04);
        }
        .sponsor-item img {
          height: 44px;
          width: auto;
          display: block;
          filter: grayscale(100%);
          transition: filter 0.2s;
        }
        .sponsor-item:hover img {
          filter: grayscale(0%);
        }
        /* Text pill fallback when no logo image */
        .sponsor-pill {
          background-color: var(--ddd-theme-default-white);
          border: 1px solid var(--ddd-theme-default-limestoneGray);
          border-radius: var(--ddd-radius-sm);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-5);
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-nittanyNavy);
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        @media (prefers-color-scheme: dark) {
          .sponsor-section { background-color: var(--ddd-theme-default-navy80); border-color: var(--ddd-theme-default-navy60); }
          .sponsor-pill { background-color: var(--ddd-theme-default-potentialMidnight); border-color: var(--ddd-theme-default-navy60); color: var(--ddd-theme-default-limestoneLight); }
        }
        /* Slot for custom sponsor logos via HTML */
        ::slotted(*) {
          display: flex;
          align-items: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="sponsor-section">
        <p class="sponsor-label">Our Partners &amp; Sponsors</p>
        <div class="sponsors-row">
          ${this.sponsors.map((s) => html`
            <a class="sponsor-item" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name}">
              ${s.logo
                ? html`<img src="${s.logo}" alt="${s.name}" />`
                : html`<span class="sponsor-pill">${s.name}</span>`}
            </a>
          `)}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(GridironSponsorBar.tag, GridironSponsorBar);
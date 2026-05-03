/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-hero`
 *
 * @element gridiron-hero
 */
export class GridironHero extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-hero";
  }

  constructor() {
    super();
    this.headline = "Building Tomorrow's Athletes Today";
    this.tagline = "GridIron Youth Football League — Est. 2026. Developing character, discipline, and champions ages 6–18.";
  }

  static get properties() {
    return {
      ...super.properties,
      headline: { type: String },
      tagline: { type: String },
    };
  }

  // Resolve logo path correctly after Rollup build on Vercel
  get _logoUrl() {
    return new URL("./logo.png", import.meta.url).href;
  }

  _navigate(path) {
    window.dispatchEvent(new CustomEvent("gridiron-navigate", {
      detail: { path },
      bubbles: true,
      composed: true,
    }));
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .hero {
          position: relative;
          background-color: var(--ddd-theme-default-nittanyNavy);
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: var(--ddd-spacing-12) var(--ddd-spacing-6) var(--ddd-spacing-12);
        }
        /* Decorative diagonal stripe overlay */
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 40px,
            rgba(201, 168, 76, 0.04) 40px,
            rgba(201, 168, 76, 0.04) 80px
          );
          pointer-events: none;
        }
        /* Gold accent strip on left */
        .hero::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background-color: var(--ddd-theme-default-roarGolden);
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
        }
        .eyebrow {
          display: inline-block;
          background-color: var(--ddd-theme-default-roarGolden);
          color: var(--ddd-theme-default-nittanyNavy);
          font-size: var(--ddd-font-size-3xs);
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 3px;
          padding: var(--ddd-spacing-1) var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-sm);
          margin-bottom: var(--ddd-spacing-5);
        }
        .logo {
          display: block;
          margin: 0 auto var(--ddd-spacing-6);
          height: 140px;
          width: auto;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
        }
        h1 {
          font-size: var(--ddd-font-size-3xl);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
          margin: 0 0 var(--ddd-spacing-4) 0;
          text-transform: uppercase;
          letter-spacing: 2px;
          line-height: 1.15;
        }
        h1 em {
          font-style: normal;
          color: var(--ddd-theme-default-roarGolden);
        }
        .tagline {
          font-size: var(--ddd-font-size-s);
          color: var(--ddd-theme-default-limestoneLight);
          margin: 0 0 var(--ddd-spacing-8) 0;
          line-height: 1.6;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-4);
          justify-content: center;
          margin-bottom: var(--ddd-spacing-10);
        }
        .btn-primary {
          background-color: var(--ddd-theme-default-roarGolden) !important;
          color: #1a2744 !important;
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: var(--ddd-spacing-4) var(--ddd-spacing-8);
          border: 2px solid var(--ddd-theme-default-roarGolden);
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          transition: background-color 0.2s, transform 0.1s;
          text-decoration: none !important;
          display: inline-block;
        }
        .btn-primary:hover {
          background-color: var(--ddd-theme-default-keystoneYellow) !important;
          color: #1a2744 !important;
          transform: translateY(-1px);
        }
        .btn-secondary {
          background-color: transparent;
          color: var(--ddd-theme-default-white) !important;
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: var(--ddd-spacing-4) var(--ddd-spacing-8);
          border: 2px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          transition: border-color 0.2s, color 0.2s, transform 0.1s;
        }
        .btn-secondary:hover {
          border-color: var(--ddd-theme-default-roarGolden);
          color: var(--ddd-theme-default-roarGolden) !important;
          transform: translateY(-1px);
        }
        /* Scroll hint — sits below cta-row, not overlapping */
        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--ddd-spacing-1);
          color: var(--ddd-theme-default-limestoneLight);
          font-size: var(--ddd-font-size-3xs);
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.5;
        }
        .scroll-hint::after {
          content: "";
          display: block;
          width: 1px;
          height: 28px;
          background-color: var(--ddd-theme-default-roarGolden);
          opacity: 0.5;
          animation: scrollPulse 1.6s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.9; transform: scaleY(1.2); }
        }
        @media (max-width: 600px) {
          h1 { font-size: var(--ddd-font-size-xl); }
          .logo { height: 100px; }
          .hero { min-height: 420px; }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="hero">
        <div class="hero-inner">
          <span class="eyebrow">GridIron Youth Football League · Est. 2026</span>
          <img class="logo" src="${this._logoUrl}" alt="GridIron YFBL Logo" />
          <h1>${this.headline.split(" ").map((word, i) =>
            i === 1 ? html`<em>${word}</em> ` : html`${word} `
          )}</h1>
          <p class="tagline">${this.tagline}</p>
          <div class="cta-row">
            <a class="btn-primary" href="#">Register Your Athlete</a>
            <button class="btn-secondary" @click="${() => this._navigate("/programs")}">
              View Programs
            </button>
          </div>
          <div class="scroll-hint">Scroll</div>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(GridironHero.tag, GridironHero);
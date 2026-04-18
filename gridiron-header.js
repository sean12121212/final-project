/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-header`
 * Top navigation bar. Loads menu from lib/menu.json via import.meta.url
 * (JSON Outline Schema). Handles mobile hamburger toggle.
 * Fires gridiron-navigate events for routing.
 *
 * Properties:
 *   currentPage {String} - active page slug, used to highlight nav link
 *   menuOpen {Boolean}   - mobile hamburger state
 *   menuItems {Array}    - nav items loaded from menu.json
 *
 * @element gridiron-header
 */
export class GridironHeader extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-header";
  }

  constructor() {
    super();
    this.currentPage = "home";
    this.menuOpen = false;
    this.menuItems = [];
  }

  static get properties() {
    return {
      ...super.properties,
      currentPage: { type: String },
      menuOpen: { type: Boolean, reflect: true },
      menuItems: { type: Array },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      // new URL + import.meta.url ensures Rollup/Vercel resolves path correctly
      const url = new URL("./menu.json", import.meta.url).href;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.menuItems = data.items || [];
      }
    } catch {
      // Falls back to hardcoded nav links rendered below
    }
  }

  _navigate(path) {
    this.menuOpen = false;
    window.dispatchEvent(new CustomEvent("gridiron-navigate", {
      detail: { path },
      bubbles: true,
      composed: true,
    }));
  }

  _toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: var(--ddd-font-navigation);
        }
        /* Top accent bar */
        .top-bar {
          background-color: var(--ddd-theme-default-roarGolden);
          height: 4px;
          width: 100%;
        }
        nav {
          background-color: var(--ddd-theme-default-nittanyNavy);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-6);
          gap: var(--ddd-spacing-4);
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          cursor: pointer;
          text-decoration: none;
        }
        .logo-area img {
          height: 52px;
          width: auto;
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.1;
        }
        .brand-sub {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-1);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links li a,
        .nav-links li button {
          display: block;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: var(--ddd-radius-sm);
          transition: background-color 0.2s, color 0.2s;
          font-family: var(--ddd-font-navigation);
        }
        .nav-links li a:hover,
        .nav-links li button:hover {
          background-color: var(--ddd-theme-default-navy70);
          color: var(--ddd-theme-default-roarGolden);
        }
        .nav-links li.active a,
        .nav-links li.active button {
          color: var(--ddd-theme-default-roarGolden);
          border-bottom: 2px solid var(--ddd-theme-default-roarGolden);
        }
        .nav-cta {
          background-color: var(--ddd-theme-default-roarGolden) !important;
          color: var(--ddd-theme-default-nittanyNavy) !important;
          border-radius: var(--ddd-radius-sm) !important;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-5) !important;
        }
        .nav-cta:hover {
          background-color: var(--ddd-theme-default-keystoneYellow) !important;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--ddd-spacing-2);
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background-color: var(--ddd-theme-default-roarGolden);
          border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
        }
        :host([menuOpen]) .hamburger span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        :host([menuOpen]) .hamburger span:nth-child(2) {
          opacity: 0;
        }
        :host([menuOpen]) .hamburger span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        /* Mobile drawer */
        .mobile-nav {
          display: none;
          flex-direction: column;
          background-color: var(--ddd-theme-default-navy80);
          padding: var(--ddd-spacing-4) var(--ddd-spacing-6);
          gap: var(--ddd-spacing-2);
        }
        :host([menuOpen]) .mobile-nav {
          display: flex;
        }
        .mobile-nav a,
        .mobile-nav button {
          display: block;
          width: 100%;
          text-align: left;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          background: none;
          border: none;
          border-bottom: 1px solid var(--ddd-theme-default-navy60);
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
        }
        .mobile-nav a:hover,
        .mobile-nav button:hover {
          color: var(--ddd-theme-default-roarGolden);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .brand-text { display: none; }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="top-bar"></div>
      <nav>
        <a class="logo-area" @click="${() => this._navigate("/home")}">
          <img src="./logo.png" alt="GridIron Youth Football League logo" />
          <div class="brand-text">
            <span class="brand-name">GridIron</span>
            <span class="brand-sub">Youth Football League</span>
          </div>
        </a>

        <ul class="nav-links">
          <li class="${this.currentPage === "home" ? "active" : ""}">
            <button @click="${() => this._navigate("/home")}">Home</button>
          </li>
          <li class="${this.currentPage === "programs" ? "active" : ""}">
            <button @click="${() => this._navigate("/programs")}">Programs</button>
          </li>
          <li class="${this.currentPage === "schedule" ? "active" : ""}">
            <button @click="${() => this._navigate("/schedule")}">Schedule</button>
          </li>
          <li class="${this.currentPage === "parent-info" ? "active" : ""}">
            <button @click="${() => this._navigate("/parent-info")}">Parents</button>
          </li>
          <li>
            <a class="nav-cta" href="#">Register Now</a>
          </li>
        </ul>

        <button class="hamburger" @click="${this._toggleMenu}" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div class="mobile-nav">
        <button @click="${() => this._navigate("/home")}">Home</button>
        <button @click="${() => this._navigate("/programs")}">Programs</button>
        <button @click="${() => this._navigate("/schedule")}">Schedule</button>
        <button @click="${() => this._navigate("/parent-info")}">Parents</button>
        <a href="#">Register Now</a>
      </div>
    `;
  }
}

globalThis.customElements.define(GridironHeader.tag, GridironHeader);
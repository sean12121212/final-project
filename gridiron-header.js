/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-header`
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
    this.openDropdown = "";
  }

  static get properties() {
    return {
      ...super.properties,
      currentPage: { type: String },
      menuOpen: { type: Boolean, reflect: true },
      menuItems: { type: Array },
      openDropdown: { type: String },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const res = await fetch("/menu.json");
      if (res.ok) {
        const data = await res.json();
        this.menuItems = data.items || [];
      }
    } catch {
      // Falls back to hardcoded nav links in render()
    }
  }

  // Resolve logo path correctly after Rollup build on Vercel
  get _logoUrl() {
    return new URL("./logo.png", import.meta.url).href;
  }

  _navigate(path) {
    this.menuOpen = false;
    this.openDropdown = "";
    window.dispatchEvent(new CustomEvent("gridiron-navigate", {
      detail: { path },
      bubbles: true,
      composed: true,
    }));
  }

  _toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  _toggleDropdown(id) {
    this.openDropdown = this.openDropdown === id ? "" : id;
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
          background: none;
          border: none;
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
        /* Desktop nav links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-1);
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
        }
        .nav-item {
          position: relative;
        }
        .nav-item button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: var(--ddd-radius-sm);
          transition: background-color 0.2s, color 0.2s;
          font-family: var(--ddd-font-navigation);
        }
        .nav-item button:hover,
        .nav-item.active button {
          background-color: var(--ddd-theme-default-navy70);
          color: var(--ddd-theme-default-roarGolden);
        }
        .nav-item.active button {
          border-bottom: 2px solid var(--ddd-theme-default-roarGolden);
        }
        .arrow {
          font-size: 10px;
          transition: transform 0.2s;
          display: inline-block;
        }
        .nav-item.dropdown-open .arrow {
          transform: rotate(180deg);
        }
        /* Dropdown */
        .dropdown {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: var(--ddd-theme-default-potentialMidnight);
          border: 1px solid var(--ddd-theme-default-navy60);
          border-radius: var(--ddd-radius-sm);
          min-width: 200px;
          z-index: 200;
          box-shadow: var(--ddd-boxShadow-md);
          padding: var(--ddd-spacing-2) 0;
        }
        .nav-item.dropdown-open .dropdown {
          display: block;
        }
        .dropdown button {
          display: block;
          width: 100%;
          text-align: left;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          border-radius: 0;
          transition: background-color 0.15s, color 0.15s;
        }
        .dropdown button:hover {
          background-color: var(--ddd-theme-default-navy70);
          color: var(--ddd-theme-default-roarGolden);
        }
        .nav-cta button {
          background-color: var(--ddd-theme-default-roarGolden) !important;
          color: var(--ddd-theme-default-nittanyNavy) !important;
          border-radius: var(--ddd-radius-sm) !important;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-5) !important;
        }
        .nav-cta button:hover {
          background-color: var(--ddd-theme-default-keystoneYellow) !important;
        }
        /* Hamburger */
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
        :host([menuOpen]) .hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        :host([menuOpen]) .hamburger span:nth-child(2) { opacity: 0; }
        :host([menuOpen]) .hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        /* Mobile drawer */
        .mobile-nav {
          display: none;
          flex-direction: column;
          background-color: var(--ddd-theme-default-navy80);
          padding: var(--ddd-spacing-2) 0;
        }
        :host([menuOpen]) .mobile-nav {
          display: flex;
        }
        .mobile-nav-item {
          border-bottom: 1px solid var(--ddd-theme-default-navy60);
        }
        .mobile-nav-item button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-6);
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          transition: color 0.2s;
        }
        .mobile-nav-item button:hover {
          color: var(--ddd-theme-default-roarGolden);
        }
        .mobile-children {
          display: none;
          flex-direction: column;
          background-color: var(--ddd-theme-default-potentialMidnight);
        }
        .mobile-nav-item.open .mobile-children {
          display: flex;
        }
        .mobile-children button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-10);
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-limestoneLight);
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: var(--ddd-font-weight-bold);
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          border-bottom: 1px solid var(--ddd-theme-default-navy60);
        }
        .mobile-children button:hover {
          color: var(--ddd-theme-default-roarGolden);
          opacity: 1;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .brand-text { display: none; }
        }
        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          nav { background-color: var(--ddd-theme-default-potentialMidnight); }
          .mobile-nav { background-color: var(--ddd-theme-default-potentialMidnight); }
        }
      `,
    ];
  }

  // Fallback static nav if API hasn't loaded yet
  _staticNavItems() {
    return [
      { id: "home", title: "Home", slug: "/home", children: [] },
      { id: "programs", title: "Programs", slug: "/programs", children: [
        { id: "rookie", title: "Rookie Ridge (6U–8U)", slug: "/programs" },
        { id: "pups", title: "Iron Pups (10U–12U)", slug: "/programs" },
        { id: "hawks", title: "Ridge Hawks (14U)", slug: "/programs" },
        { id: "elite", title: "Iron Elite (16U–18U)", slug: "/programs" },
      ]},
      { id: "schedule", title: "Schedule", slug: "/schedule", children: [] },
      { id: "parent-info", title: "Parents", slug: "/parent-info", children: [
        { id: "started", title: "Getting Started", slug: "/parent-info" },
        { id: "equipment", title: "Equipment Guide", slug: "/parent-info" },
        { id: "volunteer", title: "Volunteer", slug: "/parent-info" },
      ]},
      { id: "register", title: "Register Now", slug: "#", children: [], cta: true },
    ];
  }

  render() {
    const items = this.menuItems.length > 0 ? this.menuItems : this._staticNavItems();

    return html`
      <div class="top-bar"></div>
      <nav>
        <button class="logo-area" @click="${() => this._navigate("/home")}">
          <img src="${this._logoUrl}" alt="GridIron Youth Football League logo" />
          <div class="brand-text">
            <span class="brand-name">GridIron</span>
            <span class="brand-sub">Youth Football League</span>
          </div>
        </button>

        <ul class="nav-links">
          ${items.map((item) => html`
            <li class="nav-item ${item.cta ? "nav-cta" : ""} ${this.currentPage === item.id ? "active" : ""} ${this.openDropdown === item.id ? "dropdown-open" : ""}">
              <button @click="${() => item.children && item.children.length > 0
                ? this._toggleDropdown(item.id)
                : this._navigate(item.slug)}">
                ${item.title}
                ${item.children && item.children.length > 0
                  ? html`<span class="arrow">▾</span>`
                  : ""}
              </button>
              ${item.children && item.children.length > 0 ? html`
                <div class="dropdown">
                  ${item.children.map((child) => html`
                    <button @click="${() => this._navigate(child.slug)}">${child.title}</button>
                  `)}
                </div>
              ` : ""}
            </li>
          `)}
        </ul>

        <button class="hamburger" @click="${this._toggleMenu}" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div class="mobile-nav">
        ${items.map((item) => html`
          <div class="mobile-nav-item ${this.openDropdown === item.id + "-mobile" ? "open" : ""}">
            <button @click="${() => item.children && item.children.length > 0
              ? this._toggleDropdown(item.id + "-mobile")
              : this._navigate(item.slug)}">
              ${item.title}
              ${item.children && item.children.length > 0
                ? html`<span class="arrow">▾</span>`
                : ""}
            </button>
            ${item.children && item.children.length > 0 ? html`
              <div class="mobile-children">
                ${item.children.map((child) => html`
                  <button @click="${() => this._navigate(child.slug)}">${child.title}</button>
                `)}
              </div>
            ` : ""}
          </div>
        `)}
      </div>
    `;
  }
}

globalThis.customElements.define(GridironHeader.tag, GridironHeader);
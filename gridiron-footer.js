/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-footer`
 * Site-wide footer. About blurb, nav links, contact, legal.
 * Dark background with gold accent.
 *
 * @element gridiron-footer
 */
export class GridironFooter extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-footer";
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
        footer {
          background-color: var(--ddd-theme-default-potentialMidnight);
          color: var(--ddd-theme-default-limestoneLight);
          padding: var(--ddd-spacing-10) var(--ddd-spacing-6) var(--ddd-spacing-6);
        }
        .footer-top-bar {
          height: 4px;
          background-color: var(--ddd-theme-default-roarGolden);
          margin: 0 0 var(--ddd-spacing-8) 0;
          width: 60px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--ddd-spacing-8);
          max-width: 1100px;
          margin: 0 auto var(--ddd-spacing-10);
        }
        .footer-brand img {
          height: 60px;
          width: auto;
          margin-bottom: var(--ddd-spacing-4);
          display: block;
        }
        .brand-name {
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 var(--ddd-spacing-2) 0;
        }
        .brand-desc {
          font-size: var(--ddd-font-size-xs);
          line-height: 1.6;
          opacity: 0.7;
          margin: 0 0 var(--ddd-spacing-4) 0;
        }
        .footer-col h4 {
          font-size: var(--ddd-font-size-3xs);
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--ddd-theme-default-roarGolden);
          margin: 0 0 var(--ddd-spacing-4) 0;
        }
        .footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2);
        }
        .footer-col ul li button,
        .footer-col ul li a {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-limestoneLight);
          opacity: 0.75;
          text-decoration: none;
          padding: 0;
          text-align: left;
          transition: opacity 0.2s, color 0.2s;
        }
        .footer-col ul li button:hover,
        .footer-col ul li a:hover {
          opacity: 1;
          color: var(--ddd-theme-default-roarGolden);
        }
        .contact-item {
          font-size: var(--ddd-font-size-xs);
          opacity: 0.75;
          margin: 0 0 var(--ddd-spacing-2) 0;
          line-height: 1.5;
        }
        .contact-item a {
          color: var(--ddd-theme-default-limestoneLight);
          text-decoration: none;
        }
        .contact-item a:hover {
          color: var(--ddd-theme-default-roarGolden);
        }
        .footer-divider {
          border: none;
          border-top: 1px solid var(--ddd-theme-default-navy60);
          margin: 0 auto var(--ddd-spacing-5);
          max-width: 1100px;
        }
        .footer-bottom {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: var(--ddd-spacing-3);
          font-size: var(--ddd-font-size-3xs);
          opacity: 0.5;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--ddd-spacing-6);
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <footer>
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="./logo.png" alt="GridIron YFBL" />
            <p class="brand-name">GridIron Youth Football League</p>
            <p class="brand-desc">
              Building tomorrow's athletes today. Developing character, discipline, and champions
              in youth football for ages 6–18. Est. 2026.
            </p>
          </div>

          <div class="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><button @click="${() => this._navigate("/home")}">Home</button></li>
              <li><button @click="${() => this._navigate("/programs")}">Programs</button></li>
              <li><button @click="${() => this._navigate("/schedule")}">Schedule</button></li>
              <li><button @click="${() => this._navigate("/parent-info")}">Parents</button></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Programs</h4>
            <ul>
              <li><a href="#">Rookie Ridge (6U–8U)</a></li>
              <li><a href="#">Iron Pups (10U–12U)</a></li>
              <li><a href="#">Ridge Hawks (14U)</a></li>
              <li><a href="#">Iron Elite (16U–18U)</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Contact</h4>
            <p class="contact-item">PO Box 2026<br />Ironridge, PA 16801</p>
            <p class="contact-item">
              <a href="mailto:info@gridironyfbl.org">info@gridironyfbl.org</a>
            </p>
            <p class="contact-item">
              <a href="tel:+18145550120">(814) 555-0120</a>
            </p>
          </div>
        </div>

        <hr class="footer-divider" />

        <div class="footer-bottom">
          <span>© 2026 GridIron Youth Football League. All rights reserved.</span>
          <span>Built by GridIron Studio · HAX CLI · DDD Design System · Vercel</span>
        </div>
      </footer>
    `;
  }
}

globalThis.customElements.define(GridironFooter.tag, GridironFooter);
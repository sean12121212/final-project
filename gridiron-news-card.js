/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-news-card`
 * News article preview card. Date, headline, excerpt, read-more link.
 *
 * Properties:
 *   headline {String}  - article headline
 *   date {String}      - ISO date string e.g. "2026-09-14"
 *   excerpt {String}   - short preview text
 *   href {String}      - link to full article (defaults to "#")
 *
 * @element gridiron-news-card
 */
export class GridironNewsCard extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-news-card";
  }

  constructor() {
    super();
    this.headline = "News Headline";
    this.date = "";
    this.excerpt = "";
    this.href = "#";
  }

  static get properties() {
    return {
      ...super.properties,
      headline: { type: String },
      date: { type: String },
      excerpt: { type: String },
      href: { type: String },
    };
  }

  _formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .card {
          background-color: var(--ddd-theme-default-white);
          border: 1px solid var(--ddd-theme-default-limestoneGray);
          border-radius: var(--ddd-radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: var(--ddd-boxShadow-md);
        }
        /* Gold top accent bar */
        .accent-bar {
          height: 4px;
          background-color: var(--ddd-theme-default-roarGolden);
        }
        .card-body {
          padding: var(--ddd-spacing-5);
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-3);
          flex: 1;
        }
        .date {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-slateGray);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: var(--ddd-font-weight-bold);
        }
        .headline {
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-nittanyNavy);
          margin: 0;
          line-height: 1.3;
        }
        .excerpt {
          font-size: var(--ddd-font-size-s);
          color: var(--ddd-theme-default-coalyGray);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-1);
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-beaverBlue);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: var(--ddd-font-weight-bold);
          text-decoration: none;
          margin-top: var(--ddd-spacing-2);
          transition: color 0.2s;
        }
        .read-more:hover {
          color: var(--ddd-theme-default-nittanyNavy);
        }
        /* Slot for image above card body */
        ::slotted(img) {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card">
        <div class="accent-bar"></div>
        <slot name="image"></slot>
        <div class="card-body">
          <div class="date">${this._formatDate(this.date)}</div>
          <h3 class="headline">${this.headline}</h3>
          <p class="excerpt">${this.excerpt}</p>
          <slot></slot>
          <a class="read-more" href="${this.href}">Read More →</a>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(GridironNewsCard.tag, GridironNewsCard);
/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-coach-card`
 * Coach profile card. Photo (or initials avatar), name, role, bio snippet.
 * Used on homepage coaches band and About page.
 *
 * Properties:
 *   name {String}    - coach full name
 *   role {String}    - title/role e.g. "Head Coach — Ridge Hawks 14U"
 *   bio {String}     - short biography
 *   photo {String}   - URL to photo (optional; shows initials avatar if absent)
 *
 * @element gridiron-coach-card
 */
export class GridironCoachCard extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-coach-card";
  }

  constructor() {
    super();
    this.name = "Coach Name";
    this.role = "Head Coach";
    this.bio = "";
    this.photo = "";
  }

  static get properties() {
    return {
      ...super.properties,
      name: { type: String },
      role: { type: String },
      bio: { type: String },
      photo: { type: String },
    };
  }

  _getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
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
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: var(--ddd-boxShadow-md);
        }
        .card-header {
          background-color: var(--ddd-theme-default-nittanyNavy);
          padding: var(--ddd-spacing-6) var(--ddd-spacing-5) var(--ddd-spacing-5);
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-4);
        }
        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: var(--ddd-theme-default-roarGolden);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-nittanyNavy);
          flex-shrink: 0;
          border: 3px solid var(--ddd-theme-default-roarGolden);
          overflow: hidden;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .name-area {
          flex: 1;
        }
        .coach-name {
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
          margin: 0 0 var(--ddd-spacing-1) 0;
          line-height: 1.2;
        }
        .coach-role {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-roarGolden);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .card-body {
          padding: var(--ddd-spacing-5);
          flex: 1;
        }
        .bio {
          font-size: var(--ddd-font-size-s);
          color: var(--ddd-theme-default-coalyGray);
          line-height: 1.6;
          margin: 0;
        }
        /* Slot for extra content, social links, etc. */
        ::slotted(*) {
          margin-top: var(--ddd-spacing-3);
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <div class="avatar">
            ${this.photo
              ? html`<img src="${this.photo}" alt="${this.name}" />`
              : this._getInitials(this.name)}
          </div>
          <div class="name-area">
            <h3 class="coach-name">${this.name}</h3>
            <p class="coach-role">${this.role}</p>
          </div>
        </div>
        <div class="card-body">
          <p class="bio">${this.bio}</p>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(GridironCoachCard.tag, GridironCoachCard);
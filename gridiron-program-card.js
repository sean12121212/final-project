/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-program-card`
 * 
 *
 * @element gridiron-program-card
 */
export class GridironProgramCard extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-program-card";
  }

  constructor() {
    super();
    this.programName = "Program Name";
    this.ageGroup = "8U";
    this.type = "Flag Football";
    this.description = "";
    this.expanded = false;
  }

  static get properties() {
    return {
      ...super.properties,
      programName: { type: String },
      ageGroup: { type: String },
      type: { type: String },
      description: { type: String },
      expanded: { type: Boolean, reflect: true },
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
        .card {

          background-color: var(--ddd-theme-default-white);
          border: 1px solid var(--ddd-theme-default-limestoneGray);
          border-radius: var(--ddd-radius-md);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card:hover {

          transform: translateY(-3px);
          box-shadow: var(--ddd-boxShadow-md);
        }
        .card-header {

          background-color: var(--ddd-theme-default-nittanyNavy);
          padding: var(--ddd-spacing-5) var(--ddd-spacing-5) var(--ddd-spacing-4);
          position: relative;
        }
        .age-badge {

          display: inline-block;
          background-color: var(--ddd-theme-default-roarGolden);
          color: var(--ddd-theme-default-nittanyNavy);
          font-size: var(--ddd-font-size-3xs);
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
          border-radius: var(--ddd-radius-sm);
          margin-bottom: var(--ddd-spacing-2);
        }
        .program-name {

          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .type-tag {

          display: inline-block;
          margin-top: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-left: 3px solid var(--ddd-theme-default-roarGolden);
          padding-left: var(--ddd-spacing-2);
        }
        .card-body {

          padding: var(--ddd-spacing-5);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-4);
        }
        .description {

          font-size: var(--ddd-font-size-s);
          color: var(--ddd-theme-default-coalyGray);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .register-btn {

          display: block;
          width: 100%;
          background-color: var(--ddd-theme-default-roarGolden);
          color: var(--ddd-theme-default-nittanyNavy);
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-5);
          border: none;
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
          font-family: var(--ddd-font-navigation);
          text-align: center;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .register-btn:hover {

          background-color: var(--ddd-theme-default-keystoneYellow);
        }
        .learn-more {

          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-beaverBlue);
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--ddd-font-navigation);
          font-weight: var(--ddd-font-weight-bold);
          padding: 0;
          text-align: left;
        }
        .learn-more:hover {
          
          color: var(--ddd-theme-default-nittanyNavy);
        }
        /* Slot for additional content on programs page */
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
          <div class="age-badge">${this.ageGroup}</div>
          <h3 class="program-name">${this.programName}</h3>
          <span class="type-tag">${this.type}</span>
        </div>
        <div class="card-body">
          <p class="description">${this.description}</p>
          <slot></slot>
          ${this.expanded
            ? html`<a class="register-btn" href="#">Register for ${this.programName}</a>`
            : html`<button class="learn-more">Learn More →</button>`}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(GridironProgramCard.tag, GridironProgramCard);
/**
 * Copyright 2026 GridIron Studio
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `gridiron-stats-counter`
 * Animated number counter with label. Used in the stats band on the homepage.
 * Animates from 0 to `count` when element enters the viewport.
 *
 * Properties:
 *   count {Number}   - target number to count to
 *   label {String}   - label below the number (e.g. "Youth Athletes")
 *   prefix {String}  - optional prefix like "$"
 *   suffix {String}  - optional suffix like "+"
 *
 * @element gridiron-stats-counter
 */
export class GridironStatsCounter extends DDDSuper(LitElement) {
  static get tag() {
    return "gridiron-stats-counter";
  }

  constructor() {
    super();
    this.count = 0;
    this.label = "Stat";
    this.prefix = "";
    this.suffix = "+";
    this._displayCount = 0;
    this._animated = false;
  }

  static get properties() {
    return {
      ...super.properties,
      count: { type: Number },
      label: { type: String },
      prefix: { type: String },
      suffix: { type: String },
      _displayCount: { type: Number, state: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Use IntersectionObserver to trigger animation when visible
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this._animated) {
            this._animated = true;
            this._animateCount();
          }
        });
      },
      { threshold: 0.3 }
    );
    this._observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) this._observer.disconnect();
  }

  _animateCount() {
    const duration = 1800;
    const steps = 60;
    const increment = this.count / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= this.count) {
        this._displayCount = this.count;
        clearInterval(interval);
      } else {
        this._displayCount = Math.floor(current);
      }
    }, duration / steps);
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          font-family: var(--ddd-font-navigation);
          padding: var(--ddd-spacing-4) var(--ddd-spacing-6);
        }
        .number {
          font-size: var(--ddd-font-size-4xl, 3.5rem);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-roarGolden);
          line-height: 1;
          letter-spacing: -1px;
        }
        .label {
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-limestoneLight);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: var(--ddd-spacing-2);
          font-weight: var(--ddd-font-weight-bold);
        }
        .divider {
          width: 32px;
          height: 3px;
          background-color: var(--ddd-theme-default-roarGolden);
          margin: var(--ddd-spacing-2) auto 0;
          opacity: 0.4;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="number">${this.prefix}${this._displayCount}${this.suffix}</div>
      <div class="label">${this.label}</div>
      <div class="divider"></div>
    `;
  }
}

globalThis.customElements.define(GridironStatsCounter.tag, GridironStatsCounter);
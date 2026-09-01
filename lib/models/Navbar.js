/**
 * lib/models/Navbar.js
 * --------------------
 * Mongoose schema & model for the "navbars" collection.
 *
 * The Navbar is a singleton configuration document (one document per store).
 * It stores the full navigation structure including mega-menu columns,
 * groups, and resolved category references.
 */

import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

// ── Sub-schemas ───────────────────────────────────────────────────────────────

// A single menu item within a mega-menu group
const MenuItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, default: '' },
    href: { type: String, default: '' },
    referenceType: { type: String, default: null }, // 'category' | 'product' | 'collection' | null
    referenceId: { type: String, default: null },
  },
  { _id: false }
);

// A group within a mega-menu column
const MenuGroupSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, default: '' },
    referenceType: { type: String, default: null },
    referenceId: { type: String, default: null },
    items: { type: [MenuItemSchema], default: [] },
  },
  { _id: false }
);

// A column within a mega-menu
const MegaMenuColumnSchema = new Schema(
  {
    id: { type: String, required: true },
    groups: { type: [MenuGroupSchema], default: [] },
  },
  { _id: false }
);

// The mega-menu definition for a top-level nav item
const MegaMenuSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    columns: { type: [MegaMenuColumnSchema], default: [] },
  },
  { _id: false }
);

// A top-level navigation item
const NavItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    href: { type: String, default: '' },
    megaMenu: { type: MegaMenuSchema, default: null },
    referenceType: { type: String, default: null },
    referenceId: { type: String, default: null },
  },
  { _id: false }
);

// ── Root Schema ───────────────────────────────────────────────────────────────

const NavbarSchema = new Schema(
  {
    // Singleton identifier — there is only one navbar config per store
    storeId: {
      type: String,
      required: true,
      unique: true,
      default: 'default',
    },

    navItems: {
      type: [NavItemSchema],
      default: [],
    },

    // Store additional top-level navbar settings (logo, theme, etc.)
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// ── Model ─────────────────────────────────────────────────────────────────────

const Navbar = models.Navbar || model('Navbar', NavbarSchema);

export default Navbar;

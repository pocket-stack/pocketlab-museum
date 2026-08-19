// src/data/devices.ts — the catalogue. One file per exhibit under ./devices;
// this module fixes the order and exposes the lookups pages use.

import type { AdoptionStatus, Collection, Device, ExecutionPath } from "./types";
import { nes } from "./devices/nes";
import { gameBoy } from "./devices/game-boy";
import { gba } from "./devices/gba";
import { psp } from "./devices/psp";
import { iphone2g } from "./devices/iphone-2g";
import { meizuM8 } from "./devices/meizu-m8";
import { nokiaE7 } from "./devices/nokia-e7";
import { iphone4s } from "./devices/iphone-4s";
import { vita } from "./devices/vita";
import { ipodTouch } from "./devices/ipod-touch";
import { meowbit } from "./devices/meowbit";
import { playdate } from "./devices/playdate";
import { pocketbook } from "./devices/pocketbook";
import { esp32p4 } from "./devices/esp32-p4";
import { mac } from "./devices/mac";
import { ios } from "./devices/ios";
import { browser } from "./devices/browser";

/** Every exhibit, oldest machine first. */
export const devices: readonly Device[] = [
  nes,
  gameBoy,
  gba,
  psp,
  iphone2g,
  meizuM8,
  nokiaE7,
  iphone4s,
  vita,
  ipodTouch,
  meowbit,
  playdate,
  pocketbook,
  esp32p4,
  mac,
  ios,
  browser,
];

const bySlug = new Map(devices.map((d) => [d.slug, d]));

export function deviceBySlug(slug: string): Device | undefined {
  return bySlug.get(slug);
}

export function devicesIn(collection: Collection): Device[] {
  return devices.filter((d) => d.collection === collection);
}

export const permanentCollection = devicesIn("permanent");
export const workbench = devicesIn("workbench");

export const STATUS_LABEL: Record<AdoptionStatus, string> = {
  registered: "Registered target",
  hardware: "Hardware-tested host",
  aot: "Pocket Vapor target",
  integration: "Renderer integration",
  "dev-host": "Development host",
};

export const STATUS_TONE: Record<AdoptionStatus, "green" | "cyan" | "amber" | "muted"> = {
  registered: "green",
  hardware: "cyan",
  aot: "amber",
  integration: "cyan",
  "dev-host": "muted",
};

export const PATH_LABEL: Record<ExecutionPath, string> = {
  guest: "Guest · QuickJS + native core",
  aot: "Pocket Vapor · AOT",
  native: "Native renderer",
};

export const PATH_SHORT: Record<ExecutionPath, string> = {
  guest: "Guest",
  aot: "AOT",
  native: "Native",
};

export const FAMILY_LABEL: Record<Device["family"], string> = {
  "handheld-console": "Handheld console",
  "home-console": "Home console",
  phone: "Phone",
  "media-player": "Media player",
  ereader: "E-reader",
  mcu: "Microcontroller",
  desktop: "Desktop",
};

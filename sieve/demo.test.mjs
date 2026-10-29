import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const script = readFileSync(new URL("./demo.js", import.meta.url), "utf8");
test("severity controls filter only synthetic rows, announce count, and reset", () => {
  const controls = ["Critical", "High", "Medium", "Low"].map((severity) => ({
    dataset: { severity }, pressed: "false", callback: null,
    setAttribute(_, value) { this.pressed = value; }, getAttribute() { return this.pressed; },
    addEventListener(_, callback) { this.callback = callback; },
  }));
  const rows = ["High", "Critical", "Medium", "High", "Medium", "Low"].map((findingSeverity) => ({ dataset: { findingSeverity }, hidden: false }));
  const status = { textContent: "" }, reset = {};
  vm.runInNewContext(script, { document: {
    querySelectorAll: (selector) => selector === "[data-severity]" ? controls : rows,
    getElementById: (id) => id === "demo-status" ? status : { addEventListener: (_, callback) => { reset.callback = callback; } },
  } });
  controls[0].callback(); assert.equal(rows.filter((row) => !row.hidden).length, 1);
  assert.equal(status.textContent, "1 synthetic critical finding"); assert.equal(controls[0].pressed, "true");
  controls[1].callback(); assert.equal(rows.filter((row) => !row.hidden).length, 2);
  assert.equal(status.textContent, "2 synthetic high findings"); assert.equal(controls[0].pressed, "false");
  controls[1].callback(); assert.equal(rows.filter((row) => !row.hidden).length, 6);
  controls[3].callback(); reset.callback(); assert.equal(rows.filter((row) => !row.hidden).length, 6);
});
test("all purchase CTAs retain analytics hooks and valid Apple destination; examples stay synthetic", () => {
  const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
  assert.equal((html.match(/data-sieve-app-store/g) || []).length, 3);
  assert.equal((html.match(/https:\/\/apps.apple.com\/app\/id6767409365/g) || []).length, 3);
  assert.ok(html.includes('role="status" aria-live="polite"'));
  assert.ok(html.includes("not a live scan or exact app screenshot"));
  assert.ok(html.includes("Current store version may differ"));
  assert.equal((html.match(/<h1 /g) || []).length, 1);
});

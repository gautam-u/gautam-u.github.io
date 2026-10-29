import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const script = readFileSync(new URL("./analytics.js", import.meta.url), "utf8");
function run({ hostname = "gautam-u.github.io", pathname = "/sieve/", privacy = {}, search = "", failing = false } = {}) {
  const requests = [], listeners = {};
  vm.runInNewContext(script, {
    location: { hostname, pathname, search }, navigator: privacy,
    crypto: { randomUUID: () => "12345678-1234-4234-8234-123456789abc" }, URLSearchParams,
    fetch: (...args) => { requests.push(args); return failing ? Promise.reject(new Error("offline")) : Promise.resolve({}); },
    document: { querySelectorAll: () => [{ addEventListener: (event, callback) => { listeners[event] = callback; } }] },
  });
  return { requests, listeners };
}
test("only production landing emits visits; privacy signals and local previews are quiet", () => {
  for (const options of [{ hostname: "localhost" }, { pathname: "/sieve/privacy/" }, { privacy: { globalPrivacyControl: true } }, { privacy: { doNotTrack: "1" } }]) assert.equal(run(options).requests.length, 0);
});
test("static attribution only, page-local ID, no URL/referrer/cookies, primary and middle clicks", () => {
  const { requests, listeners } = run({ search: "?utm_source=vibescan&utm_campaign=sieve_local_live_v1&utm_content=home_companion&secret=never-send" });
  listeners.click(); listeners.auxclick({ button: 1 }); listeners.auxclick({ button: 2 });
  assert.equal(requests.length, 3);
  const properties = JSON.parse(requests[0][1].body);
  assert.deepEqual(properties, { event: "sieve_landing_viewed", page_id: "12345678-1234-4234-8234-123456789abc", source: "vibescan", placement: "home_companion" });
  assert.equal(requests[0][1].credentials, "omit");
  assert.equal(requests[0][1].referrerPolicy, "no-referrer");
  assert.ok(!JSON.stringify(requests).includes("never-send"));
  assert.equal(JSON.parse(requests[1][1].body).event, "sieve_app_store_clicked");
});
test("unknown campaign metadata collapses to a fixed other label; failure never blocks links", async () => {
  const { requests, listeners } = run({ search: "?utm_source=private-value", failing: true });
  listeners.click(); await Promise.resolve();
  assert.equal(JSON.parse(requests[0][1].body).source, "direct_or_other");
  assert.equal(JSON.parse(requests[0][1].body).placement, "none");
});

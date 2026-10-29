/* Limited website analytics only. No SDK, cookies, stored visitor ID, or replay. */
(() => {
  if (location.hostname !== "gautam-u.github.io" || location.pathname !== "/sieve/" ||
      navigator.globalPrivacyControl || navigator.doNotTrack === "1" || !crypto.randomUUID) return;
  const pageId = crypto.randomUUID(); // New for each document; never persisted or passed to another site.
  const params = new URLSearchParams(location.search);
  const fromVibeScan = params.get("utm_source") === "vibescan" && params.get("utm_campaign") === "sieve_local_live_v1";
  const placement = fromVibeScan && ["home_companion", "home_tool_chip"].includes(params.get("utm_content"))
    ? params.get("utm_content") : "none";
  const send = (event) => {
    void fetch("https://vibe-scan.app/api/sieve-referral", {
      method: "POST", mode: "cors", credentials: "omit", keepalive: true,
      referrerPolicy: "no-referrer", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, page_id: pageId, source: fromVibeScan ? "vibescan" : "direct_or_other", placement }),
    }).catch(() => {}); // Never block the page or its links when analytics is unavailable.
  };
  send("sieve_landing_viewed");
  document.querySelectorAll("a[data-sieve-app-store]").forEach((link) => {
    link.addEventListener("click", () => send("sieve_app_store_clicked"));
    link.addEventListener("auxclick", (event) => { if (event.button === 1) send("sieve_app_store_clicked"); });
  });
})();

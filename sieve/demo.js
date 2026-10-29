/* An isolated illustration: never reads files, networks, or real Sieve state. */
(() => {
  const controls = [...document.querySelectorAll("[data-severity]")];
  const rows = [...document.querySelectorAll("[data-finding-severity]")];
  const status = document.getElementById("demo-status");
  const show = (severity) => {
    let count = 0;
    for (const row of rows) { row.hidden = Boolean(severity && row.dataset.findingSeverity !== severity); if (!row.hidden) count++; }
    for (const button of controls) button.setAttribute("aria-pressed", String(button.dataset.severity === severity));
    if (status) status.textContent = `${count} synthetic ${severity ? severity.toLowerCase() + " " : ""}finding${count === 1 ? "" : "s"}${severity ? "" : " · select a severity"}`;
  };
  for (const button of controls) button.addEventListener("click", () => show(button.getAttribute("aria-pressed") === "true" ? null : button.dataset.severity));
  document.getElementById("reset-demo")?.addEventListener("click", () => show(null));
})();

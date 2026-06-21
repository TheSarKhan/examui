import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = join(root, "dist");

const PAGE_META = {
  admin_command_center: { title: "Admin Dashboard", group: "Admin" },
  analytics_reports_dashboard: { title: "Analytics & Reports", group: "Admin" },
  assessment_creator_wizard: { title: "Assessment Creator", group: "Admin" },
  assessment_results_summary: { title: "Assessment Results", group: "Assessment" },
  bildiri_m_rk_zi: { title: "Notifications", group: "Employee" },
  candidate_landing_page: { title: "Candidate Landing", group: "Candidate" },
  employee_candidate_management_panel: { title: "Employee & Candidate Management", group: "Admin" },
  employee_personal_hub: { title: "Employee Dashboard", group: "Employee" },
  exam_experience: { title: "Exam Interface", group: "Assessment" },
  giri_login_s_hif_si: { title: "Login", group: "Auth" },
  i_stifad_i_profili: { title: "Employee Profile", group: "Employee" },
  question_bank_empty_state: { title: "Question Bank (Empty State)", group: "Admin" },
  question_bank_management: { title: "Question Bank", group: "Admin" },
  review_answers_experience: { title: "Review Answers", group: "Assessment" },
  settings_parametrl_r_dashboard: { title: "Settings", group: "Admin" },
};

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : "AssessCore";
}

function buildPages() {
  const entries = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !["dist", "scripts", "node_modules", ".netlify"].includes(entry.name))
    .map((entry) => {
      const source = join(root, entry.name, "code.html");
      if (!existsSync(source)) return null;

      const html = readFileSync(source, "utf8");
      const meta = PAGE_META[entry.name] ?? {};
      return {
        slug: entry.name,
        title: meta.title ?? extractTitle(html),
        group: meta.group ?? "Other",
        source,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));

  return entries;
}

function writeHubIndex(pages) {
  const groups = pages.reduce((acc, page) => {
    acc[page.group] ??= [];
    acc[page.group].push(page);
    return acc;
  }, {});

  const groupOrder = ["Candidate", "Auth", "Assessment", "Employee", "Admin", "Other"];
  const groupHtml = groupOrder
    .filter((group) => groups[group]?.length)
    .map((group) => {
      const cards = groups[group]
        .map(
          (page) => `
        <a href="/${page.slug}/" class="group block rounded-lg border border-outline-variant/40 bg-white p-md shadow-sm transition hover:border-secondary hover:shadow-md">
          <h3 class="font-semibold text-on-surface group-hover:text-secondary">${page.title}</h3>
          <p class="mt-1 text-sm text-on-surface-variant">/${page.slug}/</p>
        </a>`
        )
        .join("\n");

      return `
      <section class="space-y-md">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-on-surface-variant">${group}</h2>
        <div class="grid gap-md sm:grid-cols-2 lg:grid-cols-3">${cards}
        </div>
      </section>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AssessCore Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: "#031635",
            secondary: "#006492",
            surface: "#fbf8fc",
            "on-surface": "#1b1b1e",
            "on-surface-variant": "#44474e",
            "outline-variant": "#c5c6cf"
          }
        }
      }
    };
  </script>
  <style>body { font-family: Inter, sans-serif; }</style>
</head>
<body class="min-h-screen bg-surface text-on-surface">
  <main class="mx-auto max-w-6xl px-md py-xl">
    <header class="mb-xl rounded-xl bg-primary p-xl text-white">
      <p class="text-sm uppercase tracking-widest text-white/70">AssessCore</p>
      <h1 class="mt-sm text-3xl font-bold">Corporate Assessment Platform</h1>
      <p class="mt-md max-w-2xl text-white/80">Static UI prototype. Choose a screen below or start from the candidate landing page.</p>
      <a href="/candidate_landing_page/" class="mt-lg inline-flex items-center rounded-lg bg-[#58bcfd] px-lg py-sm font-semibold text-[#004a6d] transition hover:opacity-90">
        Open Candidate Landing
      </a>
    </header>
    ${groupHtml}
  </main>
</body>
</html>`;

  writeFileSync(join(dist, "index.html"), html, "utf8");
}

function main() {
  if (existsSync(dist)) {
    rmSync(dist, { recursive: true, force: true });
  }
  mkdirSync(dist, { recursive: true });

  const pages = buildPages();

  for (const page of pages) {
    const targetDir = join(dist, page.slug);
    mkdirSync(targetDir, { recursive: true });
    cpSync(page.source, join(targetDir, "index.html"));
  }

  const notFoundSource = join(root, "error_404_page_not_found", "code.html");
  if (existsSync(notFoundSource)) {
    cpSync(notFoundSource, join(dist, "404.html"));
  }

  writeHubIndex(pages);

  console.log(`Built ${pages.length} pages into dist/`);
}

main();

(function () {
  "use strict";

  var R = {
    home: "/hub/",
    login: "/giri_login_s_hif_si/",
    admin: "/admin_command_center/",
    analytics: "/analytics_reports_dashboard/",
    creator: "/assessment_creator_wizard/",
    results: "/assessment_results_summary/",
    review: "/review_answers_experience/",
    employees: "/employee_candidate_management_panel/",
    employeeHub: "/employee_personal_hub/",
    profile: "/i_stifad_i_profili/",
    notifications: "/bildiri_m_rk_zi/",
    questions: "/question_bank_management/",
    questionsEmpty: "/question_bank_empty_state/",
    settings: "/settings_parametrl_r_dashboard/",
    candidate: "/",
    exam: "/exam_experience/",
  };

  var ADMIN_LINKS = [
    { re: /dashboard/i, href: R.admin },
    { re: /assessments?/i, href: R.creator },
    { re: /analytics|reports|leaderboard/i, href: R.analytics },
    { re: /employees?/i, href: R.employees },
    { re: /question bank/i, href: R.questions },
    { re: /settings/i, href: R.settings },
    { re: /logout/i, href: R.login },
    { re: /support|help center|help/i, href: R.candidate },
  ];

  var EMPLOYEE_LINKS = [
    { re: /^home$|dashboard/i, href: R.employeeHub },
    { re: /assessments?|tests|checklist/i, href: R.exam },
    { re: /employees?|team/i, href: R.profile },
    { re: /reports|analytics|leaderboard/i, href: R.analytics },
    { re: /question bank/i, href: R.questions },
    { re: /settings/i, href: R.settings },
    { re: /profile|person/i, href: R.profile },
    { re: /logout/i, href: R.login },
    { re: /support|help center|help/i, href: R.candidate },
  ];

  function text(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function go(href) {
    window.location.href = href;
  }

  function wireAnchor(a, rules) {
    if (a.getAttribute("href") && a.getAttribute("href") !== "#") return;
    var label = text(a);
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].re.test(label)) {
        a.href = rules[i].href;
        return;
      }
    }
  }

  function wireNav(rules) {
    document.querySelectorAll("a[href='#']").forEach(function (a) {
      wireAnchor(a, rules);
    });
  }

  function onClick(el, href) {
    el.style.cursor = "pointer";
    el.addEventListener("click", function (e) {
      e.preventDefault();
      go(href);
    });
  }

  function wireButtons() {
    var buttonRoutes = [
      [/launch new assessment|new assessment/i, R.creator],
      [/create assessment/i, R.creator],
      [/add question|ilk sualı|sual əlavə/i, R.questions],
      [/yadda saxla və davam|save and continue/i, R.admin],
      [/geri$/i, R.admin],
      [/review all|review answers/i, R.review],
      [/back to results/i, R.results],
      [/back to dashboard/i, R.employeeHub],
      [/panelə qayıt/i, R.admin],
      [/view assignment/i, R.exam],
      [/daxil ol|sign in/i, R.admin],
      [/single sign-on|sso/i, R.employeeHub],
      [/imtahana başla/i, R.exam],
      [/create.*link|giriş linki/i, R.candidate],
      [/import|idxal/i, R.questions],
    ];

    document.querySelectorAll("button").forEach(function (btn) {
      if (btn.type === "submit") return;

      var label = text(btn);
      for (var i = 0; i < buttonRoutes.length; i++) {
        if (buttonRoutes[i][0].test(label)) {
          onClick(btn, buttonRoutes[i][1]);
          return;
        }
      }

      if (/^next$/i.test(label)) {
        onClick(btn, R.review);
        return;
      }

      var aria = btn.getAttribute("aria-label") || "";
      if (/notifications/i.test(aria)) {
        onClick(btn, R.notifications);
        return;
      }
      if (/settings/i.test(aria)) {
        onClick(btn, R.settings);
        return;
      }
      if (/help/i.test(aria)) {
        onClick(btn, R.home);
        return;
      }

      var icon = btn.querySelector(".material-symbols-outlined");
      if (icon && !label) {
        var iconName = icon.textContent.trim();
        if (iconName === "notifications") onClick(btn, R.notifications);
        else if (iconName === "settings") onClick(btn, R.settings);
        else if (iconName === "help") onClick(btn, R.home);
      }
    });
  }

  function wireForms() {
    document.querySelectorAll("form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ctx = document.body.getAttribute("data-proto-context") || "";
        if (ctx === "auth") go(R.admin);
        else if (ctx === "candidate") go(R.exam);
      });
    });
  }

  function wireBranding() {
    var ctx = document.body.getAttribute("data-proto-context") || "admin";
    var brandTarget =
      ctx === "employee" ? R.employeeHub : ctx === "candidate" ? R.candidate : ctx === "auth" ? R.login : R.admin;

    document.querySelectorAll("aside h1, aside .font-black, header .font-bold").forEach(function (el) {
      if (/assesscore/i.test(text(el))) {
        var link = el.closest("a");
        if (!link) {
          el.style.cursor = "pointer";
          el.addEventListener("click", function () {
            go(brandTarget);
          });
        }
      }
    });

    document.querySelectorAll("img[alt*='AssessCore'], img[alt*='Logo']").forEach(function (img) {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        go(ctx === "candidate" ? R.candidate : ctx === "auth" ? R.login : R.candidate);
      });
    });

    document.querySelectorAll("header button, aside button").forEach(function (el) {
      if (/admin user|employee profile/i.test(text(el))) {
        onClick(el, R.profile);
      }
    });

    document.querySelectorAll("header img, header .rounded-full").forEach(function (el) {
      var clickable = el.closest("button") || el;
      if (clickable.tagName === "BUTTON" || el.classList.contains("cursor-pointer")) {
        onClick(clickable, R.profile);
      }
    });
  }

  function init() {
    var ctx = document.body.getAttribute("data-proto-context") || "admin";
    var rules = ctx === "employee" ? EMPLOYEE_LINKS : ADMIN_LINKS;
    wireNav(rules);
    wireButtons();
    wireForms();
    wireBranding();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

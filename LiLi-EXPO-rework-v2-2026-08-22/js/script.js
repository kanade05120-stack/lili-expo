"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const content = LILI_CONTENT;

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const element = byId(id);
    if (element) {
      element.textContent = value || "";
    }
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeHttpUrl(value) {
    if (!value) return "";

    try {
      const parsed = new URL(value);
      return parsed.protocol === "https:" || parsed.protocol === "http:"
        ? parsed.href
        : "";
    } catch (error) {
      return "";
    }
  }

  // ==================== 開催情報：ここから ====================

  setText("eventDate", content.event.date);
  setText("eventTime", content.event.time);
  setText("eventVenue", content.event.venue);
  setText("accessVenue", content.event.venue);
  setText("accessAddress", content.event.address);
  setText("accessStation", content.event.station);

  const highlights = Array.isArray(content.event.highlights)
    ? content.event.highlights
    : [];

  byId("eventHighlights").innerHTML = highlights
    .map(function (item) {
      return "<li>" + escapeHTML(item) + "</li>";
    })
    .join("");

  // ==================== 開催情報：ここまで ====================


  // ==================== 実際に話せる人：ここから ====================

  const speakers = Array.isArray(content.speakers) ? content.speakers : [];

  if (speakers.length === 0) {
    byId("speakerGrid").innerHTML =
      '<div class="speaker-placeholder">' +
        '<span>PROFILE COMING SOON</span>' +
        '<h3>登壇者・相談相手を順次紹介します。</h3>' +
        '<p>入社年次やこれまでの経験、当日聞けるテーマまで掲載予定です。</p>' +
        '<ul>' +
          '<li>文系からIT業界へ</li>' +
          '<li>若手で新規事業に挑戦</li>' +
          '<li>ライフイベントとキャリア</li>' +
          '<li>海外で働く経験</li>' +
        '</ul>' +
      '</div>';
  } else {
    byId("speakerGrid").innerHTML = speakers
      .map(function (speaker) {
        const image = speaker.image
          ? '<img src="' + escapeHTML(speaker.image) + '" alt="' +
              escapeHTML(speaker.name) + '" loading="lazy">'
          : '<div class="speaker-image-placeholder" aria-hidden="true">LiLi</div>';

        const themes = Array.isArray(speaker.themes) ? speaker.themes : [];

        return (
          '<article class="speaker-card">' +
            image +
            '<div class="speaker-card-body">' +
              '<p class="speaker-role">' + escapeHTML(speaker.role) + '</p>' +
              '<h3>' + escapeHTML(speaker.name) + '</h3>' +
              '<p class="speaker-career">' + escapeHTML(speaker.career) + '</p>' +
              '<ul class="speaker-themes">' +
                themes.map(function (theme) {
                  return '<li>' + escapeHTML(theme) + '</li>';
                }).join("") +
              '</ul>' +
            '</div>' +
          '</article>'
        );
      })
      .join("");
  }

  // ==================== 実際に話せる人：ここまで ====================


  // ==================== 参加企業：ここから ====================

  const companies = Array.isArray(content.companies) ? content.companies : [];

  byId("companyGrid").innerHTML = companies
    .map(function (company) {
      const companyUrl = safeHttpUrl(company.url);
      const companyName = companyUrl
        ? '<a class="company-link" href="' + escapeHTML(companyUrl) +
            '" target="_blank" rel="noopener noreferrer">' +
            escapeHTML(company.name) + '</a>'
        : escapeHTML(company.name);

      return (
        '<article class="company-card">' +
          '<div class="company-meta">' +
            '<span class="booth-label">' + escapeHTML(company.booth) + '</span>' +
            '<span class="industry-label">' + escapeHTML(company.industry) + '</span>' +
          '</div>' +
          '<h3>' + companyName + '</h3>' +
          '<p>' + escapeHTML(company.theme) + '</p>' +
        '</article>'
      );
    })
    .join("");

  // ==================== 参加企業：ここまで ====================


  // ==================== セミナー：ここから ====================

  const seminars = Array.isArray(content.seminars) ? content.seminars : [];

  byId("seminarList").innerHTML = seminars
    .map(function (item) {
      return (
        '<div class="seminar-item">' +
          '<time>' + escapeHTML(item.time) + '</time>' +
          '<div>' +
            '<strong>' + escapeHTML(item.title) + '</strong>' +
            '<span>' + escapeHTML(item.speaker) + '</span>' +
          '</div>' +
        '</div>'
      );
    })
    .join("");

  const lux = content.lux || {};
  const luxLogo = byId("luxLogo");

  if (lux.logoPath) {
    luxLogo.innerHTML =
      '<img src="' + escapeHTML(lux.logoPath) + '" alt="' +
      escapeHTML(lux.name) + ' ロゴ">';
  } else {
    luxLogo.innerHTML =
      '<strong>' + escapeHTML(lux.name) + '</strong>' +
      '<span>公式ロゴ掲載予定</span>';
  }

  setText("luxLogoNote", lux.note);

  // ==================== セミナー：ここまで ====================


  // ==================== 企業座談会：ここから ====================

  const roundtables = Array.isArray(content.roundtables)
    ? content.roundtables
    : [];

  byId("roundList").innerHTML = roundtables
    .map(function (item) {
      return (
        '<div class="round-item">' +
          '<span>' + escapeHTML(item.round) + '</span>' +
          '<strong>' + escapeHTML(item.time) + '</strong>' +
        '</div>'
      );
    })
    .join("");

  // ==================== 企業座談会：ここまで ====================


  // ==================== 実績・参加者の声：ここから ====================

  const proof = content.proof || {};
  const stats = Array.isArray(proof.stats) ? proof.stats : [];
  const voices = Array.isArray(proof.voices) ? proof.voices : [];

  if (stats.length > 0 || voices.length > 0) {
    byId("voices").hidden = false;

    byId("statsGrid").innerHTML = stats
      .map(function (stat) {
        return (
          '<article class="stat-card">' +
            '<strong>' + escapeHTML(stat.value) + '</strong>' +
            '<span>' + escapeHTML(stat.label) + '</span>' +
          '</article>'
        );
      })
      .join("");

    byId("voiceList").innerHTML = voices
      .map(function (voice) {
        return (
          '<blockquote class="voice-card">' +
            '<p>“' + escapeHTML(voice.quote) + '”</p>' +
            '<cite>' + escapeHTML(voice.profile) + '</cite>' +
          '</blockquote>'
        );
      })
      .join("");
  }

  // ==================== 実績・参加者の声：ここまで ====================


  // ==================== LiLiについて：ここから ====================

  const about = content.about || {};
  setText("aboutLiLiText", about.lili);
  setText("whyWomenText", about.women);

  // ==================== LiLiについて：ここまで ====================


  // ==================== よくある質問：ここから ====================

  const faq = Array.isArray(content.faq) ? content.faq : [];

  byId("faqList").innerHTML = faq
    .map(function (item) {
      return (
        '<details>' +
          '<summary>' + escapeHTML(item.question) + '</summary>' +
          '<p>' + escapeHTML(item.answer) + '</p>' +
        '</details>'
      );
    })
    .join("");

  // ==================== よくある質問：ここまで ====================


  // ==================== 参加予約ボタン：ここから ====================

  const registration = content.registration || {};
  const registrationUrl = safeHttpUrl(registration.url);

  setText("entryNote", registration.note);

  document.querySelectorAll(".registration-link").forEach(function (link) {
    link.textContent = registration.buttonText || "参加予約する";
    link.href = registrationUrl || "#register";

    if (registrationUrl) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  });

  // ==================== 参加予約ボタン：ここまで ====================
});

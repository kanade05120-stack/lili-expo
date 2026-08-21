"use strict";


document.addEventListener("DOMContentLoaded", function () {


  // ==================== 開催情報を表示：ここから ====================

  const event = LILI_CONTENT.event;

  document.getElementById("eventDate").textContent =
    event.date;

  document.getElementById("eventTime").textContent =
    event.time;

  document.getElementById("eventVenue").textContent =
    event.venue;

  document.getElementById("accessVenue").textContent =
    event.venue;

  document.getElementById("accessAddress").textContent =
    event.address;

  document.getElementById("accessStation").textContent =
    event.station;

  // ==================== 開催情報を表示：ここまで ====================


 // ==================== 参加企業を表示：ここから ====================

document.getElementById("companyGrid").innerHTML =
  LILI_CONTENT.companies

    .map(function (company) {

      /*
        URLが入力されている企業だけ、
        企業名をクリックできるリンクにします。
      */

      let companyName = company.name;

      if (company.url) {
        companyName =
          '<a class="company-link"' +
          ' href="' + company.url + '"' +
          ' target="_blank"' +
          ' rel="noopener noreferrer">' +
          company.name +
          '</a>';
      }

      return (
        '<article class="company-card">' +
          '<span>' + company.booth + '</span>' +
          '<h3>' + companyName + '</h3>' +
          '<p>企業名を押すと公式サイトが開きます</p>' +
        '</article>'
      );

    })

    .join("");

// ==================== 参加企業を表示：ここまで ====================


  // ==================== セミナーを表示：ここから ====================

  document.getElementById("seminarList").innerHTML =
    LILI_CONTENT.seminars

      .map(function (item) {

        return (
          '<div class="seminar-item">' +
            '<time>' + item.time + '</time>' +
            '<div>' +
              '<strong>' + item.title + '</strong>' +
              '<span>' + item.speaker + '</span>' +
            '</div>' +
          '</div>'
        );

      })

      .join("");

  // ==================== セミナーを表示：ここまで ====================


  // ==================== LUXロゴを表示：ここから ====================

  const lux =
    LILI_CONTENT.lux;

  const luxLogo =
    document.getElementById("luxLogo");


  if (lux.logoPath) {

    luxLogo.innerHTML =
      '<img src="' +
      lux.logoPath +
      '" alt="' +
      lux.name +
      ' ロゴ">';

  } else {

    luxLogo.innerHTML =
      '<strong>' +
      lux.name +
      '</strong>' +
      '<span>公式ロゴ掲載予定</span>';

  }


  document.getElementById("luxLogoNote").textContent =
    lux.note;

  // ==================== LUXロゴを表示：ここまで ====================


  // ==================== 座談会を表示：ここから ====================

  document.getElementById("roundList").innerHTML =
    LILI_CONTENT.roundtables

      .map(function (item) {

        return (
          '<div class="round-item">' +
            '<span>' + item.round + '</span>' +
            '<strong>' + item.time + '</strong>' +
          '</div>'
        );

      })

      .join("");

  // ==================== 座談会を表示：ここまで ====================


  // ==================== よくある質問を表示：ここから ====================

  document.getElementById("faqList").innerHTML =
    LILI_CONTENT.faq

      .map(function (item) {

        return (
          '<details>' +
            '<summary>' + item.question + '</summary>' +
            '<p>' + item.answer + '</p>' +
          '</details>'
        );

      })

      .join("");

  // ==================== よくある質問を表示：ここまで ====================


  // ==================== 参加予約ボタン：ここから ====================

  const registration =
    LILI_CONTENT.registration;


  document.getElementById("entryNote").textContent =
    registration.note;


  document
    .querySelectorAll(".registration-link")
    .forEach(function (link) {

      link.textContent =
        registration.buttonText;

      link.href =
        registration.url || "#register";


      if (registration.url) {

        link.target =
          "_blank";

        link.rel =
          "noopener noreferrer";

      }

    });

  // ==================== 参加予約ボタン：ここまで ====================


});
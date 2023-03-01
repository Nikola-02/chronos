$(document).ready(function () {
  function ajaxCallBack(fajl, callBackFunkcija) {
    $.ajax({
      url: "json/" + fajl + ".json",
      method: "get",
      dataType: "json",
      success: function (odgovor) {
        callBackFunkcija(odgovor);
      },
      error: function (xhr) {
        console.error(xhr);
      },
    });
  }

  //Ispis navigacije

  ajaxCallBack("nav", ispisNavigacije);
  function ispisNavigacije(podaci) {
    let ispis = "";
    podaci.forEach((el) => {
      ispis += `<li><a href="${el.href}">${el.text}</a></li>`;
    });
    $(".navUl").html(ispis);
  }

  //Reviews slider

  $(".nextArrow").on("click", function () {
    var currentImage = $(".activeImg");
    var nextImg = currentImage.next();
    if (nextImg.length > 0) {
      currentImage.removeClass("activeImg");
      nextImg.addClass("activeImg");
    }
  });

  $(".prevArrow").on("click", function () {
    var currentImage = $(".activeImg");
    var prevImg = currentImage.prev();
    if (prevImg.length > 0) {
      currentImage.removeClass("activeImg");
      prevImg.addClass("activeImg");
    }
  });
});

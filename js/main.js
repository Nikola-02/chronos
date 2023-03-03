$(document).ready(function () {
  let page = window.location.pathname;
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
  //Setting to LS
  function postaviULS(naziv, vrednost) {
    localStorage.setItem(naziv, JSON.stringify(vrednost));
  }

  //Getting from LS
  function dohvatiIzLS(naziv) {
    return JSON.parse(localStorage.getItem(naziv));
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

  //Footer links dynamic print
  ajaxCallBack("footerNav", ispisFooterLinkova);

  function ispisFooterLinkova(podaci) {
    let ispis = "<h5>Quick links</h5><ul>";

    podaci.forEach((p) => {
      ispis += ` <li>
                    <a href="${p.href}">${p.text}</a>
                  </li>`;
    });
    ispis += "</ul>";
    $(".links-center").html(ispis);
  }

  //Footer social dynamic print
  ajaxCallBack("footerSocial", ispisFooterSocial);

  function ispisFooterSocial(podaci) {
    let ispis = "";

    podaci.forEach((p) => {
      ispis += `<a href="${p.href}" target="_blank">
                  <i class="fa-brands fa-${p.icon}"></i></a>`;
    });
    $(".social-links").html(ispis);
  }

  if (page == "/" || page == "/index.html") {
    //INDEX.HTML

    //Featured in dynamic print
    ajaxCallBack("featuredIn", ispisFeaturedIn);
    function ispisFeaturedIn(podaci) {
      let ispis = "";

      podaci.forEach((p) => {
        ispis += `<div class="featured-one">
        <span class="material-symbols-outlined"> ${p.icon} </span>
        <div class="featured-desc">
          <p>${p.text}</p>
        </div>
      </div>`;
      });

      $(".featured-wrapper").html(ispis);
    }
    `<div class="featured-one">
      <span class="material-symbols-outlined"> lock </span>
      <div class="featured-desc">
        <p>Secure-Payment System</p>
      </div>
    </div>`;

    //Bestsellers product dynamic print
    ajaxCallBack("bestsellers", ispisBestsellers);
    function ispisBestsellers(podaci) {
      let ispis = "";

      for (let i = 0; i < podaci.length; i++) {
        if (i % 2 == 0) {
          ispis += `
                  <div class="offer classic-offer">
                  <div class="classic-img">
                    <img src="img/${podaci[i]["img"]}"alt="${podaci[i]["name"]}" />
                  </div>
                  <div class="classic-text">
                    <p class="grey-brand">${podaci[i]["brend"]}</p>
                    <h4>${podaci[i]["name"]}</h4>
                    <p class="old-price"><span>${podaci[i]["price"]["oldPrice"]}&euro;</span> ${podaci[i]["price"]["newPrice"]}&euro;</p>
                    <a href="#" class="bestsellers-btn">SHOP</a>
                  </div>
                </div>
          `;
        } else {
          ispis += `
                  <div class="offer top-offer">
                  <div class="top-img">
                    <img src="img/${podaci[i]["img"]}" alt="${podaci[i]["name"]}" />
                  </div>
                  <div class="top-text">
                    <p class="grey-brand">${podaci[i]["brend"]}</p>
                    <h4>${podaci[i]["name"]}</h4>
                    <p class="old-price"><span>${podaci[i]["price"]["oldPrice"]}&euro;</span> ${podaci[i]["price"]["newPrice"]}&euro;</p>
                    <a href="#" class="bestsellers-btn">SHOP</a>
                  </div>
                </div>
          `;
        }
      }

      $(".bestsellers-content").html(ispis);
    }

    //Brends images dynamic print
    ajaxCallBack("brandIndex", ispisBrendIndex);
    function ispisBrendIndex(podaci) {
      let ispis = "";
      podaci.forEach((brend) => {
        ispis += `<div class="brend-img">
                    <img src="img/${brend.img}" alt="${brend.name}" />
                  </div>`;
      });
      $(".brends-imgs").html(ispis);
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
  } else if (page == "/shop.html") {
    //SHOP.HTML
    //Setting all products from JSON to LS and dynamic print
    ajaxCallBack("products", function (rezultat) {
      ispisProizvoda(rezultat);
      postaviULS("sviProizvodi", rezultat);
    });

    //Dynamic print select for sort
    ajaxCallBack("sort", function (rezultat) {
      let ispis = "";

      rezultat.forEach((r) => {
        ispis += `
                <option value="${r.value}">${r.text}</option>
        `;
      });

      $("#ddlSort").html(ispis);
    });

    //Dynamic print checkboxes and setting to LS
    ajaxCallBack("brand", function (brendovi) {
      ispisCheckBoxeva(brendovi, "brand-filters");
      postaviULS("sviBrendovi", brendovi);
    });

    ajaxCallBack("category", function (kategorije) {
      ispisCheckBoxeva(kategorije, "category-filters");
      postaviULS("sveKategorije", kategorije);
    });

    ajaxCallBack("collection", function (kolekcije) {
      ispisCheckBoxeva(kolekcije, "collection-filters");
      postaviULS("sveKolekcije", kolekcije);
    });

    function ispisCheckBoxeva(objekat, DivIdIspis) {
      let ispis = "";

      objekat.forEach((obj) => {
        ispis += `
                <div class="brand-form-div">
                  <input type="checkbox" name="ch${obj.name}" id="ch${obj.name}" />
                  <label for="ch${obj.name}">${obj.name}</label>
                </div>
        `;
      });

      $("." + DivIdIspis).html(ispis);
    }

    //On change for ddlSort
    $("#ddlSort").on("change", function () {
      let sviProzvodi = dohvatiIzLS("sviProizvodi");
      ispisProizvoda(sviProzvodi);
    });

    //Sort function
    function sortiraj(proizvodi) {
      let vrstaSorta = $("#ddlSort").val();
      if (vrstaSorta !== "0") {
        return proizvodi.sort((a, b) => {
          if (vrstaSorta === "price-asc") {
            return a.price.newPrice < b.price.newPrice ? -1 : 1;
          }
          if (vrstaSorta === "price-desc") {
            return a.price.newPrice < b.price.newPrice ? 1 : -1;
          }
          if (vrstaSorta === "name-az") {
            return a.name < b.name ? -1 : 1;
          }
          if (vrstaSorta === "name-za") {
            return a.name < b.name ? 1 : -1;
          }
          if (vrstaSorta === "most-popular") {
            return a.rating < b.rating ? 1 : -1;
          }
        });
      }
      return proizvodi;
    }

    //Dynamic print products
    function ispisProizvoda(proizvodi) {
      let sortirani = sortiraj(proizvodi);
      let ispisProizvoda = "";

      sortirani.forEach((p) => {
        ispisProizvoda += `
                          <div class="product">
                          <div class="product-collection ${prikazKolekcije(
                            p.collection
                          ).toLowerCase()}-collection">
                            <p>${prikazKolekcije(p.collection)}</p>
                          </div>
                          <div class="product-img">
                            <img src="img/${p.image}" alt="${p.name}" />
                          </div >

                          <div class="product-brand">
                            <p>${prikazBrenda(p.brand)}</p>
                          </div>

                          <div class="product-name">
                            <h4>${p.name}</h4>
                          </div>
                          <div class="product-category">
                            <p>${prikazKategorija(p.categoryId)}</p>
                          </div>
                          <div class="product-rating">
                            ${prikazRating(p.rating)}
                          </div>
                          <div class="product-price ${
                            p.price.oldPrice ? "" : "product-price-without-old"
                          }">
                            <p class="old-price"><del>${
                              p.price.oldPrice ? p.price.oldPrice + "€" : ""
                            }</del></p>
                            <p>${p.price.newPrice}€</p>
                          </div>
                          <div class="product-add-to-cart">
                            <input
                              type="button"
                              class="btn-add-to-cart"
                              value="Add to cart"
                            />
                          </div>
                        </div>
                          `;
      });

      $(".products").html(ispisProizvoda);
    }

    //Collections print
    function prikazKolekcije(id) {
      let kolekcije = dohvatiIzLS("sveKolekcije");

      return kolekcije.find((k) => k.id == id).name;
    }

    //Brand print
    function prikazBrenda(idBrend) {
      let brendovi = dohvatiIzLS("sviBrendovi");

      return brendovi.find((b) => b.id == idBrend).name;
    }

    //Category print
    function prikazKategorija(idsKategorije) {
      let kategorije = dohvatiIzLS("sveKategorije");
      let niz = [];
      idsKategorije.forEach((kat) => {
        niz.push(kategorije.find((k) => k.id == kat).name);
      });
      return niz.join(", ");
    }

    //Rating print
    function prikazRating(brojZvezdica) {
      let ispis = "";
      for (let i = 0; i < brojZvezdica; i++) {
        ispis += `<i class="fa-solid fa-star"></i>`;
      }
      return ispis;
    }
  }
});

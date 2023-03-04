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
    let greske = [];
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
      ispisCheckBoxeva(brendovi, "brand-filters", "Brand");
      postaviULS("sviBrendovi", brendovi);
    });

    ajaxCallBack("category", function (kategorije) {
      ispisCheckBoxeva(kategorije, "category-filters", "Category");
      postaviULS("sveKategorije", kategorije);
    });

    ajaxCallBack("collection", function (kolekcije) {
      ispisCheckBoxeva(kolekcije, "collection-filters", "Collection");
      postaviULS("sveKolekcije", kolekcije);
    });

    function ispisCheckBoxeva(objekat, DivIdIspis, klasa) {
      let ispis = "";

      objekat.forEach((obj) => {
        ispis += `
                <div class="brand-form-div">
                  <input type="checkbox" name="ch${obj.name}" value="${obj.id}" id="ch${obj.name}" class="ch${klasa}"/>
                  <label for="ch${obj.name}">${obj.name}</label>
                </div>
        `;
      });

      $("." + DivIdIspis).html(ispis);
    }

    //On change
    function OnChangeFunc(div, event) {
      $(div).on(event, () => {
        let sviProzvodi = dohvatiIzLS("sviProizvodi");
        ispisProizvoda(sviProzvodi);
      });
    }
    OnChangeFunc("#ddlSort", "change");
    OnChangeFunc("#price-min", "keyup");
    OnChangeFunc("#price-max", "keyup");
    OnChangeFunc(".brand-filters", "change");
    OnChangeFunc(".category-filters", "change");

    //Filter by price function
    function filterByPrice(proizvodi) {
      greske = 0;
      let minPrice = $("#price-min").val();
      let maxPrice = $("#price-max").val();
      if (minPrice != "0" || maxPrice != "2500") {
        let proizvodiZaPrikaz = proizvodi.filter(
          (p) => p.price.newPrice >= minPrice && p.price.newPrice <= maxPrice
        );
        if (
          proizvodiZaPrikaz.length == 0 ||
          minPrice === "" ||
          minPrice === ""
        ) {
          greske = 1;
        } else {
          return proizvodiZaPrikaz;
        }
      }
      return proizvodi;
    }

    //Filter by brand function
    function filterByBrand(proizvodi) {
      let cekiraniBrendovi = "";
      let nizCekiranihBrendova = [];
      cekiraniBrendovi = $(".chBrand:checked");

      if (cekiraniBrendovi.length != 0) {
        cekiraniBrendovi.each(function () {
          nizCekiranihBrendova.push(parseInt($(this).val()));
        });
        let brandFilterProizvodi = proizvodi.filter((p) =>
          nizCekiranihBrendova.includes(p.brand)
        );
        if (brandFilterProizvodi.length == 0) {
          greske = 1;
        } else {
          return brandFilterProizvodi;
        }
      }
      return proizvodi;
    }

    //Filter by category function
    function filterByCategory(proizvodi) {
      let cekiraniCategory = "";
      let nizCekiranihCategory = [];
      cekiraniCategory = $(".chCategory:checked");

      if (cekiraniCategory.length != 0) {
        cekiraniCategory.each(function () {
          nizCekiranihCategory.push(parseInt($(this).val()));
        });
        let categoryFilterProizvodi = proizvodi.filter((p) =>
          p.categoryId.some((katId) => nizCekiranihCategory.includes(katId))
        );
        if (categoryFilterProizvodi.length == 0) {
          greske = 1;
        } else {
          return categoryFilterProizvodi;
        }
      }
      return proizvodi;
    }

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
      let filteredByPrice = filterByPrice(proizvodi);
      let filteredByBrand = filterByBrand(filteredByPrice);
      let filteredByCategory = filterByCategory(filteredByBrand);
      let sortirani = sortiraj(filteredByCategory);
      let ispisProizvoda = "";

      if (greske == 0) {
        $(".products").removeClass("products-greske");
        sortirani.forEach((p) => {
          ispisProizvoda += `
                            <div class="product">
                            <div class="product-collection ${prikazKolekcijeIBrenda(
                              p.collection,
                              "sveKolekcije"
                            ).toLowerCase()}-collection">
                              <p>${prikazKolekcijeIBrenda(
                                p.collection,
                                "sveKolekcije"
                              )}</p>
                            </div>
                            <div class="product-img">
                              <img src="img/${p.image}" alt="${p.name}" />
                            </div >
  
                            <div class="product-brand">
                              <p>${prikazKolekcijeIBrenda(
                                p.brand,
                                "sviBrendovi"
                              )}</p>
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
                              p.price.oldPrice
                                ? ""
                                : "product-price-without-old"
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
                                data-productId="${p.id}"
                              />
                            </div>
                          </div>
                            `;
        });
      } else {
        $(".products").addClass("products-greske");
        ispisProizvoda = "There are no products with selected combination.";
      }

      $(".products").html(ispisProizvoda);
    }

    //Collections print
    function prikazKolekcijeIBrenda(id, nameLs) {
      let nizObjekata = dohvatiIzLS(nameLs);

      return nizObjekata.find((o) => o.id == id).name;
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

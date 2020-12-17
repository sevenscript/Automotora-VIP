// Carga de Tipo de Cambio:
$.ajax({
  url: "https://ha.edu.uy/api/rates",
  success: function (data) {
    $("#rate span").text(data.uyu);
  },
});

var ventasApp = new Vue({
  el: "#sales",
  data: {
    years: [],
    brands: [],
    models: [],
    cars: [],
    exchangeRate: "",
    currencySelected: "USD",
    brandSelected: "",
    modelSelected: "",
    yearSelected: "",
    statusSelected: "",
  },
});

var actuarlYear = new Date().getFullYear();

for (let i = actuarlYear; i > 1900; i--) {
  ventasApp.years.push(i);
}

$.ajax({
  url: "https://ha.edu.uy/api/brands",
  success: function (marcasObtenidas) {
    ventasApp.brands = marcasObtenidas;
  },
});

$.ajax({
  url: "https://ha.edu.uy/api/cars",
  success: function (autosObtenidos) {
    ventasApp.cars = autosObtenidos;
  },
});

$("#brandSelect").on("change", function () {
  $.ajax({
    url: "https://ha.edu.uy/api/models?brand=" + ventasApp.brandSelected,
    success: function (modelosObtenidos) {
      ventasApp.models = modelosObtenidos;
      $("#model").attr("disabled", false);
    },
  });
});

$("#btn-filter").on("click", function () {
  $.ajax({
    url:
      "https://ha.edu.uy/api/cars?brand=" +
      ventasApp.brandSelected +
      "&year=" +
      ventasApp.yearSelected +
      "&model=" +
      ventasApp.modelSelected +
      "&status=" +
      ventasApp.statusSelected,
    success: function (autosObtenidos) {
      ventasApp.cars = autosObtenidos;
    },
  });
});

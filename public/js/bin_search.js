$(".form").on("submit", (e) => {
  e.preventDefault();
  var bin = {
    bin: $("#binquery").val(),
  };
  fetch("/binchecker", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bin),
  })
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      $(".card-footer").removeClass("d-none");
      if (d.code) {
        alert("We are currently unable to process your request");
      }
      $("#brand").append(d.brand);
      $("#type").append(d.type);
      $("#scheme").append(d.scheme);
      $("#country").append(
        d.country.name + `  <small>(${d.country.currency})</small>`
      );
      $("#bank").append(d.bank.name);
    })
    .catch((err) => console.log(err));
});

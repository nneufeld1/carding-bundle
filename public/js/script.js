$(document).ready(function () {
  if (sessionStorage.getItem('spk') && sessionStorage.getItem('ssk')) {
    $('.acceptkey').addClass('d-none');
    $('.startprocess').removeClass('d-none');
    $('#changekey').removeClass('d-none');
  }
});

$('#changekey').click(function () {
  sessionStorage.removeItem('spk');
  sessionStorage.removeItem('ssk');
  $('.startprocess').addClass('d-none');
  $('.acceptkey').removeClass('d-none');
  $('#changekey').addClass('d-none');
});

$('.submitbtn').click(function () {
  var spk = $('#stripePrivate').val();
  var ssk = $('#stripeSecret').val();
  Stripe.setPublishableKey(spk);
  Stripe.createToken(
    {
      number: '5463255854993663',
      exp_month: '03',
      exp_year: '2026',
      cvc: '839',
    },
    function (status, response) {
      if (status == 401) {
        alert('Invalid Stripe key');
      } else {
        sessionStorage.setItem('spk', spk);
        sessionStorage.setItem('ssk', ssk);
        $('#changekey').addClass('d-none');
        $('.acceptkey').addClass('d-none');
        $('.startprocess').removeClass('d-none');
      }
    }
  );
});

$('.startrend').click(function () {
  var spk = sessionStorage.getItem('spk');
  var secret = sessionStorage.getItem('ssk');
  Stripe.setPublishableKey(spk);
  var getcards = $('#cards').val();
  var getEachcard = getcards.split('\n');
  getEachcard.forEach((eachCard) => {
    var parseCard = eachCard.split('|');
    if (
      Stripe.card.validateCardNumber(parseCard[0]) &&
      Stripe.card.validateExpiry(parseCard[1], parseCard[2]) &&
      Stripe.card.validateCVC(parseCard[3])
    ) {
      Stripe.createToken(
        {
          number: parseCard[0],
          exp_month: parseCard[1],
          exp_year: parseCard[2],
          cvc: parseCard[3],
        },
        stripeResponseHandler
      );
    }

    function stripeResponseHandler(status, response) {
      if (response.error) {
        alert(`Your Error is ${response.error}`);
      }
      var token = {
        stripeToken: response['id'],
      };

      fetch('/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          stripe: secret,
        }),
      })
        .then((res) => res.json())
        .then((d) => {
          if (
            d.decline_code == 'generic_decline' ||
            d.decline_code == 'do_not_honor'
          ) {
            $('#deadcardappend').append(
              ` <a href="#" class="media border-0">
            <div class="media-body w-100">
              <span class="list-group-item-heading"
                >${eachCard}</span
              >
              <ul class="list-unstyled users-list m-0 float-right">
                <li
                  data-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-original-title="${response.card.brand}"
                  class="avatar avatar-sm pull-up"
                >
                  <img
                    class="
                      media-object
                      rounded-circle
                      no-border-top-radius no-border-bottom-radius
                    "
                    src="/img/cards/${response.card.brand}.jpg"
                    alt="Avatar"
                  />
                </li>
              </ul>
              <p class="list-group-item-text mb-0">
                <span class="blue-grey lighten-2 font-small-3">
                 ${d.raw.message}</br>
                 This card is <b>${response.card.funding}</b> From ${response.card.country}
                </span>
              </p>
            </div>
          </a>`
            );
          } else {
            $('#livecardappend').append(
              ` <a href="#" class="media border-0">
                <div class="media-body w-100">
                  <span class="list-group-item-heading"
                    >${eachCard}</span
                  >
                  <ul class="list-unstyled users-list m-0 float-right">
                    <li
                      data-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-original-title="${response.card.brand}"
                      class="avatar avatar-sm pull-up"
                    >
                      <img
                        class="
                          media-object
                          rounded-circle
                          no-border-top-radius no-border-bottom-radius
                        "
                        src="/img/cards/${response.card.brand}.jpg"
                        alt="Avatar"
                      />
                    </li>
                  </ul>
                  <p class="list-group-item-text mb-0">
                    <span class="blue-grey lighten-2 font-small-3">
                     ${d.raw.message}</br>
                     This card is <b>${response.card.funding}</b> From ${response.card.country}
                    </span>
                  </p>
                </div>
              </a>`
            );
          }
        });
    }
  });
});

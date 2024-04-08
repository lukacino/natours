/*eslint-disable*/
const stripe = Stripe(
  'pk_test_51P2ASD04FUQjMr1T8acoo9LBAzbgqe0wF4fKDv2PTvTlMM5V83VAJFSjrhnBqvZv0kVInneKgguUFn2z4yF2cHwj00ANJTqSDp',
);

const bookTour = async (tourId) => {
  try {
    ///Get checkout session from the API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    ///Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = `Processing...`;
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const hotels = [
  {
    name: "The Grand Palace",
    location: "New Delhi, India",
    type: "Hotel",
    rating: 4.8,
    price: 4500,
    oldPrice: 6200,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Elegant rooms, excellent service and a convenient city-center location."
  },
  {
    name: "Royal Orchid Resort",
    location: "Goa, India",
    type: "Resort",
    rating: 4.6,
    price: 5800,
    oldPrice: 7600,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    description: "Relax by the pool and enjoy a peaceful resort experience near the beach."
  },
  {
    name: "Urban Stay Suites",
    location: "Bengaluru, India",
    type: "Hotel",
    rating: 4.5,
    price: 3200,
    oldPrice: 4200,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    description: "Modern rooms designed for business and leisure travelers."
  },
  {
    name: "Lake View Apartments",
    location: "Udaipur, India",
    type: "Apartment",
    rating: 4.7,
    price: 2800,
    oldPrice: 3900,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "Comfortable apartments with beautiful views and spacious interiors."
  },
  {
    name: "Mountain Escape",
    location: "Manali, India",
    type: "Resort",
    rating: 4.9,
    price: 6900,
    oldPrice: 8500,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    description: "A peaceful mountain retreat surrounded by spectacular scenery."
  }
];

const hotelList = document.getElementById("hotelList");
const destination = document.getElementById("destination");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");

const guestButton = document.getElementById("guestButton");
const guestPopup = document.getElementById("guestPopup");
const guestDone = document.getElementById("guestDone");

let guestData = {
  adults: 2,
  children: 0,
  rooms: 1
};

function displayHotels(list) {

  hotelList.innerHTML = "";

  if (list.length === 0) {
    hotelList.innerHTML = `
      <div style="background:white;padding:30px;border-radius:10px;">
        <h3>No hotels found</h3>
        <p>Try another destination or remove some filters.</p>
      </div>
    `;
    return;
  }

  list.forEach(hotel => {

    const card = document.createElement("article");

    card.className = "hotel-card";

    card.innerHTML = `
      <img
        class="hotel-image"
        src="${hotel.image}?auto=format&fit=crop&w=600&q=80"
        alt="${hotel.name}"
      >

      <div class="hotel-info">

        <h3>${hotel.name}</h3>

        <div class="location">
          📍 ${hotel.location}
        </div>

        <div class="stars">
          ${"★".repeat(Math.round(hotel.rating))}
          <span style="color:#777">${hotel.rating}</span>
        </div>

        <span class="badge">
          Limited-time deal
        </span>

        <p class="description">
          ${hotel.description}
        </p>

      </div>

      <div class="hotel-price">

        <span class="old-price">
          ₹${hotel.oldPrice.toLocaleString("en-IN")}
        </span>

        <span class="price">
          ₹${hotel.price.toLocaleString("en-IN")}
        </span>

        <span class="per-night">
          per night · taxes may apply
        </span>

        <button class="book-btn" data-hotel="${hotel.name}">
          See availability
        </button>

      </div>
    `;

    hotelList.appendChild(card);
  });

  document.querySelectorAll(".book-btn").forEach(button => {

    button.addEventListener("click", () => {

      document.getElementById("bookingHotel").textContent =
        button.dataset.hotel;

      document.getElementById("bookingModal")
        .classList.add("active");

    });

  });

  document.getElementById("resultCount").textContent =
    `${list.length} properties found`;
}

displayHotels(hotels);


/* SEARCH */

searchBtn.addEventListener("click", () => {

  const search = destination.value.toLowerCase().trim();

  if (!search) {
    displayHotels(hotels);
    return;
  }

  const filtered = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(search) ||
    hotel.location.toLowerCase().includes(search)
  );

  displayHotels(filtered);

  document.getElementById("resultsTitle").textContent =
    `Hotels matching "${destination.value}"`;

});


/* SORT */

sortSelect.addEventListener("change", () => {

  let sorted = [...hotels];

  if (sortSelect.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sortSelect.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sortSelect.value === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayHotels(sorted);

});


/* GUEST POPUP */

guestButton.addEventListener("click", () => {
  guestPopup.classList.toggle("active");
});


document.querySelectorAll(".plus").forEach(button => {

  button.addEventListener("click", () => {

    const type = button.dataset.type;

    guestData[type]++;

    updateGuests();

  });

});


document.querySelectorAll(".minus").forEach(button => {

  button.addEventListener("click", () => {

    const type = button.dataset.type;

    if (type === "adults" && guestData[type] <= 1) return;
    if (type === "rooms" && guestData[type] <= 1) return;
    if (type === "children" && guestData[type] <= 0) return;

    guestData[type]--;

    updateGuests();

  });

});


function updateGuests() {

  document.getElementById("adults").textContent =
    guestData.adults;

  document.getElementById("children").textContent =
    guestData.children;

  document.getElementById("rooms").textContent =
    guestData.rooms;

  guestButton.textContent =
    `${guestData.adults} Adults · ${guestData.rooms} Room`;

}

guestDone.addEventListener("click", () => {
  guestPopup.classList.remove("active");
});


/* SIGN IN */

const signInModal = document.getElementById("signInModal");

document.getElementById("signInBtn")
  .addEventListener("click", () => {
    signInModal.classList.add("active");
  });

document.getElementById("closeModal")
  .addEventListener("click", () => {
    signInModal.classList.remove("active");
  });


/* LOGIN */

document.getElementById("loginBtn")
  .addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Signed in successfully!");

    signInModal.classList.remove("active");

  });


/* BOOKING */

document.getElementById("closeBooking")
  .addEventListener("click", () => {
    document.getElementById("bookingModal")
      .classList.remove("active");
  });


document.getElementById("confirmBooking")
  .addEventListener("click", () => {

    const name =
      document.getElementById("bookingName").value;

    const email =
      document.getElementById("bookingEmail").value;

    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    alert(
      "Booking confirmed! A confirmation would be sent to " +
      email
    );

    document.getElementById("bookingModal")
      .classList.remove("active");

  });


/* CLOSE MODALS WHEN CLICKING OUTSIDE */

window.addEventListener("click", event => {

  if (event.target === signInModal) {
    signInModal.classList.remove("active");
  }

  if (event.target === document.getElementById("bookingModal")) {
    document.getElementById("bookingModal")
      .classList.remove("active");
  }

});
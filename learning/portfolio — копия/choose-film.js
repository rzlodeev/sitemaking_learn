let movies = [];
let occupiedSeats = [];
let allSeatsList = [];
const movieChooser = document.getElementById('movie-chooser');
let selectedMovie = +movieChooser.value;
let ticketsBought = 0;
let userSeats = [];
// Завантаження списку фільмів
fetchMovie();
async function fetchMovie() {
  const response = await fetch('movie-list.json');
  movies = await response.json();
  setMovie();
}
// Виведення списку фільмів у випадайку
function setMovie() {
  let html = '';
  for (let i = 0; i < movies.length; i++) {
    html += `<option value="${i}">${movies[i].name}: ${movies[i].price} грн.</option>`;
  }
  movieChooser.innerHTML = html;
  setSeats();
}
// Розстановка зайнятих місць і виведення тексту з кількістю квитків
function setSeats() {
  occupiedSeats = movies[selectedMovie].seats;
  allSeatsList = document.querySelectorAll('.seat');
  if (allSeatsList.length === occupiedSeats.length) {
    for (let i = 0; i < allSeatsList.length; i++) {
      if (occupiedSeats[i]) allSeatsList[i].classList.add('occupied');
      allSeatsList[i].classList.contains('bought') ? userSeats.push(1) : userSeats.push(0);
      allSeatsList[i].style.transition = '0.3s';
    }
  } else {
    console.error(
      'На вибраний фільм неправильно сформований масив із списком місць'
    );
  }
  let orderText = document.querySelector('.order-text');
  orderText.innerHTML = `<p>Ви купили ${ticketsBought} квитків на суму ${movies[selectedMovie].price * ticketsBought} грн</p>`;
}

// Реакція на зміну фільму
movieChooser.addEventListener('change', (event) => {
  selectedMovie = event.target.value;
  allSeatsList.forEach((Element) => Element.classList.remove('occupied', 'bought'));  
  allSeatsList.forEach((Element) => Element.style.transition = "0.3s");  
  ticketsBought = 0;
  userSeats = [];
  setSeats();
});

//Реакція на клік
let seatsTable = document.querySelector('.seats-table');
seatsTable.addEventListener('click', (event) => {
  function contains(element) {
    return event.target.classList.contains(element);
  }
  if (!contains('bought') && !contains('occupied') && contains('seat')) {
    event.target.classList.add('bought');
    ticketsBought++;

  } else if (contains('bought') && !contains('occupied') && contains('seat')) {
    event.target.classList.remove('bought');
    ticketsBought--;
  }
  userSeats = [];
  setSeats();
});

// Відправка на сервер
document.querySelector('.make-order input[type=submit]')
.addEventListener('click', makeOrder);

async function makeOrder(event) {
    event.preventDefault();
    await fetch('order.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.querySelector('.make-order input[name=username]').value,
            message: document.querySelector('.make-order input[name=useremail]').value,
            movieid: selectedMovie,
            seats: userSeats
        })
    });
    document.querySelector('.make-order').reset();
}
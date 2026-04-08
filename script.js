const cards = Array.from(document.querySelectorAll('.card'));
const images = cards.map(card => ({
  src: card.querySelector('img').src,
  alt: card.querySelector('img').alt,
  label: card.querySelector('.card-label').textContent,
  category: card.dataset.category
}));

let currentIndex = 0;
let filteredCards = [...cards];
let visiblePage = 0;
const PAGE_SIZE = 8;

function filterGallery(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  visiblePage = 0;
  filteredCards = category === 'all'
    ? [...cards]
    : cards.filter(c => c.dataset.category === category);
  renderPage();
}

function renderPage() {
  cards.forEach(c => c.style.display = 'none');
  const start = visiblePage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  filteredCards.slice(start, end).forEach(c => c.style.display = 'block');
  document.getElementById('prevBtn').disabled = visiblePage === 0;
  document.getElementById('nextBtn').disabled = end >= filteredCards.length;
}

function prevImage() {
  if (visiblePage > 0) { visiblePage--; renderPage(); }
}

function nextImage() {
  if ((visiblePage + 1) * PAGE_SIZE < filteredCards.length) { visiblePage++; renderPage(); }
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function updateLightbox() {
  document.getElementById('lb-img').src = images[currentIndex].src;
  document.getElementById('lb-img').alt = images[currentIndex].alt;
  document.getElementById('lb-caption').textContent = images[currentIndex].label;
}

function lbPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

function lbNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

cards.forEach((card, i) => {
  card.onclick = () => openLightbox(i);
});

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lightbox');
  if (lb.style.display === 'flex') {
    if (e.key === 'ArrowLeft') lbPrev();
    if (e.key === 'ArrowRight') lbNext();
    if (e.key === 'Escape') closeLightbox();
  }
});

renderPage();
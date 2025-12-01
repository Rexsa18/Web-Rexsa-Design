// Ambil elemen modal
const modal = document.getElementById("myModal");
const modalSlides = document.getElementById("modalSlides");
const modalDots = document.getElementById("modalDots");
const slidePrice = document.getElementById("slidePrice");
const slideOrderBtn = document.getElementById("slideOrderBtn");
const slideShareBtn = document.getElementById("slideShareBtn");
const modalClose = document.getElementById("modalClose");

let slideIndex = 0;
let galleryImages = [];

// Pasang event click ke setiap gambar gallery
document.querySelectorAll(".gallery img").forEach(imgEl => {
    imgEl.addEventListener("click", () => {
        const imgs = Array.from(imgEl.closest(".gallery").querySelectorAll("img"))
            .filter(i => i.src && i.src.trim() !== '');
        galleryImages = imgs;
        slideIndex = imgs.indexOf(imgEl);
        openSlideshow();
    });
});

// Buka slideshow modal
function openSlideshow() {
    modal.style.display = "block";
    document.getElementById("navbar").style.display = "none"; // hide navbar
    modalSlides.innerHTML = "";
    galleryImages.forEach((img) => {
        modalSlides.innerHTML += `<div class="slide"><img src="${img.src}" alt="${img.alt}" data-price="${img.dataset.price || ''}"></div>`;
    });
    updateSlide();
}

// Update slide yang tampil
function updateSlide() {
    if (galleryImages.length === 0) return;
    slideIndex = ((slideIndex % galleryImages.length) + galleryImages.length) % galleryImages.length;
    modalSlides.style.transform = `translateX(${-slideIndex*100}%)`;
    const srcImg = galleryImages[slideIndex];

    // Update harga
    let price = srcImg.dataset.price || "Rp 5.000";
    slidePrice.textContent = price;

    // Update tombol WhatsApp
    const waMsg = encodeURIComponent(`Halo, saya ingin order desain ini: ${srcImg.src}`);
    slideOrderBtn.href = `https://wa.me/628812654958?text=${waMsg}`;

    // Update tombol share
    slideShareBtn.onclick = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Desain Logo',
                text: `Lihat desain ini! Harga: ${price}`,
                url: srcImg.src
            }).catch(err => console.log(err));
        } else {
            navigator.clipboard.writeText(srcImg.src)
                .then(()=>alert("Link foto disalin!"))
                .catch(()=>alert("Gagal menyalin link"));
        }
    };
}

// Tombol close modal
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.getElementById("navbar").style.display = "flex";
});

// Click di luar gambar menutup modal
modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.getElementById("navbar").style.display = "flex";
    }
});

// Keyboard navigation
window.addEventListener("keydown", e => {
    if (modal.style.display !== "block") return;
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "Escape") {
        modal.style.display = "none";
        document.getElementById("navbar").style.display = "flex";
    }
});

// Swipe gesture
let startX = 0;
modalSlides.addEventListener("touchstart", e => startX = e.touches[0].clientX);
modalSlides.addEventListener("touchend", e => {
    let dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) prevSlide();
    if (dx < -50) nextSlide();
});

// Navigasi slide
function nextSlide() {
    slideIndex = (slideIndex + 1) % galleryImages.length;
    updateSlide();
}
function prevSlide() {
    slideIndex = (slideIndex - 1 + galleryImages.length) % galleryImages.length;
    updateSlide();
}

// Keyboard navigation
window.addEventListener("keydown", e => {
    if (modal.style.display !== "block") return;
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "Escape") modal.style.display = "none";
});

// Click outside closes modal
modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.getElementById("navbar").style.display = "flex"; // SHOW NAVBAR AGAIN
    }
});

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        modal.style.display = "none";
        document.getElementById("navbar").style.display = "flex"; // SHOW NAVBAR AGAIN
    }
});
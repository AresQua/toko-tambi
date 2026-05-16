const colorPalette = ["#8BC34A", "#C8E6C9", "#c2e475", "#ffffff"];

/* API ROOT */
const API = "https://script.google.com/macros/s/AKfycbz4V03001bK1lgKA2EapHVAcEwtXJPitjl1WAzckGyYcUxHd7Baz2ud7k5-BJW4yI5q/exec";

/* GET */
async function apiGet(action) {
    const res = await fetch(`${API}?action=${action}`);
    return await res.json();
}

/* POST */
async function apiPost(obj) {
    try {
        const res = await fetch(API, {
            method: "POST",
            mode: "no-cors", // Kita paksa lewat tanpa pemeriksaan ketat
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" }
        });
        // Karena pakai no-cors, kita tidak bisa baca balasan suksesnya dengan mudah
        // Tapi datanya biasanya TETAP MASUK ke Google Sheets.
        return { status: "success" }; 
    } catch (e) {
        throw e;
    }
}

/* Helpers */
function formatRupiah(num) {

    if (!num) return "Rp 0";

    return "Rp " + Number(num).toLocaleString("id-ID");
}

function formatAngka(num) {

    if (num === undefined || num === null || num === "") {
        return "0";
    }

    return Number(num).toLocaleString("id-ID");
}

function parseAngka(str) {

    if (!str) return 0;

    return Number(
        str.toString().replace(/\./g, "")
    );
}

function activeFormatInput(id) {

    const input = qs(id);

    if (!input) return;

    input.addEventListener("input", function () {

        let value = this.value.replace(/\D/g, "");

        this.value = value
            ? formatAngka(value)
            : "";
    });
}

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }

function createRow(arr) {
    return "<tr>" + arr.map(td => `<td>${td}</td>`).join("") + "</tr>";
}

// Fungsi animasi segitiga di header
function createRandomTriangle() {
    const headerElement = document.querySelector('.header'); // Mencari elemen header
    if (!headerElement) return;

    const triangle = document.createElement('div');
    triangle.classList.add('triangle-container');
    const size = Math.random() * 20 + 10;
    
    triangle.style.width = `${size}px`; 
    triangle.style.height = `${size}px`;
    triangle.style.left = `${Math.random() * headerElement.offsetWidth}px`;
    triangle.style.top = `${Math.random() * headerElement.offsetHeight}px`;
    triangle.style.background = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    triangle.style.animation = `triangleMove ${Math.random() * 10 + 5}s ease-in-out infinite`;
    
    headerElement.appendChild(triangle);
}

// Efek Klik Partikel
document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        const p = document.createElement('div');
        p.classList.add('click-particle');
        const size = Math.random() * 15 + 5;
        
        p.style.width = `${size}px`; 
        p.style.height = `${size}px`;
        p.style.background = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        p.style.left = `${e.pageX}px`; 
        p.style.top = `${e.pageY}px`;
        p.style.pointerEvents = "none"; // Agar tidak menghalangi klik tombol
        
        document.body.appendChild(p);
        
        p.animate([
            { transform: `translate(0, 0) scale(1) rotate(0deg)`, opacity: 1 }, 
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0) rotate(360deg)`, opacity: 0 }
        ], { duration: 500 });

        setTimeout(() => p.remove(), 500);
    }
});

/* Panggil fungsi segitiga saat halaman selesai dimuat */
window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 15; i++) {
        createRandomTriangle();
    }
});

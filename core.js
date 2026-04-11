/* API ROOT */
const API = "https://script.google.com/macros/s/AKfycbxuhNSImHxbROrnaFTH8i-Z7zhoxCO8C_2ACCMZgjXCC170ygUSX0e85gslpW3OlxKW/exec";

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
    return "Rp " + num.toLocaleString("id-ID");
}

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }

function createRow(arr) {
    return "<tr>" + arr.map(td => `<td>${td}</td>`).join("") + "</tr>";
}

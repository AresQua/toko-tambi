// ======================================================
// TAMBI SYSTEM
// CORE.JS
// ======================================================


// ======================================================
// URL WEB APP GAS
// ======================================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbxMkeVUanRK6EC8nL6WM9WcZxdw6lu0gloTLmDhrO7hF7Wwd0y7RiNsxK1jOvKMgY_J-g/exec";


// ======================================================
// DOM HELPERS
// ======================================================

function qs(selector) {

  return document.querySelector(
    selector
  );

}

function qsa(selector) {

  return document.querySelectorAll(
    selector
  );

}


// ======================================================
// API GET
// ======================================================

async function apiGet(
  action,
  params = {}
) {

  const url =
    new URL(API_URL);

  url.searchParams.append(
    "action",
    action
  );

  Object.entries(params)
    .forEach(([k, v]) => {

      if (
        v !== undefined &&
        v !== null
      ) {

        url.searchParams.append(
          k,
          v
        );

      }

    });

  const res =
    await fetch(
      url.toString()
    );

  return await res.json();

}


// ======================================================
// API POST
// ======================================================

async function apiPost(data){

    await fetch(
        API_URL,
        {
            method:"POST",
            mode:"no-cors",
            body: JSON.stringify(data)
        }
    );

    return {
        success:true
    };

}


// ======================================================
// TOAST
// ======================================================

function showToast(msg) {

  const old =
    document.querySelector(
      ".toast"
    );

  if (old)
    old.remove();

  const t =
    document.createElement(
      "div"
    );

  t.className = "toast";

  t.innerText = msg;

  document.body.appendChild(t);

  setTimeout(() => {

    t.classList.add(
      "show"
    );

  }, 10);

  setTimeout(() => {

    t.classList.remove(
      "show"
    );

    setTimeout(() => {

      t.remove();

    }, 300);

  }, 2000);

}


// ======================================================
// RUPIAH FORMATTER
// ======================================================

function formatRupiah(
  angka
) {

  return Number(
    angka || 0
  ).toLocaleString(
    "id-ID"
  );

}


// ======================================================
// PARSE RUPIAH
// ======================================================

function parseRupiah(
  text
) {

  return Number(

    String(text)
      .replace(/\./g, "")
      .replace(/,/g, "")

  ) || 0;

}


// ======================================================
// INPUT FORMAT RUPIAH LIVE
// ======================================================

function bindRupiahInput(
  selector
) {

  const el =
    typeof selector ===
    "string"

      ? qs(selector)

      : selector;

  if (!el) return;

  el.addEventListener(
    "input",

    function() {

      const angka =
        parseRupiah(
          this.value
        );

      this.value =
        formatRupiah(
          angka
        );

    }

  );

}


// ======================================================
// MINUMAN FORMATTER
// ======================================================

function formatNamaMinuman(
  item
) {

  return [

    item.varian,

    item.nama,

    item.topping,

    item.ukuran

  ]

  .filter(v =>

    v &&
    v !== "Default" &&
    v !== "DFL"

  )

  .join(" ");

}


// ======================================================
// TANGGAL HARI INI
// ======================================================

function today() {

  const d =
    new Date();

  const yyyy =
    d.getFullYear();

  const mm =
    String(
      d.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const dd =
    String(
      d.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${yyyy}/${mm}/${dd}`;

}


// ======================================================
// EMPTY TABLE
// ======================================================

function renderEmptyTable(
  tbody,
  colSpan = 1
) {

  tbody.innerHTML = `

    <tr>

      <td colspan="${colSpan}">

        Tidak ada data

      </td>

    </tr>

  `;

}


// ======================================================
// DROPDOWN FILTER
// ======================================================

function uniqueValues(
  arr
) {

  return [

    ...new Set(arr)

  ];

}


// ======================================================
// SUM TOTAL
// ======================================================

function sumBy(
  arr,
  key
) {

  return arr.reduce(

    (t, i) =>

      t +

      Number(
        i[key] || 0
      ),

    0

  );

}


// ======================================================
// DEBOUNCE
// ======================================================

function debounce(
  fn,
  delay = 300
) {

  let timer;

  return function() {

    clearTimeout(
      timer
    );

    timer =
      setTimeout(

        () =>
          fn.apply(
            this,
            arguments
          ),

        delay

      );

  };

}


// ======================================================
// SEARCH MATCH
// ======================================================

function matchText(
  keyword,
  text
) {

  return String(text)
    .toLowerCase()
    .includes(
      String(keyword)
      .toLowerCase()
    );

}


// ======================================================
// SWITCH BUTTON
// ======================================================

function setActiveSwitch(
  selector,
  activeEl
) {

  qsa(selector)
    .forEach(el =>

      el.classList.remove(
        "active"
      )

    );

  activeEl.classList.add(
    "active"
  );

}


// ======================================================
// LOADING
// ======================================================

function showLoading() {

  const old =
    qs("#loading");

  if (old)
    return;

  const div =
    document.createElement(
      "div"
    );

  div.id =
    "loading";

  div.innerHTML =
    "Loading...";

  document.body.appendChild(
    div
  );

}

function hideLoading() {

  const div =
    qs("#loading");

  if (div)
    div.remove();

}


// ======================================================
// CONFIRM
// ======================================================

function ask(msg) {

  return confirm(
    msg
  );

}
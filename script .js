import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase credentials (provided)
const SUPABASE_URL = "https://hjpvadozhrdjugfrcffv.supabase.co";
const SUPABASE_KEY = "sb_publishable_VWRFCLxoBE75MYve7W5jhw_PedtT83O";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helpers
const el = (id) => document.getElementById(id);
const providersEl = el("providers");

// Load providers with optional filters
async function loadProviders() {
  const city = el("cityInput").value.trim();
  const service = el("serviceInput").value.trim();

  providersEl.classList.remove("empty");
  providersEl.innerHTML = `<div class="muted">Loading…</div>`;

  let query = supabase
    .from("providers")
    .select("id, name, service, city, phone, rating, jobs_done")
    .order("name", { ascending: true });

  if (city) query = query.eq("city", city);
  if (service) query = query.eq("service", service);

  const { data, error } = await query;

  if (error) {
    providersEl.classList.add("empty");
    providersEl.textContent = "Error loading providers.";
    console.error(error.message);
    return;
  }

  if (!data || data.length === 0) {
    providersEl.classList.add("empty");
    providersEl.textContent = "No providers found.";
    return;
  }

  providersEl.innerHTML = "";
  data.forEach((row) => {
    const card = document.createElement("div");
    card.className = "provider";
    card.innerHTML = `
      <div class="name">${row.name}</div>
      <div class="muted">Service: ${row.service} • City: ${row.city}</div>
      <div>Phone: ${row.phone}</div>
      <div class="muted">Rating: ${row.rating} ⭐ • Jobs done: ${row.jobs_done}</div>
    `;
    providersEl.appendChild(card);
  });
}

function clearFilters() {
  el("cityInput").value = "";
  el("serviceInput").value = "";
  providersEl.classList.add("empty");
  providersEl.textContent = "No providers loaded";
}

// Button bindings
el("btnBook").addEventListener("click", loadProviders);
el("btnRefresh").addEventListener("click", loadProviders);
el("btnClear").addEventListener("click", clearFilters);

// Initial state
providersEl.textContent = "No providers loaded";

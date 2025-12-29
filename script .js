import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hjpvadozhrdjugfrcffv.supabase.co",
  "sb_publishable_VWRFCLxoBE75MYve7W5jhw_PedtT83O"
);

const cityInput = document.getElementById("cityInput");
const serviceInput = document.getElementById("serviceInput");
const providersEl = document.getElementById("providers");

document.getElementById("btnBook").addEventListener("click", loadProviders);
document.getElementById("btnRefresh").addEventListener("click", loadProviders);
document.getElementById("btnClear").addEventListener("click", clearFilters);

function clearFilters() {
  cityInput.value = "";
  serviceInput.value = "";
  providersEl.textContent = "No providers loaded";
}

async function loadProviders() {
  const city = cityInput.value.trim();
  const service = serviceInput.value.trim();

  providersEl.textContent = "Loading…";

  let query = supabase
    .from("providers")
    .select("id, name, service, city, phone, rating, jobs_done")
    .order("name", { ascending: true });

  if (city) query = query.eq("city", city);
  if (service) query = query.eq("service", service);

  const { data, error } = await query;

  if (error) {
    providersEl.textContent = "Error: " + error.message;
    return;
  }

  if (!data || data.length === 0) {
    providersEl.textContent = "No providers found.";
    return;
  }

  providersEl.innerHTML = "";
  data.forEach((row) => {
    const div = document.createElement("div");
    div.className = "provider";
    div.innerHTML = `
      <div class="name">${row.name}</div>
      <div>Service: ${row.service}</div>
      <div>City: ${row.city}</div>
      <div>Phone: ${row.phone}</div>
      <div>Rating: ${row.rating} ⭐</div>
      <div>Jobs done: ${row.jobs_done}</div>
    `;
    providersEl.appendChild(div);
  });
    }

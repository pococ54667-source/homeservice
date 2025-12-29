console.log("Home Services website running");
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hjpvadozhrdjugfrcffv.supabase.co",   // apna Supabase project URL
  "sb-publishable-key"                         // apna Supabase public key
);

async function loadProviders() {
  const { data, error } = await supabase
    .from("providers")
    .select("id, name, service, city, phone, rating, jobs_done");

  if (error) {
    console.error(error.message);
    return;
  }

  const list = document.getElementById("providers");
  data.forEach(row => {
    const div = document.createElement("div");
    div.textContent = `${row.name} — ${row.service} — ${row.city} — ${row.phone} — Rating: ${row.rating} — Jobs: ${row.jobs_done}`;
    list.appendChild(div);
  });
}

loadProviders();

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return res.json();
    } catch {
      // fall through to retry
    }
    if (i < retries - 1) await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  return null;
}

export async function getContentBlocksBySection(section: string) {
  const data = await fetchWithRetry(`${API_URL}/content?section=${section}`);
  return data || [];
}

export async function getContentBySection(section: string) {
  const data = await fetchWithRetry(`${API_URL}/content?section=${section}`);
  return data?.[0] || null;
}

export async function getDepartments() {
  const data = await fetchWithRetry(`${API_URL}/departments`);
  return data || [];
}

export async function getDepartmentProducts(departmentId: string) {
  const data = await fetchWithRetry(`${API_URL}/products?department=${departmentId}`);
  return data || [];
}

export async function getProductsByTag(tag: string) {
  const data = await fetchWithRetry(`${API_URL}/products?tag=${tag}`);
  return data || [];
}

export async function getPerks() {
  const data = await fetchWithRetry(`${API_URL}/perks`);
  return data || [];
}

export async function searchProducts(query: string) {
  const data = await fetchWithRetry(`${API_URL}/products?search=${encodeURIComponent(query)}`);
  return data || [];
}

export async function logCartAdd(item: { productId: string; name: string; price: number; quantity: number }) {
  try {
    await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "cart",
        items: [{ productId: item.productId, name: item.name, price: item.price, quantity: item.quantity }],
      }),
    });
  } catch {
    // best-effort, never block the UI
  }
}

export async function submitOrder(payload: any) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, status: "ordered" }),
  });
  if (!res.ok) throw new Error("Failed to place order");
  return res.json();
}

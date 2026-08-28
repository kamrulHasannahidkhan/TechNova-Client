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

export async function getProducts() {
  const data = await fetchWithRetry(`${API_URL}/products`);
  return data || [];
}

export async function getProduct(id: string) {
  return fetchWithRetry(`${API_URL}/products/${id}`);
}

export async function getContentBySection(section: string) {
  const data = await fetchWithRetry(`${API_URL}/content?section=${section}`);
  return data?.[0] || null;
}

export async function getSections() {
  const data = await fetchWithRetry(`${API_URL}/sections`);
  return data || [];
}

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

export async function getContentBySection(section: string) {
  const data = await fetchWithRetry(`${API_URL}/content?section=${section}`);
  return data?.[0] || null;
}

export async function getDepartments() {
  const data = await fetchWithRetry(`${API_URL}/departments`);
  return data || [];
}

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getContentBySection(section: string) {
  try {
    const res = await fetch(`${API_URL}/content?section=${section}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

export async function getSections() {
  try {
    const res = await fetch(`${API_URL}/sections`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

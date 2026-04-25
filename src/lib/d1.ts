const getBaseUrl = () => {
  return process.env.D1_API_URL || "https://d1-rest.vigiq4.workers.dev";
};

const getHeaders = () => {
  return {
    "Authorization": `Bearer ${process.env.D1_API_SECRET || "kmkl26"}`,
    "Content-Type": "application/json",
  };
};

export async function d1Query(query: string, params: any[] = []) {
  try {
    const res = await fetch(`${getBaseUrl()}/query`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ query, params }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`D1 Query Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("d1Query failed:", error);
    return [];
  }
}

export async function d1Get(table: string, queryParams: Record<string, any> = {}) {
  try {
    const url = new URL(`${getBaseUrl()}/rest/${table}`);
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`D1 Get Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("d1Get failed:", error);
    return [];
  }
}

export async function d1Post(table: string, payload: any) {
  try {
    const res = await fetch(`${getBaseUrl()}/rest/${table}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`D1 Post Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("d1Post failed:", error);
    throw error;
  }
}

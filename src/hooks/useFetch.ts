"use client";

interface useFetchProps {
  url: string;
  id?: string;
  method: string;
  reqBody?: any;
}

export const useFetch = async ({ url, id, method, reqBody }: useFetchProps) => {
  try {
    if (method === "GET") {
      const response = await fetch(url);
      const results = await response.json();
      return results;
    } else if (method === "POST") {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      return results;
    } else if (method === "PUT") {
      {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const results = await response.json();
        return results;
      }
    } else if (method === "PATCH") {
      {
        const response = await fetch(url, {
          method: "PATCH",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const results = await response.json();
        return results;
      }
    } else if (method === "DELETE") {
      const response = await fetch(url, {
        method: "DELETE",
      });
      const results = response.json();
      return results;
    }
  } catch (e) {
    console.error(e);
  }
};

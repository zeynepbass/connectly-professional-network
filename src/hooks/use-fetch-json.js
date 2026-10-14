"use client";

import { useCallback, useEffect, useState } from "react";

export function useFetchJson(url) {
  const [result, setResult] = useState({ url: null, data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        const body = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(body?.error?.message ?? `Request failed with status ${response.status}`);
        }
        setResult({ url, data: body, error: null });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setResult({ url, data: null, error });
      });

    return () => controller.abort();
  }, [url, attempt]);

  const retry = useCallback(() => {
    setResult({ url: null, data: null, error: null });
    setAttempt((count) => count + 1);
  }, []);

  const isCurrent = result.url === url;
  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: !isCurrent,
    retry,
  };
}

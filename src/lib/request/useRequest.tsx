import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAppQuery<T>(
  url: string,
  queryParams?: { [key: string]: string | string[] | number | number[] },
) {
  const queryKey = [url, queryParams];
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const result = await fetch(url, { method: "GET" });

      try {
        if (result.ok) {
          const json = await result.json();
          return json.data as T;
        }
      } catch {
        throw new Error("Something went wrong");
      }
    },
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: [url] });
  }

  /**
   * @deprecated
   */
  function optimistic() {}

  return {
    ...query,
    invalidate,
  };
}

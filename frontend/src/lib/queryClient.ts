import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      gcTime: 5 * 60_000,
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      refetchOnWindowFocus: true
    }
  }
});

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { portfolioSnapshot } from "./data/portfolioSnapshot";
import { queryClient } from "./lib/queryClient";
import "./styles/index.css";

queryClient.setQueryData(["profile"], portfolioSnapshot.profile);
queryClient.setQueryData(["skills"], portfolioSnapshot.skills);
queryClient.setQueryData(["projects"], portfolioSnapshot.projects);
queryClient.setQueryData(["services"], portfolioSnapshot.services);
queryClient.setQueryData(["experience"], portfolioSnapshot.experience);
queryClient.setQueryData(["testimonials"], portfolioSnapshot.testimonials);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

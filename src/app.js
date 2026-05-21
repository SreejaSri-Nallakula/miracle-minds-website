import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SiteLayout } from "./components/SiteLayout";
import { HomePage } from "./page/home.jsx";
import { AboutPage } from "./page/about.jsx";
import { AdmissionsPage } from "./page/admissions.jsx";
import { FacilitiesPage } from "./page/facilities.jsx";
import { GalleryPage } from "./page/gallery.jsx";
import { ContactPage } from "./page/contact.jsx";

const queryClient = new QueryClient();
const h = React.createElement;

function NotFoundPage() {
  return h(
    "div",
    { className: "flex min-h-[60vh] items-center justify-center px-4 text-center" },
    h(
      "div",
      null,
      h("h1", { className: "text-4xl font-bold text-ink" }, "404"),
      h("p", { className: "mt-2 text-ink/70" }, "Page not found."),
    ),
  );
}

export default function App() {
  return h(
    QueryClientProvider,
    { client: queryClient },
    h(
      BrowserRouter,
      null,
      h(
        Routes,
        null,
        h(
          Route,
          { element: h(SiteLayout) },
          h(Route, { index: true, element: h(HomePage) }),
          h(Route, { path: "about", element: h(AboutPage) }),
          h(Route, { path: "admissions", element: h(AdmissionsPage) }),
          h(Route, { path: "facilities", element: h(FacilitiesPage) }),
          h(Route, { path: "gallery", element: h(GalleryPage) }),
          h(Route, { path: "contact", element: h(ContactPage) }),
          h(Route, { path: "home", element: h(Navigate, { to: "/", replace: true }) }),
          h(Route, { path: "*", element: h(NotFoundPage) }),
        ),
      ),
    ),
  );
}

import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Head from "next/head";

const config: DocsThemeConfig = {
  logo: (
    <>
      <img
        src="/favicon.png"
        style={{ height: 20, objectFit: "contain" }}
        alt="icon"
        className="logo"
      />
      <p style={{ margin: 5 }}>Wayne's profile</p>
    </>
  ),
  head: (
    <>
      <title>Wayne's Portfolio</title>
      <meta
        name="description"
        content="Hello, I'm Wayne, a fullstack deveploer."
      />{" "}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />{" "}
    </>
  ),
  project: {
    link: "https://github.com/WayneLai0127/personal-portfolio",
  },
  docsRepositoryBase: "https://github.com/WayneLai0127/personal-portfolio",
  footer: {
    text: `Wayne's personal portfolio site powered by Nextra`,
  },
};

export default config;

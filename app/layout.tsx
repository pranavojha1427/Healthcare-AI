import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthcare AI District Manager Dashboard",
  description: "Federated Digital Twin Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Public+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                colors: {
                  "surface-variant": "#d3e4fe",
                  "surface-dim": "#cbdbf5",
                  "on-primary-fixed-variant": "#3f465c",
                  "inverse-primary": "#bec6e0",
                  "error": "#ba1a1a",
                  "on-primary": "#ffffff",
                  "on-primary-fixed": "#131b2e",
                  "inverse-on-surface": "#eaf1ff",
                  "surface-container-highest": "#d3e4fe",
                  "primary": "#000000",
                  "tertiary-container": "#00210a",
                  "on-tertiary-fixed": "#00210a",
                  "surface-container": "#e5eeff",
                  "on-error": "#ffffff",
                  "on-error-container": "#93000a",
                  "on-secondary": "#ffffff",
                  "tertiary": "#000000",
                  "error-container": "#ffdad6",
                  "primary-fixed": "#dae2fd",
                  "on-surface-variant": "#45464d",
                  "on-secondary-fixed-variant": "#0039b5",
                  "tertiary-fixed-dim": "#79db8d",
                  "background": "#f8f9ff",
                  "on-surface": "#0b1c30",
                  "outline-variant": "#c6c6cd",
                  "secondary-container": "#4069f2",
                  "tertiary-fixed": "#95f8a7",
                  "on-secondary-container": "#fffbff",
                  "surface-bright": "#f8f9ff",
                  "surface-container-low": "#eff4ff",
                  "surface-container-high": "#dce9ff",
                  "outline": "#76777d",
                  "on-background": "#0b1c30",
                  "primary-container": "#131b2e",
                  "secondary": "#1d4ed8",
                  "secondary-fixed": "#dce1ff",
                  "on-secondary-fixed": "#001551",
                  "on-tertiary-fixed-variant": "#005323",
                  "on-tertiary": "#ffffff",
                  "surface-tint": "#565e74",
                  "inverse-surface": "#213145",
                  "on-tertiary-container": "#339650",
                  "surface-container-lowest": "#ffffff",
                  "secondary-fixed-dim": "#b7c4ff",
                  "primary-fixed-dim": "#bec6e0",
                  "surface": "#f8f9ff",
                  "on-primary-container": "#7c839b",
                },
                fontFamily: {
                  "headline-md": ["Public Sans"],
                  "headline-sm": ["Public Sans"],
                  "headline-lg": ["Public Sans"],
                  "code-sm": ["JetBrains Mono"],
                  "label-sm": ["JetBrains Mono"],
                  "body-lg": ["Public Sans"],
                  "label-md": ["JetBrains Mono"],
                  "body-md": ["Public Sans"],
                  "body-sm": ["Public Sans"],
                  "headline-xl": ["Public Sans"],
                  "headline-xl-mobile": ["Public Sans"],
                },
              }
            }
          }
        ` }} />
      </head>
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}

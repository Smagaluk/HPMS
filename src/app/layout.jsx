import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: {
    default: "Heritage Property Management Services",
    template: "%s | Heritage Property Management Services",
  },
  description:
    "Heritage Living — thoughtful property management that helps residents feel at home and businesses feel proud of where they work. Care for the property. Respect for the people.",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

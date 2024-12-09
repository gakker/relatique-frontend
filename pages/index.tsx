import Image from "next/image";
import localFont from "next/font/local";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import Login from "./login";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  if (!user.id) {
    return <Login />;
  } else {
    return <h1>Welcome to healtcare CRM</h1>;
  }
}

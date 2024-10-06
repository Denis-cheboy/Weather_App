"use client";
import WeatherDashboard from "./components/WeatherDashboard";
import { SnackbarProvider } from "notistack";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <SnackbarProvider>
        <WeatherDashboard />
      </SnackbarProvider>
    </main>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { OpenedMenuIdProvider } from "./contextProviders/OpenedMenuId/OpenedMenuIdProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { WindowSizeProvider } from "./contextProviders/WindowSize/WindowSizeProvider"
import { LanguageProvider } from "./contextProviders/Language/LanguageProvider"
import { CurrencyProvider } from "./contextProviders/Currency/CurrencyProvider"
import { SidebarProvider } from "./contextProviders/Sidebar/SidebarProvider"
import { RouterProvider } from "react-router"
import { ThemeProvider } from "./contextProviders/Theme/ThemeProvider"
import { AuthProvider } from "./contextProviders/Auth/AuthProvider"
import { routeConfig } from "./routeConfig"
import { Suspense } from "react"
import "./config/PDFWorkerConfig"
import "./styles/index/App.scss"

export default function App(){
  const queryClientProvider = new QueryClient({
    defaultOptions : {
      queries : {
        throwOnError: true  
      }
    }
  })

  return (
    <Suspense>      
    <QueryClientProvider client={queryClientProvider}>
    <OpenedMenuIdProvider>
    <WindowSizeProvider>
    <SidebarProvider>
    <ThemeProvider>
    <LanguageProvider>
    <CurrencyProvider>  
    <AuthProvider>

      <RouterProvider router={routeConfig}/>
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="top-left" />

    </AuthProvider>
    </CurrencyProvider>
    </LanguageProvider>
    </ThemeProvider>
    </SidebarProvider>
    </WindowSizeProvider>
    </OpenedMenuIdProvider>
    </QueryClientProvider>
    </Suspense>
  )
}
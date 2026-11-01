import { BooksFormProvider } from './contextProviders/BooksForm/BooksFormProvider.tsx'
import { AdminSettingsPage } from './pages/AdminPages/AdminSettingsPage/AdminSettingsPage.tsx'
import { AdminFeedbackPage } from './pages/AdminPages/AdminFeedbackPage/AdminFeedbackPage.tsx'
import { AnonymousRoute } from './hoc/AnonymousRoute.tsx'
import { StatisticsPage } from './pages/AdminPages/StatisticsPage/StatisticsPage.tsx'
import { AdsConfigPage } from './pages/AdminPages/AdsConfigPage/AdsConfigPage.tsx'
import { DashboardPage } from './pages/AdminPages/DashboardPage/Dashboard.tsx'
import { PrivateRoute } from './hoc/PrivateRoute.tsx'
import { ReviewsPage } from './pages/ReviewsPage/ReviewsPage.tsx'
import { GenresPage } from './pages/GenresPage/GenresPage.tsx'
import { LikedsPage } from './pages/LikedsPage/LikedsPage.tsx'
import { TablesPage } from './pages/AdminPages/TablesPage/TablesPage.tsx'
import { UserRoute } from './hoc/UserRoute.tsx'
import { AuthRoute } from './hoc/AuthRoute.tsx'
import { CartPage } from './pages/CartPage/CartPage.tsx'
import { CheckoutPage } from './pages/Checkout/CheckoutPage.tsx'
import { UiLayout } from './components/Layouts/UiLayout/UiLayout.tsx'
import { FAQPage } from './pages/FAQPage/FAQPage.tsx'
import { BooksTable } from './pages/AdminPages/TablesPage/Tables/BooksTable/BooksTable.tsx'
import { BookConfigPage } from './pages/AdminPages/DataConfigPages/BookConfigPage/BookConfigPage.tsx'
import { AuthorsTable } from './pages/AdminPages/TablesPage/Tables/AuthorsTable/AuthorsTable.tsx'
import { GenresTable } from './pages/AdminPages/TablesPage/Tables/GenresTable/GenresTable.tsx'
import { ReviewsTable } from './pages/AdminPages/TablesPage/Tables/ReviewsTable/ReviewsTable.tsx'
import { AuthorConfigPage } from './pages/AdminPages/DataConfigPages/AuthorConfigPage/AuthorConfigPage.tsx'
import { GenreConfigPage } from './pages/AdminPages/DataConfigPages/GenreConfigPage/GenreConfigPage.tsx'
import { CheckoutCompletePage } from './pages/Checkout/CheckoutCompletePage/CheckoutCompletePage.tsx'
import { createBrowserRouter, Navigate } from 'react-router'
import { ShoppingsPage } from "./pages/ShoppingsPage/ShoppingsPage.tsx"
import HomePage from './pages/HomePage/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
import BooksPage from './pages/BooksPage/BooksPage.tsx'
import AuthorsPage from './pages/AuthorsPage/AuthorsPage.tsx'
import AuthorPage from './pages/AuthorPage/AuthorPage.tsx'
import AboutPage from './pages/AboutPage/AboutPage.tsx'
import BookPage from './pages/BookPage/BookPage.tsx'
import AuthLayout from './components/Layouts/AuthLayout/AuthLayout.tsx'
import LoginForm from './components/Forms/RegForms/LoginForm/LoginForm.tsx'
import AdminLayout from './components/Layouts/AdminLayout/AdminLayout.tsx'
import SigninForm from './components/Forms/RegForms/SigninForm/SigninForm.tsx'
import FeedbackPage from './pages/FeedbackPage/FeedbackPage.tsx'
import { LocationsPage } from './pages/LocationsPage/LocationsPage.tsx'
import { ContactsPage } from './pages/ContactsPage/ContactsPage.tsx'
import { OrdersTable } from './pages/AdminPages/TablesPage/Tables/OrdersTable/OrdersTable.tsx'
import { OrderConfigPage } from './pages/AdminPages/DataConfigPages/OrderConfigPage/OrderConfigPage.tsx'

export const routeConfig = createBrowserRouter([
  { 
    path: "/", // (en, ru, am) լոկալիզացիաի համար
    element: <UserRoute children={<UiLayout />}/>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <Navigate to="/" replace/> },
      { path: "about", element: <AboutPage /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "contacts", element: <ContactsPage /> },
      { path: "faq", element: <FAQPage /> },
      { path: "likeds", element: <LikedsPage />},
      { path: "genre/:id", element: <GenresPage /> },
      { path: "author/:id", element: <AuthorPage /> },  
      { path: "authors/:page", element: <AuthorsPage /> },
      { path: "authors/:page/:search", element: <AuthorsPage /> },
      { path: "reviews/:bookId/:page", element: <ReviewsPage />},  
      { path: "book/:id", element: <BookPage /> },
      { path: "books/*", element: <BooksFormProvider children={<BooksPage />}/> },
      // probably we need to access anonymous users also to visit feedback page 
      // { path: "feedback", element: <AuthRoute children={<FeedbackPage />} /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "cart", element: <AuthRoute children={<CartPage />} />},
      { path: "shoppings", element: <AuthRoute children={<ShoppingsPage />} />},
      { path: "profile", element: <AuthRoute children={<ProfilePage />}/> },
      { path: "*", element: <NotFoundPage /> },
    ]
  },

  { path: "/checkout/payment", element: <CheckoutPage /> },
  { path: "/checkout/complete/:sessionId", element: <CheckoutCompletePage />, },

  {
    path: "/auth/",
    element: <AnonymousRoute children={<AuthLayout />}/>,
    children: [
      // forgot password, external authentication
      { path: "login", element: <LoginForm /> },
      { path: "signin", element: <SigninForm />},
    ]
  },
  {
    path: "/admin/",
    element: <PrivateRoute children={<AdminLayout />} />,
    children: [   
      { index: true, path: "dashboard", element: <DashboardPage />},
      { path: "", element: <Navigate to={"dashboard"}/>},
      { path: "config/book/", element: <BookConfigPage /> },
      { path: "config/book/:id", element: <BookConfigPage /> },
      { path: "config/author/", element: <AuthorConfigPage /> },
      { path: "config/author/:id", element: <AuthorConfigPage /> },
      { path: "config/genre", element: <GenreConfigPage /> },
      { path: "config/genre/:id", element: <GenreConfigPage /> },
      { path: "config/order/:id", element: <OrderConfigPage /> },
      { path: "tables/", 
        element: <TablesPage />,
        children: [
          { index: true, path: "books", element: <BooksTable withActions={true}/>, },
          { path: "", element: <Navigate to={"books"} /> },
          { path: "authors", element: <AuthorsTable withActions={true}/> },
          { path: "genres",  element: <GenresTable  withActions={true}/> },
          { path: "reviews", element: <ReviewsTable /> },
          { path: "orders",  element: <OrdersTable /> },
          // - we don't need to seperate reviews table (probably)
        ]
      },
      { path: "statistics", element: <StatisticsPage />},
      { path: "settings", element: <AdminSettingsPage />},
      { path: "feedback", element: <AdminFeedbackPage />},
      { path: "ads-config", element: <AdsConfigPage />},
      { path: "*", element: <NotFoundPage />}
    ]
  }
])
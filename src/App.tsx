import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProfileLayout from "./layouts/ProfileLayout";
import { UserProfile } from "./components/UserProfile";
import { FeedPage } from "./pages/FeedPage";
import { AllPosts } from "./components/AllPosts";
import PageNotFound from "./pages/PageNotFound";


const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
           <></>
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout >
           <LoginPage/>
          </Layout>
        }
      />

      <Route
        path="/signup"
        element={
          <Layout >
           <RegisterPage/>
          </Layout>
        }
      />

      <Route
        path="/reset-password"
        element={
          <Layout >
           <ForgetPasswordPage/>
          </Layout>
        }
      />

      <Route
        path="/user-profile"
        element={
          <Layout >
       
           <UserProfile/>
           <AllPosts/>
          </Layout>
        }
      />

      <Route
        path="/feed"
        element={
          <Layout >
           <FeedPage/>
          </Layout>
        }
      />
      <Route
        path="/*"
        element={
          <Layout >
           <PageNotFound/>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import UpdateProfilePage from './pages/Authentication/UpdateProfilePage';


import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AuthLayout from './layout/AuthLayout'; // New layout for authentication pages
import ServiceList from './services/ServiceList';
import ServiceDetailsPage from './services/ServiceDetailsPage';
import UpdateServicePage from './services/UpdateServicePage';
import CreateServicePage from './services/CreateServicePage';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import ListPermissions from './pages/Permissions.tsx/ListPermissions';
import CreatePermission from './pages/Permissions.tsx/CreatePermission';
import UpdatePermissionPage from './pages/Permissions.tsx/UpdatePermissionPage';
import RoleListPage from './pages/Roles.tsx/RoleListPage';
import CreateRolePage from './pages/Roles.tsx/CreateRolePage';
import RoleUpdatePage from './pages/Roles.tsx/RoleUpdatePage';
import UserListPage from './pages/InternalUsers/UserListPage';
import UpdateUserPage from './pages/InternalUsers/UpdateUserPage';
import CreateUser from './pages/InternalUsers/CreateUser';
import DetailsSingleUser from './pages/InternalUsers/DetailsSingleUser';
import UserProfile from './pages/Authentication/ProfilePage';
import BlogList from './pages/Blogs/BlogList';
import BlogDetails from './pages/Blogs/BlogDetails';
import BlogUpdatePage from './pages/Blogs/BlogUpdatePage';
import CreateBlogPage from './pages/Blogs/CreateBlogPage';
import BusinessContactsPage from './pages/Contacts/BusinessContactsPage';
import ComplaintContactsPage from './pages/Contacts/ComplaintContactsPage';
import ContactDetailsPage from './pages/Contacts/ContactDetailsPage';
import ContactUpdatePage from './pages/Contacts/ContactUpdatePage';
import ExpertiseList from './pages/Content/ExpertiseData/ExpertiseList';
import UpdateExpertisePage from './pages/Content/ExpertiseData/UpdateExpertisePage';
import CreateExpertisePage from './pages/Content/ExpertiseData/CreateExpertisePage';
import ExpertiseSectionList from './pages/Content/ExpertiseSection/ExpertiseSectionList';
import UpdateExpertiseSectionPage from './pages/Content/ExpertiseSection/UpdateExpertiseSectionPage';
import CreateExpertiseSectionPage from './pages/Content/ExpertiseSection/CreateExpertiseSectionPage';
import BannerDataList from './pages/Content/Banner/ListBannerDataPage ';
import UpdateBannerDataPage from './pages/Content/Banner/UpdateBannerDataPage';
import CreateBannerDataPage from './pages/Content/Banner/CreateBannerDataPage';
import TestimonialList from './pages/Content/Testimonial/TestimonialList';
import UpdateTestimonial from './pages/Content/Testimonial/UpdateTestimonial';
import CreateTestimonial from './pages/Content/Testimonial/CreateTestimonial';
import HeroDataList from './pages/Content/HeroData/HeroDataList';
import UpdateHeroData from './pages/Content/HeroData/UpdateHeroData';
import CreateHeroData from './pages/Content/HeroData/CreateHeroData';
import HeroDataDetails from './pages/Content/HeroData/HeroDataDetails';
import CreateBrand from './pages/Content/Brand/CreateBrand ';
import BrandManagement from './pages/Content/Brand/BrandManagement';
import ShowcaseManagement from './pages/Content/ShowCase/ShowcaseManagement';
import CreateShowcase from './pages/Content/ShowCase/CreateShowcase';
import Dashboard from './pages/Dashboard/Dashboard';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthRoute = ['/auth/signin', '/auth/forgotpassword', '/auth/reset-password'].some((route) =>
    pathname.startsWith(route)
  );

  return loading ? (
    <Loader />
  ) : isAuthRoute ? (
    <AuthLayout>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />

          <Route
          path="/auth/forgotpassword"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ForgotPassword/>
            </>
          }
        />

<Route
          path="/auth/reset-password/:token"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ResetPassword/>
            </>
          }
        />

       
      </Routes>
    </AuthLayout>
  ) : (
    <DefaultLayout>
      <Routes>
      <Route
          path="/userprofile/:userID"
          element={
            <>
              <PageTitle title="Internal Users List" />
              <UserProfile />
            </>
          }
        />
        <Route
          path="/account-settings/:userID"
          element={
            <>
              <PageTitle title="Internal Users List" />
              <UpdateProfilePage />
            </>
          }
        />

      <Route
          path="/internalusers"
          element={
            <>
              <PageTitle title="Internal Users List" />
              <UserListPage />
            </>
          }
        />

<Route
          path="/update-user/:id"
          element={
            <>
              <PageTitle title="Internal Users List" />
              <UpdateUserPage />
            </>
          }
        />

<Route
          path="/details-user/:userId"
          element={
            <>
              <PageTitle title="Details Single User" />
              <DetailsSingleUser/>
            </>
          }
        />
<Route
          path="/create-user"
          element={
            <>
              <PageTitle title="Internal Users List" />
              <CreateUser />
            </>
          }
        />
      <Route
          path="/roles"
          element={
            <>
              <PageTitle title="Roles List" />
              <RoleListPage />
            </>
          }
        />
         <Route
          path="/create-role"
          element={
            <>
              <PageTitle title="Create Role" />
              <CreateRolePage />
            </>
          }
        />
<Route
          path="/update-role/:id"
          element={
            <>
              <PageTitle title="Update Role" />
              <RoleUpdatePage />
            </>
          }
        />
        

      <Route
          path="/permissions"
          element={
            <>
              <PageTitle title="Permissions List" />
              <ListPermissions />
            </>
          }
        />

<Route
          path="/create-permission"
          element={
            <>
              <PageTitle title="Permissions List" />
              <CreatePermission />
            </>
          }
        />

<Route
          path="/update-permission/:id"
          element={
            <>
              <PageTitle title="Permissions List" />
              <UpdatePermissionPage />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />





        <Route
          path="/profile/:id"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

<Route
          path="/serviceslist"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ServiceList />
            </>
          }
        />

<Route
          path="/service-details/:id"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ServiceDetailsPage />
            </>
          }
        />

<Route
          path="/create-service"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CreateServicePage />
            </>
          }
        />


<Route
          path="/update-service/:id"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UpdateServicePage />
            </>
          }
        />

        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <PageTitle title="List of Blogs" />
              <BlogList />
            </>
          }
        />
         <Route
          path="/details-blog/:id"
          element={
            <>
              <PageTitle title="Blog Details" />
              <BlogDetails />
            </>
          }
        />

<Route
          path="/update-blog/:id"
          element={
            <>
              <PageTitle title="Blog uUpdate" />
              <BlogUpdatePage />
            </>
          }
        />

<Route
          path="/create-blog"
          element={
            <>
              <PageTitle title="Blog Create" />
              <CreateBlogPage />
            </>
          }
        />

<Route
          path="/business-contacts"
          element={
            <>
              <PageTitle title="Blog Create" />
              <BusinessContactsPage />
            </>
          }
        />

<Route
          path="/complaint-contacts"
          element={
            <>
              <PageTitle title="Blog Create" />
              <ComplaintContactsPage />
            </>
          }
        />

<Route
          path="/details-contact/:id"
          element={
            <>
              <PageTitle title="Contact Details" />
              <ContactDetailsPage />
            </>
          }
        />

<Route
          path="/expertises"
          element={
            <>
              <PageTitle title="Expertise List" />
              <ExpertiseList />
            </>
          }
        />
        

        <Route
          path="/update-expertise/:id"
          element={
            <>
              <PageTitle title="Update Expertise" />
              <UpdateExpertisePage />
            </>
          }
        />

<Route
          path="/create-expertise"
          element={
            <>
              <PageTitle title="Create Expertise" />
              <CreateExpertisePage />
            </>
          }
        />

<Route
          path="/update-contact/:id"
          element={
            <>
              <PageTitle title="Contact Update" />
              <ContactUpdatePage />
            </>
          }
        />
       {/* Expertise Section */}

      <Route
          path="/expertise-section"
          element={
            <>
              <PageTitle title="Expertise Section List" />
              <ExpertiseSectionList />
            </>
          }
        /> 
        <Route
          path="/update-expertise-section/:id"
          element={
            <>
              <PageTitle title=" Upodate Expertise Section" />
              <UpdateExpertiseSectionPage />
            </>
          }
        /> 
        <Route
          path="/create-expertise-section"
          element={
            <>
              <PageTitle title=" Create Expertise Section" />
              <CreateExpertiseSectionPage />
            </>
          }
        /> 

        {/* Banner Data */}
        <Route
          path="/banners"
          element={
            <>
              <PageTitle title=" Baneers List" />
              <BannerDataList />
            </>
          }
        /> 
        <Route
          path="/update-banner/:id"
          element={
            <>
              <PageTitle title=" Update Banner" />
              <UpdateBannerDataPage />
            </>
          }
        /> 

<Route
          path="/create-banner"
          element={
            <>
              <PageTitle title=" Create Banner" />
              < CreateBannerDataPage />
            </>
          }
        /> 

        {/* Testimonoal Data  */}

        <Route
          path="/testimonials"
          element={
            <>
              <PageTitle title=" Testimonoal List" />
              < TestimonialList />
            </>
          }
        /> 
 <Route
          path="/update-testimonial/:id"
          element={
            <>
              <PageTitle title=" Update Testimonoal " />
              < UpdateTestimonial />
            </>
          }
        /> 
         <Route
          path="/create-testimonial"
          element={
            <>
              <PageTitle title=" Create Testimonoal " />
              < CreateTestimonial />
            </>
          }
        /> 

        {/* Hero Data */}
        <Route
          path="/herolist"
          element={
            <>
              <PageTitle title=" Hero Data List " />
              < HeroDataList />
            </>
          }
        />

<Route
          path="/update-herodata/:id"
          element={
            <>
              <PageTitle title="Update Hero Data " />
              < UpdateHeroData />
            </>
          }
        />
        <Route
          path="/create-herodata"
          element={
            <>
              <PageTitle title="Create Hero Data " />
              < CreateHeroData />
            </>
          }
        />

<Route
          path="/details-herodata/:id"
          element={
            <>
              <PageTitle title="Details Hero Data " />
              < HeroDataDetails />
            </>
          }
        />
        {/* Brand Section Data */}

        <Route
          path="/create-brand"
          element={
            <>
              <PageTitle title="Create Brand " />
              < CreateBrand />
            </>
          }
        />

<Route
          path="/brandlist"
          element={
            <>
              <PageTitle title="Brand List " />
              < BrandManagement />
            </>
          }
        />
        {/* Show Case Data */}
        <Route
          path="/showcaselist"
          element={
            <>
              <PageTitle title="ShowCase List " />
              < ShowcaseManagement />
            </>
          }
        />

<Route
          path="/create-showcase"
          element={
            <>
              <PageTitle title="Create ShowCase  " />
              < CreateShowcase />
            </>
          }
        />

      </Routes>

      
        
     

      
    </DefaultLayout>
  );
}

export default App;

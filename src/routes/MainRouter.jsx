import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../pages/authenticated/Layout/main-layout/MainLayout';
import UsersPage from '../pages/authenticated/users/UsersPage';
import EmailTemplatePage from '../pages/authenticated/email-template/EmailTemplatePage';
import SingleProjectPage from '../pages/authenticated/single-project/SingleProjectPage';
import NewProjectPage from '../pages/authenticated/new-project/NewProjectPage';
import NewEmail from '../pages/authenticated/new-email/NewEmail';
import Projects from '../pages/authenticated/projects/Projects';
import ProfilePage from '../pages/authenticated/profile/ProfilePage';
import LoginPage from '../pages/authentication/login-page/LoginPage';
import PageNotFound from '../pages/authentication/page-not-found/PageNotFound';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<SingleProjectPage />} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="/edit-project/:id" element={<NewProjectPage />} />
        <Route path="/email-template" element={<EmailTemplatePage />} />
        <Route path="/new-email-template" element={<NewEmail />} />
        <Route path="/edit-email-template/:id" element={<NewEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRouter;

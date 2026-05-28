import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ViewStory from './components/ViewStory.jsx'
import './index.css'
import App from './App.jsx'
import Profile from './components/Profile.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<App />
    },
    {
      path:"/story/:id/:nxt",
      element:<ViewStory/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)

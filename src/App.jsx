import { Suspense } from "react";
import "./App.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";


function App() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
   </Suspense>
  )
};

export default App;

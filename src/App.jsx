import { Suspense, useEffect } from "react";
import "./App.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/slices/authSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUserFromStorage());
  },[dispatch])
  return (
    
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
  );
}

export default App;

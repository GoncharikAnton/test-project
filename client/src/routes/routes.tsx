import { useContext, useEffect, useState } from "react";
import {Route, Routes, Navigate, useLocation} from "react-router";
import { TestContext } from "../context/testContext";
const HomePage = () => {
  const [dateNow, setDateNow] = useState(Date.now());
  const [count, setCount] = useState(0);
  const date = new Date(dateNow)
  useEffect(() => {
    console.log(count, 'yep it is an effect')
    // const interval = setInterval(() => setDateNow(Date.now()), 1000);
    // return () => clearInterval(interval);
  }, [count])
  return <>
  <div>
    <div>HomePage</div>
    {date.toISOString()}
    {testBtnWithDebounce(count, setCount)}
  </div>
  </>
  
}
const debounce = (func: any, delay: number) => {
  let timerId: any = null;
  
  return function (){
    clearTimeout((timerId as any))
    timerId = setTimeout(func, delay)
  } 
}
const testBtnWithDebounce = (count: number, setCount: Function) => {
  return <>
    <div>
      <button onClick={
        // debounce(() => console.log("I'm here"), 2000)
        () => setCount(count + 1)
        }>
          DEBOUNCE BTN
      </button>
    </div>
  </>
}
const Blogs = () => <div>Blogs</div>
const AboutUsPage = () => <div>AboutUsPage</div>
const AboutUsPageSettings = () => <div>AboutUsPage Settings</div>
const TourDetailPage = () => <div>TourDetailPage</div>
export const useRoutes = () => {
  const context = useContext(TestContext as any);
  console.log(context)
  return (
    <Routes>
        <Route path={'/'} index element={<HomePage/>}/>


        <Route path={'/blogs'}  element={<Blogs/>}/>

        <Route path={'about_us'} >
          <Route index element={<AboutUsPage/>} ></Route>
          <Route path={"settings"}
           element={<AboutUsPageSettings />} />
        </Route>

        <Route path={'/tours/:id'} element={<TourDetailPage/>}/>

        <Route
            path="*"
            element={<Navigate to="/"/>}
        />
    </Routes>

)
}
import "./App.css";
import Navbar from "./components/Navbar";
import Feeds from "./components/Feeds";
import Suggestions from "./components/Suggestions";


function App() {
  return (
    <>
    <header className=""><Navbar /></header>
    <div className="flex justify-center-safe pl-10 main_feed">
      <main className="w-150 "><Feeds/> </main>
      <aside className="  ml-20 w-80  Suggestions_set"><Suggestions /></aside>
    </div>
        
    </>
  );
}

export default App;

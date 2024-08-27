import { Painel } from "./components/partials/Painel";
import { Sidebar } from "./components/partials/Sidebar";


function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Painel />
    </div>
  );
}

export default App;

import './App.css'
import { Footer } from './components/Footer/Footer';
import Router from './Router';

function App() {

  return (
    <>
      <Router />
      
     <div className="pageWrapper">
      <div className="pageContent">
        {/* Todo o conteúdo da página */}
      </div>
      <Footer />
    </div>
     
    </>
  )

}

export default App
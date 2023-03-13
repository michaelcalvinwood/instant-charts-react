import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Templates from './components/Templates';

function App() {
  return (
    <div className="App">
      <FileUpload />
      <Templates test={true}/> 
    </div>
  );
}

export default App;
 
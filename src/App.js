import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Templates from './components/Templates';
import Options from './components/Options';
import Chart from './components/Chart';

function App() {
  return (
    <div className="App">
      <FileUpload />
      <Templates /> 
      <Options />
      <Chart />
    </div>
  );
}

export default App;
 
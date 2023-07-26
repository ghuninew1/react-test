import './App.css';
import Binance from './components/Binance';
import Themes from './components/Themes';


export default function App() {
  return (
    <Themes title={""}>
      <div className="App">
        <Binance />
        <div className='api'>
        </div>
      </div>
    </Themes>
  );
}
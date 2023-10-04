import './App.css';
import Intensity from './components/IntensityChart/Intensity';
import Relevance from './components/Relevance/Relevance';
import Likelihood from './components/Likelihood/Likelihood'
import { useSelector } from 'react-redux';
import { getAllYearDataStatus, getYearData } from './store/slices/countrySlice';
import YearData from './components/YearData/YearData';
import PieChartSource from './components/PieChartsSource/PieChartSource';
import PieChartTopics from './components/PieChartTopics/PieChartTopics';



function App() {

  const loadingStatus= useSelector(getAllYearDataStatus);


  return (
    <div className="App">
      <div className="header-main">
      </div>

      <div className="static-graphs">
        <div className="int-relv-box">
          <Intensity/>
          <Relevance/>
        </div>
      <Likelihood/>
        
      </div>

      <div className="pie-charts-container">
        <PieChartTopics/>
        <PieChartSource/>
      </div>

      {loadingStatus==='done'&& <YearData/> }
    </div>
  );
}

export default App;

import { useState, useCallback } from 'react';
import Layout      from './components/Layout';
import Dashboard   from './pages/Dashboard';
import StudyMode   from './pages/StudyMode';
import QuizMode    from './pages/QuizMode';
import PinnedWords from './pages/PinnedWords';
import PinnedQuiz  from './pages/PinnedQuiz';
import ReviewMode  from './pages/ReviewMode';
import './styles/global.css';
import './styles/main.css';
/*
  VIEW NAMES
  ----------
  'dashboard'
  'study'       params: { level }
  'quiz'        params: { level }
  'pinned-study'
  'pinned-quiz'
  'review'
*/

function App() {
  const [view, setView]     = useState('dashboard');
  const [params, setParams] = useState({});

  // navigate('quiz', { level: 'beginner' })  or  navigate('dashboard')
  const navigate = useCallback((nextView, nextParams = {}) => {
    setView(nextView);
    setParams(nextParams);
  }, []);

  const renderPage = () => {
    switch (view) {
      case 'study':
        return <StudyMode level={params.level} navigate={navigate} />;
      case 'quiz':
        return <QuizMode  level={params.level} navigate={navigate} />;
      case 'pinned-study':
        return <PinnedWords navigate={navigate} />;
      case 'pinned-quiz':
        return <PinnedQuiz  navigate={navigate} />;
      case 'review':
        return <ReviewMode  navigate={navigate} />;
      case 'dashboard':
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <Layout navigate={navigate} currentView={view}>
      {renderPage()}
    </Layout>
  );
}

export default App;
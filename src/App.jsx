import { useState, useCallback } from 'react';
import Layout      from './components/Layout';
import Dashboard   from './pages/Dashboard';
import SectionView from './pages/SectionView';
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
  'dashboard'      - Main dashboard with sections
  'section'        - Section view (shows sub-blocks) params: { sectionId }
  'study'          - Study mode for a sub-block params: { sectionId, subBlockId }
  'quiz'           - Quiz mode for a sub-block params: { sectionId, subBlockId }
  'pinned-study'   - Study pinned words
  'pinned-quiz'    - Quiz on pinned words
  'review'         - Review mode for words that need practice
*/

function App() {
  const [view, setView]     = useState('dashboard');
  const [params, setParams] = useState({});

  const navigate = useCallback((nextView, nextParams = {}, options = {}) => {
    setView(nextView);
    setParams(nextParams);
    // Handle any message options if needed
    if (options.doneMsg) {
      // You could show a toast notification here
      console.log(options.doneMsg);
    }
  }, []);

  const renderPage = () => {
    switch (view) {
      case 'section':
        return <SectionView sectionId={params.sectionId} navigate={navigate} />;
      case 'study':
        return <StudyMode sectionId={params.sectionId} subBlockId={params.subBlockId} navigate={navigate} />;
      case 'quiz':
        return <QuizMode sectionId={params.sectionId} subBlockId={params.subBlockId} navigate={navigate} />;
      case 'pinned-study':
        return <PinnedWords navigate={navigate} />;
      case 'pinned-quiz':
        return <PinnedQuiz navigate={navigate} />;
      case 'review':
        return <ReviewMode navigate={navigate} />;
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
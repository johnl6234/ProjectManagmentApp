import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboardPage';
import TaskPage from './pages/taskPage';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';
import ProtectedRoute from './pages/protectedRoute';
import MainPage from './pages/mainPage';
import BoardView from './components/project/views/boardView';
import CalendarView from './components/project/views/calendarView';
import ListView from './components/project/views/listView';
import ProjectPage from './pages/projectPage';

import './index.css';
import { IconContext } from 'react-icons';
import TimelineView from './components/project/views/timelineView';

function App() {
	return (
		<IconContext.Provider value={{ size: '25px' }}>
			<Routes>
				{/* Layout route */}
				<Route
					element={
						<ProtectedRoute>
							<MainPage />
						</ProtectedRoute>
					}>
					{/* Dashboard */}
					<Route path='/' element={<DashboardPage />} />

					{/* Project + its views */}
					<Route path='/project/:projectId' element={<ProjectPage />}>
						<Route path='board' element={<BoardView />} />
						<Route path='list' element={<ListView />} />
						<Route path='calendar' element={<CalendarView />} />
						<Route path='timeline' element={<TimelineView />} />
						{/* Task page */}
						<Route path='task/:taskId' element={<TaskPage />} />
					</Route>
					{/* Catch-all */}
					<Route path='*' element={<Navigate to='/' replace />} />
				</Route>

				{/* Auth routes (outside layout) */}
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</IconContext.Provider>
	);
}

export default App;

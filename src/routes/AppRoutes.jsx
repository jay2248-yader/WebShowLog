import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../Screen/HomeScreen';
import ShowLogScreen from '../Screen/ShowLogScreen';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROOT → HOME (replace สำคัญมาก) */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomeScreen />} />

      <Route path="/:logType" element={<ShowLogScreen />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

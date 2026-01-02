import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { CourseList, Course } from './components/CourseList';
import { PaymentPage, PurchaseDetails } from './components/PaymentPage';
import { PurchaseSuccess } from './components/PurchaseSuccess';

type AppState = 'auth' | 'courses' | 'payment' | 'success';

export default function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
    setAppState('courses');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCourse(null);
    setPurchaseDetails(null);
    setAppState('auth');
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setAppState('payment');
  };

  const handlePaymentSuccess = (details: PurchaseDetails) => {
    setPurchaseDetails(details);
    setAppState('success');
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setPurchaseDetails(null);
    setAppState('courses');
  };

  return (
    <div className="size-full">
      {appState === 'auth' && <AuthPage onLogin={handleLogin} />}

      {appState === 'courses' && user && (
        <CourseList user={user} onSelectCourse={handleSelectCourse} onLogout={handleLogout} />
      )}

      {appState === 'payment' && selectedCourse && user && (
        <PaymentPage
          course={selectedCourse}
          user={user}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={handleBackToCourses}
        />
      )}

      {appState === 'success' && purchaseDetails && (
        <PurchaseSuccess purchaseDetails={purchaseDetails} onBackToCourses={handleBackToCourses} />
      )}
    </div>
  );
}

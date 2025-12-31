import { useNavigate } from 'react-router-dom';

import { LOG_CONFIG } from '../config/AppLogConfig';
import HomeCard from '../components/home/HomeCard';
import HomeHeader from '../components/home/HomeHeader';

export default function HomeScreen() {
  const navigate = useNavigate();

  // เมื่อคลิก card
  const handleOpenLogs = (card) => {
    if (!card.path) {
      alert('CSC Print Barcode ກຳລັງພັດທະນາ');
      return;
    }

    navigate(card.path, {
      state: {
        title: card.title,
        source: card.source,
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundImage: "url('/long_in.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-6xl">

        {/* Header */}
        <HomeHeader />

        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full">
            {LOG_CONFIG.map((card) => (
              <HomeCard
                key={card.id}
                card={card}
                onClick={() => handleOpenLogs(card)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

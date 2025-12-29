import { useNavigate } from 'react-router-dom';

import logoCsc from '../assets/Logo/logoCsc.png';
import barcodeIcon from '../assets/Icon/ph_barcode-duotone.svg';
import saleIcon from '../assets/Icon/streamline-ultimate_shop-sale-1-bold.svg';
import advanceIcon from '../assets/Icon/mdi_network-point-of-sale.svg';

export default function HomeScreen() {
  const navigate = useNavigate();

  // Log source
  const CSC_SALE_URL = '/api/out.txt';
  const CSC_PRINT_URL = '/api/out.txt';

  // Mapping Card → Path + Source
  const LOG_CONFIG = {
    marketing: {
      title: 'CSC Marketing',
      path: '/CSC_Marketing',
      source: CSC_SALE_URL,
      icon: saleIcon,
    },
    print: {
      title: 'Print Barcode',
      path: '/Print_Barcode',
      source: CSC_PRINT_URL,
      icon: barcodeIcon,
    },
    advance: {
      title: 'CSC Advance',
      path: null,
      source: null,
      icon: advanceIcon,
    },
    
  };

  const handleOpenLogs = (config) => {

    if (!config.path) {
      alert('CSC Advance (placeholder)');
      return;
    }

    navigate(config.path, {
      state: {
        title: config.title,
        source: config.source,
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
        {/* Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img src={logoCsc} alt="CSC logo" className="h-20 sm:h-28 w-auto" />
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
          ກວດສອບການເຮັດວຽກຂອງລະບົບ
        </h1>

        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full">
            {Object.values(LOG_CONFIG).map((card) => (
              <div
                key={card.title}
                onClick={() => handleOpenLogs(card)}
                className="
                  group
                  bg-white rounded-2xl p-6 sm:p-8
                  shadow-lg
                  flex flex-col items-center justify-center
                  cursor-pointer
                  transition-all duration-300 ease-out
                  hover:-translate-y-2
                  hover:scale-[1.03]
                  hover:shadow-2xl
                  hover:ring-2 hover:ring-[#0F75BC]/40
                  active:scale-95
                "
              >
                {/* Icon */}
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <img src={card.icon} alt={card.title} className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>

                {/* Title */}
                <div
                  className="
                    text-[#0F75BC] font-bold text-lg sm:text-xl
                    transition-colors duration-300
                    group-hover:text-blue-600
                  "
                >
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import saleIcon from '../assets/Icon/streamline-ultimate_shop-sale-1-bold.svg';
import advanceIcon from '../assets/Icon/mdi_network-point-of-sale.svg';
import barcodeIcon from '../assets/Icon/ph_barcode-duotone.svg';

export const LOG_CONFIG = [
  {
    id: 'marketing',
    title: 'CSC Marketing',
    path: '/CSC_Marketing',
    source: '/api/out.txt',
    icon: saleIcon,
  },
  {
    id: 'advance',
    title: 'CSC Advance',
    path: '/CSC_Advance',
    source: '/api/out.txt',
    icon: advanceIcon,
  },
  {
    id: 'barcode',
    title: 'CSC Print Barcode',
    path: null,      
    source: null,
    icon: barcodeIcon,
    disabled: true,  
  },
];

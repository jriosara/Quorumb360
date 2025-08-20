// src/components/SocialLoginButtons.jsx
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { SiMicrosoft } from 'react-icons/si';

function SocialLoginButtons() {
    return (
        <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center w-full justify-center space-x-2 text-gray-500">
            <hr className="w-20 border-gray-300" />
            <span>o inicia sesión con</span>
            <hr className="w-20 border-gray-300" />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            <FaGoogle size={18} /> Google
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            <SiMicrosoft size={18} /> Microsoft
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            <FaApple size={18} /> Apple
            </button>
            <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
            <FaFacebook size={18} /> Facebook
            </button>
        </div>
        </div>
    );
}

export default SocialLoginButtons;
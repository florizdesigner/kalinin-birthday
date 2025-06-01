import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import ExplodingImage from '../components/ExplodingImage';

const Certificate = () => {
    const [showExplosion, setShowExplosion] = useState(true);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 overflow-hidden font-fancy">
            <AnimatePresence>
                {showExplosion ? (
                    <ExplodingImage onComplete={() => setShowExplosion(false)} />
                ) : (
                    <>
                        <Confetti
                            width={windowSize.width}
                            height={windowSize.height}
                            numberOfPieces={80}
                            recycle={false}
                            drawShape={ctx => {
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(15, 5);
                                ctx.lineTo(7.5, 15);
                                ctx.closePath();
                                ctx.fillStyle = '#111';
                                ctx.fill();
                            }}
                        />
                        <motion.div
                            className="bg-white border-8 border-red-500 shadow-xl rounded-3xl p-12 text-center max-w-2xl w-full z-10"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-wide">СЕРТИФИКАТ</h1>
                            <p className="text-lg text-gray-700 mb-1">НА СУММУ</p>
                            <p className="text-5xl font-black text-red-600 mb-6">750¥</p>
                            <p className="text-md text-gray-700 mb-1">ВЫДАН:</p>
                            <p className="text-2xl font-semibold">Владимиру Калинину</p>
                            <div className="mt-6 border-t pt-4 text-sm text-gray-500 italic">© cumitet, 2025</div>
                            <Link
                                to="/form"
                                className="mt-6 inline-block font-bold bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-lg transition duration-300"
                            >
                                Уже готов? Тыкай сюда
                            </Link>
                            <Link
                                to="https://raketacn.ru/poizon/kak-zakazat-s-poizon"
                                className="block mt-6 text-xs underline"
                                target="_blank"
                            >
                                Гайд по работе с приложением
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificate;
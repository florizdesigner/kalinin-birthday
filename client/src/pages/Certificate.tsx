import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import ExplodingImage from '../components/ExplodingImage';
import IntroAudio from '../assets/explosion.mp3';
import BackgroundAudio from '../assets/kalinin-song.mp3';
import VinylImage from '../assets/vinyl.png'; // Добавьте изображение винила
import ArtistImage from '../assets/kalinin-face.jpg'; // Добавьте изображение лица

const Certificate = () => {
    const [showExplosion, setShowExplosion] = useState(true);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [showPlayer, setShowPlayer] = useState(false);
    const introAudioRef = useRef<HTMLAudioElement | null>(null);
    const bgAudioRef = useRef<HTMLAudioElement | null>(null);
    const hasPlayedIntroRef = useRef(false);
    const vinylRef = useRef<HTMLDivElement>(null);

    // Трек информация
    const trackInfo = {
        title: "Калинин - Гимн кумитета",
        duration: "2:45"
    };

    useEffect(() => {
        if (!introAudioRef.current) {
            introAudioRef.current = new Audio(IntroAudio);
        }
        if (!bgAudioRef.current) {
            bgAudioRef.current = new Audio(BackgroundAudio);
            bgAudioRef.current.loop = true;
        }

        const handleIntroEnd = () => {
            setShowExplosion(false);
            setShowPlayer(true);
        };

        introAudioRef.current.addEventListener('ended', handleIntroEnd);

        if (!hasPlayedIntroRef.current) {
            introAudioRef.current.play().catch(e => console.error("Audio play error:", e));
            hasPlayedIntroRef.current = true;
        }

        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);

        // Анимация вращения винила
        const animateVinyl = () => {
            if (vinylRef.current) {
                vinylRef.current.style.transform = `rotate(${(Date.now() / 50) % 360}deg)`;
            }
            requestAnimationFrame(animateVinyl);
        };
        animateVinyl();

        return () => {
            window.removeEventListener('resize', handleResize);
            introAudioRef.current?.removeEventListener('ended', handleIntroEnd);
        };
    }, []);

    useEffect(() => {
        if (!showExplosion && bgAudioRef.current) {
            bgAudioRef.current.play().catch(e => console.error("Background audio play error:", e));
        }
    }, [showExplosion]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 overflow-hidden font-fancy">
            <AnimatePresence>
                {showExplosion ? (
                    <ExplodingImage onComplete={() => {}} />
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
                            <p className="text-5xl font-black text-red-600 mb-6">900¥</p>
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

            {/* Виниловый проигрыватель */}
            {showPlayer && (
                <motion.div
                    className="fixed bottom-6 left-6 bg-black bg-opacity-80 text-white p-4 rounded-lg flex items-center z-50 shadow-2xl"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <div className="relative w-16 h-16 mr-4">
                        <div
                            ref={vinylRef}
                            className="absolute inset-0 rounded-full bg-cover bg-center border-4 border-gray-700 transition-transform duration-100"
                            style={{
                                backgroundImage: `url(${VinylImage})`,
                                backgroundSize: 'cover'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="w-8 h-8 rounded-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${ArtistImage})` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-sm">{trackInfo.title}</div>
                        <div className="text-xs text-gray-400">{trackInfo.duration}</div>
                    </div>
                    <button
                        className="ml-4 w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition"
                        onClick={() => bgAudioRef.current?.pause()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 19V5m12 14V5" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Certificate;
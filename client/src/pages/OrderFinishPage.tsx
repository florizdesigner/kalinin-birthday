import {useEffect, useRef, useState} from 'react';
import FilaLogo from '../assets/fila.png';
import { motion } from 'framer-motion';
import SuccessAudio from '../assets/success.mp3';

const OrderFinishPage = () => {
    const [showImage, setShowImage] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Показываем изображение через 1 секунду
        const showTimer = setTimeout(() => {
            setShowImage(true);
        }, 1000);

        // Создаем элемент audio и воспроизводим музыку
        audioRef.current = new Audio(SuccessAudio);
        audioRef.current.loop = true; // Зацикливаем музыку
        audioRef.current.volume = 0.5; // Устанавливаем громкость (0-1)
        audioRef.current.play().catch(e => console.log("Автовоспроизведение заблокировано:", e));

        return () => {
            clearTimeout(showTimer);
            // Останавливаем музыку при размонтировании компонента
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-tr from-white flex-col via-red-50 to-red-100 flex items-center justify-center font-fancy p-4">
            <h1 className="text-2xl font-extrabold text-red-700 mb-8 text-center">
                Спасибо за заказ! В случае возникновения вопросов наш менеджер свяжется с вами
            </h1>

            {showImage && (
                <motion.img
                    width={300}
                    src={FilaLogo}
                    alt="Thank you"
                    className="my-20"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'mirror',
                        duration: 3,
                        ease: 'anticipate'
                    }}
                />
            )}

            <h3 className="text-xl font-extrabold text-red-700 mb-8 text-center">
                © cumitet, 2025
            </h3>
        </div>
    );
}

export default OrderFinishPage;
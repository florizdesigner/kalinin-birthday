import { useEffect, useState } from 'react';
import FilaLogo from '../assets/fila.png';
import { motion } from 'framer-motion';

const OrderFinishPage = () => {
    const [showImage, setShowImage] = useState(true);

    useEffect(() => {
        // Показываем изображение через 1 секунду
        const showTimer = setTimeout(() => {
            setShowImage(true);
        }, 1000);

        return () => clearTimeout(showTimer);
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
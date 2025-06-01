import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Link, Navigate, useNavigate} from "react-router-dom";
import OrderFinishPage from "./OrderFinishPage";

const Form = () => {
    const [links, setLinks] = useState('');
    const [description, setDescription] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [isSuccessfulSnackbar, setIsSuccessfulSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!links.trim()) {
            setIsSuccessfulSnackbar(false);
            setSnackbarText("Не указаны ссылки на товары");
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
            return;
        }

        const response = await fetch('/api/submit-order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({links, description})
        });

        response.json()
            .then((data) => {
                setIsSuccessfulSnackbar(true);
                setSnackbarText("Запросик улетел");
                setShowSnackbar(true);
                setTimeout(() => {
                    setShowSnackbar(false)
                    navigate("/success")
                }, 3000);
                return;
            })
            .catch((err) => {
                setIsSuccessfulSnackbar(false);
                setSnackbarText("Запросик не улетел");
                setShowSnackbar(true);
                setTimeout(() => setShowSnackbar(false), 3000);
                return;
            });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-tr from-white via-red-50 to-red-100 flex items-center justify-center font-fancy p-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{y: 40, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7}}
                className="bg-white border-8 border-red-500 rounded-3xl shadow-xl p-10 w-full max-w-lg"
            >
                <h2 className="text-3xl font-extrabold text-red-700 mb-8 text-center">Заполни форму</h2>
                <div className="space-y-4">
                    <textarea
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition resize-none field-sizing-content"
                        placeholder="Ссылки на вещи"
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                    />
                    <textarea
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition resize-none"
                        placeholder="Комментарий к заказу"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!links.trim()}
                        className={`w-full py-3 font-bold rounded-full transition-all duration-300 shadow-lg ${
                            !links.trim()
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                    >
                        Отправить
                    </button>
                    <Link
                        to="/"
                        className="text-center text-xs w-full mt-6 inline-block bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-lg transition duration-300"
                    >
                        Вернуться назад
                    </Link>
                </div>
            </motion.form>

            {/* Snackbar */}
            <AnimatePresence>
                {showSnackbar && (
                    <motion.div
                        initial={{y: 50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 50, opacity: 0}}
                        transition={{duration: 0.3}}
                        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-lg
                        ${isSuccessfulSnackbar ? 'bg-green-500' : 'bg-red-600'}`}
                    >
                        {snackbarText}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Form;
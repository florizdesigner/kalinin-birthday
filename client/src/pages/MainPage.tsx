import {Link} from "react-router-dom";
import React from "react";

const MainPage = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col bg-gray-100">
            <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-wide">ТЫ ГОТОВ?</h1>
            <div className="flex flex-row">
                <Link
                    to="/certificate"
                    className="mt-6 mx-2 inline-block font-bold bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-lg transition duration-300"
                >
                    Да
                </Link>
                <Link
                    to="/certificate"
                    className="mt-6 mx-2 inline-block font-bold bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-lg transition duration-300"
                >
                    Нет
                </Link>
                <Link
                    to="/certificate"
                    className="mt-6 mx-2 inline-block font-bold bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-lg transition duration-300"
                >
                    Не знаю
                </Link>
            </div>
        </div>
    );
}

export default MainPage;
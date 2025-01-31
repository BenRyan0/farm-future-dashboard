
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n, t } = useTranslation(); // Destructuring `i18n` to get current language and `changeLanguage`
    
    const languages = [
        { code: "en", lang: "English" },
        { code: "tl", lang: "Tagalog" },
        { code: "bs", lang: "Bisaya" },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // This changes the language
        setIsOpen(false); // Close dropdown after selection
    };

     // for the translation module function
    
    return (
        <div className="relative inline-block text-left w-[100px] justify-center items-center text-slate-200">
            {/* Dropdown Button */}
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-slate-200 bg-transparent focus:ring-0 focus:outline-none font-base rounded-lg text-[10px] px-2 py-1 text-center inline-flex items-center"
                type="button"
            >
               {t("languageLabel")}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    id="dropdown"
                    className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-slate-100 text-[10px] mt-1 w-[100px]"
                >
                    <ul className="py-2 text-[12px] text-slate-200 dark:text-gray-200 pt-1">
                        {languages.map((lang) => (
                            <li key={lang.code}>
                                <button
                                    className={
                                        `block w-full text-left px-4 py-2 dark:text-slate-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white` +
                                        (lang.code === i18n.language ? ' bg-gray-200 dark:bg-gray-700 text-white dark:text-white' : '')
                                    }
                                    onClick={() => changeLanguage(lang.code)}
                                >
                                    {lang.lang}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageDropdown;

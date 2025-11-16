import React from 'react';
import { LanguageProfile } from '../src/types';
import { AVAILABLE_LANGUAGES, LANGUAGE_LEVELS } from '../src/languageConstants';

interface LanguageSelectorProps {
  selectedLanguages: LanguageProfile[];
  onChange: (languages: LanguageProfile[]) => void;
  title: string;
  subtitle?: string;
  showLevel?: boolean;
  maxSelection?: number;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguages,
  onChange,
  title,
  subtitle,
  showLevel = false,
  maxSelection,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleAddLanguage = (lang: LanguageProfile) => {
    if (maxSelection && selectedLanguages.length >= maxSelection) {
      return;
    }

    const isAlreadySelected = selectedLanguages.some(l => l.code === lang.code);
    if (!isAlreadySelected) {
      onChange([...selectedLanguages, { ...lang, level: showLevel ? 'beginner' : undefined }]);
      setShowDropdown(false);
    }
  };

  const handleRemoveLanguage = (code: string) => {
    onChange(selectedLanguages.filter(l => l.code !== code));
  };

  const handleLevelChange = (code: string, level: string) => {
    onChange(
      selectedLanguages.map(l =>
        l.code === code ? { ...l, level: level as LanguageProfile['level'] } : l
      )
    );
  };

  const availableToAdd = AVAILABLE_LANGUAGES.filter(
    lang => !selectedLanguages.some(selected => selected.code === lang.code)
  );

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>

      {/* Selected Languages */}
      <div className="space-y-2">
        {selectedLanguages.map(lang => (
          <div
            key={lang.code}
            className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getFlagEmoji(lang.code)}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</span>
              </div>
              {showLevel && (
                <select
                  value={lang.level || 'beginner'}
                  onChange={(e) => handleLevelChange(lang.code, e.target.value)}
                  className="mt-2 w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LANGUAGE_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button
              onClick={() => handleRemoveLanguage(lang.code)}
              className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              aria-label="Remove language"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}

        {selectedLanguages.length === 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-center">
            <p className="text-gray-500 dark:text-gray-400">No languages selected</p>
          </div>
        )}
      </div>

      {/* Add Language Button */}
      {(!maxSelection || selectedLanguages.length < maxSelection) && availableToAdd.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Language</span>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto">
              {availableToAdd.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleAddLanguage(lang)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <span className="text-2xl">{getFlagEmoji(lang.code)}</span>
                  <span className="text-gray-900 dark:text-gray-100">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {maxSelection && selectedLanguages.length >= maxSelection && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Maximum {maxSelection} language{maxSelection > 1 ? 's' : ''} allowed
        </p>
      )}
    </div>
  );
};

// Helper function to get flag emoji based on language code
function getFlagEmoji(langCode: string): string {
  const flagMap: { [key: string]: string } = {
    en: '🇬🇧',
    zh: '🇨🇳',
    ja: '🇯🇵',
    ko: '🇰🇷',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
    it: '🇮🇹',
    pt: '🇵🇹',
    ru: '🇷🇺',
    ar: '🇸🇦',
    hi: '🇮🇳',
    th: '🇹🇭',
    vi: '🇻🇳',
    id: '🇮🇩',
    tr: '🇹🇷',
    pl: '🇵🇱',
    nl: '🇳🇱',
    sv: '🇸🇪',
    no: '🇳🇴',
  };
  return flagMap[langCode] || '🌐';
}

export default LanguageSelector;

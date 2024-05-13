'use client'

import { useState, useEffect } from 'react';

interface Language {
    iso_639_1: string;
    english_name: string;
}

const LanguageFilter = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<Language[]>([]);

    const fetchLanguages = async () => {
        try {
            const url = 'https://api.themoviedb.org/3/configuration/languages';
            const headers = {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            };

            const response = await fetch(url, { headers });
            const data = await response.json();
            setLanguages(data.sort((a: any, b: any) => a.english_name.localeCompare(b.english_name)));
        } catch (error) {
            setError('Failed to fetch languages. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchLanguages();
    }, []);

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <select 
            onChange={(event) => {
                const selectedLanguage = event.target.value;
                window.location.href = `/filter/language/${selectedLanguage}`;
            }}
            style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(128, 128, 128, 0.4)',
                padding: '10px',
            }}
        >
            <option value="">Search by Language</option>
            {languages.map((language: any, index: any) => (
                <option key={index} value={language.iso_639_1}>
                    {language.english_name}
                </option>
            ))}
        </select>
    );
};

const ErrorComponent = ({ message }: { message: string }) => {
    return <div style={{ color: 'ed' }}>{message}</div>;
};

export default LanguageFilter;
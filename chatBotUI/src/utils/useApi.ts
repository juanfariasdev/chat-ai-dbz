// useApi.ts (novo arquivo para lógica da API)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IMessage } from '@/interfaces/message';

export function useCharacters() {
    const [characters, setCharacters] = useState<{ name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://dragonball-api.com/api/characters');
                setCharacters(response.data.items);
            } catch (error) {
                console.error('Erro ao buscar personagens:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    return { characters, loading };
}
export async function apiBot({ prompt, character }:IMessage) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const characterPerson = character?.name ? ` - Se comporte como ${character?.name} do Dragon Ball Z. Você é o ${character?.name} e se comporta como ele, não coloque aspas duplas no começo da frase`: null;
    const message = `${prompt}${characterPerson}`;
    try {
        const response = await axios.post('https://flaskia2-acfeb9eygrh2hvbm.eastus-01.azurewebsites.net/api',{ consulta: message }, {
            headers: {
                'Authorization': apiKey,
            }
        });
        return (response.data.mensagem);
    } catch (error) {
        console.error('Erro ao acessar API:', error);
    }
}

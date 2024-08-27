/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useCharacters } from '@/utils/useApi';
import { IMessage } from '@/interfaces/message';


export function Footer({ onSend }: { onSend: (input: IMessage) => void }) {
  const { characters, loading } = useCharacters();
  const [input, setInput] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<{name: string}| null>(null);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSelectCharacter = (character: any) => {
    setSelectedCharacter(character);
  };

  const handleSend = () => {
    const message = {
        character: selectedCharacter,
        prompt: input,
    }
    onSend(message);
    setInput('');
    
  }

  return (
    <footer className="bg-white shadow-lg p-4">
      <div className="flex gap-4 items-center flex-col lg:flex-row">
        <Input
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base"
        />
        <div className='flex gap-4 w-full lg:w-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center bg-secondary hover:bg-secondary/90">
              {selectedCharacter?.name ?? 'Selecione um personagem'}
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {loading ? (
              <DropdownMenuItem>Carregando...</DropdownMenuItem>
            ) : (
              characters.map((character) => (
                <DropdownMenuItem
                  key={character.name}
                  className="cursor-pointer hover:bg-secondary/90 hover:text-white px-3 py-2"
                  onClick={() => handleSelectCharacter(character)}
                >
                  {character.name}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="text-base w-full" onClick={() => handleSend()} disabled={!input || !selectedCharacter}>
          Enviar <Star className="w-4 h-4 ml-2 text-white" />
        </Button>
        </div>
      </div>
    </footer>
  );
}
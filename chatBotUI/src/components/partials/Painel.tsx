import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { Footer } from "./Footer";
import { ResultDisplay } from "./ResultDisplay";
import { Compass, Info, Loader, MapPin, School } from "lucide-react";
import { IMessage } from "@/interfaces/message";
import { apiBot } from "@/utils/useApi";



export function Painel() {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<IMessage[] | null>(null);

  const handleCardClick = async (message : IMessage) => {
    setLoading(true);

    if(message.prompt){
    await apiBot({prompt: message.prompt, character: message.character}).then((response) => {
      if(response){
      setResultData((results) => [...(results || []), message, {
        character: message.character,
        result: response,
      }]); 
    } else{
      setResultData((results) => [...(results || []), message, {
        character: message.character,
        result: "Desculpe, não consegui encontrar a resposta para essa pergunta.",
      }]);
    }
    }).finally(() => {
      setLoading(false);
      setShowResult(true);
    })
  }

    // // Simulação de chamada API
    // setTimeout(() => {
      
    //   setResultData((results) => [...(results || []), message, {
    //     character: message.character,
    //     result: responseMessage,
    //   }]); 
    //   setLoading(false);
    //   setShowResult(true);
    // }, 2000);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen p-4 bg-gray-100">
      <header className="flex justify-end mb-6 items-end">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[url('https://dragonball-api.com/characters/goku_normal.webp')] bg-cover bg-top border-primary border-2 box-content">
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {!showResult ? (
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <CardComponent
              title="Quem foi o primeiro vilão que Goku enfrentou?"
              icon={<Compass className="w-8 h-8 text-[#F58220]" />} // Laranja de Goku para representar a busca.
              onClick={() => handleCardClick(
                {prompt: "Quem foi o primeiro vilão que Goku enfrentou?"}
              )}
            />
            <CardComponent
              title="Qual é a técnica de fusão usada por Goten e Trunks?"
              icon={<Info className="w-8 h-8 text-[#2E86AB]" />} // Azul do uniforme de Goku, para representar conhecimento técnico.
              onClick={() => handleCardClick(
                {prompt: "Qual é a técnica de fusão usada por Goten e Trunks?"}
              )}
            />
            <CardComponent
              title="Quantas Esferas do Dragão existem?"
              icon={<MapPin className="w-8 h-8 text-[#F5C518]" />} // Amarelo das Esferas do Dragão para representar a localização.
              onClick={() => handleCardClick(
                {prompt: "Quantas Esferas do Dragão existem?"})}
            />
            <CardComponent
              title="Qual é o verdadeiro nome do Mestre Kame?"
              icon={<School className="w-8 h-8 text-[#27AE60]" />} // Verde de Piccolo, representando a sabedoria e o aprendizado.
              onClick={() => handleCardClick(
                {prompt: "Qual é o verdadeiro nome do Mestre Kame?"})}
            />
          </section>
        ) : (
          resultData?.map((result, index) => (
            <ResultDisplay
              key={index}
              resultData={result}
            />
          ))
        )}
        {loading && (
            <div className="mt-8 flex items-center space-x-2 animate-pulse justify-center">
              <Loader className="w-8 h-8 animate-spin text-gray-400" />
            <span className="text-xl">Carregando...</span>
          </div>
          )},
      </main>

      <Footer onSend={handleCardClick} />
    </div>
  );
}


const QuizInfo = () => {

    return(
        <div className="mb-6 p-4 bg-blue-100 border-1 border-blue-500 rounded">
            <h2 className="text-lg text-center font-semibold mb-2">Hur Övningsquizen fungerar</h2>
            <p className="text-gray-700 mb-2">
                I denna övningsquiz kan du välja ämne och antalfrågor. Du svarar på varje fråga 
                och kan sedan navigera mellan frågorna med knapparna <strong>Föregående</strong> och <strong>Nästa</strong>.
            </p>

            <p className="text-gray-700 mb-2">
                Du har endast <strong>ett</strong> försök per fråga. När du har klickat på ditt alternativ kan du inte ändra dig. 
                Korrekta svaret ser du direkt efter du klickat.
            </p>

            <p className="text-gray-700 mb-2">
                Om du vill ha enklare verision av en fråga kan du trycka på <strong>Visa SFI-hjälp</strong> knappen. 
            </p>

            <p className="text-gray-700 mb-2">
                För varje fråga får du även en förklaring på svaret. 
            </p>

            <p className="text-gray-700 mb-2">
                När du har svarat på alla frågor kan du klicka <strong>Rätta provet</strong> för att se resultat. 
                Resultatet kommer visa hur många rätt du har fått av antal frågor samt det rätta svaret för frågan
                som du fick fel på. 
            </p>
        </div>
    ); 

}; 

export default QuizInfo; 
import Button from "@shared/components/ui/Button";

const QuizNavigation = ({
  currentIndex,
  total,
  onNext,
  onPrev,
  isLastQuestion,
  onFinish,
  allAnswered,
  isCurrentAnswered,
}) => {
  const isFirst = currentIndex === 0;

  return (
    <div className="flex justify-between mt-6">
      {/* Föregående */}
      <Button
        onClick={onPrev}
        disabled={isFirst}
        variant="secondary"
        size="small"
      >
        Föregående
      </Button>

      {/* Nästa eller Rätta prov */}
      {isLastQuestion ? (
        <Button
          onClick={onFinish}
          disabled={!allAnswered}
          size="small"
          className="bg-green-600 hover:bg-green-700"
        >
          Rätta prov
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!isCurrentAnswered}
          size="small"
          variant="secondary"
        >
          Nästa
        </Button>
      )}
    </div>
  );
};

export default QuizNavigation;

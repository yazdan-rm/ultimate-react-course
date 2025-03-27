import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import {useQuiz} from "../context/QuizProvider";

export default function App() {
  const {
    questions, status, index, answer, points, highScore, secondsRemaining, dispatch
  } = useQuiz();

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
      <div className="app">
        <Header/>
        <Main>
          {status === 'loading' && <Loader/>}
          {status === 'error' && <Error/>}
          {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
          {status === 'active' && <>
            <Progress index={index}
                      points={points}
                      numQuestions={numQuestions}
                      maxPossiblePoints={maxPossiblePoints}
                      answer={answer}/>

            <Question question={questions[index]}/>

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>

              <NextButton dispatch={dispatch}
                          answer={answer}
                          index={index}
                          numQuestions={numQuestions}/>
            </Footer>
          </>}
          {status === 'finished' && <FinishScreen points={points}
                                                  highScore={highScore}
                                                  dispatch={dispatch}
                                                  maxPossiblePoints={maxPossiblePoints}/>}
        </Main>
      </div>
  );
}

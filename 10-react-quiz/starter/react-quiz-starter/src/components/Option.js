function Option({question, dispatch, answer}) {
  const hasAnswered = answer !== null;

  return (<div className="options">
    {question.options.map((option, index) => (<button
        onClick={() => dispatch({type: 'newAnswer', payload: index})}
        className={`btn btn-option ${index === answer ? 'answer' : ''}
                                       ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}
        disabled={hasAnswered}
        key={index}>{option}
    </button>))}
  </div>)
}

export default Option;
import Option from './Option'

function Question({question, dispatch}) {
  return (<div>
    <h4>{question.question}</h4>
    <Option question={question}/>
  </div>)
}

export default Question;
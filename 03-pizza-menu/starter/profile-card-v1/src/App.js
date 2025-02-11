import './App.css';

function App() {
    return (
        <div className="card">
            <Avatar/>
            <div className='data'>
                <Intro/>
                <SkillList/>
            </div>
        </div>
    );
}

function Avatar() {
    return (<img src='logo.png' className="avatar" alt="yazdan rafieemanesh"/>)
}

function Intro() {
    return (<div>
        <h1>Yazdan Rafiee Manesh</h1>
        <p>I'm hungry for learn new things in react, I currently work on company as backend developer.</p>
    </div>)
}

function SkillList() {
    return (
        <div className="skill-list">
            <Skill skill={'React'} emoji={'💯'} color={'green'}/>
            <Skill skill={'HTML+CSS'} emoji={'💯'} color={'red'}/>
            <Skill skill={'JS'} emoji={'💯'} color={'yellow'}/>
            <Skill skill={'JAVA'} emoji={'💯'} color={'orange'}/>
        </div>
    )
}

function Skill(props) {
    return (
        <div className="skill" style={{backgroundColor: props.color}}>
            <span>{props.skill}</span>
            <span>{props.emoji}</span>
        </div>
    )
}


export default App;

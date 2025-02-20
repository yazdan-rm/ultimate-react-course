import './App.css';

const skills = [
    {
        skill: "HTML+CSS",
        level: "advanced",
        color: "#2662EA"
    },
    {
        skill: "Javascript",
        level: "advanced",
        color: "#EFD81D"
    },
    {
        skill: "Web Design",
        level: "advanced",
        color: "#C3DCAF"
    },
    {
        skill: "Git and Github",
        level: "intermediate",
        color: "#E84F33"
    },
    {
        skill: "React",
        level: "advanced",
        color: "#60DAFB"
    },
    {
        skill: "Svelte",
        level: "beginner",
        color: "rgba(114,18,177,0.66)"
    },
];

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
            {
                skills.map((skill, key) => (<Skill skillObj={skill} key={key}/>))
            }
        </div>
    )
}

function Skill({skillObj}) {
    // let emoji = '';
    // if (skillObj.level === 'advanced') emoji = '💪';
    // else if (skillObj.level === 'intermediate') emoji = '👍';
    // else if (skillObj.level === 'beginner') emoji = '👶';

    return (
        <div className="skill" style={{backgroundColor: skillObj.color}}>
            <span>{skillObj.skill}</span>
            <span>
                {skillObj.level === 'beginner' && "👶"}
                {skillObj.level === 'intermediate' && "👍"}
                {skillObj.level === 'advanced' && "💪"}
            </span>
        </div>
    )
}


export default App;

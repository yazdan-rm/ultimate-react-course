import AccordionItem from "./AccordionItem";
import React from "react";

export default function Accordion({data}) {
  const [curOpen, setCurOpen] = React.useState(null);

  return (<div className="accordion">
    {data.map((item, index) => (<AccordionItem key={index}
                                               num={index}
                                               curOpen={curOpen}
                                               onCurOpen={setCurOpen}
                                               title={item.title}
    >{item.text}</AccordionItem>))
    }
    <AccordionItem key={'Test 1'}
                   num={22}
                   curOpen={curOpen}
                   onCurOpen={setCurOpen}
                   title={'Test 1'}
    >
      <p>Allows React developers to: </p>
      <ul>
        <li>Break up UI into components</li>
        <li>Make component reusable</li>
        <li>Place state efficiently</li>
      </ul>
    </AccordionItem>
  </div>);
}
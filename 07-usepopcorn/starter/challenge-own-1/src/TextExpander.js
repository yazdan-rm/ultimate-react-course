import React from "react";

function TextExpander({
                        children,
                        collapsedNumWords = 10,
                        expandButtonText = "Show more",
                        collapseButtonText = "Show less",
                        buttonColor = "blue",
                        expanded = false,
                        className = ''
                      }) {
  const [isOpen, setIsOpen] = React.useState(expanded);

  const buttonStyle = {
    border: 'none',
    padding: '0 5px',
    backgroundColor: 'transparent',
    color: `${buttonColor}`,
    fontSize: '20px',
  }

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
      <div className={className}>
        <p>
          {`${isOpen === false && children.split(' ').slice(0, collapsedNumWords).join(' ')}...`}
          {isOpen && children}
          <button style={buttonStyle} onClick={handleIsOpen}>
            {isOpen ? collapseButtonText : expandButtonText}
          </button>
        </p>
      </div>
  )
}

export default TextExpander;
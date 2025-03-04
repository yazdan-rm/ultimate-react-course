import {useState} from "react";

const initialFriends = [{
  id: 118836, name: "Clark", image: "https://i.pravatar.cc/48?u=118836", balance: -7,
}, {
  id: 933372, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20,
}, {
  id: 499476, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0,
},];


export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  return (<div className={'app'}>
    <FriendList friendList={friendList} onFriendListChange={setFriendList} setSelectedFriend={setSelectedFriend}/>
    <FormSplitBill selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} setFriendList={setFriendList}/>
  </div>)
}

function FriendList({friendList, onFriendListChange, setSelectedFriend}) {

  return (<div className={'sidebar'}>
    {friendList.map((f) => <Friend onSelectedFriend={setSelectedFriend}
                                   friend={f}
                                   key={f.id}/>)}
    <AddFriend onFriendList={onFriendListChange}/>
  </div>);
}

function Friend({friend, onSelectedFriend}) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    setIsSelected(!isSelected);
    onSelectedFriend(!isSelected ? friend : null);
  }

  return (<>
    <ul>
      <li>
        <img src={friend.image} alt={friend.name}/>
        <h3>{friend.name}</h3>
        <p className={friend.balance > 0 ? 'green' : friend.balance < 0 ? 'red' : ''}>
          {friend.balance > 0 && `You owe ${friend.name} ${Math.abs(friend.balance)}$`}
          {friend.balance < 0 && `${friend.name} own you ${Math.abs(friend.balance)}$`}
          {friend.balance === 0 && `You and ${friend.name} are even`}
        </p>
        <button className={'button'} onClick={handleClick}>
          {isSelected ? 'Close' : 'Select'}
        </button>
      </li>
    </ul>
  </>)
}

function AddFriend({onFriendList}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function addFriend(e) {
    e.preventDefault();

    const friendObj = {
      id: Date.now(), name: name, image: image, balance: 0,
    }
    onFriendList(f => [...f, friendObj]);
    setIsOpen(false);
  }

  return <>
    {isOpen && <form className={'form-add-friend'} onSubmit={addFriend}>
      <label>🧑‍🤝‍🧑Friend name </label>
      <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
      <label>🖼️Image URL</label>
      <input type="text" placeholder='Enter Image Url' value={image} onChange={(e) => setImage(e.target.value)}/>
      <button className={'button'}>Add</button>
    </form>}
    <button className={'button'}
            onClick={() => setIsOpen(i => !i)}>
      {isOpen ? 'Close' : 'Add Friend'}
    </button>
  </>;
}

function FormSplitBill({selectedFriend, setSelectedFriend, setFriendList}) {
  const [bill, setBill] = useState('');
  const [myExpense, setMyExpense] = useState('');
  const [amIPay, setAmIPay] = useState(1);
  let friendExpense = bill - myExpense;

  function handleSubmit(e) {

    e.preventDefault()
    const friendObj = {
      id: selectedFriend.id,
      name: selectedFriend.name,
      image: selectedFriend.image,
      balance: amIPay ? -(bill - myExpense) : myExpense,
    }
    setFriendList((f) => f.map(fr => fr.id === selectedFriend.id ? friendObj : fr));
    setSelectedFriend(null);
  }

  if (!selectedFriend) return;

  return (<>
    <form className={'form-split-bill'} onSubmit={handleSubmit}>
      <h2>split bill with {selectedFriend.name}</h2>
      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)}/>
      <label>🧍Your expense</label>
      <input type="text" value={myExpense} onChange={(e) => setMyExpense(+e.target.value)}/>
      <label>👩‍🤝‍🧑{selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpense} disabled={true}/>
      <label>🤑Who is paying the bill?</label>
      <select onChange={(e) => setAmIPay(e.target.value === 'You' ? 1 : 0)}>
        <option>You</option>
        <option>{selectedFriend.name}</option>
      </select>
      <button className={'button'}>Split bill</button>
    </form>
  </>)
}

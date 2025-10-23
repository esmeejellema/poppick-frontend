import React, {useState} from 'react';
import '../../styling/Input.css';
import '../../styling/Wrapper.css';
import '../../styling/Button.css';
import '../../styling/Animations.css';
import '../../styling/Container.css';

const ListName = ({onCreateList}) => {
    const [listName, setListName] = useState('');
    const [isSliding, setIsSliding] = useState(false);

    const handleCreate = () => {
        if (!listName.trim()) {
            alert('Please enter a list name');
            return;
        }
        onCreateList(listName);//call the parent's createList function
        setListName(''); //clear input after creation
        setIsSliding(false);//flip back after create
    };

    return (
        <div>
            {/*front side*/}
            <div className={`anim-slide-card-front ${isSliding ? 'anim-slide-out-left' : 'anim-slide-in-left'}`}>
                <button className="button-primary" onClick={() => setIsSliding(true)}>
                    Create List
                </button>
            </div>

            {/*back side*/}
            <div className={`anim-slide-card-back ${isSliding ? 'anim-slide-in-right' : 'anim-slide-out-right'}`}>
                <div className="wrapper-content">
                    <label htmlFor="listName">Create your own list:</label>
                    <div className="wrapper-input-button">
                        <input className="input-field"
                               id="listName"
                               type="text"
                               placeholder="Enter new list"
                               value={listName}
                               onChange={e => setListName(e.target.value)}
                        />
                        <button type="button" onClick={handleCreate} className="button-secondary">
                            Create
                        </button>
                    </div>
                    <button type="button" onClick={() => setIsSliding(false)} className="button-secondary">
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}
export default ListName;


import { DebounceInput } from 'react-debounce-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Book {
    id: string;
    volumeInfo: {
        title: string;
    };
}

interface SearchBarProps {
    value: string;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: Book[];
    clickHandler: (id: string) => void;
}

const SearchBook: React.FC<SearchBarProps> = ({ value, changeHandler, data, clickHandler }) => {
  return (
    <div className="PrimarySearch">
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        value={value}
        className="form-control text-black"
        placeholder="Search for a book..."
        onChange={changeHandler} 
      />
      <FontAwesomeIcon icon={faSearch} className="form-control__Icon ml-3" />
      {
        data.length > 0 &&
          <ul className="PrimarySearch-Result shadow-sm">
            {
              data.map(result => (
                <li 
                  key={result.id}
                  onClick={() => clickHandler(result.id)}
                >{result.volumeInfo.title}</li>
              ))
            }
          </ul>
      }
    </div>
  );
}

export default SearchBook;

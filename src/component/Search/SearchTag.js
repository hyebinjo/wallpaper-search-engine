import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../asset/delete.svg';

const Tag = styled.div`
    display: flex;
    font-size: 14px;
    border-radius: 16px;
    padding: 6px 10px;
    color: var(--primary);
    background-color: var(--highlight);
    cursor: pointer;
    &:hover {
        background-color: var(--overlay);
    }
    margin: 4px;
`;

const TagLabel = styled.span`
    margin-right: 4px;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

const SearchTag = ({
    recentSearches,
    setRecentSearches,
    setQuery,
    inputRef,
}) => {
    const search = (e, word) => {
        if (e.target.tagName === 'line') return;
        setQuery(word);
        inputRef.current.value = word;
    };
    const deleteWord = (word) => {
        const filteredRecentSearches = recentSearches.filter(
            (recentSearch) => recentSearch !== word
        );
        setRecentSearches(filteredRecentSearches);
        localStorage.setItem(
            'recentSearches',
            JSON.stringify(filteredRecentSearches)
        );
    };

    return recentSearches.map((word) => (
        <Tag key={word} onClick={(e) => search(e, word)}>
            <TagLabel>{word}</TagLabel>
            <DeleteIcon width="12px" onClick={(e) => deleteWord(word)} />
        </Tag>
    ));
};

export default SearchTag;

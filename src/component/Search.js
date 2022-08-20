import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ setQuery, setOrientation, setOrder, setPerPage }) => {
    const [searchOption, setSearchOption] = useState(false);
    const inputRef = useRef();
    const [recentSearches, setRecentSearches] = useState([]);

    let debounceTimer;

    const debounce = (callback, time, e) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            callback(e);
        }, time);
    };

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const addRecentSearches = (keyword) => {
        if (keyword) {
            let newRecentSearches;
            if (recentSearches.includes(keyword)) {
                const indexOfKeyword = recentSearches.indexOf(keyword);
                recentSearches.splice(indexOfKeyword, 1);
                recentSearches.unshift(keyword);
                newRecentSearches = recentSearches;
            } else {
                newRecentSearches = [...recentSearches, keyword];
            }
            setRecentSearches(newRecentSearches);
            localStorage.setItem(
                'recentSearches',
                JSON.stringify(newRecentSearches)
            );
        }
    };

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            const searchWord = inputRef.current.value.trim();
            setQuery(searchWord);
            addRecentSearches(searchWord);
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        const recentSearches = JSON.parse(
            localStorage.getItem('recentSearches')
        );
        recentSearches && setRecentSearches(recentSearches);
    }, []);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        ref={inputRef}
                        onKeyPress={(e) => {
                            handleOnKeyPress(e);
                        }}
                        onChange={(e) =>
                            debounce(() => console.log(e.target.value), 200, e)
                        }
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && (
                    <SearchOption
                        setOrientation={setOrientation}
                        setOrder={setOrder}
                        setPerPage={setPerPage}
                    />
                )}
            </SearchBoxContainer>
            <SearchTagContainer>
                <SearchTag
                    recentSearches={recentSearches}
                    setRecentSearches={setRecentSearches}
                    setQuery={setQuery}
                    inputRef={inputRef}
                />
            </SearchTagContainer>
        </>
    );
};

export default Search;

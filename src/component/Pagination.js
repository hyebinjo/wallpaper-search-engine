import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';
import { useRef } from 'react';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text); ;
`;

const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
`;

const Pagination = ({ pages, setPage, page }) => {
    const ref = useRef();
    return (
        <Nav>
            {page != 1 && (
                <PrevIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={() => {
                        setPage((prev) => prev - 1);
                        ref.current.value = page - 1;
                    }}
                />
            )}
            {`총 ${pages} 중 `}
            <PageSelect
                name="page"
                onChange={(e) => setPage(e.target.value)}
                ref={ref}
            >
                {new Array(pages).fill('').map((page, index) => (
                    <option value={index + 1} key={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </PageSelect>
            페이지
            {page != pages && (
                <NextIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={() => {
                        setPage((prev) => prev + 1);
                        ref.current.value = page + 1;
                    }}
                />
            )}
        </Nav>
    );
};

export default Pagination;

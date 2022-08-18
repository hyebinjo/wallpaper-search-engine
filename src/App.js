import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import request from './api/request';
import generateQueryString from './utils/generateQueryString';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [query, setQuery] = useState('');
    const [orientation, setOrientaion] = useState('all');
    const [order, setOrder] = useState('popular');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [data, setData] = useState({});

    useEffect(() => {
        const queryString = generateQueryString({
            q: query,
            orientation: orientation,
            order: order,
            page: page,
            per_page: perPage,
        });
        const getData = async () => {
            const data = await request(
                `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY}&${queryString}`
            );
            setData(data);
        };
        getData();
    }, [query, orientation, order, page, perPage]);

    return (
        <>
            <Container>
                <Hero
                    setQuery={setQuery}
                    setOrientation={setOrientaion}
                    setOrder={setOrder}
                    setPerPage={setPerPage}
                />
                <ResultContainer
                    fetchedData={data}
                    perPage={perPage}
                    setPage={setPage}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;

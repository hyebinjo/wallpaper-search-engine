import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import request from './api/request';
import generateQueryString from './utils/generateQueryString';
import EmptyResult from './component/EmptyResult';

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
    const target = useRef(null);

    const pages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

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
            if (page === 1) {
                setData(data);
            } else {
                setData((prevData) => ({
                    ...prevData,
                    hits: prevData.hits.concat(data.hits),
                }));
            }
        };
        getData();
    }, [query, orientation, order, page, perPage]);

    const onIntersect = ([entries]) => {
        if (entries.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        // if (target.current) return;
        const observer = new IntersectionObserver(onIntersect, {
            threshold: 1,
        });
        observer.observe(target.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [order, orientation, perPage, query]);

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
                    page={page}
                />
                {pages !== page && (
                    <div ref={target}>
                        <EmptyResult isLoading={data.totalHits} />
                    </div>
                )}
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;

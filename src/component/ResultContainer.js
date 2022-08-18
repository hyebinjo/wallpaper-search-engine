import styled from 'styled-components';
import { useState } from 'react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
// import Pagination from './Pagination';
// import EmptyResult from './EmptyResult';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({ fetchedData, perPage, setPage, page }) => {
    const [imgData, setImgData] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    // const pages = fetchedData.totalHits
    //     ? Math.ceil(fetchedData.totalHits / perPage)
    //     : 0;

    return (
        <Container>
            {modalOpen && (
                <ImageModal imgData={imgData} setModalOpen={setModalOpen} />
            )}
            {/* {pages !== 0 && (
                <Pagination pages={pages} setPage={setPage} page={page} />
            )} */}
            <ResultsWrapper>
                {fetchedData.hits?.map((imgData) => (
                    <ImageCard
                        key={imgData.id}
                        imgData={imgData}
                        onClick={() => {
                            setImgData(imgData);
                            setModalOpen(true);
                        }}
                    />
                ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;

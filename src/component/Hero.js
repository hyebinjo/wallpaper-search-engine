import styled from 'styled-components';
import Search from './Search';

const Container = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--secondary);
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 120px 32px 16px 32px;
`;

const Hero = ({ setQuery, setOrientation, setOrder, setPerPage }) => {
    return (
        <Container>
            <Content>
                <Search
                    setQuery={setQuery}
                    setOrientation={setOrientation}
                    setOrder={setOrder}
                    setPerPage={setPerPage}
                />
            </Content>
        </Container>
    );
};

export default Hero;

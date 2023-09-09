import Header from '../components/Header';
import {Container, Row, Col, Button} from 'react-bootstrap'
import { Outlet } from 'react-router-dom';

// export async function loader() {
//     const contacts = await getId();
//     return { contacts };
//   }


function Root() {
    // const { contacts } = useLoaderData();

    return (
        <Container fluid>
            <Row>
                <Header/>
                <Container>
                    <Outlet/>
                </Container>
            </Row>
        </Container>
    );
}

export default Root;
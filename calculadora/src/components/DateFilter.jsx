// Update DateFilter.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DateFilter = ({ handleFilter, startDate, endDate, categoriaFilter, origenFilter }) => {
  const handleStartDateChange = (event) => {
    handleFilter(event.target.value, endDate, categoriaFilter, origenFilter);
  };

  const handleEndDateChange = (event) => {
    handleFilter(startDate, event.target.value, categoriaFilter, origenFilter);
  };

  const handleCategoriaChange = (event) => {
    handleFilter(startDate, endDate, event.target.value, origenFilter);
  };

  const handleOrigenChange = (event) => {
    handleFilter(startDate, endDate, categoriaFilter, event.target.value);
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5" className="bg-dark text-white">
        Filtros
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col xs={12} md={2} className="mb-2">
              <Form.Group controlId="startDate">
                <Form.Label>Inicio:</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="mb-2">
              <Form.Group controlId="endDate">
                <Form.Label>Fin:</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="mb-2">
              <Form.Group controlId="categoriaFilter">
                <Form.Label>Categoria:</Form.Label>
                <Form.Control
                  type="text"
                  value={categoriaFilter}
                  onChange={handleCategoriaChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="mb-2">
              <Form.Group controlId="origenFilter">
                <Form.Label>Origen:</Form.Label>
                <Form.Control
                  type="text"
                  value={origenFilter}
                  onChange={handleOrigenChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DateFilter;

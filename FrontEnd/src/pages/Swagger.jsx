import React from 'react';
import SwaggerUi from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const Swagger = () => {
    return (
        <div>
            <SwaggerUi url="swagger.yaml"/>
        </div>
    );
};

export default Swagger;
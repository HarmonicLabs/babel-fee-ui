import { Component, createEffect, onCleanup } from "solid-js";
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import "swagger-ui-dist/swagger-ui.css";

interface SwaggerDocsComponentProps {
  themeMode: () => 'dark' | 'light';
}

const SwaggerDocsComponent: Component<SwaggerDocsComponentProps> = (props) => {
  let container: HTMLDivElement | undefined;

const customCSS = (themeMode: 'dark' | 'light') => `
  .swagger-ui .topbar { display: none; }
  .swagger-ui .scheme-container {
    background: ${themeMode === 'dark' ? '#000000' : '#F5F5F5'};
    border: 1px solid ${themeMode === 'dark' ? '#A0A0A0' : '#D3D3D3'};
    border-radius: 16px;
    width: 70%;
    margin: 20px auto;
    color: ${themeMode === 'dark' ? '#FFFFFF' : '#222222'};
  }
  .swagger-ui .opblock .opblock-summary {
    background: ${themeMode === 'dark' ? '#000000' : '#E8E8E8'};
    color: ${themeMode === 'dark' ? '#FFFFFF' : '#FFFFFF'};
    border-radius: 12px;
  }
  .swagger-ui .opblock .opblock-description {
    color: ${themeMode === 'dark' ? '#FFFFFF' : '#222222'};
    font-family: 'Orbitron', 'Roboto', sans-serif;
  }
  .swagger-ui .markdown p {
    color: ${themeMode === 'dark' ? '#FFFFFF' : '#222222'};
    font-family: 'Orbitron', 'Roboto', sans-serif;
  }
  .swagger-ui .btn {
    border-radius: 12px;
    box-shadow: 0 2px 5px ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
    transition: box-shadow 0.3s ease, transform 0.2s ease, color 0.3s ease;
    color: #FFFFFF;
    font-family: 'Orbitron', 'Roboto', sans-serif;
    background: ${themeMode === 'dark' ? '#3A3A3A' : '#DCDCDC'};
    padding: 6px 12px;
  }
  .swagger-ui .btn:hover {
    box-shadow: 0 4px 10px ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)'};
    transform: scale(1.05);
    color: #FFFFFF;
    background: ${themeMode === 'dark' ? '#4E4E4E' : '#E0E0E0'};
  }
  .swagger-ui .opblock .opblock-summary-method {
    color: #FFFFFF;
    background: ${themeMode === 'dark' ? '#3A3A3A' : '#DCDCDC'};
    padding: 6px 12px;
    font-weight: bold;
  }
  .swagger-ui .opblock .opblock-summary-method:hover {
    background: ${themeMode === 'dark' ? '#4E4E4E' : '#E0E0E0'};
  }
  .swagger-ui .opblock {
    background: ${themeMode === 'dark' ? '#333333' : '#F8F8F8'};
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .swagger-ui .parameter__name, .swagger-ui .response-col_description {
    color: ${themeMode === 'dark' ? '#D3D3D3' : '#666666'};
    font-weight: bold;
  }
  .swagger-ui .parameter__value, .swagger-ui .response-col_status {
    color: ${themeMode === 'dark' ? '#E0E0E0' : '#444444'};
    background: ${themeMode === 'dark' ? '#4A4A4A' : '#ECECEC'};
    padding: 4px;
    border-radius: 4px;
  }
  .swagger-ui { min-height: 100%; }
`;

  createEffect(() => {
    if (!container) return;

    const styleElement = document.createElement("style");
    styleElement.textContent = customCSS(props.themeMode());
    document.head.appendChild(styleElement);

    const ui = SwaggerUIBundle({
      url: "./openapi.json",
      dom_id: "#swagger-container",
      presets: [SwaggerUIStandalonePreset, SwaggerUIBundle.presets.apis],
      layout: "StandaloneLayout",
    });

    console.log("Swagger UI initialized:", ui);

    // Update CSS when themeMode changes
    createEffect(() => {
      styleElement.textContent = customCSS(props.themeMode());
    });

    onCleanup(() => {
      if (container) {
        container.innerHTML = "";
        document.head.removeChild(styleElement);
      }
    });
  });

  return (
    <div style={{ padding: "20px", background: props.themeMode() === 'dark' ? '#161616' : '#F8F8F8', "border-radius": "12px", "flex-grow": 1 }}>
      <div id="swagger-container" ref={container as any} style={{ "min-height": "100%" }} />
    </div>
  );
};

export default SwaggerDocsComponent;
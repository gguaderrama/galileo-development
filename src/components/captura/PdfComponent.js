import React, { Component } from 'react';
//import { Document, Page } from 'react-pdf';
//import PropTypes from 'prop-types';
//import { pdfjs } from 'react-pdf';
//import samplePDF from './test.pdf';

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PdfComponent extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;
    const { urlPdf } = this.props;
    console.log('urlPdf',urlPdf);
    return (
      <>
        {/* <Document
          //file={samplePDF}
          file={urlPdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
          error="Ocurrió un error al cargar el PDF"
          loading="Cargando documento"
          noData="No se encontró el PDF"
        >
          <Page pageNumber={pageNumber} width={1024} />
        </Document> */}
        <div>
          <p>
            Pagina {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={this.previousPage}
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={this.nextPage}
          >
            Siguiente
          </button>
        </div>
      </>
    );
  }
}